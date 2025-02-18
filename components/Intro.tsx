"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Inter, Manrope } from "next/font/google";
import Panorama2 from "./ui/Panorama2";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const showcaseItems = [
  {
    id: "01",
    img: "https://i.pinimg.com/736x/a8/51/ed/a851ed6513c50cb2ce38333fb8708f02.jpg",
    title: "360° Panoramic Views",
  },
  {
    id: "02",
    img: "https://i.pinimg.com/736x/43/39/04/43390448b37ddb3f552f4925a03a3cbc.jpg",
    title: "Surrounding information",
  },
  {
    id: "03",
    video: "https://files.catbox.moe/c34fyr.mp4",
    title: "Archviz Application",
  },
  {
    id: "04",
    img: "https://i.pinimg.com/736x/81/b1/a7/81b1a70f8b01b0f74f4f6de9804cd2d4.jpg",
    title: "Real Time Rendering",
  },
];

const colSpanClasses = [
  "md:col-span-5 lg:col-span-5",
  "md:col-span-7 lg:col-span-7",
  "md:col-span-7 lg:col-span-7",
  "md:col-span-5 lg:col-span-5",
];

interface ShowcaseItemProps {
  item: {
    id: string;
    img?: string;
    video?: string;
    title: string;
  };
  index: number;
}

const ShowcaseItem = React.memo(({ item, index }: ShowcaseItemProps) => {
  return (
    <motion.article
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut" }}
      viewport={{ once: false }}
      className={`relative col-span-12 ${colSpanClasses[index]} h-[250px] md:h-[300px] lg:h-[350px] rounded-xl overflow-hidden`}
    >
      <div className="w-auto h-full">
        {index === 0 ? (
          <Panorama2 />
        ) : item.video ? (
          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          <Image
            src={item.img ?? "/fallback.jpg"}
            alt={item.title ?? "Default Title"}
            height={400}
            width={800}
            className="h-full w-full object-cover rounded-xl"
            priority={false}
          />
        )}
      </div>
      <div className="absolute bottom-2 text-black w-full p-3 flex justify-between items-center">
        <h3 className="lg:text-lg text-xs backdrop-blur-xl text-white rounded-lg p-2 px-3">
          {item.title}
        </h3>
        {/* <div className="lg:w-10 w-8 lg:h-10 h-8 text-white grid place-content-center rounded-full bg-black">
          <MoveUpRight size={16} />
        </div> */}
      </div>
    </motion.article>
  );
});
ShowcaseItem.displayName = "ShowcaseItem";

export default function Showcase() {
  return (
    <div className={`${inter.variable} ${manrope.variable}`}>
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="mb-6">
          <h1 className="font-inter text-4xl font-bold text-left">
            Elevating Architectural Visualization with Cutting-Edge Technology
          </h1>
          <p className="text-lg max-w-2xl text-left mt-2 font-manrope">
            At Flik, we transform ideas into stunning visual experiences. Using
            advanced rendering, cinematic animations, and immersive 360°
            panoramas, we bring architectural designs to life with precision and
            realism. Explore spaces like never before—where technology meets
            imagination.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-6 overflow-hidden px-5 lg:pb-5 pb-2">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
