const MOVIES_API_URL = "/api/movies";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const DEFAULT_LANGUAGE = "en-US";
const SUPPORTED_LANGUAGES = new Set(["ko-KR", "en-US"]);

const UI_TRANSLATIONS = {
  "ko-KR": {
    metaDescription: "TMDB 데이터를 활용해 현재 극장에서 상영 중인 영화를 한눈에 살펴보세요.",
    brandAriaLabel: "NOW SCREEN 영화관 로비로 이동",
    languageSwitcherAriaLabel: "사이트 언어 선택",
    lobbyReturn: "로비로 돌아가기",
    lobbyKicker: "NOW/SCREEN 영화관",
    lobbyTitle: "어떤 영화를<br />찾고 계신가요?",
    lobbyDescription: "원하는 상영관을 선택하세요.<br />지금 주목할 영화를 한눈에 안내해 드립니다.",
    categorySelectionAriaLabel: "영화 카테고리 선택",
    lobbyNote: "영화관을 선택해 입장하세요",
    viewDetails: "자세히 보기",
    viewAllMovies: "전체 영화 보기",
    searchLabel: "영화 제목 검색",
    searchPlaceholder: "영화 제목 검색",
    adultNoticeAriaLabel: "성인 콘텐츠 플래그 안내",
    contentNotice: "콘텐츠 안내",
    adultNoticeDescription: "표시는 TMDB의 성인 콘텐츠 플래그이며, 국내 영화 관람등급과는 다릅니다.",
    refresh: "새로고침",
    emptyTitle: "검색 결과가 없습니다",
    emptyDescription: "다른 제목으로 다시 검색해 보세요.",
    errorCode: "연결 오류",
    errorTitle: "영화 정보를 불러오지 못했습니다.",
    retry: "다시 시도",
    aboutAriaLabel: "서비스 소개",
    aboutKicker: "나만의 영화 안내",
    aboutTitle: "오늘의 극장,<br />한눈에.",
    aboutCopy: "현재 상영작부터 인기작, 높은 평점의 작품과 개봉 예정작까지 확인하세요. 영화 포스터와 제목, 개봉일, 관객 평점을 한곳에 모았습니다.",
    footerCredit: "영화 정보는 TMDB에서 제공됩니다.",
    dialogCloseAriaLabel: "상세 정보 닫기",
    skipLobby: "카테고리 메뉴로 바로가기",
    skipMovies: "영화 목록으로 바로가기",
    lobbyDocumentTitle: "NOW/SCREEN — 영화관 로비",
    posterAlt: "{title} 포스터",
    detailsAriaLabel: "{title} 상세 정보 보기",
    cardDetails: "상세 보기",
    release: "개봉일",
    adultFlagged: "성인 콘텐츠 표시",
    notFlagged: "성인 콘텐츠 미표시",
    adultYesTitle: "TMDB에서 성인 콘텐츠로 표시한 작품입니다. 국내 관람등급과는 다릅니다.",
    adultNoTitle: "TMDB에서 성인 콘텐츠로 표시하지 않은 작품입니다. 국내 관람등급과는 다릅니다.",
    adultYesAriaLabel: "TMDB 성인 콘텐츠 플래그: 예",
    adultNoAriaLabel: "TMDB 성인 콘텐츠 플래그: 아니요",
    noRating: "평점 없음",
    noOverview: "등록된 줄거리가 없습니다.",
    searchResults: "“{query}” 검색 결과 {count}편",
    categoryCount: "{category} {count}편",
    loadingCategory: "{category} 정보를 불러오고 있습니다.",
    loadingMovies: "영화 정보를 불러오는 중...",
    requestError: "TMDB 요청 오류 ({status})",
    noMovies: "표시할 {category}가 없습니다.",
    loadFailed: "불러오기 실패",
    defaultError: "잠시 후 다시 시도해 주세요.",
  },
  "en-US": {
    metaDescription: "Browse movies now playing in theaters using data provided by TMDB.",
    brandAriaLabel: "Go to the NOW SCREEN cinema lobby",
    languageSwitcherAriaLabel: "Select site language",
    lobbyReturn: "Back to lobby",
    lobbyKicker: "NOW/SCREEN CINEMA",
    lobbyTitle: "What would you<br />like to watch?",
    lobbyDescription: "Choose a theater section.<br />Discover the movies everyone is talking about.",
    categorySelectionAriaLabel: "Select a movie category",
    lobbyNote: "SELECT A THEATER TO ENTER",
    viewDetails: "View details",
    viewAllMovies: "View all movies",
    searchLabel: "Search by movie title",
    searchPlaceholder: "Search movie titles",
    adultNoticeAriaLabel: "Adult content flag notice",
    contentNotice: "Content notice",
    adultNoticeDescription: "is TMDB's adult-content flag and is not an official theatrical age rating.",
    refresh: "Refresh",
    emptyTitle: "No results found",
    emptyDescription: "Try searching with a different title.",
    errorCode: "CONNECTION ERROR",
    errorTitle: "We couldn't load the movies.",
    retry: "Try again",
    aboutAriaLabel: "About this service",
    aboutKicker: "YOUR CINEMA GUIDE",
    aboutTitle: "Today's cinema,<br />at a glance.",
    aboutCopy: "Explore now-playing, popular, top-rated, and upcoming movies. Find posters, titles, release dates, and viewer ratings all in one place.",
    footerCredit: "Movie information is provided by TMDB.",
    dialogCloseAriaLabel: "Close movie details",
    skipLobby: "Skip to category menu",
    skipMovies: "Skip to movie list",
    lobbyDocumentTitle: "NOW/SCREEN — Cinema Lobby",
    posterAlt: "{title} poster",
    detailsAriaLabel: "View details for {title}",
    cardDetails: "View details",
    release: "RELEASE",
    adultFlagged: "ADULT FLAGGED",
    notFlagged: "NOT FLAGGED",
    adultYesTitle: "TMDB flags this title as adult content. This is not an official theatrical age rating.",
    adultNoTitle: "TMDB does not flag this title as adult content. This is not an official theatrical age rating.",
    adultYesAriaLabel: "TMDB adult content flag: yes",
    adultNoAriaLabel: "TMDB adult content flag: no",
    noRating: "No rating",
    noOverview: "No overview is available.",
    searchResults: "{count} results for “{query}”",
    categoryCount: "{count} {category}",
    loadingCategory: "Loading {category}...",
    loadingMovies: "Loading movie information...",
    requestError: "TMDB request failed ({status})",
    noMovies: "No {category} are available.",
    loadFailed: "Failed to load",
    defaultError: "Please try again in a moment.",
  },
};

