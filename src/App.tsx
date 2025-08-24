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
    <main className="bg-white">
      <Header />
      <Hero />
      <Report
        schools={schools}
        selectedId={selectedId}
        setSelectedId={(id: number) => setSelectedId(id)}
        selectedSchool={selectedSchool}
      />
    </main>
  )
}

export default App
