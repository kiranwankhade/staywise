import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import React from "react"
import AnimatedPage from '../components/AnimatedPage'
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "StayWise | Luxury Stays",
  description: "Book your luxury accommodation with StayWise.",
  icons: {
    icon: "https://res.cloudinary.com/dtv4en8be/image/upload/v1760463366/W_1_oxidj2.png", 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AnimatedPage>
                {children}
            </AnimatedPage>
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}