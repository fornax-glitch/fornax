import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import logoWhite from "../../assets/brand/fornax-white.png"
import { config } from '../../app/config'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-10 md:grid-cols-4">

          {/* LOGO + DESCRIPTION */}
          <div className="space-y-6">
            <img src={logoWhite} alt={config.company.name} className="h-10 w-auto" />
            <p className="text-sm text-gray-300">
              {t.footer.company}
            </p>
          </div>

          {/* MAIN LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition">{t.nav.fleet}</Link></li>
              <li><Link to="/booking" className="hover:text-white transition">{t.nav.booking}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">{t.nav.contact}</Link></li>
            </ul>
          </div>

          {/* SERVICES + CITY SEO LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/services/airport-transfer" className="hover:text-white transition">
                  Transfert Aéroport Rabat / Casablanca
                </Link>
              </li>
              <li>
                <Link to="/services/airport-delivery" className="hover:text-white transition">
                  Livraison voiture Aéroport
                </Link>
              </li>
              <li>
                <Link to="/services/private-driver" className="hover:text-white transition">
                  Chauffeur privé au Maroc
                </Link>
              </li>
              <li>
                <Link to="/location-voiture/rabat" className="hover:text-white transition">
                  Location voiture Rabat
                </Link>
              </li>
              <li>
                <Link to="/location-voiture/casablanca" className="hover:text-white transition">
                  Location voiture Casablanca
                </Link>
              </li>
              <li>
                <Link to="/location-voiture/marrakech" className="hover:text-white transition">
                  Location voiture Marrakech
                </Link>
              </li>
              <li>
                <Link to="/location-voiture/agadir" className="hover:text-white transition">
                  Location voiture Agadir
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="text-sm text-gray-300 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.footer.contact}</h3>
              <p>
                WhatsApp:{" "}
                <a href={config.company.whatsappLink} target="_blank" className="hover:text-white">
                  +{config.company.whatsappNumber}
                </a>
              </p>
              <p>Location: {config.company.location}</p>
            </div>
            <a
              href={config.company.whatsappLink}
              target="_blank"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              📱 Réserver sur WhatsApp
            </a>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          © 2026 {config.company.name}. {t.footer.rights}.
        </div>

      </div>
    </footer>
  )
}