const CATEGORIES = {
  now_playing: {
    endpoint: "now_playing",
    hash: "now-playing",
    translations: {
      "ko-KR": { cardKicker: "현재 상영", navLabel: "현재상영 영화", cardDescription: "오늘 극장에서 만날 수 있는 작품", sectionTitle: "지금 상영 중", kicker: "현재 극장 상영작", eyebrow: "대한민국 극장 상영 중", countLabel: "현재 상영작", fallbackOverview: "지금 극장에서 만나볼 수 있는 화제의 영화입니다." },
      "en-US": { cardKicker: "NOW PLAYING", navLabel: "Now Playing", cardDescription: "Movies you can see in theaters today", sectionTitle: "Now Playing", kicker: "IN THEATERS NOW", eyebrow: "NOW PLAYING IN KOREA", countLabel: "movies now playing", fallbackOverview: "Discover a standout movie currently playing in theaters." },
    },
  },
  popular: {
    endpoint: "popular",
    hash: "popular",
    translations: {
      "ko-KR": { cardKicker: "인기작", navLabel: "인기 영화", cardDescription: "지금 가장 많은 관심을 받는 작품", sectionTitle: "지금 인기 있는 영화", kicker: "관객 인기작", eyebrow: "대한민국 인기 영화", countLabel: "인기 영화", fallbackOverview: "지금 많은 관객이 관심 있게 보고 있는 영화입니다." },
      "en-US": { cardKicker: "POPULAR", navLabel: "Popular Movies", cardDescription: "Movies getting the most attention now", sectionTitle: "Popular Right Now", kicker: "TRENDING WITH VIEWERS", eyebrow: "POPULAR MOVIES IN KOREA", countLabel: "popular movies", fallbackOverview: "Discover a movie attracting viewers around the world." },
    },
  },
  top_rated: {
    endpoint: "top_rated",
    hash: "top-rated",
    translations: {
      "ko-KR": { cardKicker: "최고 평점", navLabel: "최고평점 영화", cardDescription: "관객에게 높은 평가를 받은 작품", sectionTitle: "평점이 높은 영화", kicker: "관객 추천작", eyebrow: "최고 평점 영화", countLabel: "최고 평점 영화", fallbackOverview: "관객에게 높은 평가를 받은 작품을 만나보세요." },
      "en-US": { cardKicker: "TOP RATED", navLabel: "Top Rated", cardDescription: "Movies highly rated by viewers", sectionTitle: "Top Rated Movies", kicker: "AUDIENCE FAVORITES", eyebrow: "TOP RATED MOVIES", countLabel: "top-rated movies", fallbackOverview: "Discover one of the highest-rated movies on TMDB." },
    },
  },
  upcoming: {
    endpoint: "upcoming",
    hash: "upcoming",
    translations: {
      "ko-KR": { cardKicker: "개봉 예정", navLabel: "개봉예정 영화", cardDescription: "곧 극장에서 만나게 될 기대작", sectionTitle: "곧 개봉할 영화", kicker: "극장 개봉 예정작", eyebrow: "대한민국 개봉 예정작", countLabel: "개봉 예정 영화", fallbackOverview: "곧 극장에서 만날 수 있는 기대작입니다." },
      "en-US": { cardKicker: "UPCOMING", navLabel: "Upcoming", cardDescription: "Anticipated movies coming to theaters soon", sectionTitle: "Coming Soon", kicker: "COMING TO THEATERS", eyebrow: "UPCOMING IN KOREA", countLabel: "upcoming movies", fallbackOverview: "Get ready for a highly anticipated upcoming release." },
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

function t(key, replacements = {}) {
  const template = UI_TRANSLATIONS[currentLanguage][key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

function categoryText(categoryKey, field) {
  return CATEGORIES[categoryKey].translations[currentLanguage][field];
}

function updateLanguageUI() {
  elements.languageButtons.forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const contentLanguage = currentLanguage === "ko-KR" ? "ko" : "en";
  document.documentElement.lang = contentLanguage;
  document.querySelector("#meta-description").content = t("metaDescription");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  elements.categoryButtons.forEach((button) => {
    const categoryKey = button.dataset.category;
    button.querySelector("[data-category-kicker]").textContent = categoryText(categoryKey, "cardKicker");
    button.querySelector("[data-category-label]").textContent = categoryText(categoryKey, "navLabel");
    button.querySelector("[data-category-description]").textContent = categoryText(categoryKey, "cardDescription");
  });

  [elements.grid, elements.heroTitle, elements.heroOverview, elements.dialogTitle, elements.dialogOverview]
    .forEach((element) => { element.lang = contentLanguage; });

  const categoryKey = categoryFromHash();
  if (categoryKey && !elements.movieApp.hidden) {
    updateCategoryUI(categoryKey);
  } else {
    document.title = t("lobbyDocumentTitle");
  }
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
  image.alt = t("posterAlt", { title: movie.title });
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
  posterButton.setAttribute("aria-label", t("detailsAriaLabel", { title: movie.title }));
  posterButton.addEventListener("click", () => openMovieDialog(movie));

  const rank = document.createElement("span");
  rank.className = "card-rank";
  rank.textContent = String(index + 1).padStart(2, "0");

  const hover = document.createElement("span");
  hover.className = "card-hover";
  const hoverLabel = document.createElement("span");
  hoverLabel.textContent = t("cardDetails");
  const hoverIcon = document.createElement("span");
  hoverIcon.className = "card-hover-icon";
  hoverIcon.setAttribute("aria-hidden", "true");
  hoverIcon.textContent = "▶";
  hover.append(hoverLabel, hoverIcon);

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
  releaseLabel.textContent = t("release");

  const date = document.createElement("time");
  date.dateTime = movie.release_date || "";
  date.textContent = formatReleaseDate(movie.release_date);

  release.append(releaseLabel, date);

  const badges = document.createElement("span");
  badges.className = "movie-badges";

  const adult = document.createElement("span");
  adult.className = `movie-adult ${movie.adult ? "is-adult" : "is-non-adult"}`;
  adult.textContent = movie.adult ? t("adultFlagged") : t("notFlagged");
  adult.title = movie.adult ? t("adultYesTitle") : t("adultNoTitle");
  adult.setAttribute(
    "aria-label",
    movie.adult ? t("adultYesAriaLabel") : t("adultNoAriaLabel"),
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
  elements.resultCount.textContent = query
    ? t("searchResults", { query, count: movieList.length })
    : t("categoryCount", {
      category: categoryText(currentCategory, "countLabel"),
      count: movieList.length,
    });
}

function updateHero(movie) {
  featuredMovie = movie;
  elements.heroTitle.textContent = movie.title;
  elements.heroOverview.textContent =
    movie.overview || categoryText(currentCategory, "fallbackOverview");
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
  elements.dialogLabel.textContent = categoryText(currentCategory, "eyebrow");
  elements.dialogTitle.textContent = movie.title;
  const missingRating = t("noRating");
  elements.dialogRating.textContent = `★ ${movie.vote_average ? movie.vote_average.toFixed(1) : missingRating}`;
  elements.dialogDate.textContent = formatReleaseDate(movie.release_date);
  elements.dialogAdult.textContent = movie.adult ? t("adultFlagged") : t("notFlagged");
  elements.dialogAdult.title = movie.adult ? t("adultYesTitle") : t("adultNoTitle");
  elements.dialogAdult.classList.toggle("is-adult", movie.adult);
  elements.dialogOverview.textContent = movie.overview || t("noOverview");
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
  elements.heroEyebrow.textContent = categoryText(categoryKey, "eyebrow");
  elements.sectionTitle.textContent = categoryText(categoryKey, "sectionTitle");
  elements.sectionKicker.textContent = categoryText(categoryKey, "kicker");
  elements.headerCategory.textContent = categoryText(categoryKey, "navLabel");
  document.title = `${categoryText(categoryKey, "navLabel")} — NOW/SCREEN`;
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
  elements.skipLink.textContent = t("skipLobby");
  document.body.classList.add("is-lobby");
  document.title = t("lobbyDocumentTitle");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showMovieView(categoryKey) {
  elements.lobby.hidden = true;
  elements.movieApp.hidden = false;
  elements.footer.hidden = false;
  elements.headerCategory.hidden = false;
  elements.lobbyReturn.hidden = false;
  elements.skipLink.href = "#movie-grid";
  elements.skipLink.textContent = t("skipMovies");
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
  elements.heroTitle.textContent = categoryText(currentCategory, "sectionTitle");
  elements.heroOverview.textContent = t("loadingCategory", {
    category: categoryText(currentCategory, "countLabel"),
  });
  elements.heroBackdrop.classList.remove("is-loaded");
  elements.heroBackdrop.style.backgroundImage = "none";
  elements.grid.hidden = false;
  elements.emptyState.hidden = true;
  elements.errorState.hidden = true;
  elements.grid.setAttribute("aria-busy", "true");
  elements.resultCount.textContent = t("loadingMovies");
  elements.refreshButton.disabled = true;
  showSkeletons();

  const url = new URL(MOVIES_API_URL, window.location.origin);
  url.searchParams.set("category", category.endpoint);
  url.searchParams.set("language", currentLanguage);

  try {
    const response = await fetch(url, { signal: request.signal });
    if (!response.ok) {
      throw new Error(t("requestError", { status: response.status }));
    }

    const data = await response.json();
    movies = Array.isArray(data.results) ? data.results : [];

    if (!movies.length) {
      throw new Error(t("noMovies", {
        category: categoryText(currentCategory, "countLabel"),
      }));
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
    elements.resultCount.textContent = t("loadFailed");
    elements.errorMessage.textContent = error.message || t("defaultError");
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
  const query = event.target.value.trim().toLocaleLowerCase(currentLanguage);
  const filteredMovies = query
    ? movies.filter((movie) => movie.title.toLocaleLowerCase(currentLanguage).includes(query))
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
