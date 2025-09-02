import React from 'react';
import { motion } from 'framer-motion';
import { responsiveText } from '../../utils/theme';

interface ContactSectionProps {
  fadeInUp: any;
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  fadeInUp,
  handleMouseEnter,
  handleMouseLeave
}) => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="section container-wide"
    >
      <div className="glass-morphism p-8 pb-2 mb-10">
        <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
          Contact Us
        </h2>
        <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
          Drop us a line or two, we are open for creative minds and collaborations!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="glass-morphism p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                  placeholder="John Doe"
                  onMouseEnter={() => handleMouseEnter("")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                  placeholder="name@example.com"
                  onMouseEnter={() => handleMouseEnter("")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                  placeholder="How can we help?"
                  onMouseEnter={() => handleMouseEnter("")}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                  placeholder="Let us know how we can help you..."
                  onMouseEnter={() => handleMouseEnter("")}
                  onMouseLeave={handleMouseLeave}
                ></textarea>
              </div>
              <motion.button
                className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
                  const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                  const subject = (document.getElementById('subject') as HTMLInputElement)?.value || '';
                  const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || '';

                  const mailtoLink = `mailto:flik.in.info@gmail.com?subject=${encodeURIComponent(subject || 'Contact Form Submission')}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                  )}`;

                  window.location.href = mailtoLink;
                }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass-morphism p-8">
            <h3 className="text-xl font-semibold mb-6" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    flik.in.info@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Mumbai, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Response Time</p>
                  <p className="text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};