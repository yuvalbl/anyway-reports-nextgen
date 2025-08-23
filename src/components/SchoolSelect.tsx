import React, { useMemo, useState, useRef, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import _ from 'lodash'
import deburr from 'lodash/deburr'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import type { School } from '../types'

type Suggestion = { label: string; id: number }

type ParsePart = { text: string; highlight: boolean }

type Props = {
  schools: School[]
  onSelectId: (id: number) => void
}

export const SchoolSelect: React.FC<Props> = ({ schools, onSelectId }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Suggestion | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const typingTimeoutRef = useRef<number | undefined>(undefined)

  const data: Suggestion[] = useMemo(() => {
    return schools.map((school) => {
      const yishuv = (school.yishuv_name ?? '').replace(/^"|"$/g, '')
      return {
        label: yishuv ? `${school.school_name} (${yishuv})` : school.school_name,
        id: school.school_id,
      }
    })
  }, [schools])

  const suggestions: Suggestion[] = useMemo(() => {
    if (!query.trim()) return []
    
    const inputValue = deburr(query.trim()).toLowerCase()
    const words = inputValue.split(' ').filter(Boolean)
    
    return _(data)
      .filter((suggestion) => {
        const label = suggestion.label.toLowerCase()
        return words.every(word => label.includes(word))
      })
      .take(15)
      .uniqBy('id')
      .value()
  }, [query, data])

  const handleSelect = (suggestion: Suggestion | null) => {
    if (suggestion) {
      setSelected(suggestion)
      setQuery('')
      onSelectId(suggestion.id)
      setIsFocused(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsTyping(true)
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative group">
      <Combobox value={selected} onChange={handleSelect} nullable>
        <div className="relative" id="schoolSearch">
          <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 transition-all duration-500 ease-out ${
            isFocused || query ? 'w-full' : 'w-0 group-hover:w-1/3'
          }`}></div>
          
          <div className={`absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg transition-all duration-300 ${
            isFocused ? 'opacity-100 scale-105' : 'opacity-0 scale-100 group-hover:opacity-50'
          }`}></div>

          <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isFocused || query ? 'text-blue-500 scale-110' : 'text-gray-400 group-hover:text-gray-600'
          }`}>
            {isTyping ? (
              <div className="w-5 h-5">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          <Combobox.Input
            ref={inputRef}
            className={`relative w-full bg-transparent transition-all duration-300 focus:placeholder-gray-300 outline-none text-lg text-gray-800 placeholder-gray-400 py-4 z-10 pr-12 pl-4`}
            placeholder="הקלד שם בית ספר או עיר..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {(isFocused || query) && (
            <div className="absolute -top-2 right-4 bg-white px-2 text-xs font-medium text-blue-500 transition-all duration-300 animate-fadeInUp">
              חיפוש מוסד חינוך
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <Combobox.Options className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-xl list-none m-0 p-0 max-h-96 overflow-y-auto">
            {suggestions.map((s, index) => (
              <Combobox.Option
                key={s.id}
                value={s}
                className={({ active }: { active: boolean }) => 
                  `block px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
                    active 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-900 translate-x-1' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`
                }
                style={{
                  animationDelay: `${index * 0.03}s`
                }}
              >
                {({ active }: { active: boolean }) => {
                  const matches = match(s.label, query)
                  const parts: ParsePart[] = parse(s.label, matches)
                  return (
                    <div className="flex items-center justify-between animate-slideInRight">
                      <div className="text-base leading-relaxed">
                        {parts.map((part: ParsePart, idx: number) => (
                          <span 
                            key={idx} 
                            className={
                              part.highlight 
                                ? 'font-semibold bg-yellow-100 px-1 py-0.5 rounded-sm text-yellow-800' 
                                : ''
                            }
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                      
                      {active && (
                        <div className="mr-2">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  )
                }}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  )
} 