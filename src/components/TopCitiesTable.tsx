import { type CityRanking } from '../types'
import { Typography } from './Typography'

// Data from Figma design - 20 cities with highest composite scores
const topCitiesData: CityRanking[] = [
  {
    rank: 1,
    cityName: 'ירושלים',
    compositeScore: 20676,
    totalAccidents: 793,
    totalInjured: 824,
    lightInjuries: 727,
    severeInjuries: 90,
    deaths: 7,
  },
  {
    rank: 2,
    cityName: 'תל אביב יפו',
    compositeScore: 3485,
    totalAccidents: 406,
    totalInjured: 424,
    lightInjuries: 390,
    severeInjuries: 33,
    deaths: 1,
  },
  {
    rank: 3,
    cityName: 'בני ברק',
    compositeScore: 20676,
    totalAccidents: 305,
    totalInjured: 316,
    lightInjuries: 288,
    severeInjuries: 27,
    deaths: 1,
  },
  {
    rank: 4,
    cityName: 'אשדוד',
    compositeScore: 20676,
    totalAccidents: 322,
    totalInjured: 342,
    lightInjuries: 324,
    severeInjuries: 17,
    deaths: 1,
  },
  {
    rank: 5,
    cityName: 'פתח תקווה',
    compositeScore: 20676,
    totalAccidents: 249,
    totalInjured: 269,
    lightInjuries: 251,
    severeInjuries: 18,
    deaths: 0,
  },
  {
    rank: 6,
    cityName: 'חיפה',
    compositeScore: 20676,
    totalAccidents: 207,
    totalInjured: 215,
    lightInjuries: 201,
    severeInjuries: 13,
    deaths: 1,
  },
  {
    rank: 7,
    cityName: 'נתניה',
    compositeScore: 20676,
    totalAccidents: 222,
    totalInjured: 229,
    lightInjuries: 220,
    severeInjuries: 8,
    deaths: 1,
  },
  {
    rank: 8,
    cityName: 'אשקלון',
    compositeScore: 20676,
    totalAccidents: 198,
    totalInjured: 207,
    lightInjuries: 197,
    severeInjuries: 9,
    deaths: 1,
  },
  {
    rank: 9,
    cityName: 'חולון',
    compositeScore: 20676,
    totalAccidents: 169,
    totalInjured: 178,
    lightInjuries: 164,
    severeInjuries: 14,
    deaths: 0,
  },
  {
    rank: 10,
    cityName: 'ראשון לציון',
    compositeScore: 20676,
    totalAccidents: 158,
    totalInjured: 164,
    lightInjuries: 149,
    severeInjuries: 15,
    deaths: 0,
  },
  {
    rank: 11,
    cityName: 'בית שמש',
    compositeScore: 20676,
    totalAccidents: 87,
    totalInjured: 91,
    lightInjuries: 69,
    severeInjuries: 21,
    deaths: 1,
  },
  {
    rank: 12,
    cityName: 'רחובות',
    compositeScore: 20676,
    totalAccidents: 158,
    totalInjured: 166,
    lightInjuries: 155,
    severeInjuries: 11,
    deaths: 0,
  },
  {
    rank: 13,
    cityName: 'רמלה',
    compositeScore: 20676,
    totalAccidents: 106,
    totalInjured: 114,
    lightInjuries: 101,
    severeInjuries: 12,
    deaths: 1,
  },
  {
    rank: 14,
    cityName: 'רמת גן',
    compositeScore: 20676,
    totalAccidents: 107,
    totalInjured: 115,
    lightInjuries: 103,
    severeInjuries: 11,
    deaths: 1,
  },
  {
    rank: 15,
    cityName: 'ביתר עילית',
    compositeScore: 20676,
    totalAccidents: 63,
    totalInjured: 67,
    lightInjuries: 48,
    severeInjuries: 18,
    deaths: 1,
  },
  {
    rank: 16,
    cityName: 'לוד',
    compositeScore: 20676,
    totalAccidents: 109,
    totalInjured: 114,
    lightInjuries: 105,
    severeInjuries: 8,
    deaths: 1,
  },
  {
    rank: 17,
    cityName: 'חדרה',
    compositeScore: 20676,
    totalAccidents: 117,
    totalInjured: 124,
    lightInjuries: 116,
    severeInjuries: 8,
    deaths: 0,
  },
  {
    rank: 18,
    cityName: 'בת ים',
    compositeScore: 20676,
    totalAccidents: 145,
    totalInjured: 153,
    lightInjuries: 148,
    severeInjuries: 5,
    deaths: 0,
  },
  {
    rank: 19,
    cityName: 'באר שבע',
    compositeScore: 20676,
    totalAccidents: 123,
    totalInjured: 126,
    lightInjuries: 120,
    severeInjuries: 6,
    deaths: 0,
  },
  {
    rank: 20,
    cityName: 'עכו',
    compositeScore: 20676,
    totalAccidents: 80,
    totalInjured: 84,
    lightInjuries: 81,
    severeInjuries: 3,
    deaths: 0,
  },
]

export default function TopCitiesTable() {
  return (
    <div className="w-full mb-16">
      {/* Title */}
      <div className="rounded-t-lg p-4" style={{backgroundColor: '#E8F7FC'}}>
        <Typography variant="table-caption" as="h3" className="text-center text-gray-800">
          20 היישובים בעלי הדירוג המשוקלל הגבוה ביותר בין 2025-2020:
        </Typography>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-300" style={{backgroundColor: '#E8F7FC'}}>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap"></th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  ישוב
                </Typography>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  הרוגים
                </Typography>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  פצועים קשה
                </Typography>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  פצועים קל
                </Typography>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  סה״כ נפגעים
                </Typography>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  סה״כ תאונות
                </Typography>
              </th>
              <th className="p-3 text-right whitespace-nowrap">
                <Typography variant="table-header" className="text-gray-700">
                  ציון משוקלל
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {topCitiesData.map((city) => (
              <tr key={city.rank} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800 font-semibold">
                    {city.rank}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.cityName}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.deaths}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.severeInjuries}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.lightInjuries}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.totalInjured}
                  </Typography>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.totalAccidents}
                  </Typography>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <Typography variant="table-body" className="text-gray-800">
                    {city.compositeScore.toLocaleString()}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
