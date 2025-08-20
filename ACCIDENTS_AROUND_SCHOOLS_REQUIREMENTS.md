### Accidents Around Schools — Complete Requirements (React + Vite + TypeScript + Tailwind)

This document defines everything required to rebuild the “accidents_around_schools” report page from scratch with a modern, responsive UI while keeping logic and behavior identical to the current implementation.

### Scope

- **In scope**: Only the report area: search/select school, stats (summary + 3 charts), embedded map, and the original footer text present on the report.
- **Out of scope**: Global site header, reports selector, Vision Zero section, site footer, and email subscription/sign-up.

### Technology

- **Framework**: React 18
- **Tooling**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (no Material-UI)
- **Charts**: Highcharts + `highcharts-react-official`
- **Autocomplete**: `react-autosuggest` + `autosuggest-highlight`
- **HTTP**: Axios
- **Lint/Format**: ESLint + Prettier
- **Deployment**: Netlify (MVP)

### Behavioral Parity (must be identical)

- Autosuggest search by school or locality (Hebrew). Matching rules:
  - Text contains match; when multiple terms are typed, every term must appear (multi-term AND) in any order.
  - Limit results to the first 15 matching items.
  - De-duplicate first by `id`, then by `label` (consistent with the original behavior).
  - Placeholder text: "חפש על פי שם ישוב או שם מוסד חינוך".
- Selecting a school triggers three network requests and updates stats and charts.
- Selected school is NOT reflected in the URL (no routing/state in address bar).
- If no school is selected, show the instruction text: "⇒⇒ יש להזין בשורת החיפוש שם ישוב או שם מוסד חינוך" centered.
- Charts styling and data mapping are preserved (see Charts section).
- Embedded map is shown with the same base URL and exact filters/parameters.
- RTL layout and Hebrew labels identical to current copy.

### API Endpoints (Production)

All requests are made to `https://www.anyway.co.il`. CORS properties are assumed unchanged.

- **Schools (for search)**
  - GET `https://www.anyway.co.il/api/schools-names`
  - Response item shape:
    - `school_id: number`
    - `school_name: string`
    - `yishuv_name: string`
    - `latitude: number`
    - `longitude: number`

- **Injured by year (severity split)**
  - GET `https://www.anyway.co.il/api/injured-around-schools?school_id={ID}`
  - Response item shape:
    - `accident_year: number | string`
    - `light_injured_count?: number | string`
    - `severly_injured_count?: number | string`
    - `killed_count?: number | string`

- **Injured by month**
  - GET `https://www.anyway.co.il/api/injured-around-schools-months-graphs-data?school_id={ID}`
  - Response item shape:
    - `accident_month_hebrew: string`
    - `count_1: number`

- **Injured by sex**
  - GET `https://www.anyway.co.il/api/injured-around-schools-sex-graphs-data?school_id={ID}`
  - Response item shape:
    - `sex_hebrew: string`
    - `count_1: number`

Note: Some numeric fields may come as strings. Convert to numbers where needed (e.g., `parseInt`).

### Map Embed and Filters (must be exact)

- Base URL: `https://www.anyway.co.il/?zoom=17&lat={lat}&lon={lon}`
- Append the following when in simple view (always true for this page):
  `&start_date=2020-06-01&end_date=2025-05-31&show_fatal=1&show_severe=1&show_light=1&approx=1&accurate=1&show_markers=1&show_discussions=&show_urban=3&show_intersection=3&show_lane=3&show_day=7&show_holiday=0&show_time=24&start_time=7&end_time=19&weather=0&road=0&separation=0&surface=0&acctype=0&controlmeasure=0&district=0&case_type=0&show_rsa=0&age_groups=234&hide_search=true&map_only=true&hide_search=true`
