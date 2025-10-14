

import { z } from 'zod';

export const CreatePropertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  imageUrl: z.string().url('Must be a valid URL for the image.'),
  location: z.string().min(3, 'Location is required.'),
  guests: z.number().min(1, 'Must allow at least 1 guest.'),
  bedrooms: z.number().min(1, 'Must have at least 1 bedroom.'),
  bathrooms: z.number().min(1, 'Must have at least 1 bathroom.'),
  perNightPrice: z.number().min(10, 'Price must be at least $10.'),
  amenities: z.string().optional(), // We'll handle this as a comma-separated string
});

// === BACKEND MODEL INTERFACES ===
export type Role = "user" | "admin";

export interface IProperty {
  _id: string;
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

export interface IBooking {
  _id: string;
  userId: string;
  propertyId: IProperty; // Populated property
  date: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

// === FORM SCHEMAS & TYPES ===
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginFormFields = z.infer<typeof LoginSchema>;

export const SignupSchema = LoginSchema.extend({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['user', 'admin']).default('user'),
});
export type SignupFormFields = z.infer<typeof SignupSchema>;

export const BookingSchema = z.object({
  date: z.string().min(1, 'Booking date is required'),
  propertyId: z.string(), // Hidden field or passed context
});
export type BookingFormFields = z.infer<typeof BookingSchema>;

export type CreatePropertyFormFields = z.infer<typeof CreatePropertySchema> & {
  root?: string;
};
