import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import logoWhite from "../../assets/brand/fornax-white.png"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-10 md:grid-cols-4">

          {/* LOGO */}
          <div className="space-y-4">
            <img src={logoWhite} className="h-10" />
            <p className="text-sm text-gray-300">
              Location de voitures à Témara & Rabat • Réservation WhatsApp rapide
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/fleet">{t.nav.fleet}</Link></li>
              <li><Link to="/booking">{t.nav.booking}</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Location voiture Rabat</li>
              <li>Location voiture Casablanca</li>
              <li>Chauffeur privé Maroc</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="text-sm text-gray-300 space-y-4">

            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>

              <a
                href="https://wa.me/212642997687"
                className="text-green-400 font-semibold"
              >
                💬 WhatsApp: 0642 99 76 87
              </a>

              <p className="mt-2">Témara, Maroc</p>
            </div>

            <a
              href="https://wa.me/212642997687"
              className="inline-block bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
            >
              Réserver maintenant
            </a>

          </div>

        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          © 2026 Fornax Car
        </div>

      </div>
    </footer>
  )
}