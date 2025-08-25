import { type EducationalCluster } from '../types'
import { TableCaption, TableHeader, TableBody } from './Typography'
import HorizontalScrollIndicator from './HorizontalScrollIndicator'

// Data from PDF report - Educational institution clusters (top clusters by casualties in 1km² areas)
const educationalClustersData: EducationalCluster[] = [
  { clusterName: 'מקבץ בית יעקב מרגלית', cityName: 'ירושלים', totalInstitutions: 52, totalInjured: 51, severeInjuries: 8, deaths: 1 },
  { clusterName: 'מקבץ ויזניץ', cityName: 'בני ברק', totalInstitutions: 56, totalInjured: 60, severeInjuries: 9, deaths: 1 },
  { clusterName: 'מקבץ ישיבת בית מרדכי', cityName: 'ירושלים', totalInstitutions: 31, totalInjured: 44, severeInjuries: 5, deaths: 2 },
  { clusterName: 'מקבץ בית יעקב דרכי רחל', cityName: 'ירושלים', totalInstitutions: 33, totalInjured: 42, severeInjuries: 12, deaths: 0 },
  { clusterName: 'מקבץ ישיבת בית מנחם', cityName: 'בני ברק', totalInstitutions: 29, totalInjured: 62, severeInjuries: 8, deaths: 0 },
  { clusterName: 'מקבץ בי"ס סולם', cityName: 'בני ברק', totalInstitutions: 65, totalInjured: 68, severeInjuries: 7, deaths: 0 },
  { clusterName: 'מקבץ בי סמינר רמות שמסיאב', cityName: 'ירושלים', totalInstitutions: 55, totalInjured: 39, severeInjuries: 6, deaths: 1 },
  { clusterName: 'מקבץ ישיבת מאור ושמש ביתר', cityName: 'ביתר עילית', totalInstitutions: 35, totalInjured: 12, severeInjuries: 9, deaths: 1 },
  { clusterName: 'מקבץ שובו תל אביב', cityName: 'תל אביב יפו', totalInstitutions: 5, totalInjured: 39, severeInjuries: 5, deaths: 0 },
  { clusterName: 'מקבץ יסודי מע"ר', cityName: 'אשדוד', totalInstitutions: 5, totalInjured: 28, severeInjuries: 2, deaths: 1 },
]

export default function EducationalClustersTable() {
  return (
    <div className="w-full mb-16">
      {/* Title */}
      <div className="rounded-t-lg border border-gray-200 p-4" style={{backgroundColor: '#ECECEC'}}>
        <TableCaption className="text-center">
          מקבצים מובילים בציון המשוקלל* בחמש השנים האחרונות (כל מקבץ בגודל 1 קמ&sup2;):
        </TableCaption>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-300" style={{backgroundColor: '#ECECEC'}}>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                המקבץ
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                ישוב
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                סה״כ הרוגים במקבץ
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                סה״כ פצועים קשה במקבץ
              </TableHeader>
              <TableHeader className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                סה״כ נפגעים במקבץ
              </TableHeader>
              <TableHeader className="p-3 text-right whitespace-nowrap">
                סה״כ מוסדות לימוד במקבץ
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {educationalClustersData.map((cluster, index) => (
              <tr key={`${cluster.clusterName}-${cluster.cityName}-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {cluster.clusterName}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {cluster.cityName}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {cluster.deaths}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {cluster.severeInjuries}
                </TableBody>
                <TableBody className="p-3 text-right border-r border-gray-300 whitespace-nowrap">
                  {cluster.totalInjured}
                </TableBody>
                <TableBody className="p-3 text-right whitespace-nowrap">
                  {cluster.totalInstitutions}
                </TableBody>
              </tr>
            ))}
                      </tbody>
            <tfoot>
              <tr>
                <td colSpan={6} className="bg-gray-50 p-4 text-sm text-gray-600 text-right">
                  * הציון המשוקלל חושב כך: מספרים נפגעים כולל X (משקל פצוע קל X מספר פצועים קל + משקל פצוע קשה X מספר פצועים קשה + משקל הרוג X מספר הרוגים). המשקל שניתן להרוג הוא 0.799, המשקל לפצוע קשה 0.199 והמשקל לפצוע קל 0.002. ציון גבוה משמעותו שלילית: יותר נפגעים או יותר נפגעים בחומרה קשה יותר
                </td>
              </tr>
            </tfoot>
                    </table>
        </div>
        <HorizontalScrollIndicator />
      </div>
  )
}