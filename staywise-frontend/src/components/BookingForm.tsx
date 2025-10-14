"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormFields, BookingSchema } from "../types/property";
import { useAuth } from "../hooks/useAuth";
import api from "../lib/api";
import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  propertyId: string;
}

export default function BookingForm({ propertyId }: BookingFormProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const today = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<BookingFormFields>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      propertyId: propertyId,
      date: "",
    },
  });

  const dateValue = watch("date");

  const onSubmit = async (data: BookingFormFields) => {
    try {
      await api.post("/bookings", {
        propertyId: data.propertyId,
        date: data.date,
      });
      setStatus("success");
      reset({ date: "", propertyId }); // Reset date input
    } catch (error) {
      console.error("Booking failed:", error);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  if (!user) {
    return (
      <div className="bg-red-50 p-6 rounded-xl text-center border-l-4 border-red-500">
        <p className="font-bold text-red-700">Login Required</p>
        <p className="text-sm text-gray-600">
          You must be logged in to make a booking.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border-t-4 border-sw-primary sticky top-24">
      <h2 className="text-2xl font-bold text-sw-dark mb-4">
        Make a Reservation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register("propertyId")} />

        <div>
          <div className="p-4 border rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Check-in Date
            </label>
            <DatePicker
              selected={dateValue ? new Date(dateValue) : null}
              onChange={(date: Date | null) => {
                const formattedDate = date
                  ? date.toISOString().split("T")[0]
                  : "";
                setValue("date", formattedDate, { shouldValidate: true });
              }}
              minDate={today}
              dateFormat="MMMM d, yyyy"
              placeholderText="Choose a date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sw-primary focus:border-sw-primary"
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || status === "success"}
          className="w-full py-3 rounded-lg text-lg font-bold text-white transition duration-300 
            bg-sw-primary hover:bg-sw-dark shadow-lg disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? "Reserving..." : "Reserve Now"}
        </motion.button>
      </form>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center font-medium"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Booking successful!
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center font-medium"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Booking failed. Please try again.
        </motion.div>
      )}
    </div>
  );
}
