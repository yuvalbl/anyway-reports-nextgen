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
          {selectedSchool && <Map school={selectedSchool} schoolId={selectedId} />}
        </div>
      </div>
      {selectedSchool && (
        <div className="text-sm leading-6 text-neutral-800 space-y-2">
          <div>
            הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה. בדו״ח נספרו עבור כל מוסד חינוך כל
            הפצועים/הרוגים שנפגעו תוך שימוש בתחבורה רכה (הולכי רגל, רוכבי אופניים ואופניים חשמליים
            ורוכבי קורקינט חשמלי) בגילאים 5-19, בין השעות 7:00 ל-19:00 ובתוך ריבוע שמרכזו מוסד חינוכי
            או מקבץ מוסדות חינוכיים וגודל כל צלע ק&quot;מ אחד, בין התאריכים 1.6.2020-31.5.2025.
          </div>
          <div>
            את הדו&quot;ח הפיקו מתנדבי פרויקט ANYWAY וביניהם: דניאל שלי, מיכל אורן, זיו הרפז, דרור רשף, אגם
            רפאלי-פרהדיאן, דן פולק, אבי קליימן, בניה פרץ, סלומון רדה, אורי הוך, בר קלמי, כרמל פרדיס,
            יובל ברוך, ברוך פיקאר, גל רייך ועתליה אלון.
          </div>
        </div>
      )}
    </div>
  )
}
