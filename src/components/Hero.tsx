import React, { useState, useEffect } from 'react'
import { HeroTitle, HeroSubtitle } from './Typography'

export const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative w-full h-[873px] flex items-center justify-center text-center">
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-background2.jpg')`,
          backgroundPosition: isMobile ? '-540px center' : 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(250,254,255,0)] via-[rgba(250,254,255,0)] to-[rgba(232,247,252,1)]" style={{
          background: 'linear-gradient(180deg, rgba(250, 254, 255, 0) 14%, rgba(232, 247, 252, 1) 82%)'
        }}></div>
        
        <div className="absolute bottom-4 right-4 text-xs text-gray-600 opacity-80">
          צילום: shutterstock
        </div>
      </div>
      
      <div className="absolute bottom-15 z-10 max-w-7xl px-6 lg:px-16 xl:px-20">
        <div 
          className="opacity-0 translate-y-8 animate-fade-in-up mb-8"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <HeroTitle>
            בדקו וגלו: אלו הדרכים המסוכנות בדרך לבית הספר שלכם
          </HeroTitle>
        </div>
        
        <div 
          className="opacity-0 translate-y-8 animate-fade-in-up mx-auto"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <HeroSubtitle>
            2,587,000 תלמידים וילדי גן יפתחו את שנת הלימודים ב-1/9. הם יחצו כבישים וצמתים בדרכם אל מוסדות הלימוד, בין אם ברגל, באופניים, בקורקינט או בכלי רכב. ב-5 השנים האחרונות נפגעו 6,260 ילדים בדרכים הללו - שחלקן מסוכנות. ynet מציג את מפת ANYWAY מבית "נתון לשינוי", שחושפת את אותם הכבישים: כתבו את שם המוסד החינוכי, גלו אותם במפה והצילו חיים
          </HeroSubtitle>
        </div>
        
        <div 
          className="opacity-0 translate-y-8 animate-fade-in-up mx-auto mt-4"
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
        >
          <p className="text-lg font-semibold text-gray-600 tracking-wide">
            תמר טרבלסי חדד
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero