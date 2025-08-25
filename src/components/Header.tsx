import React from 'react'
import xIcon from '../assets/icons/x.svg'
import whatsappIcon from '../assets/icons/whatsapp.svg'
import mailIcon from '../assets/icons/mail.svg'
import ynetLogo from '../assets/ynet_logo.svg'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getShareData = () => {
    const title = 'הכבישים המסוכנים בדרך לבית הספר שלכם - ynet'
    const description = 'חפשו במפה וגלו: פרויקט מיוחד חושף את רמת הסיכון בכל הדרכים הסמוכות למוסדות חינוכיים בישראל'
    const currentUrl = window.location.origin + window.location.pathname
    
    return { title, description, currentUrl }
  }

  const { title, description, currentUrl } = getShareData()

  return (
    <header className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className={`flex justify-between items-center px-6 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}>
        <div className="flex items-center">
          <a 
            href="https://www.ynet.co.il/home/0,7340,L-8,00.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src={ynetLogo} 
              alt="Ynet" 
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-6 md:h-8' : 'h-8 md:h-11'
              }`}
            />
          </a>
        </div>

        <div className="flex items-center gap-6">
          <a 
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src={mailIcon} 
              alt="Share via Email" 
              className="w-6 h-6"
              style={{ color: '#3E3232' }}
            />
          </a>

          <a 
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n\n' + description + '\n\n' + currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src={whatsappIcon} 
              alt="Share on WhatsApp" 
              className="w-6 h-6"
              style={{ color: '#3E3232' }}
            />
          </a>

          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title + '\n\n' + description + '\n\n' + currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src={xIcon} 
              alt="Share on X (Twitter)" 
              className="w-6 h-6"
              style={{ color: '#3E3232' }}
            />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header