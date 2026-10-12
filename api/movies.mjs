const TMDB_API_BASE_URL = "https://api.themoviedb.org/3/movie";
const ALLOWED_CATEGORIES = new Set([
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
]);
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

export async function GET(request) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    console.error("TMDB_API_KEY environment variable is missing.");
    return jsonResponse(
      { error: "서버의 영화 API 환경 변수가 설정되지 않았습니다." },
      500,
    );
  }

  const requestUrl = new URL(request.url);
  const category = requestUrl.searchParams.get("category") || "now_playing";
  const language = requestUrl.searchParams.get("language") || "en-US";

  if (!ALLOWED_CATEGORIES.has(category)) {
    return jsonResponse({ error: "지원하지 않는 영화 카테고리입니다." }, 400);
  }

  if (!ALLOWED_LANGUAGES.has(language)) {
    return jsonResponse({ error: "지원하지 않는 언어입니다." }, 400);
  }

  const tmdbUrl = new URL(`${TMDB_API_BASE_URL}/${category}`);
  tmdbUrl.searchParams.set("api_key", apiKey);
  tmdbUrl.searchParams.set("language", language);
  tmdbUrl.searchParams.set("region", "KR");
  tmdbUrl.searchParams.set("page", "1");

  try {
    const response = await fetch(tmdbUrl, {
      headers: { Accept: "application/json" },
      signal: request.signal,
    });

    if (!response.ok) {
      console.error(`TMDB request failed with status ${response.status}.`);
      return jsonResponse(
        { error: `영화 정보를 불러오지 못했습니다. (${response.status})` },
        response.status >= 500 ? 502 : response.status,
      );
    }

    const data = await response.json();
    return jsonResponse(data, 200, "public, s-maxage=1800, stale-while-revalidate=86400");
  } catch (error) {
    console.error("TMDB request failed.", error);
    return jsonResponse({ error: "영화 정보 서버에 연결하지 못했습니다." }, 502);
  }
}
