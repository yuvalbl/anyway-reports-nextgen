import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Map } from './Map'
import { Stats } from './Stats'
import { SchoolSelect } from './SchoolSelect'
import { VisionZero } from './VisionZero'
import MunicipalityTable from './MunicipalityTable'
import TopCitiesTable from './TopCitiesTable'
import TransportationStats from './TransportationStats'
import EducationalClustersTable from './EducationalClustersTable'
import { ReportArticle } from './ReportArticle'
import { MapEmbed } from './MapEmbed'
import { MainContent } from './Typography'
import type { School, InjuredYearRecord, MonthlyRecord, SexRecord } from '../types'

const containerSpacing = 'px-4 sm:p-6'
const mainContentSpacing = 'px-4 lg:px-16 xl:px-72 mb-16'

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
    <div className={containerSpacing}>
      <div className={mainContentSpacing}>
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
          <div className="lg:w-[30%] w-full">
            <div className="rounded-lg border border-neutral-200/70 p-3 mb-3">
              <SchoolSelect schools={schools} onSelectId={setSelectedId} />
            </div>
            {selectedSchool && (
              <div className="rounded-lg border border-neutral-200/70 p-3">
                <Stats
                  title={title}
                  injuredStats={injuredStats}
                  monthStats={monthStats}
                  genderStats={genderStats}
                />
              </div>
            )}
          </div>
          <div className="lg:flex-1 w-full">
            {selectedSchool && <Map school={selectedSchool} schoolId={selectedId} />}
          </div>
        </div>
      </div>

      <div className={mainContentSpacing}>
        <ReportArticle />
      </div>

      <div className={mainContentSpacing}>
        <MapEmbed />
      </div>

      <div className={mainContentSpacing}>
        <MunicipalityTable />
        <TopCitiesTable />
        <EducationalClustersTable />
        <TransportationStats />
        <VisionZero />
      </div>

      <div className={mainContentSpacing}>
        <div className="mt-3">
          <MainContent className="text-neutral-800">
            <div>
              הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה. בדו״ח נספרו עבור כל מוסד חינוך כל
              הפצועים/הרוגים שנפגעו תוך שימוש בתחבורה רכה (הולכי רגל, רוכבי אופניים ואופניים חשמליים
              ורוכבי קורקינט חשמלי) בגילאים 5-19, בין השעות 7:00 ל-19:00 ובתוך ריבוע שמרכזו מוסד
              חינוכי או מקבץ מוסדות חינוכיים וגודל כל צלע ק&quot;מ אחד, בין התאריכים
              1.6.2020-31.5.2025.
            </div>
            <div>
              את הדו&quot;ח הפיקו מתנדבי פרויקט ANYWAY וביניהם: דניאל שלי, מיכל אורן, זיו הרפז, דרור
              רשף, אגם רפאלי-פרהדיאן, דן פולק, אבי קליימן, בניה פרץ, סלומון רדה, אורי הוך, בר קלמי,
              כרמל פרדיס, יובל ברוך, ברוך פיקאר, גל רייך, עתליה אלון ויובל בר לוי.
            </div>
          </MainContent>
        </div>
      </div>
    </div>
  )
}
