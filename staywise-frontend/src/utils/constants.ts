"use client"
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// This is where you would define static navigation items, etc.
export const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'My Bookings', href: '/my-bookings' },
];