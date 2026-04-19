import { useLanguage } from "../../../i18n/LanguageContext";

type Props = {
  setCarType: (type: string) => void;
};

export default function HeroSection(_: Props) {
  useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80')"
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Votre voiture livrée en 30 min à Témara, Rabat & Casablanca 🚗
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mt-4">
          Sans caution • Livraison gratuite • Disponible 24/7
        </p>

        {/* URGENCY */}
        <div className="mt-3 text-green-400 font-semibold text-lg">
          🔥 Disponible aujourd’hui – réponse en moins de 5 minutes
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <a
            href="https://wa.me/212642997687?text=Bonjour%20je%20veux%20réserver%20une%20voiture%20🚗"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition"
          >
            Réserver maintenant
          </a>

          <a
            href="#fleet"
            className="bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-3 rounded-full text-lg transition"
          >
            Voir les voitures
          </a>

        </div>

        {/* TRUST */}
        <p className="mt-6 text-sm text-gray-300">
          ⭐ +500 clients satisfaits à Témara, Rabat & Casablanca
        </p>

        {/* SEO LINE (important) */}
        <p className="mt-2 text-xs text-gray-400">
          Location voiture Témara, Rabat, Casablanca – Livraison aéroport partout au Maroc
        </p>

      </div>
    </section>
  );
}