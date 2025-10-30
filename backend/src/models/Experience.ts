import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
  date: Date;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

export interface IExperience extends Document {
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
  slots: ISlot[];
  createdAt: Date;
  updatedAt: Date;
}

const SlotSchema = new Schema<ISlot>({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  availableSpots: { type: Number, required: true, min: 0 },
  totalSpots: { type: Number, required: true },
  price: { type: Number, required: true }
});

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: [{ type: String }],
    highlights: [{ type: String }],
    included: [{ type: String }],
    notIncluded: [{ type: String }],
    basePrice: { type: Number, required: true },
    slots: [SlotSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
