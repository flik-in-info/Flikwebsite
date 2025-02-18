'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const ContactPage: React.FC = () => {
  const buttonStyle =
    'p-3 rounded-full text-white text-xl flex items-center justify-center w-12 h-12 backdrop-blur-md bg-opacity-60';
  const inputField =
    'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black backdrop-blur-md bg-white bg-opacity-60';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    industry: '',
    solution: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_a51ay0i', // Replace with your Email.js Service ID
        'template_v7bquse', // Replace with your Email.js Template ID
        formData,
        'uCioExiIAZTh2ekXF' // Replace with your Email.js Public Key
      );
      setMessage('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', industry: '', solution: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setMessage('Failed to send message. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" className={inputField} value={formData.name} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Your Phone" className={inputField} value={formData.phone} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" className={inputField} value={formData.email} onChange={handleChange} required />
          
          <select name="solution" className={inputField} value={formData.solution} onChange={handleChange} required>
            <option value="">Select Your Solution</option>
            <option>Walkthrough</option>
            <option>3D Tour</option>
            <option>Archviz Application</option>
            <option>Other</option>
          </select>
          <textarea name="message" placeholder="Your Message" className={inputField} value={formData.message} onChange={handleChange} required></textarea>
          
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full border-2 border-[#3d7069] bg-[#3d7069] text-white py-3 rounded-lg shadow-md 
                       hover:bg-[#071919] hover:text-xl transition backdrop-blur-md bg-opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Submit Now'}
          </motion.button>

          {/* Success or Error Message */}
          {message && <p className="text-center mt-4 text-lg">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
