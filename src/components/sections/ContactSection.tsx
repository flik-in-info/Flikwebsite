import React from 'react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  fadeInUp: { hidden: { opacity: number; y: number }; visible: { opacity: number; y: number } };
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
        <div className="lg:col-span-12">
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
                <div className="flex justify-center">
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
                </div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};