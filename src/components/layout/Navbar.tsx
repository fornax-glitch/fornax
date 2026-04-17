import { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useLocation, useNavigate } from 'react-router-dom'
import logoDark from "../../assets/brand/fornax-navbar.png"
import logoWhite from "../../assets/brand/fornax-white.png"

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  // Detect active route
  const activePath = location.pathname

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'fleet', label: t.nav.fleet, path: '/fleet' },
    { id: 'booking', label: t.nav.booking, path: '/booking' },
    { id: 'contact', label: t.nav.contact, path: '/contact' }
  ]

  const navLinkClass = (path: string) =>
    'relative transition text-sm font-medium ' +
    (activePath === path
      ? scrolled
        ? 'text-blue-600'
        : 'text-white'
      : scrolled
        ? 'text-gray-800 hover:text-blue-600'
        : 'text-white hover:text-blue-200'
    )

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'border border-gray-100/80 backdrop-blur-md shadow-sm py-3 bg-white/80'
          : 'bg-black/60 backdrop-blur-md py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src={scrolled ? logoDark : logoWhite}
            alt="FORNAX CAR"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={navLinkClass(item.path)}
            >
              {item.label}
            </button>
          ))}

          {/* Language switch */}
          <div className={`flex items-center gap-1 rounded-full border ${
            scrolled
              ? 'border-gray-200 bg-gray-50/50'
              : 'border-white/20'
          } px-2 py-0.5 text-xs`}>

            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`rounded-full px-2 py-0.5 ${
                lang === 'fr'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              }`}
            >
              FR
            </button>

            <span className={scrolled ? 'text-gray-400' : 'text-white/70'}>|</span>

            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-2 py-0.5 ${
                lang === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              }`}
            >
              EN
            </button>

          </div>
        </div>

      </div>
    </nav>
  )
}