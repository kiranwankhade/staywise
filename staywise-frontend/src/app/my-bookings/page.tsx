'use client';
import { useState, useEffect } from 'react';
import { IBooking } from '../../types/property';
import { useAuth } from '../../hooks/useAuth';
import api from '../../lib/api';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Key, Shield } from 'lucide-react';

export default function BookingsPage() {
  const { user, isLoading, isAdmin } = useAuth();
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoading || !user) {
        if (!user) setLoadingBookings(false);
        return;
    }

    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings');
        // const userBooking = res.data.filter((u:any) => u.userID === user._id)
        setBookings(res.data);
      } catch (err: any) {
        // Handle 401/403 errors gracefully
        if (err.response?.status === 401) {
            setError('Your session expired. Please log in again.');
        } else {
            setError('Failed to fetch bookings. Please try again.');
        }
        console.error(err);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user, isLoading]);

  if (isLoading || loadingBookings) {
    return <Loader />;
  }

  if (!user) {
    return (
        <div className="text-center py-20 text-xl text-red-600 bg-white p-10 rounded-xl shadow-xl">
            Please log in to view your bookings.
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-serif font-extrabold text-sw-dark mb-10 text-center">
        {isAdmin ? <Shield className='inline w-8 h-8 mr-2 text-red-600'/> : <Key className='inline w-8 h-8 mr-2 text-sw-primary'/>} 
        {isAdmin ? 'All Guest Reservations' : 'My Reservations'}
      </h1>

      {error && <p className="text-center text-red-500 mb-6">{error}</p>}

      <div className="space-y-6">
        {bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow-xl text-center text-gray-500 text-xl">
            You have no active bookings. Start exploring our properties!
          </div>
        ) : (
          bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-sw-primary transition duration-300 hover:shadow-2xl"
            >
              <div className='mb-4 md:mb-0'>
                <h2 className="text-3xl font-bold text-sw-dark">{booking.propertyId.title}</h2>
                <p className="text-gray-500 mt-1 flex items-center">
                    <MapPin className='w-4 h-4 mr-2 text-sw-primary'/> {booking.propertyId.location}
                </p>
                <p className="text-gray-700 font-medium mt-3 text-lg flex items-center">
                  <Calendar className='w-5 h-5 mr-2 text-green-600'/> Booked Date: <span className="ml-2 text-green-700 font-bold">{booking.date}</span>
                </p>
                {isAdmin && (
                  <p className="text-sm text-gray-400 mt-2">User ID: {booking.userId}</p>
                )}
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <p className="text-4xl font-extrabold text-sw-primary flex items-center">
                  <DollarSign className='w-6 h-6 mr-1'/> {booking.propertyId.perNightPrice}
                </p>
                <p className="text-sm text-gray-400 mt-1">per night</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}