### Step-by-Step Guide: Build the Accidents Around Schools Page (React + Vite + TS + Tailwind)

This guide walks you through creating a brand-new project that faithfully reproduces the existing “accidents_around_schools” report page logic and UI, using React 18, Vite, TypeScript, Tailwind CSS, and Highcharts. The page is RTL, Hebrew-only, responsive, and deploys to Netlify.

### Prerequisites

- Node.js 18+ and npm 9+
- A GitHub repository (you will create it; steps include linking it)

### 1) Create the Vite + React + TypeScript project

DONE

### 2) Link to your remote repository

DONE

### 3) Install runtime and dev dependencies

```bash
# runtime
npm i axios lodash highcharts highcharts-react-official react-autosuggest autosuggest-highlight

# dev tooling
npm i -D tailwindcss postcss autoprefixer \
  eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-react eslint-plugin-react-hooks eslint-config-prettier prettier

# init tailwind
npx tailwindcss init -p
```

### 4) Configure Tailwind

Create or replace `tailwind.config.ts` with:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        anywayYellow: '#ffd82b',
        anywayOrange: '#ff9f1c',
        anywayRed: '#d81c32',
      },
      fontFamily: {
        sans: ['"Alef"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  height: 100%;
}
```

### 5) ESLint and Prettier

Add `.eslintrc.cjs`:

```js
// .eslintrc.cjs
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  env: { browser: true, es2022: true },
  rules: { 'react/react-in-jsx-scope': 'off' },
}
```

Add `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 6) Vite config

Ensure `vite.config.ts` contains:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 7) HTML entry: RTL and font

Replace `index.html` with RTL and the Alef font:

```html
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>תאונות סביב בתי ספר</title>
    <meta name="description" content="דו״ח תאונות סביב מוסדות חינוך" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="font-sans bg-neutral-50 text-neutral-900">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 8) Package scripts

Add or update scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx --max-warnings=0",
    "format": "prettier --write ."
  }
}
```

### 9) Add TypeScript types

Create `src/types.ts`:

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

### 10) Root and app entries

Create `src/main.tsx`:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Create `src/App.tsx`:

```tsx
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Report } from './components/Report'
import type { School } from './types'

export const App: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    axios
      .get<School[]>('https://www.anyway.co.il/api/schools-names')
      .then((res) => setSchools(res.data))
  }, [])

  const selectedSchool = useMemo(
    () => schools.find((s) => s.school_id === selectedId) || null,
    [schools, selectedId]
  )

  return (
    <main className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 sm:p-6">
        <Report
          schools={schools}
          selectedId={selectedId}
          setSelectedId={(id) => setSelectedId(id)}
          selectedSchool={selectedSchool}
        />
      </div>
    </main>
  )
}
```

### 11) Components

Create `src/components/SchoolSelect.tsx`:

```tsx
import React, { useMemo, useState } from 'react'
import Autosuggest, {
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  SuggestionsClearRequestedParams,
} from 'react-autosuggest'
import _ from 'lodash'
import deburr from 'lodash/deburr'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import type { School } from '../types'

type Suggestion = { label: string; id: number }

type Props = {
  schools: School[]
  onSelectId: (id: number) => void
}

export const SchoolSelect: React.FC<Props> = ({ schools, onSelectId }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [value, setValue] = useState('')

  const data: Suggestion[] = useMemo(() => {
    return schools.map((school) => {
      let yishuv = school.yishuv_name ?? ''
      if (yishuv.startsWith('"')) yishuv = yishuv.substring(1)
      if (yishuv.endsWith('"')) yishuv = yishuv.substring(0, yishuv.length - 1)
      return {
        label: yishuv.length ? `${school.school_name} (${yishuv})` : school.school_name,
        id: school.school_id,
      }
    })
  }, [schools])

  function validSuggestion(s: Suggestion, inputVal: string) {
    const label = s.label
    if (label.includes(inputVal)) return true
    const parts = inputVal.split(' ').filter(Boolean)
    const matches = _(parts)
      .map((p) => label.includes(p))
      .filter(Boolean)
      .size()
    return parts.length === matches
  }

  function getSuggestions(input: string) {
    const inputValue = deburr(input.trim()).toLowerCase()
    const inputLen = inputValue.length
    let count = 0

    const filtered =
      inputLen === 0
        ? []
        : _(data)
            .filter((s) => {
              const keep = count < 15 && validSuggestion(s, inputValue)
              if (keep) count += 1
              return keep
            })
            .uniqBy('id')
            .value()

    return _.uniqBy(filtered, 'label')
  }

  const onFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value))
  }

  const onClearRequested = (_: SuggestionsClearRequestedParams) => {
    setSuggestions([])
  }

  const onChange = (_: React.FormEvent<any>, { newValue }: ChangeEvent) => {
    setValue(newValue)
  }

  const onSuggestionSelected = (_: any, { suggestion }: { suggestion: Suggestion }) => {
    setValue('')
    onSelectId(suggestion.id)
  }

  const renderInputComponent = (inputProps: any) => {
    const { ref, ...other } = inputProps
    return (
      <input
        {...other}
        ref={ref}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="חפש על פי שם ישוב או שם מוסד חינוך"
        dir="rtl"
      />
    )
  }

  const renderSuggestion = (s: Suggestion, { query, isHighlighted }: any) => {
    const matches = match(s.label, query)
    const parts = parse(s.label, matches)
    return (
      <div className={`px-3 py-2 ${isHighlighted ? 'bg-neutral-100' : ''}`}>
        {parts.map((part, idx) => (
          <span key={idx} className={part.highlight ? 'font-semibold' : ''}>
            {part.text}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onFetchRequested}
        onSuggestionsClearRequested={onClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(s) => s.label}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInputComponent}
        inputProps={{ value, onChange }}
        theme={{
          container: 'relative',
          suggestionsContainerOpen:
            'absolute z-10 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-md',
          suggestionsList: 'list-none m-0 p-0',
          suggestion: 'block',
        }}
        renderSuggestionsContainer={(options) => (
          <div {...options.containerProps}>{options.children}</div>
        )}
      />
    </div>
  )
}
```

