import React from 'react'

export const MapEmbed: React.FC = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1bsZLIyGgobq7Lm6FDt3q3IzsoWTbvyc&ehbc=2E312F"
        className="w-full h-96 border-0 rounded-lg"
        title="מפת נקודות סכנה"
        loading="lazy"
      />
    </div>
  )
}