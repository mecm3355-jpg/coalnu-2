const MOVIES_API_URL = "/api/movies";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const DEFAULT_LANGUAGE = "en-US";
const SUPPORTED_LANGUAGES = new Set(["ko-KR", "en-US"]);

const CATEGORIES = {
  now_playing: {
    endpoint: "now_playing",
    hash: "now-playing",
    navLabel: "현재상영 영화",
    sectionTitle: "지금 상영 중",
    kicker: "IN THEATERS NOW",
    eyebrow: "NOW PLAYING IN KOREA",
    countLabel: "현재 상영작",
    fallbackOverview: {
      "ko-KR": "지금 극장에서 만나볼 수 있는 화제의 영화입니다.",
      "en-US": "Discover a standout movie currently playing in theaters.",
    },
  },
  popular: {
    endpoint: "popular",
    hash: "popular",
    navLabel: "인기 영화",
    sectionTitle: "지금 인기 있는 영화",
    kicker: "TRENDING WITH VIEWERS",
    eyebrow: "POPULAR MOVIES IN KOREA",
    countLabel: "인기 영화",
    fallbackOverview: {
      "ko-KR": "지금 많은 관객이 관심 있게 보고 있는 영화입니다.",
      "en-US": "Discover a movie attracting viewers around the world.",
    },
  },
  top_rated: {
    endpoint: "top_rated",
    hash: "top-rated",
    navLabel: "최고평점 영화",
    sectionTitle: "평점이 높은 영화",
    kicker: "AUDIENCE FAVORITES",
    eyebrow: "TOP RATED MOVIES",
    countLabel: "최고 평점 영화",
    fallbackOverview: {
      "ko-KR": "관객에게 높은 평가를 받은 작품을 만나보세요.",
      "en-US": "Discover one of the highest-rated movies on TMDB.",
    },
  },
  upcoming: {
    endpoint: "upcoming",
    hash: "upcoming",
    navLabel: "개봉예정 영화",
    sectionTitle: "곧 개봉할 영화",
    kicker: "COMING TO THEATERS",
    eyebrow: "UPCOMING IN KOREA",
    countLabel: "개봉 예정 영화",
    fallbackOverview: {
      "ko-KR": "곧 극장에서 만날 수 있는 기대작입니다.",
      "en-US": "Get ready for a highly anticipated upcoming release.",
    },
  },
};

const elements = {
  lobby: document.querySelector("#lobby"),
  movieApp: document.querySelector("#movie-app"),
  footer: document.querySelector("#site-footer"),
  lobbyReturn: document.querySelector("#lobby-return"),
  headerCategory: document.querySelector("#header-category"),
  skipLink: document.querySelector("#skip-link"),
  grid: document.querySelector("#movie-grid"),
  search: document.querySelector("#movie-search"),
  resultCount: document.querySelector("#result-count"),
  emptyState: document.querySelector("#empty-state"),
  errorState: document.querySelector("#error-state"),
  errorMessage: document.querySelector("#error-message"),
  retryButton: document.querySelector("#retry-button"),
  refreshButton: document.querySelector("#refresh-button"),
  heroTitle: document.querySelector("#hero-title"),
  heroOverview: document.querySelector("#hero-overview"),
  heroBackdrop: document.querySelector(".hero-backdrop"),
  heroEyebrow: document.querySelector("#hero-eyebrow span:last-child"),
  heroDetailButton: document.querySelector("#hero-detail-button"),
  movieListLink: document.querySelector("#movie-list-link"),
  sectionTitle: document.querySelector("#section-title"),
  sectionKicker: document.querySelector("#section-kicker"),
  categoryButtons: document.querySelectorAll("[data-category]"),
  languageButtons: document.querySelectorAll("[data-language]"),
  dialog: document.querySelector("#movie-dialog"),
  dialogClose: document.querySelector("#dialog-close"),
  dialogBackdrop: document.querySelector("#dialog-backdrop"),
  dialogTitle: document.querySelector("#dialog-title"),
  dialogLabel: document.querySelector(".dialog-label"),
  dialogRating: document.querySelector("#dialog-rating"),
  dialogDate: document.querySelector("#dialog-date"),
  dialogAdult: document.querySelector("#dialog-adult"),
  dialogOverview: document.querySelector("#dialog-overview"),
};

