import { config } from '../app/config'

export const generateWhatsAppLink = (message: string): string => {
  const phone = config.company.whatsappNumber

  const formattedMessage = `
🚗 FORNAX Car Rental

${message}

📞 Contact: ${config.company.phone}
  `

  return `https://wa.me/${phone}?text=${encodeURIComponent(formattedMessage)}`
}