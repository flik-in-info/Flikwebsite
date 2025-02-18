// {menuItems.map((item) => (
//   <motion.div
//     key={item.name}
//     whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
//     transition={{ duration: 0.3 }}
//   >
//     {/* Update href to link to the corresponding section or page */}
//     <Link href={item.target === "about" ? "/about" : `#${item.target}`} className="hover:text-gray-600 transition text-white">
//       {item.name}
//     </Link>
//   </motion.div>

"use client";
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import com_logo from "@/images/com_logo.png";

// Step 1: Update the menuItems to include both 'name' and 'target' for each section
const menuItems = [
  { name: "Home", target: "home" },          // Target: home section
  { name: "Services", target: "services" },   // Target: services section
  { name: "Showcase", target: "showcase" },   // Target: showcase section
  { name: "About Us", target: "about",href:"/about" },    // Target: about us page
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Step 2: Function to toggle the menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="absolute w-full backdrop-blur-lg z-20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <Link href="/">
          <Image
            src={com_logo} 
            alt="Flik Logo"
            width={45}
            height={45}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Navigation - Displays the menu items horizontally on large screens */}
        <div className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
              transition={{ duration: 0.3 }}
            >
              {/* Update href to link to the corresponding section by ID */}
              <Link href={item.target === "about" ? "/about" : `#${item.target}`} className="hover:text-gray-600 transition text-white">
                {item.name}
              </Link>
            </motion.div>
          ))}
          
          {/* Contact Button */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <button className="bg-[#071919] text-white px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-[#3d704a] transition text-sm md:text-base lg:text-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden text-2xl focus:outline-none text-white transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation - Shows a vertical list of menu items when the menu is open */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="bg-[#ffffff] p-4 space-y-4">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.target === "about" ? "/about" : `#${item.target}`} className="block py-2 hover:text-gray-600">
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t">
            <Link href="/contact">
              <button className="w-full bg-[#071919] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-[#3d7069] transition text-sm sm:text-base">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