let movies = [];
let featuredMovie = null;
let currentCategory = "now_playing";
let currentLanguage = getStoredLanguage();
let activeRequest = null;

function getStoredLanguage() {
  try {
    const storedLanguage = localStorage.getItem("movie-language");
    return SUPPORTED_LANGUAGES.has(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem("movie-language", language);
  } catch {
    // The language still works for this session when storage is unavailable.
  }
}

function updateLanguageUI() {
  elements.languageButtons.forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const contentLanguage = currentLanguage === "ko-KR" ? "ko" : "en";
  elements.grid.lang = contentLanguage;
  elements.heroTitle.lang = contentLanguage;
  elements.heroOverview.lang = contentLanguage;
  elements.dialogTitle.lang = contentLanguage;
  elements.dialogOverview.lang = contentLanguage;
}

function showSkeletons() {
  elements.grid.innerHTML = "";

  for (let index = 0; index < 10; index += 1) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-card";
    skeleton.setAttribute("aria-hidden", "true");
    skeleton.innerHTML = `
      <div class="skeleton-poster"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    `;
    elements.grid.append(skeleton);
  }
}

function formatReleaseDate(dateString) {
  if (!dateString) return "TBA";

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat(currentLanguage, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function createPoster(movie) {
  if (!movie.poster_path) {
    const fallback = document.createElement("div");
    fallback.className = "poster-fallback";
    const title = document.createElement("span");
    title.textContent = movie.title;
    fallback.append(title);
    return fallback;
  }

  const image = document.createElement("img");
  image.className = "movie-poster";
  image.src = `${IMAGE_BASE_URL}/w500${movie.poster_path}`;
  image.alt = `${movie.title} 포스터`;
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}

function createMovieCard(movie, index) {
  const article = document.createElement("article");
  article.className = "movie-card";

  const posterButton = document.createElement("button");
  posterButton.className = "poster-button";
  posterButton.type = "button";
  posterButton.setAttribute("aria-label", `${movie.title} 상세 정보 보기`);
  posterButton.addEventListener("click", () => openMovieDialog(movie));

  const rank = document.createElement("span");
  rank.className = "card-rank";
  rank.textContent = String(index + 1).padStart(2, "0");

  const hover = document.createElement("span");
  hover.className = "card-hover";
  hover.innerHTML = '<span>상세 보기</span><span class="card-hover-icon" aria-hidden="true">▶</span>';

  posterButton.append(createPoster(movie), rank, hover);

  const info = document.createElement("div");
  info.className = "movie-info";

  const title = document.createElement("h3");
  title.className = "movie-title";
  title.textContent = movie.title;
  title.title = movie.title;

  const meta = document.createElement("p");
  meta.className = "movie-meta";

  const release = document.createElement("span");
  release.className = "movie-release";

  const releaseLabel = document.createElement("span");
  releaseLabel.className = "movie-release-label";
  releaseLabel.textContent = "RELEASE";

  const date = document.createElement("time");
  date.dateTime = movie.release_date || "";
  date.textContent = formatReleaseDate(movie.release_date);

  release.append(releaseLabel, date);

  const badges = document.createElement("span");
  badges.className = "movie-badges";

  const adult = document.createElement("span");
  adult.className = `movie-adult ${movie.adult ? "is-adult" : "is-non-adult"}`;
  adult.textContent = movie.adult ? "ADULT FLAGGED" : "NOT FLAGGED";
  adult.title = movie.adult
    ? "TMDB에서 성인 콘텐츠로 표시한 작품입니다. 국내 관람등급과는 다릅니다."
    : "TMDB에서 성인 콘텐츠로 표시하지 않은 작품입니다. 국내 관람등급과는 다릅니다.";
  adult.setAttribute(
    "aria-label",
    movie.adult ? "TMDB adult content flag: yes" : "TMDB adult content flag: no",
  );

  const rating = document.createElement("span");
  rating.className = "movie-rating";
  rating.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : "—";

  badges.append(adult, rating);
  meta.append(release, badges);
  info.append(title, meta);
  article.append(posterButton, info);
  return article;
}

function renderMovies(movieList) {
  elements.grid.innerHTML = "";
  elements.grid.setAttribute("aria-busy", "false");
  elements.errorState.hidden = true;
  elements.emptyState.hidden = movieList.length > 0;
  elements.grid.hidden = movieList.length === 0;

  movieList.forEach((movie, index) => {
    elements.grid.append(createMovieCard(movie, index));
  });

  const query = elements.search.value.trim();
  const category = CATEGORIES[currentCategory];
  elements.resultCount.textContent = query
    ? `“${query}” 검색 결과 ${movieList.length}편`
    : `${category.countLabel} ${movieList.length}편`;
}

function updateHero(movie) {
  const category = CATEGORIES[currentCategory];
  featuredMovie = movie;
  elements.heroTitle.textContent = movie.title;
  elements.heroOverview.textContent =
    movie.overview || category.fallbackOverview[currentLanguage];
  elements.heroDetailButton.disabled = false;

  elements.heroBackdrop.classList.remove("is-loaded");
  elements.heroBackdrop.style.backgroundImage = "none";

  if (movie.backdrop_path) {
    const backdropUrl = `${IMAGE_BASE_URL}/original${movie.backdrop_path}`;
    const preloadImage = new Image();
    preloadImage.onload = () => {
      if (featuredMovie?.id !== movie.id || elements.movieApp.hidden) return;
      elements.heroBackdrop.style.backgroundImage = `url("${backdropUrl}")`;
      elements.heroBackdrop.classList.add("is-loaded");
    };
    preloadImage.src = backdropUrl;
  }
}

function openMovieDialog(movie) {
  elements.dialogLabel.textContent = CATEGORIES[currentCategory].eyebrow;
  elements.dialogTitle.textContent = movie.title;
  const missingRating = currentLanguage === "ko-KR" ? "평점 없음" : "No rating";
  elements.dialogRating.textContent = `★ ${movie.vote_average ? movie.vote_average.toFixed(1) : missingRating}`;
  elements.dialogDate.textContent = formatReleaseDate(movie.release_date);
  elements.dialogAdult.textContent = movie.adult ? "ADULT FLAGGED" : "NOT FLAGGED";
  elements.dialogAdult.title = movie.adult
    ? "TMDB에서 성인 콘텐츠로 표시한 작품입니다. 국내 관람등급과는 다릅니다."
    : "TMDB에서 성인 콘텐츠로 표시하지 않은 작품입니다. 국내 관람등급과는 다릅니다.";
  elements.dialogAdult.classList.toggle("is-adult", movie.adult);
  elements.dialogOverview.textContent = movie.overview || (
    currentLanguage === "ko-KR"
      ? "등록된 줄거리가 없습니다."
      : "No overview is available."
  );
  elements.dialogBackdrop.style.backgroundImage = movie.backdrop_path
    ? `url("${IMAGE_BASE_URL}/w1280${movie.backdrop_path}")`
    : "none";
  elements.dialog.showModal();
}

function categoryFromHash() {
  const hash = window.location.hash.replace("#", "");
  const match = Object.entries(CATEGORIES).find(([, category]) => category.hash === hash);
  return match?.[0] || null;
}

function updateCategoryUI(categoryKey) {
  const category = CATEGORIES[categoryKey];

  elements.heroEyebrow.textContent = category.eyebrow;
  elements.sectionTitle.textContent = category.sectionTitle;
  elements.sectionKicker.textContent = category.kicker;
  elements.headerCategory.textContent = category.navLabel;
  document.title = `${category.navLabel} — NOW/SCREEN`;
}

function showLobby() {
  activeRequest?.abort();
  activeRequest = null;
  featuredMovie = null;

  if (elements.dialog.open) elements.dialog.close();
  elements.lobby.hidden = false;
  elements.movieApp.hidden = true;
  elements.footer.hidden = true;
  elements.headerCategory.hidden = true;
  elements.lobbyReturn.hidden = true;
  elements.skipLink.href = "#lobby-options";
  elements.skipLink.textContent = "카테고리 메뉴로 바로가기";
  document.body.classList.add("is-lobby");
  document.title = "NOW/SCREEN — 영화관 로비";
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showMovieView(categoryKey) {
  elements.lobby.hidden = true;
  elements.movieApp.hidden = false;
  elements.footer.hidden = false;
  elements.headerCategory.hidden = false;
  elements.lobbyReturn.hidden = false;
  elements.skipLink.href = "#movie-grid";
  elements.skipLink.textContent = "영화 목록으로 바로가기";
  document.body.classList.remove("is-lobby");
  window.scrollTo({ top: 0, behavior: "auto" });
  loadMovies(categoryKey);
}

function handleRoute() {
  const hash = window.location.hash.replace("#", "");
  const categoryKey = categoryFromHash();

  if (categoryKey) {
    showMovieView(categoryKey);
  } else if (!hash || hash === "lobby") {
    showLobby();
  }
}

async function loadMovies(categoryKey = currentCategory) {
  const category = CATEGORIES[categoryKey] || CATEGORIES.now_playing;
  currentCategory = CATEGORIES[categoryKey] ? categoryKey : "now_playing";

  activeRequest?.abort();
  const request = new AbortController();
  activeRequest = request;

  updateCategoryUI(currentCategory);
  featuredMovie = null;
  elements.heroDetailButton.disabled = true;
  elements.heroTitle.textContent = category.sectionTitle;
  elements.heroOverview.textContent = `${category.countLabel} 정보를 불러오고 있습니다.`;
  elements.heroBackdrop.classList.remove("is-loaded");
  elements.heroBackdrop.style.backgroundImage = "none";
  elements.grid.hidden = false;
  elements.emptyState.hidden = true;
  elements.errorState.hidden = true;
  elements.grid.setAttribute("aria-busy", "true");
  elements.resultCount.textContent = "영화 정보를 불러오는 중...";
  elements.refreshButton.disabled = true;
  showSkeletons();

  const url = new URL(MOVIES_API_URL, window.location.origin);
  url.searchParams.set("category", category.endpoint);
  url.searchParams.set("language", currentLanguage);

  try {
    const response = await fetch(url, { signal: request.signal });
    if (!response.ok) {
      throw new Error(`TMDB 요청 오류 (${response.status})`);
    }

    const data = await response.json();
    movies = Array.isArray(data.results) ? data.results : [];

    if (!movies.length) {
      throw new Error(`표시할 ${category.countLabel}가 없습니다.`);
    }

    elements.search.value = "";
    updateHero(movies[0]);
    renderMovies(movies);
  } catch (error) {
    if (error.name === "AbortError") return;

    elements.grid.innerHTML = "";
    elements.grid.hidden = true;
    elements.grid.setAttribute("aria-busy", "false");
    elements.errorState.hidden = false;
    elements.resultCount.textContent = "불러오기 실패";
    elements.errorMessage.textContent = error.message || "잠시 후 다시 시도해 주세요.";
  } finally {
    if (activeRequest === request) {
      elements.refreshButton.disabled = false;
    }
  }
}

elements.categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const categoryKey = button.dataset.category;
    const nextHash = CATEGORIES[categoryKey].hash;

    if (window.location.hash === `#${nextHash}`) {
      showMovieView(categoryKey);
    } else {
      window.location.hash = nextHash;
    }
  });
});

