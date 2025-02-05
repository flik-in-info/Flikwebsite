"use client";
import Link from 'next/link';
import { useState } from 'react';

const menuItems = ["Home", "Products", "Services", "Blog", "Contacts"];
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="fixed w-full backdrop-blur-sm z-20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">Flik</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <Link key={item} href="#" className="hover:text-gray-600 transition text-white">
              {item}
            </Link>
          ))}
          {/* Date & Contact Button */}
          <div className="flex items-center gap-4">
            <button className="bg-green-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none text-white "
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="bg-white p-4 space-y-4">
          {menuItems.map((item) => (
            <Link key={item} href="#" className="block py-2 hover:text-gray-600">
              {item}
            </Link>
          ))}
          <div className="pt-4 border-t">     
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
