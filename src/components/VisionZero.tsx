import React, { useState } from 'react'
import { VISION_ZERO_CONTENT, type VisionZeroContent } from '../constants/visionZero'

export const VisionZero: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (index: number) => {
    setCurrentTab(index)
  }

  const renderTabContent = (content: VisionZeroContent) => (
    <div className="space-y-4">
      {content.image && (
        <div className="flex justify-center lg:justify-end">
          <img
            src={`/images/${content.image}`}
            height="250"
            alt={content.alt}
            className="lg:float-right lg:mr-4 lg:ml-0"
          />
        </div>
      )}
      <div className="text-sm leading-6">{content.body}</div>
      {content.image2 && (
        <figure className="text-center">
          <img
            src={`/images/${content.image2}`}
            className="max-w-[70%] min-w-[240px] mx-auto"
            alt={content.alt}
          />
          {content.image2Caption && (
            <figcaption className="text-sm mt-2">{content.image2Caption}</figcaption>
          )}
        </figure>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4 sm:p-6 h-[800px]">
      <div className="text-xl font-bold mb-6 text-center">
        דרכים לשיפור הבטיחות בדרכים על פי חזון אפס / דרור רשף
      </div>
      
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="lg:hidden mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {VISION_ZERO_CONTENT.map((content, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {content.header}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical tabs */}
      <div className="hidden lg:flex">
        <div className="w-64 border-r border-gray-200 pr-4">
          <div className="space-y-1">
            {VISION_ZERO_CONTENT.map((content, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`w-full text-right p-3 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === index
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {content.header}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 pl-6 h-[700px] overflow-y-auto">
          {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
        </div>
      </div>

      {/* Mobile: Tab content */}
      <div className="lg:hidden h-[700px] overflow-y-auto">
        {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
      </div>
    </div>
  )
}