Create `src/components/Graph.tsx`:

```tsx
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import type { Options } from 'highcharts'

type Props = { options: Options }

export const Graph: React.FC<Props> = ({ options }) => {
  return (
    <div className="my-2">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
```

Create `src/components/Stats.tsx`:

```tsx
import React, { useMemo } from 'react'
import _ from 'lodash'
import type { Options } from 'highcharts'
import { Graph } from './Graph'
import type { InjuredYearRecord, MonthlyRecord, SexRecord } from '../types'

const years = ['2020', '2021', '2022', '2023', '2024', '2025'] as const
const HEBREW_MONTHS = [
  'ינואר',
  'פברואר',
  'מרס',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
]

function getFromStatsByYear(stats: InjuredYearRecord[], year: number, severity: string) {
  const yearRecord =
    _.find(stats, { accident_year: year }) ?? _.find(stats, { accident_year: String(year) })
  if (_.isUndefined(yearRecord)) return 0
  return parseInt((yearRecord as any)[severity] ?? 0)
}

function severityStatsByYear(
  stats: InjuredYearRecord[],
  severity: string,
  name: string,
  color: string
) {
  return {
    name,
    color,
    data: [
      getFromStatsByYear(stats, 2020, severity),
      getFromStatsByYear(stats, 2021, severity),
      getFromStatsByYear(stats, 2022, severity),
      getFromStatsByYear(stats, 2023, severity),
      getFromStatsByYear(stats, 2024, severity),
      getFromStatsByYear(stats, 2025, severity),
    ],
    key: `${name}-${severity}`,
  }
}

function lineOptions(stats: InjuredYearRecord[] | null): Options {
  const series = stats
    ? [
        severityStatsByYear(stats, 'light_injured_count', 'פצועים קל', '#ffd82b'),
        severityStatsByYear(stats, 'severly_injured_count', 'פצועים קשה', '#ff9f1c'),
        severityStatsByYear(stats, 'killed_count', 'הרוגים', '#d81c32'),
      ]
    : []
  return {
    chart: { height: 250, type: 'line' },
    credits: { enabled: false },
    title: { text: '' },
    tooltip: { enabled: false },
    series,
    xAxis: { categories: years as unknown as string[] },
    yAxis: {
      title: { text: '' },
      max: Math.max(_(series).map('data').flattenDeep().max() as number, 10),
    },
    plotOptions: {
      series: { enableMouseTracking: false, states: { hover: { enabled: false } } },
    },
  }
}

function columnOptions(stats: MonthlyRecord[] | null): Options {
  const series = [
    {
      name: 'נפגעים',
      data: _.reduce(
        HEBREW_MONTHS,
        (res: number[], month) => {
          const current = _.find(stats, { accident_month_hebrew: month }) || { count_1: 0 }
          res.push((current as any).count_1)
          return res
        },
        []
      ),
      color: '#d81c32',
    },
  ]
  return {
    chart: { height: 250, type: 'column' },
    credits: { enabled: false },
    title: { text: '' },
    tooltip: { enabled: false },
    series,
    xAxis: { categories: HEBREW_MONTHS },
    yAxis: {
      title: { text: '' },
      max: Math.max(_(series).map('data').flattenDeep().max() as number, 10),
    },
    plotOptions: {
      series: { enableMouseTracking: false, states: { hover: { enabled: false } } },
    },
  }
}

function pieOptions(stats: SexRecord[] | null): Options {
  const total = _.sumBy(stats, 'count_1') || 0
  const series = [
    {
      colorByPoint: true,
      type: 'pie',
      data: _.map(stats, (s) => ({
        name: (s as any).sex_hebrew,
        y: total ? Math.trunc(((s as any).count_1 / total) * 10000) / 100 : 0,
      })),
      dataLabels: {
        connectorWidth: 0,
        connectorPadding: -10,
        formatter: function () {
          // @ts-ignore Highcharts format context
          return `${this.point.y}%`
        },
        distance: 15,
        style: { fontSize: '12px', fontWeight: 'normal' },
      },
    } as any,
  ]
  return {
    chart: { height: 250, type: 'pie' },
    credits: { enabled: false },
    title: { text: '' },
    tooltip: { enabled: false },
    series,
    plotOptions: {
      series: { enableMouseTracking: false, states: { hover: { enabled: false } } },
      pie: { borderWidth: 0, borderColor: null as any, showInLegend: true },
    },
  }
}

type Props = {
  title: string
  injuredStats: InjuredYearRecord[] | null
  monthStats: MonthlyRecord[] | null
  genderStats: SexRecord[] | null
}

export const Stats: React.FC<Props> = ({ title, injuredStats, monthStats, genderStats }) => {
  const line = useMemo(() => lineOptions(injuredStats), [injuredStats])
  const column = useMemo(() => columnOptions(monthStats), [monthStats])
  const pie = useMemo(() => pieOptions(genderStats), [genderStats])

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold">{title || ''}</div>

      {injuredStats && (
        <div className="text-sm font-semibold">
          <div className="mb-1">ב-5 השנים האחרונות,</div>
          {(() => {
            const series = [
              severityStatsByYear(injuredStats, 'light_injured_count', 'פצועים קל', '#ffd82b'),
              severityStatsByYear(injuredStats, 'severly_injured_count', 'פצועים קשה', '#ff9f1c'),
              severityStatsByYear(injuredStats, 'killed_count', 'הרוגים', '#d81c32'),
            ]
            const summary = series.reduce<Record<string, { sumInjured: number; color: string }>>(
              (acc, s: any) => {
                const sumInjured = _.sum(s.data as number[])
                acc[s.name] = { sumInjured, color: s.color }
                return acc
              },
              {}
            )
            return (
              <div className="space-y-0.5">
                {Object.entries(summary).map(([k, v]) => (
                  <div key={k}>
                    {v.sumInjured} <span style={{ color: v.color }}>{k}</span>
                  </div>
                ))}
                <div>בקרב הולכי רגל, רוכבי אופניים וקורקינט בגיל 5-19</div>
              </div>
            )
          })()}
        </div>
      )}

      {injuredStats && (
        <section>
          <div className="text-base font-semibold mb-1">נפגעים לפי שנה</div>
          <Graph options={line} />
        </section>
      )}

      {monthStats && (
        <section>
          <div className="text-base font-semibold mb-1">נפגעים לפי חודש</div>
          <Graph options={column} />
        </section>
      )}

      {injuredStats && (
        <section>
          <div className="text-base font-semibold mb-1">נפגעים לפי מין</div>
          <Graph options={pie} />
        </section>
      )}
    </div>
  )
}
```

