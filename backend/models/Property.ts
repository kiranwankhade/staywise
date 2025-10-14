import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  perNightPrice: number;
  amenities: string[];
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  perNightPrice: { type: Number, required: true },
  amenities: { type: [String], default: [] },
});

export default mongoose.model<IProperty>("Property", PropertySchema);
