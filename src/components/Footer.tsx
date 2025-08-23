import React, { useState } from 'react'
import natunLogo from '../assets/natun_leshinuy_logo.png'
import haikuLogo from '../assets/haiku_logo.svg'

export const Footer: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const toggleAbout = () => {
    setIsAboutOpen(!isAboutOpen)
  }

  return (
    <>
      <footer className="w-full bg-white border-t border-gray-200 py-4 fixed bottom-0 left-0 z-40">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <a 
              href="https://www.natun-leshinuy.org.il"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={natunLogo} 
                alt="נתון לשינוי" 
                className="h-6 w-auto"
              />
            </a>
            
            <a 
              href="https://haiku.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={haikuLogo} 
                alt="Haiku" 
                className="h-6 w-auto"
              />
            </a>

            <button
              onClick={toggleAbout}
              className="text-sm font-medium text-gray-600 hover:text-anywayRed transition-colors duration-200 px-3 py-1 rounded-md hover:bg-gray-50"
            >
              אודות
            </button>
          </div>
        </div>
      </footer>

      {/* Slide-up About Panel */}
      <div 
        className={`fixed inset-0 backdrop-brightness-90 backdrop-blur-sm transition-all duration-300 z-50 ${
          isAboutOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleAbout}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white text-gray-900 rounded-t-3xl p-8 transform transition-transform duration-300 ease-out ${
            isAboutOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gray-900">אודות הפרויקט</h2>
              <button
                onClick={toggleAbout}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                מערכת מידע אינטרקטיבית המחברת בין נתוני בטיחות בדרכים לבין מיקומי מוסדות חינוך בישראל, כדי לחשוף סיכונים ולקדם שיפור הבטיחות עבור ילדינו. מטרת הפרויקט הינה קידום תשתיות חכמות המצילות חיים באזורים מסוכנים על פי המידע הנאסף בישראל על תאונות דרכים.
              </p>
              <p>
                הדו״ח מתבסס על נתוני הלשכה המרכזית לסטטיסטיקה.
                <br/>
                הנתונים מוצגים בשיתוף פעולה בין{' '}
                <a 
                  href="https://www.natoon.co.il/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                >
                  נתון לשינוי
                </a>
                ,{' '}
                <a 
                  href="https://www.haiku-code.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                >
                  הייקו
                </a>
                {' '}ו-{' '}
                <a 
                  href="https://www.ynet.co.il" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                >
                  ynet
                </a>
                .
              </p>
              
              <p className="text-base text-gray-600 mt-6 pt-4 border-t border-gray-200">
                תודה מיוחדת ל
                <br />
                <span className="font-medium text-gray-700">נתון לשינוי:</span> גל רייך, עתליה אלון, אירה
                <br />
                <span className="font-medium text-gray-700">הייקו - פיתוח והטמעה:</span> יובל בר לוי
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer 