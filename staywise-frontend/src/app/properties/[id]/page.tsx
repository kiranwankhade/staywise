import { IProperty } from '../../../types/property';
import BookingForm from '../../../components/BookingForm';
import { API_URL } from '../../../utils/constants';
import { Users, Bed, Bath, MapPin, DollarSign, Check } from 'lucide-react';

async function getProperty(id: string): Promise<IProperty | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`, { 
        cache: 'no-store' 
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
}

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);


  
  if (!property) {
    return (
      <div className="text-center py-20 text-xl text-red-600 bg-white rounded-xl shadow-xl">
        Property not found or server error.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Property Details Column */}
      <div className="lg:col-span-2 space-y-10">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-[60vh] object-cover"
          />
        </div>

        <div className="space-y-6 p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-5xl font-serif font-extrabold text-sw-dark">{property.title}</h1>
          <div className="flex items-center text-gray-600 text-lg font-medium">
            <MapPin className="w-5 h-5 mr-2 text-sw-primary" />
            {property.location}
          </div>
          <p className="text-gray-700 leading-relaxed text-lg pt-4 border-t">{property.description}</p>
        </div>

        {/* Key Features */}
        <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <Users className="w-6 h-6 mx-auto mb-1 text-sw-primary" />
            <span className="font-bold text-xl">{property.guests}</span>
            <p className="text-sm text-gray-500">Guests</p>
          </div>
          <div className="p-3">
            <Bed className="w-6 h-6 mx-auto mb-1 text-sw-primary" />
            <span className="font-bold text-xl">{property.bedrooms}</span>
            <p className="text-sm text-gray-500">Bedrooms</p>
          </div>
          <div className="p-3">
            <Bath className="w-6 h-6 mx-auto mb-1 text-sw-primary" />
            <span className="font-bold text-xl">{property.bathrooms}</span>
            <p className="text-sm text-gray-500">Bathrooms</p>
          </div>
          <div className="p-3">
            <DollarSign className="w-6 h-6 mx-auto mb-1 text-sw-primary" />
            <span className="font-bold text-xl">${property.perNightPrice}</span>
            <p className="text-sm text-gray-500">Per Night</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-sw-dark border-b pb-2 mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-4">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-sw-secondary text-sw-dark rounded-full text-sm font-medium flex items-center shadow-sm"
              >
                <Check className="w-4 h-4 mr-2 text-green-600" />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Widget Column */}
      <div className="lg:col-span-1">
        <BookingForm propertyId={property._id} />
      </div>
    </div>
  );
}