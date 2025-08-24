import React, { useState } from 'react'
import { VISION_ZERO_CONTENT, type VisionZeroContent } from '../constants/visionZero'
import { MainContent } from './Typography'
import ScrollIndicator from './ScrollIndicator'

export const VisionZero: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (index: number) => {
    setCurrentTab(index)
  }

  const renderTabContent = (content: VisionZeroContent) => (
    <div>
      {content.image && (
        <div className="flex justify-center mb-4">
          <img
            src={`/images/${content.image}`}
            height="250"
            alt={content.alt}
          />
        </div>
      )}
      <MainContent className="whitespace-pre-line">{content.body}</MainContent>
      {content.image2 && (
        <figure className="text-center mt-4">
          <img
            src={`/images/${content.image2}`}
            className="max-w-[70%] min-w-[240px] mx-auto"
            alt={content.alt}
          />
          {content.image2Caption && (
            <figcaption className="text-sm mt-2">
              <MainContent className="whitespace-pre-line">{content.image2Caption}</MainContent>
            </figcaption>
          )}
        </figure>
      )}
    </div>
  )

  return (
    <div className="rounded-lg border border-neutral-200/70">
      <div className="text-xl font-bold my-6 text-center">
        דרכים לשיפור הבטיחות בדרכים על פי חזון אפס
      </div>
      
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="lg:hidden">
        <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
          {VISION_ZERO_CONTENT.map((content, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`flex-shrink-0 w-28 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-center leading-tight ${
                currentTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {content.header}
            </button>
          ))}
        </div>
        <ScrollIndicator />
      </div>

      {/* Desktop: Vertical tabs */}
      <div className="hidden lg:flex flex-1">
        <div className="w-64 border-r border-gray-200 pr-4">
          <div>
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
        
        <div className="flex-1 p-4 overflow-y-auto">
          {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
        </div>
      </div>

      {/* Mobile: Tab content */}
      <div className="lg:hidden flex-1 p-4 overflow-y-auto">
        {renderTabContent(VISION_ZERO_CONTENT[currentTab])}
      </div>
    </div>
  )
}