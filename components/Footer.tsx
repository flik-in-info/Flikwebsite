import { FaTwitter, FaInstagram,FaLinkedin  } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 border-t border-gray-300 text-center">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          Drop us a line or two, we are open for creative minds and collaborations!
        </h2>

        {/* Button */}
        <div className="mt-6">
          <button className="relative px-6 py-3 bg-black text-white rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
            Contact Us now
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 blur-md opacity-50"></span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 flex justify-center space-x-8 text-lg font-medium">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Works</a>
          <a href="#" className="hover:underline">Support</a>
        </nav>

        {/* Social Media Icons */}
        <div className="mt-6 flex justify-center space-x-6 text-xl">
          <a href="#" className="hover:text-gray-500"><GrMail /></a>
          <a href="#" className="hover:text-gray-500"><FaLinkedin /></a>
          <a href="#" className="hover:text-gray-500"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-500"><FaInstagram /></a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          {/* Logo */}
          <div className="font-bold text-lg">
            <span className="text-green-500">/</span>HASTOK
          </div>

          {/* Copyright & Links */}
          <div className="mt-4 md:mt-0">
            <span>© Copyright 2021, All Rights Reserved</span>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