elements.languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = button.dataset.language;
    if (!SUPPORTED_LANGUAGES.has(nextLanguage) || nextLanguage === currentLanguage) return;

    currentLanguage = nextLanguage;
    storeLanguage(currentLanguage);
    updateLanguageUI();

    if (!elements.movieApp.hidden) {
      loadMovies(currentCategory);
    }
  });
});

elements.lobbyReturn.addEventListener("click", () => {
  if (window.location.hash === "#lobby") {
    showLobby();
  } else {
    window.location.hash = "lobby";
  }
});

elements.movieListLink.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#movie-list").scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("hashchange", handleRoute);

elements.search.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLocaleLowerCase("en-US");
  const filteredMovies = query
    ? movies.filter((movie) => movie.title.toLocaleLowerCase("en-US").includes(query))
    : movies;

  renderMovies(filteredMovies);
});

elements.heroDetailButton.addEventListener("click", () => {
  if (featuredMovie) openMovieDialog(featuredMovie);
});

elements.dialogClose.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});

elements.retryButton.addEventListener("click", () => loadMovies(currentCategory));
elements.refreshButton.addEventListener("click", () => loadMovies(currentCategory));
document.querySelector("#current-year").textContent = new Date().getFullYear();

updateLanguageUI();
handleRoute();
