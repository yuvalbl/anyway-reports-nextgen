import { type CityRanking } from '../types'
import { TableCaption, TableHeader, TableBody } from './Typography'
import HorizontalScrollIndicator from './HorizontalScrollIndicator'

// Data from PDF report - 20 cities with highest composite scores
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
    compositeScore: 2149,
    totalAccidents: 305,
    totalInjured: 316,
    lightInjuries: 288,
    severeInjuries: 27,
    deaths: 1,
  },
  {
    rank: 4,
    cityName: 'אשדוד',
    compositeScore: 1672,
    totalAccidents: 322,
    totalInjured: 342,
    lightInjuries: 324,
    severeInjuries: 17,
    deaths: 1,
  },
  {
    rank: 5,
    cityName: 'פתח תקווה',
    compositeScore: 1111,
    totalAccidents: 249,
    totalInjured: 269,
    lightInjuries: 251,
    severeInjuries: 18,
    deaths: 0,
  },
  {
    rank: 6,
    cityName: 'חיפה',
    compositeScore: 822,
    totalAccidents: 207,
    totalInjured: 215,
    lightInjuries: 201,
    severeInjuries: 13,
    deaths: 1,
  },
  {
    rank: 7,
    cityName: 'נתניה',
    compositeScore: 658,
    totalAccidents: 222,
    totalInjured: 229,
    lightInjuries: 220,
    severeInjuries: 8,
    deaths: 1,
  },
  {
    rank: 8,
    cityName: 'אשקלון',
    compositeScore: 625,
    totalAccidents: 198,
    totalInjured: 207,
    lightInjuries: 197,
    severeInjuries: 9,
    deaths: 1,
  },
  {
    rank: 9,
    cityName: 'חולון',
    compositeScore: 560,
    totalAccidents: 169,
    totalInjured: 178,
    lightInjuries: 164,
    severeInjuries: 14,
    deaths: 0,
  },
  {
    rank: 10,
    cityName: 'ראשון לציון',
    compositeScore: 543,
    totalAccidents: 158,
    totalInjured: 164,
    lightInjuries: 149,
    severeInjuries: 15,
    deaths: 0,
  },
  {
    rank: 11,
    cityName: 'בית שמש',
    compositeScore: 467,
    totalAccidents: 87,
    totalInjured: 91,
    lightInjuries: 69,
    severeInjuries: 21,
    deaths: 1,
  },
  {
    rank: 12,
    cityName: 'רחובות',
    compositeScore: 420,
    totalAccidents: 158,
    totalInjured: 166,
    lightInjuries: 155,
    severeInjuries: 11,
    deaths: 0,
  },
  {
    rank: 13,
    cityName: 'רמלה',
    compositeScore: 388,
    totalAccidents: 106,
    totalInjured: 114,
    lightInjuries: 101,
    severeInjuries: 12,
    deaths: 1,
  },
  {
    rank: 14,
    cityName: 'רמת גן',
    compositeScore: 369,
    totalAccidents: 107,
    totalInjured: 115,
    lightInjuries: 103,
    severeInjuries: 11,
    deaths: 1,
  },
  {
    rank: 15,
    cityName: 'ביתר עילית',
    compositeScore: 301,
    totalAccidents: 63,
    totalInjured: 67,
    lightInjuries: 48,
    severeInjuries: 18,
    deaths: 1,
  },
  {
    rank: 16,
    cityName: 'לוד',
    compositeScore: 299,
    totalAccidents: 109,
    totalInjured: 114,
    lightInjuries: 105,
    severeInjuries: 8,
    deaths: 1,
  },
  {
    rank: 17,
    cityName: 'חדרה',
    compositeScore: 229,
    totalAccidents: 117,
    totalInjured: 124,
    lightInjuries: 116,
    severeInjuries: 8,
    deaths: 0,
  },
  {
    rank: 18,
    cityName: 'בת ים',
    compositeScore: 202,
    totalAccidents: 145,
    totalInjured: 153,
    lightInjuries: 148,
    severeInjuries: 5,
    deaths: 0,
  },
  {
    rank: 19,
    cityName: 'באר שבע',
    compositeScore: 183,
    totalAccidents: 123,
    totalInjured: 126,
    lightInjuries: 120,
    severeInjuries: 6,
    deaths: 0,
  },
  {
    rank: 20,
    cityName: 'עכו',
    compositeScore: 65,
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
      <div className="rounded-t-lg border border-gray-200 p-4" style={{backgroundColor: '#E8F7FC'}}>
        <TableCaption as="h3" className="text-center">
          20 היישובים בעלי הדירוג המשוקלל הגבוה ביותר בין 2025-2020:
        </TableCaption>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-300" style={{backgroundColor: '#E8F7FC'}}>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">#</TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                ישוב
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                הרוגים
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                פצועים קשה
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                פצועים קל
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                סה״כ נפגעים
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                סה״כ תאונות
              </TableHeader>
              <TableHeader className="p-3 text-right whitespace-nowrap">
                ציון משוקלל
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {topCitiesData.map((city) => (
              <tr key={city.rank} className="border-b border-gray-200 hover:bg-gray-50">
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap font-semibold">
                  {city.rank}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.cityName}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.deaths}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.severeInjuries}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.lightInjuries}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.totalInjured}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {city.totalAccidents}
                </TableBody>
                <TableBody className="p-3 text-right whitespace-nowrap">
                  {city.compositeScore.toLocaleString()}
                </TableBody>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <HorizontalScrollIndicator />
    </div>
  )
}