- Link text above the map: "לצפיה במפה המלאה עם אפשרויות חיפוש מתקדמות" which opens `simpleView=false` link in a new tab.
- Map title: "תאונות עם נפגעים (הולכי רגל, רוכבי אופניים וקורקינט) בסביבת מוסד הלימודים".

### UI Composition

- `SchoolSelect`: Autosuggest input with behavior above.
- `Stats`: Displays school name title, a summary blurb for last 5 years, and 3 charts.
- `Map`: Iframe with the map and a link to the full map view.
- Report footer (text-only, static):
  - Paragraph 1: "הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה. בדו״ח נספרו עבור כל מוסד חינוך כל הפצועים/הרוגים שנפגעו תוך שימוש בתחבורה רכה (הולכי רגל, רוכבי אופניים ואופניים חשמליים ורוכבי קורקינט חשמלי) בגילאים 5-19, בין השעות 7:00 ל-19:00 ובתוך ריבוע שמרכזו מוסד חינוכי או מקבץ מוסדות חינוכיים וגודל כל צלע ק"מ אחד, בין התאריכים 1.6.2020-31.5.2025."
  - Paragraph 2: "את הדו"ח הפיקו מתנדבי פרויקט ANYWAY וביניהם: דניאל שלי, מיכל אורן, זיו הרפז, דרור רשף, אגם רפאלי-פרהדיאן, דן פולק, אבי קליימן, בניה פרץ, סלומון רדה, אורי הוך, בר קלמי, כרמל פרדיס, יובל ברוך, ברוך פיקאר, גל רייך ועתליה אלון."

### Charts (Highcharts) — Exact Options

- Common:
  - `chart.height = 250`
  - `credits.enabled = false`
  - `title.text = ''`
  - `tooltip.enabled = false`
  - `plotOptions.series.enableMouseTracking = false`
  - `plotOptions.series.states.hover.enabled = false`

- Line chart (injured by year):
  - X-axis categories: `['2020','2021','2022','2023','2024','2025']`
  - Series:
    - name: "פצועים קל", color: `#ffd82b`, data from `light_injured_count`
    - name: "פצועים קשה", color: `#ff9f1c`, data from `severly_injured_count`
    - name: "הרוגים", color: `#d81c32`, data from `killed_count`
  - `yAxis.max = max(max(series.data), 10)`

- Column chart (injured by month):
  - X-axis categories: `['ינואר','פברואר','מרס','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']`
  - Single series name: "נפגעים", color: `#d81c32`, data from `count_1` per month name.
  - `yAxis.max = max(max(series.data), 10)`

- Pie chart (injured by sex):
  - `chart.type = 'pie'`
  - `series[0].colorByPoint = true`
  - Data points: `{ name: sex_hebrew, y: percentageTruncatedToTwoDecimals }` where `percentage = count_1 / total * 100` and the value is truncated to two decimals (not rounded), i.e. `Math.trunc(percentage * 100) / 100`.
  - `dataLabels`: `connectorWidth: 0`, `connectorPadding: -10`, `distance: 15`, `style: { fontSize: '12px', fontWeight: 'normal' }`, `formatter` returns `"{y}%"`.
  - `plotOptions.pie.borderWidth = 0`, `borderColor = null`, `showInLegend = true`.

### Data Handling Rules

- When `selectedId` changes and is truthy (not 0), trigger 3 GET requests in parallel:
  1. injured by year
  2. injured by month
  3. injured by sex
- Derive the report title from the selected school's `school_name`.
- Summary text: compute total sums across 2020–2025 per severity series and display colored labels inline (colors above).

### RTL and Localization

- Entire page must be RTL (`dir="rtl"` at document level). Input should explicitly set `dir="rtl"`.
- All Hebrew strings must be preserved exactly as specified in this document.

### Responsiveness

- Mobile-first layout that stacks vertically: Search + Stats on top, Map below.
- On large screens, split into two columns: left column ~42% (Search + Stats), right column fills remaining width (Map).
- Use Tailwind utility classes to implement spacing, borders, and responsive breakpoints.

