'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import { Inter, Manrope } from 'next/font/google';

interface ProjectsTypes {
  id: string;
  img: string;
  title: string;
  des: string;
}

const projects: ProjectsTypes[] = [
  {
    id: '01',
    img: 'https://i.pinimg.com/736x/a8/51/ed/a851ed6513c50cb2ce38333fb8708f02.jpg',
    title: 'Keyboard shortcuts',
    des: 'Work efficiently with instant access to common actions.',
  },
  {
    id: '02',
    img: 'https://i.pinimg.com/736x/43/39/04/43390448b37ddb3f552f4925a03a3cbc.jpg',
    title: 'Team Planner',
    des: 'Keep track of the bigger picture by viewing all tasks in one centralized team calendar.',
  },
  {
    id: '03',
    img: 'https://i.pinimg.com/736x/43/39/04/43390448b37ddb3f552f4925a03a3cbc.jpg',
    title: 'Time-blocking',
    des: 'Transform daily tasks into structured time blocks for focused productivity.',
  },
  {
    id: '04',
    img: 'https://i.pinimg.com/736x/a8/51/ed/a851ed6513c50cb2ce38333fb8708f02.jpg',
    title: 'Notifications',
    des: 'Keep up to date with any changes by receiving instant notifications.',
  },
];

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter', // Creates a CSS variable
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope', // Creates a CSS variable
});


export default function Showcase() {
  return (
    <div className={`${inter.variable} ${manrope.variable}`}>
      <section className="max-w-7xl mx-auto px-5 py-12">
        {/* Heading & Description */}
        <div className="mb-6">
          <h1 className="font-inter text-4xl font-bold text-left">Elevating Architectural Visualization with Cutting-Edge Technology</h1>
          <p className="text-lg max-w-2xl text-left mt-2 font-manrope ">
            Flik delivers high-quality architectural renderings, including 360-degree views, walk-throughs, and VR experiences. We empower architects, developers, and real estate professionals to bring ideas to life with precision, speed, and seamless collaboration.


          </p>
        </div>

        {/* Updated Grid Layout */}
        <div className="grid grid-cols-12 gap-6 overflow-hidden px-5 lg:pb-5 pb-2">
          {projects.map((project, index) => {
            let colSpanClass = 'sm:col-span-6 col-span-12';
            if (index === 0) {
              colSpanClass = 'sm:col-span-5 col-span-12';
            } else if (index === 1) {
              colSpanClass = 'sm:col-span-7 col-span-12';
            } else if (index === projects.length - 2) {
              colSpanClass = 'sm:col-span-7 col-span-12';
            } else if (index === projects.length - 1) {
              colSpanClass = 'sm:col-span-5 col-span-12';
            }
            return (
              <motion.article
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeOut' }}
                viewport={{ once: false }}
                className={`relative ${colSpanClass} h-[250px] md:h-[300px] lg:h-[350px]`}
              >
                <div className="w-auto h-full">
                  <Image
                    src={project?.img}
                    alt={'image'}
                    height={400}
                    width={800}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute bottom-2 text-black w-full p-3 flex justify-between items-center">
                  <h3 className="lg:text-lg text-xs bg-black text-white rounded-lg p-2 px-3">
                    {project.title}
                  </h3>
                  <div className="lg:w-10 w-8 lg:h-10 h-8 text-white grid place-content-center rounded-full bg-black">
                    <MoveUpRight size={16} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
