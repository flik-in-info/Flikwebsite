import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface TestimonialsSectionProps {
  fadeInUp: { hidden: { opacity: number; y: number }; visible: { opacity: number; y: number } };
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
}

const testimonials = [
  {
    name: "Arjun Reddy",
    role: "Principal Architect, RedDesign Studio",
    initials: "AR",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-300",
    quote: "Flik transformed our architectural vision into stunning reality. The level of detail and photorealism in their work is absolutely incredible. Our clients were amazed by the virtual tours."
  },
  {
    name: "Priya Sharma",
    role: "Director, Luxury Homes Mumbai",
    initials: "PS",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-300",
    quote: "Working with Flik has been a game-changer for our real estate business. The interactive 3D walkthroughs help our clients visualize their future homes perfectly. Highly recommended!"
  },
  {
    name: "Rajesh Kumar",
    role: "CEO, Modern Spaces Pvt Ltd",
    initials: "RK",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-300",
    quote: "The attention to detail and technical expertise at Flik is unmatched. They delivered our project on time with exceptional quality. The VR experience was mind-blowing!"
  },
  {
    name: "Sneha Nair",
    role: "Founder, Nair Architects",
    initials: "SN",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-300",
    quote: "Flik&apos;s architectural visualizations helped us secure major clients. The photorealistic renders and interactive experiences set us apart from the competition. Truly professional work!"
  },
  {
    name: "Vikram Gupta",
    role: "Project Manager, Elite Constructions",
    initials: "VG",
    bgColor: "bg-pink-500/20",
    textColor: "text-pink-300",
    quote: "The team at Flik is incredibly talented and professional. They understood our vision perfectly and delivered beyond our expectations. The 360° tours are absolutely stunning!"
  },
  {
    name: "Anita Mehta",
    role: "Creative Director, Mehta Design House",
    initials: "AM",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-300",
    quote: "Flik&apos;s work speaks for itself. The quality of their architectural visualizations is world-class. They&apos;ve helped us present our projects in the most compelling way possible."
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
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
      <div className="glass-morphism p-8 mb-10">
        <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
          Client Testimonials
        </h2>
        <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
          Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with Flik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
              ))}
            </div>
            <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center`}>
                <span className={`${testimonial.textColor} font-medium`}>{testimonial.initials}</span>
              </div>
              <div>
                <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  {testimonial.name}
                </h4>
                <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};