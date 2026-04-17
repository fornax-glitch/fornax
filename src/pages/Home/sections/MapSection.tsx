import { useLanguage } from '../../../i18n/LanguageContext'

export default function MapSection() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="py-28 px-6 bg-gray-50/50"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        {t.location.title}
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Basé à Témara • Livraison possible dans toute la région
      </p>

      <div className="max-w-6xl mx-auto">
        <iframe
          className="w-full h-[400px] rounded-2xl shadow-sm"
          src="https://www.google.com/maps?q=Temara%20Morocco&output=embed"
        />
      </div>
    </section>
  )
}