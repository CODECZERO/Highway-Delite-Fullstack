import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  experienceTitle: string;
  slotDate: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
    experienceTitle: { type: String, required: true },
    slotDate: { type: Date, required: true },
    slotTime: { type: String, required: true },
    numberOfPeople: { type: Number, required: true, min: 1 },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    promoCode: { type: String },
    discount: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['confirmed', 'cancelled', 'pending'], 
      default: 'confirmed' 
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
