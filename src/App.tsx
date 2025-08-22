import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
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
    <main>
      <Header />
      <Hero />
      <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 sm:p-6">
        <Report
          schools={schools}
          selectedId={selectedId}
          setSelectedId={(id: number) => setSelectedId(id)}
          selectedSchool={selectedSchool}
        />
      </div>
    </main>
  )
}

export default App
