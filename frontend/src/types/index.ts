export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  duration: string;
  rating: number;
  reviewCount: number;
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  basePrice: number;
  slots: Slot[];
}

export interface Slot {
  _id?: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

export interface BookingData {
  experienceId: string;
  slotDate: string;
  slotTime: string;
  numberOfPeople: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  promoCode?: string;
  discount: number;
  subtotal: number;
  total: number;
}

export interface Booking {
  _id: string;
  experienceId: string;
  experienceTitle: string;
  slotDate: string;
  slotTime: string;
  numberOfPeople: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  promoCode?: string;
  discount: number;
  subtotal: number;
  total: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
}

export interface PromoCodeValidation {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discount: number;
  total: number;
}