Create `src/components/Map.tsx`:

```tsx
import React, { useMemo } from 'react'
import { School } from '../types'

type Props = {
  school: School
  schoolId: number | null
}

function getLink(school: School, simpleView: boolean) {
  const lat = school.latitude
  const long = school.longitude
  let link = `https://www.anyway.co.il/?zoom=17&lat=${lat}&lon=${long}`
  if (simpleView) {
    link = `${link}&start_date=2020-06-01&end_date=2025-05-31&show_fatal=1&show_severe=1&show_light=1&approx=1&accurate=1&show_markers=1&show_discussions=&show_urban=3&show_intersection=3&show_lane=3&show_day=7&show_holiday=0&show_time=24&start_time=7&end_time=19&weather=0&road=0&separation=0&surface=0&acctype=0&controlmeasure=0&district=0&case_type=0&show_rsa=0&age_groups=234&hide_search=true&map_only=true&hide_search=true`
  }
  return link
}

export const Map: React.FC<Props> = ({ school }) => {
  const simpleView = true
  const url = useMemo(() => getLink(school, simpleView), [school, simpleView])
  const linkText = simpleView
    ? 'לצפיה במפה המלאה עם אפשרויות חיפוש מתקדמות'
    : 'לצפיה במפה פשוטה בלבד'

  return (
    <div className="rounded-lg border border-neutral-200/70 p-4">
      <div className="text-lg font-semibold mb-1">
        תאונות עם נפגעים (הולכי רגל, רוכבי אופניים וקורקינט) בסביבת מוסד הלימודים
      </div>
      <div className="text-sm text-neutral-600 mb-3">
        {linkText}{' '}
        <a
          className="text-blue-700 hover:underline"
          href={getLink(school, false)}
          target="_blank"
          rel="noreferrer"
        >
          לחצו כאן
        </a>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-md ring-1 ring-black/5">
        <iframe title="anyway-map" src={url} className="h-full w-full border-0"></iframe>
      </div>
    </div>
  )
}
```

Create `src/components/Report.tsx`:

```tsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from './Map'
import { Stats } from './Stats'
import { SchoolSelect } from './SchoolSelect'
import type { School, InjuredYearRecord, MonthlyRecord, SexRecord } from '../types'

