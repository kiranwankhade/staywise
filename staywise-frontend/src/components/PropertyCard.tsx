'use client';
import { IProperty } from '../types/property';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Users, DollarSign } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function PropertyCard({ property }: { property: IProperty }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer"
    >
      <Link href={`/properties/${property._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute top-0 right-0 bg-sw-primary text-white font-bold px-3 py-1 rounded-bl-xl text-lg flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />{property.perNightPrice}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-2xl font-bold text-sw-dark truncate">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500">{property.location}</p>

          <div className="flex justify-between items-center text-gray-600 text-sm border-t pt-3">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-sw-primary" />
              {property.guests} Guests
            </span>
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-1 text-sw-primary" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1 text-sw-primary" />
              {property.bathrooms} Baths
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}