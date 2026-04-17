export type Transmission = 'Manual' | 'Automatic';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type CarCategory = 'Economy' | 'Compact' | 'SUV' | 'Luxury' | 'Minivan';

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: CarCategory;
  pricePerDay: number;
  image: string;
  features: {
    seats: number;
    doors: number;
    transmission: Transmission;
    fuel: FuelType;
    airConditioning: boolean;
  };
  rating?: number;
  rentals?: number;
  popular?: boolean;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  car: string;
  pickup: string;
  returnDate: string;
  total: number;
  date: string;
}

export type Language = 'en' | 'fr';