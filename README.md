# NOW/SCREEN

영화관 로비에서 카테고리를 선택하면 TMDB API를 이용해 현재 상영작, 인기 영화, 최고 평점 영화, 개봉 예정 영화의 포스터와 제목을 보여주는 웹사이트입니다. 상단의 한글/English 버튼으로 전체 화면 문구와 영화 제목·줄거리 언어를 함께 전환할 수 있습니다. TMDB API 키는 브라우저에 노출되지 않도록 Vercel Function에서만 사용합니다.

## 로컬 실행

1. `.env.example`을 복사해 `.env.local`을 만들고 TMDB API 키를 입력합니다.

```dotenv
TMDB_API_KEY=새로_발급한_TMDB_API_키
```

2. Vercel 개발 서버를 실행합니다.

```powershell
npx vercel dev
```

터미널에 표시되는 로컬 주소로 접속합니다. 단순 정적 서버는 `/api/movies` 함수를 실행할 수 없으므로 `vercel dev`를 사용해야 합니다.

## Vercel 배포

1. Vercel에서 이 GitHub 저장소를 가져옵니다.
2. 프로젝트의 **Settings → Environment Variables**에 `TMDB_API_KEY`를 Secret으로 등록합니다.
3. Production, Preview, Development 중 필요한 환경을 선택합니다.
4. 배포하거나 환경 변수 등록 후 재배포합니다.

`vercel.json`이 정적 파일 폴더를 `dist`로 지정하며, `/api/movies` 요청은 `api/movies.mjs`가 처리합니다.

## 파일 구성

- `dist/index.html`: 페이지 구조
- `dist/style.css`: 반응형 디자인
- `dist/script.js`: 서버 API 연동, 탭 전환, 검색, 상세 팝업
- `api/movies.mjs`: TMDB API 키를 사용하는 Vercel Function
- `vercel.json`: Vercel 배포 설정
- `.env.example`: 필요한 환경 변수 이름 예시

> 이전에 브라우저 코드에 포함했던 API 키는 더 이상 사용하지 말고 TMDB에서 교체한 뒤 새 키를 Vercel에 등록하세요.
