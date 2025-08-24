import { type TransportationModeStats } from '../types'
import { TableCaption, TableHeader, TableBody } from './Typography'

// Data from PDF report - Transportation mode statistics comparing two periods
const transportationData: TransportationModeStats[] = [
  {
    mode: 'הולכי רגל',
    period2015_2020: { totalInjured: 4596, lightInjuries: 4257, severeInjuries: 323, deaths: 16 },
    period2020_2025: { totalInjured: 4072, lightInjuries: 3721, severeInjuries: 330, deaths: 21 }
  },
  {
    mode: 'אופניים',
    period2015_2020: { totalInjured: 1057, lightInjuries: 993, severeInjuries: 60, deaths: 4 },
    period2020_2025: { totalInjured: 811, lightInjuries: 758, severeInjuries: 50, deaths: 3 }
  },
  {
    mode: 'אופניים חשמליים',
    period2015_2020: { totalInjured: 1058, lightInjuries: 997, severeInjuries: 56, deaths: 5 },
    period2020_2025: { totalInjured: 749, lightInjuries: 688, severeInjuries: 58, deaths: 3 }
  },
  {
    mode: 'קורקינט חשמלי',
    period2015_2020: { totalInjured: 114, lightInjuries: 102, severeInjuries: 10, deaths: 2 },
    period2020_2025: { totalInjured: 628, lightInjuries: 559, severeInjuries: 66, deaths: 3 }
  },
  {
    mode: 'סה״כ',
    period2015_2020: { totalInjured: 6825, lightInjuries: 6349, severeInjuries: 449, deaths: 27 },
    period2020_2025: { totalInjured: 6260, lightInjuries: 5726, severeInjuries: 504, deaths: 30 }
  }
]

export default function TransportationStats() {
  return (
    <div className="w-full mb-16">
      {/* Title */}
      <div className="rounded-t-lg border border-gray-200 p-4" style={{backgroundColor: '#E8F7FC'}}>
        <TableCaption as="h3" className="text-center">
          נפגעים סביב מוסדות הלימוד – השוואה בין תקופות:
        </TableCaption>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            {/* Column Headers */}
            <tr className="border-b border-gray-300" style={{backgroundColor: '#E8F7FC'}}>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                <TableHeader>אמצעי תחבורה</TableHeader>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap" colSpan={2}>
                <TableHeader>הרוגים</TableHeader>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap" colSpan={2}>
                <TableHeader>פצועים קשה</TableHeader>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap" colSpan={2}>
                <TableHeader>פצועים קל</TableHeader>
              </th>
              <th className="p-3 text-right border-r border-gray-300 whitespace-nowrap" colSpan={2}>
                <TableHeader>סה״כ נפגעים</TableHeader>
              </th>
            </tr>
            {/* Period Labels */}
            <tr className="border-b border-gray-300" style={{backgroundColor: '#E8F7FC'}}>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2020-2025</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2015-2020</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2020-2025</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2015-2020</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2020-2025</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2015-2020</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2020-2025</TableBody>
              </th>
              <th className="p-2 text-right border-r border-gray-300 whitespace-nowrap">
                <TableBody className="text-gray-600 font-semibold">2015-2020</TableBody>
              </th>
            </tr>
          </thead>
          <tbody>
            {transportationData.map((mode) => (
              <tr key={mode.mode} className="border-b border-gray-200 hover:bg-gray-50">
                {/* Mode Name - now leftmost */}
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>
                    {mode.mode}
                  </TableBody>
                </td>

                {/* Killed */}
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2020_2025.deaths}</TableBody>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2015_2020.deaths}</TableBody>
                </td>

                {/* Severely Injured */}
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2020_2025.severeInjuries}</TableBody>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2015_2020.severeInjuries}</TableBody>
                </td>

                {/* Lightly Injured */}
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2020_2025.lightInjuries.toLocaleString()}</TableBody>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2015_2020.lightInjuries.toLocaleString()}</TableBody>
                </td>

                {/* Total Injured - now last */}
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2020_2025.totalInjured.toLocaleString()}</TableBody>
                </td>
                <td className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  <TableBody>{mode.period2015_2020.totalInjured.toLocaleString()}</TableBody>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}