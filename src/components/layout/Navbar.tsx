import { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useNavigate } from 'react-router-dom'
import logoDark from "../../assets/brand/fornax-navbar.png"
import logoWhite from "../../assets/brand/fornax-white.png"

export default function Navbar() {
  const { t, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.nav.fleet, path: '/fleet' },
    { label: t.nav.booking, path: '/booking' },
    { label: t.nav.contact, path: '/contact' }
  ]

  const whatsapp = "https://wa.me/212642997687"

  return (
    <nav
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}
      className={`transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-24">

        {/* LOGO */}
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img
            src={scrolled ? logoDark : logoWhite}
            alt="Fornax Car Location"
            className="h-12 object-contain"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-sm font-semibold transition ${
                scrolled
                  ? 'text-gray-800 hover:text-black'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* PRIMARY CTA */}
          <a
            href={whatsapp}
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition"
          >
            Réserver maintenant
          </a>

          {/* LANGUAGE */}
          <div className={`flex gap-2 text-xs border rounded-full px-3 py-1 font-bold ${
            scrolled ? 'border-gray-300 text-gray-800' : 'border-white/30 text-white'
          }`}>
            <button onClick={() => setLang('fr')} className="hover:opacity-70">FR</button>
            <span className="opacity-30">|</span>
            <button onClick={() => setLang('en')} className="hover:opacity-70">EN</button>
          </div>

        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-3">

          <a
            href={whatsapp}
            className="bg-green-500 text-white px-3 py-1.5 rounded-full text-sm shadow"
          >
            💬
          </a>

          <button
            className={`text-3xl ${scrolled || menuOpen ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>
    </nav>
  )
}