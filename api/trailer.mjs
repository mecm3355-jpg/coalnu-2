const TMDB_MOVIE_API_URL = "https://api.themoviedb.org/3/movie";
const ALLOWED_LANGUAGES = new Set(["ko-KR", "en-US"]);

function jsonResponse(body, status, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl,
    },
  });
}

function isValidMovieId(movieId) {
  return /^\d{1,10}$/.test(movieId) && Number(movieId) > 0;
}

function isUsableYouTubeVideo(video) {
  return video?.site === "YouTube"
    && /^[A-Za-z0-9_-]{6,20}$/.test(video.key || "")
    && ["Trailer", "Teaser"].includes(video.type);
}

function chooseVideo(videos, type) {
  return videos
    .filter((video) => isUsableYouTubeVideo(video) && video.type === type)
    .sort((first, second) => {
      const officialDifference = Number(second.official) - Number(first.official);
      if (officialDifference) return officialDifference;

      const firstPublishedAt = Date.parse(first.published_at || "") || 0;
      const secondPublishedAt = Date.parse(second.published_at || "") || 0;
      return secondPublishedAt - firstPublishedAt;
    })[0] || null;
}

function publicVideo(video) {
  if (!video) return null;

  return {
    key: video.key,
    name: video.name || "",
    type: video.type,
    official: Boolean(video.official),
  };
}

async function fetchVideos(movieId, language, apiKey, signal) {
  const tmdbUrl = new URL(`${TMDB_MOVIE_API_URL}/${movieId}/videos`);
  tmdbUrl.searchParams.set("api_key", apiKey);
  tmdbUrl.searchParams.set("language", language);

  const response = await fetch(tmdbUrl, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB video request failed with status ${response.status}.`);
  }

  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    console.error("TMDB_API_KEY environment variable is missing.");
    return jsonResponse({ error: "서버의 영화 API 환경 변수가 설정되지 않았습니다." }, 500);
  }

  const requestUrl = new URL(request.url);
  const movieId = requestUrl.searchParams.get("movieId") || "";
  const language = requestUrl.searchParams.get("language") || "en-US";

  if (!isValidMovieId(movieId)) {
    return jsonResponse({ error: "올바른 영화 ID가 필요합니다." }, 400);
  }

  if (!ALLOWED_LANGUAGES.has(language)) {
    return jsonResponse({ error: "지원하지 않는 언어입니다." }, 400);
  }

  try {
    const preferredVideos = await fetchVideos(movieId, language, apiKey, request.signal);
    let fallbackVideos = [];

    const preferredTrailer = chooseVideo(preferredVideos, "Trailer");
    const preferredTeaser = chooseVideo(preferredVideos, "Teaser");

    if (language !== "en-US" && (!preferredTrailer || !preferredTeaser)) {
      fallbackVideos = await fetchVideos(movieId, "en-US", apiKey, request.signal);
    }

    const fallbackTrailer = chooseVideo(fallbackVideos, "Trailer");
    const fallbackTeaser = chooseVideo(fallbackVideos, "Teaser");
    const trailer = preferredTrailer || fallbackTrailer || preferredTeaser || fallbackTeaser;
    const teaser = preferredTeaser || fallbackTeaser;

    return jsonResponse(
      {
        trailer: publicVideo(trailer),
        teaser: publicVideo(teaser),
      },
      200,
      "public, s-maxage=21600, stale-while-revalidate=86400",
    );
  } catch (error) {
    console.error("TMDB video request failed.", error);
    return jsonResponse({ error: "예고편 정보를 불러오지 못했습니다." }, 502);
  }
}
