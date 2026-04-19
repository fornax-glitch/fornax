export default function StickyWhatsAppButton() {
  const phone = "212642997687";

  const message =
    "Bonjour 👋 je souhaite réserver une voiture chez Fornax Car à Témara 🚗";

  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl animate-bounce">

        <span className="text-lg">💬</span>

        <span className="hidden md:block text-sm font-semibold">
          Réserver sur WhatsApp
        </span>

      </div>
    </a>
  );
}