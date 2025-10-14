import Link from 'next/link';
import { ArrowRight, Home, Key, Star, ShieldCheck } from 'lucide-react';

import pool from "./pool.jpg"

export default function HomePage() {
  return (
    <main className="flex flex-col gap-20">
      
      <section className="relative h-[80vh] flex items-center justify-center -mt-5">
        <div 
          className="w-full absolute inset-0 bg-cover bg-center opacity-80 rounded-xl shadow-2xl" 
          style={{backgroundImage: `url(${pool.src || pool})`}}
        >
          <div className="absolute inset-0 bg-black/50"></div> 
        </div>
        
        <div className="relative z-10 p-10 text-white max-w-2xl text-center">
          <h1 className="text-6xl font-serif font-extrabold tracking-tight mb-4 text-shadow-lg">
            Enjoy Your Dream Vacation
          </h1>
          <p className="text-xl mb-8 font-medium">
            Discover your ultimate relaxation with StayWise, your home away from home.
          </p>
          <Link href="/properties">
            <button className="px-8 py-4 bg-sw-primary text-white text-lg font-bold rounded-lg 
              shadow-xl hover:bg-sw-dark transition duration-300 flex items-center mx-auto">
              Explore Our Rooms
              <ArrowRight className="w-5 h-5 ml-2"/>
            </button>
          </Link>
        </div>
      </section>
      
      {/* 2. WHY CHOOSE US SECTION (New Scrollable Content) */}
      <section className="text-center">
        <h2 className="text-4xl font-serif font-bold mb-4 text-sw-dark">Why Choose StayWise?</h2>
        <p className="text-lg text-gray-600 mb-12">The perfect blend of luxury service and homely comfort.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-sw-primary">
            <Star className="w-10 h-10 text-sw-primary mb-4 mx-auto"/>
            <h3 className="text-xl font-semibold mb-2">5-Star Experience</h3>
            <p className="text-gray-600">Hand-picked properties with guaranteed quality and premium amenities.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-sw-primary">
            <Home className="w-10 h-10 text-sw-primary mb-4 mx-auto"/>
            <h3 className="text-xl font-semibold mb-2">Local Comfort</h3>
            <p className="text-gray-600">Unique accommodations that feel like a local, luxury home.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg border-t-4 border-sw-primary">
            <ShieldCheck className="w-10 h-10 text-sw-primary mb-4 mx-auto"/>
            <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
            <p className="text-gray-600">Easy, transparent, and secure online reservation process.</p>
          </div>
        </div>
      </section>

      {/* 3. CTA: DISCOVER PROPERTIES (New Scrollable Content) */}
      <section className="bg-sw-secondary p-12 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl mb-6 md:mb-0">
          <h2 className="text-3xl font-serif font-bold mb-3 text-sw-dark">Ready for Your Getaway?</h2>
          <p className="text-gray-700 text-lg">
            Explore our exclusive collection of villas, apartments, and resorts designed for your ultimate relaxation.
          </p>
        </div>
        <Link href="/properties">
          <button className="px-8 py-3 bg-sw-primary text-white text-lg font-bold rounded-lg 
            shadow-lg hover:bg-sw-dark transition duration-300 flex items-center">
            View All Properties
            <ArrowRight className="w-5 h-5 ml-2"/>
          </button>
        </Link>
      </section>
      
    </main>
  );
}