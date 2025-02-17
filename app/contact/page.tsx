'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  const buttonStyle = 'p-3 rounded-full text-white text-xl flex items-center justify-center w-12 h-12 backdrop-blur-md bg-opacity-60';
  const inputField = 'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black backdrop-blur-md bg-white bg-opacity-60';

  return (
    <div 
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen 
                 bg-cover bg-center md:bg-contain text-white px-4 py-12 lg:px-48 gap-12"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/a2/3f/31/a23f31f28e6704de60a2e506614dd653.jpg')" }}
    >
      {/* Left Side */}
      <div className="lg:w-2/5 p-6 lg:p-20 text-center lg:text-left flex flex-col justify-center backdrop-blur-md bg-white bg-opacity-20 rounded-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight">Have Any Questions?</h2>
        <p className="mt-4 text-xs sm:text-sm lg:text-lg opacity-80 leading-relaxed">
          Need assistance? Get in touch with us for any queries or project discussions. We’re happy to help!
        </p>
        {/* Contact Buttons */}
        <div className="flex justify-center lg:justify-start mt-6 space-x-3">
          <a href="https://wa.me/9686111327" target="_blank" rel="noopener noreferrer" className={`bg-green-500 ${buttonStyle}`}>
            <FaWhatsapp />
          </a>
          <a href="tel:+919686111327" className={`bg-blue-500 ${buttonStyle}`}>
            <FaPhone />
          </a>
          <a href="mailto:Contact@flik.in" className={`bg-red-500 ${buttonStyle}`}>
            <FaEnvelope />
          </a>
          <a href="https://www.google.co.in/maps/place/Mumbai,+Maharashtra/" target="_blank" rel="noopener noreferrer" className={`bg-yellow-500 ${buttonStyle}`}>
            <FaMapMarkerAlt />
          </a>
        </div>
      </div>
      
      {/* Right Side - Contact Form */}
      <div className="lg:w-3/5 p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg text-black max-w-2xl w-full backdrop-blur-md bg-white bg-opacity-60">
        <form className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" className={inputField} />
          <input type="tel" name="phone" placeholder="Your Phone" className={inputField} />
          <input type="email" name="email" placeholder="Your Email" className={inputField} />
          <select name="industry" className={inputField}>
            <option>Select Your Industry</option>
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
          </select>
          <select name="solution" className={inputField}>
            <option>Select Your Solution</option>
            <option>Web Development</option>
            <option>App Development</option>
            <option>AI & Automation</option>
          </select>
          <textarea name="message" placeholder="Your Message" className={inputField}></textarea>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full border-2 border-[#3d7069] bg-[#3d7069] text-white py-3 rounded-lg shadow-md 
                       hover:bg-[#071919] hover:text-xl transition backdrop-blur-md bg-opacity-60"
          >
            Submit Now
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
