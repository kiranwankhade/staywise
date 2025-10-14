import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  userId: Types.ObjectId;    
  propertyId: Types.ObjectId; 
  date: string;
}

const BookingSchema = new Schema<IBooking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  date: { type: String, required: true },
});

export default mongoose.model<IBooking>("Booking", BookingSchema);
