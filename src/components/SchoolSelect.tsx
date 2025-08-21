import React, { useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'
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
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Suggestion | null>(null)

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

  const suggestions: Suggestion[] = useMemo(() => getSuggestions(query), [query, data])

  const handleSelect = (s: Suggestion | null) => {
    if (s) onSelectId(s.id)
    setSelected(null)
    setQuery('')
  }

  return (
    <div className="relative">
      <Combobox value={selected} onChange={handleSelect} nullable>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-base outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="חפש על פי ישוב או מוסד חינוך"
            dir="rtl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {suggestions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full rounded-md border border-neutral-200 bg-white shadow-md list-none m-0 p-0">
            {suggestions.map((s) => (
              <Combobox.Option
                key={s.id}
                value={s}
                className={({ active }) => `block px-3 py-2 ${active ? 'bg-neutral-100' : ''}`}
              >
                {({}) => {
                  const matches = match(s.label, query)
                  const parts = parse(s.label, matches)
                  return (
                    <div>
                      {parts.map((part: { text: string; highlight: boolean }, idx: number) => (
                        <span key={idx} className={part.highlight ? 'font-semibold' : ''}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  )
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  )
}
