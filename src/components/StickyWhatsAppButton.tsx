import { config } from '../app/config'
export default function StickyWhatsAppButton() {
  return (
    <a
      href={config.company.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-xl animate-bounce hover:animate-none transition-all duration-300">
        
        <span className="text-lg">💬</span>

        <span className="text-sm font-semibold hidden md:block">
          Réserver maintenant
        </span>

      </div>
    </a>
  )
}