type Props = {
  schools: School[]
  selectedId: number | null
  setSelectedId: (id: number) => void
  selectedSchool: School | null
}

export const Report: React.FC<Props> = ({ schools, selectedId, setSelectedId, selectedSchool }) => {
  const [injuredStats, setInjuredStats] = useState<InjuredYearRecord[] | null>(null)
  const [monthStats, setMonthStats] = useState<MonthlyRecord[] | null>(null)
  const [genderStats, setGenderStats] = useState<SexRecord[] | null>(null)

  useEffect(() => {
    if (selectedId && selectedId !== 0) {
      axios
        .get<
          InjuredYearRecord[]
        >(`https://www.anyway.co.il/api/injured-around-schools?school_id=${selectedId}`)
        .then((res) => setInjuredStats(res.data))
      axios
        .get<
          MonthlyRecord[]
        >(`https://www.anyway.co.il/api/injured-around-schools-months-graphs-data?school_id=${selectedId}`)
        .then((res) => setMonthStats(res.data))
      axios
        .get<
          SexRecord[]
        >(`https://www.anyway.co.il/api/injured-around-schools-sex-graphs-data?school_id=${selectedId}`)
        .then((res) => setGenderStats(res.data))
    }
  }, [selectedId])

  const title = selectedSchool?.school_name ?? ''

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[42%] w-full space-y-4">
          <div className="rounded-lg border border-neutral-200/70 p-3">
            <SchoolSelect schools={schools} onSelectId={setSelectedId} />
          </div>
          <div className="rounded-lg border border-neutral-200/70 p-3">
            <Stats
              title={title}
              injuredStats={injuredStats}
              monthStats={monthStats}
              genderStats={genderStats}
            />
          </div>
        </div>
        <div className="lg:flex-1 w-full">
          {selectedSchool ? (
            <Map school={selectedSchool} schoolId={selectedId} />
          ) : (
            <div className="text-center text-xl">
              ⇒⇒ יש להזין בשורת החיפוש שם ישוב או שם מוסד חינוך
            </div>
          )}
        </div>
      </div>
      <div className="text-sm leading-6 text-neutral-800 space-y-2">
        <div>
          הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה. בדו״ח נספרו עבור כל מוסד חינוך כל
          הפצועים/הרוגים שנפגעו תוך שימוש בתחבורה רכה (הולכי רגל, רוכבי אופניים ואופניים חשמליים
          ורוכבי קורקינט חשמלי) בגילאים 5-19, בין השעות 7:00 ל-19:00 ובתוך ריבוע שמרכזו מוסד חינוכי
          או מקבץ מוסדות חינוכיים וגודל כל צלע ק"מ אחד, בין התאריכים 1.6.2020-31.5.2025.
        </div>
        <div>
          את הדו"ח הפיקו מתנדבי פרויקט ANYWAY וביניהם: דניאל שלי, מיכל אורן, זיו הרפז, דרור רשף, אגם
          רפאלי-פרהדיאן, דן פולק, אבי קליימן, בניה פרץ, סלומון רדה, אורי הוך, בר קלמי, כרמל פרדיס,
          יובל ברוך, ברוך פיקאר, גל רייך ועתליה אלון.
        </div>
      </div>
    </div>
  )
}
```

### 12) Netlify config (MVP)

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### 13) Run locally

```bash
npm run dev
```

Open `http://localhost:5173`.

### 14) Commit and push

```bash
git add -A
git commit -m "feat: accidents around schools page"
git push
```

### 15) Deploy to Netlify

- Create a new site on Netlify
- Connect to your GitHub repo (`accidents-around-schools`)
- Build command: `npm run build`
- Publish directory: `dist`
- Deploy

### 16) QA checklist

- Autosuggest returns up to 15 items; multi-term contains logic works; highlighting visible.
- Selecting a school triggers 3 requests and renders:
  - Summary (5 years) with correct sums and colors.
  - Line chart (by year), Column chart (by month), Pie chart (by sex) with exact options.
- Map iframe loads with correct coordinates and query string; link opens full map.
- No URL change when selecting a school.
- RTL layout; Hebrew labels match exactly.
- Responsive: mobile stacks vertically; desktop shows split layout.

You now have a complete, parity-accurate implementation ready for Netlify.
