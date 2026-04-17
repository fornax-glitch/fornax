import type { Car } from '../../types'

import logan from '../../assets/cars/logan.png?url'
import clio5 from '../../assets/cars/clio5.png?url'
import duster from '../../assets/cars/duster.png?url'
import i10 from '../../assets/cars/i10.png?url'

export const fleet: Car[] = [
  {
    id: '1',
    brand: 'Dacia',
    model: 'Logan',
    category: 'Economy',
    pricePerDay: 250,
    image: logan,
    features: {
      seats: 5,
      doors: 4,
      transmission: 'Manual',
      fuel: 'Diesel',
      airConditioning: true
    },
    rating: 4.7,
    rentals: 98,
    isAvailable: true
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Clio 5',
    category: 'Compact',
    pricePerDay: 300,
    image: clio5,
    features: {
      seats: 5,
      doors: 5,
      transmission: 'Automatic',
      fuel: 'Diesel',
      airConditioning: true
    },
    rating: 4.8,
    rentals: 120,
    popular: true,
    isAvailable: true
  },
  {
    id: '3',
    brand: 'Dacia',
    model: 'Duster',
    category: 'SUV',
    pricePerDay: 450,
    image: duster,
    features: {
      seats: 5,
      doors: 5,
      transmission: 'Manual',
      fuel: 'Diesel',
      airConditioning: true
    },
    rating: 4.6,
    rentals: 86,
    popular: true,
    isAvailable: true
  },
  {
    id: '4',
    brand: 'Hyundai',
    model: 'i10',
    category: 'Economy',
    pricePerDay: 230,
    image: i10,
    features: {
      seats: 5,
      doors: 4,
      transmission: 'Manual',
      fuel: 'Petrol',
      airConditioning: true
    },
    rating: 4.5,
    rentals: 76,
    isAvailable: true
  }
]