### Error/Loading States

- Autosuggest input is available as soon as the schools list loads.
- If no school is selected, show the instruction message.
- Do not change the URL during interaction.
- Optional: Console-warn on network errors; UI can remain empty for failed datasets (match current behavior where charts render only when data exists).

### Project Structure (recommended)

- `src/main.tsx` – React root
- `src/App.tsx` – page shell
- `src/types.ts` – shared TypeScript types
- `src/components/SchoolSelect.tsx` – autosuggest input
- `src/components/Stats.tsx` – chart options + stats layout
- `src/components/Graph.tsx` – Highcharts wrapper
- `src/components/Map.tsx` – embedded map
- `src/components/Report.tsx` – page composition and data fetching
- `src/index.css` – Tailwind base
- `netlify.toml` – deployment config

### Dependencies

- `react`, `react-dom`
- `axios`, `lodash`
- `highcharts`, `highcharts-react-official`
- `react-autosuggest`, `autosuggest-highlight`
- Dev: `tailwindcss`, `postcss`, `autoprefixer`, `eslint`, `@typescript-eslint/*`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-prettier`, `prettier`, `typescript`, `vite`, `@vitejs/plugin-react`

### TypeScript Types (authoritative reference)

```ts
export type School = {
  school_id: number
  school_name: string
  yishuv_name: string
  latitude: number
  longitude: number
}

export type InjuredYearRecord = {
  accident_year: number | string
  light_injured_count?: number | string
  severly_injured_count?: number | string
  killed_count?: number | string
}

export type MonthlyRecord = {
  accident_month_hebrew: string
  count_1: number
}

export type SexRecord = {
  sex_hebrew: string
  count_1: number
}
```

### Component Contracts (props)

- `SchoolSelect`
  - Props: `{ schools: School[]; onSelectId: (id: number) => void }`
  - Behavior: updates suggestions on type; calls `onSelectId` with selected `school_id` and clears input.

- `Stats`
  - Props: `{ title: string; injuredStats: InjuredYearRecord[] | null; monthStats: MonthlyRecord[] | null; genderStats: SexRecord[] | null }`
  - Behavior: renders title; when stats exist renders summary and the 3 charts with options above.

- `Map`
  - Props: `{ school: School; schoolId: number | null }`
  - Behavior: embeds iframe with `simpleView=true` URL; renders link to full map (`simpleView=false`).

- `Report`
  - Props: `{ schools: School[]; selectedId: number | null; setSelectedId: (id: number) => void; selectedSchool: School | null }`
  - Behavior: on `selectedId`, fetch 3 datasets; passes to children; shows instruction message when no school selected; shows footer text.

### Text Content (must match exactly)

- Placeholder: "חפש על פי שם ישוב או שם מוסד חינוך"
- Instruction: "⇒⇒ יש להזין בשורת החיפוש שם ישוב או שם מוסד חינוך"
- Map title: "תאונות עם נפגעים (הולכי רגל, רוכבי אופניים וקורקינט) בסביבת מוסד הלימודים"
- Map link text: "לצפיה במפה המלאה עם אפשרויות חיפוש מתקדמות"
- Chart section titles: "נפגעים לפי שנה", "נפגעים לפי חודש", "נפגעים לפי מין"
- Series names: "פצועים קל", "פצועים קשה", "הרוגים", "נפגעים"
- Summary preface: "ב-5 השנים האחרונות,"
- Summary suffix line: "בקרב הולכי רגל, רוכבי אופניים וקורקינט בגיל 5-19"
- Footer: see UI Composition (two paragraphs) — copy exactly.

### Deployment

- Build: `npm run build` outputs production assets to `dist`.
- Netlify: publish `dist`, build command `npm run build`. No special redirects needed.

---

This requirements document is the single source of truth for parity. Any deviations (labels, colors, filters, behavior) must be considered bugs.
