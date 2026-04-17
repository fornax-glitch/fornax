import { useLanguage } from '../../../i18n/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <div className="text-center p-10 bg-blue-600 text-white">
      <h2>{t.cta.title}</h2>
    </div>
  );
}