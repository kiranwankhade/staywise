import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sw-secondary text-sw-dark border-t border-sw-dark/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Company Info / Logo */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-3xl font-serif font-extrabold text-sw-primary mb-3">
              STAYWISE
            </h3>
            <p className="text-sm">
              Your gateway to luxury and relaxation. Book your perfect home away
              from home with us.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-sw-primary transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-sw-primary transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sw-primary transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-sw-dark">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block hover:text-sw-primary transition">
                Home
              </Link>
              <Link
                href="/properties"
                className="block hover:text-sw-primary transition"
              >
                Properties
              </Link>
              <Link
                href="/about"
                className="block hover:text-sw-primary transition"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block hover:text-sw-primary transition"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-sw-dark">Resources</h4>
            <nav className="space-y-2 text-sm">
              <Link
                href="/faq"
                className="block hover:text-sw-primary transition"
              >
                FAQ
              </Link>
              <Link
                href="/terms"
                className="block hover:text-sw-primary transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="block hover:text-sw-primary transition"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-bold text-lg mb-4 text-sw-dark">
              Get in Touch
            </h4>
            <p className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-sw-primary flex-shrink-0" />
              <span>
                UBG-74,75, Phoenix Paragon Plaza, Kamani, Kurla (West), Mumbai
                400 070
              </span>
            </p>
            <p className="flex items-center space-x-2 mt-2 text-sm">
              <Phone className="w-4 h-4 text-sw-primary flex-shrink-0" />
              <span>+91-9892967030</span>
            </p>
            <p className="flex items-center space-x-2 mt-2 text-sm">
              <Mail className="w-4 h-4 text-sw-primary flex-shrink-0" />
              <span>support@staywise.com</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-sw-dark/10 text-center text-sm">
          &copy; {currentYear} StayWise, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
