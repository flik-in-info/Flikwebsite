"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Card from "@/components/ui/Card";
import BlurText from "./ui/BlurText";
import TextAnimation from "@/components/ui/Scroll-text";
import React from "react";

const solutions = [
  {
    title: "AI-Powered Optimization",
    description: "Enhance performance with real-time AI-driven adjustments.",
    image:
      "https://i.pinimg.com/736x/f5/ea/06/f5ea0631219c51b2bc78ecb69b1af76c.jpg",
  },
  {
    title: "Ultra-Responsive Design",
    description: "Experience seamless interactions across all devices.",
    image:
      "https://i.pinimg.com/736x/31/54/42/3154425838bf85764cec81a466a448f8.jpg",
  },
  {
    title: "Secure & Scalable",
    description:
      "Built with enterprise-level security and infinite scalability.",
    image:
      "https://i.pinimg.com/236x/8c/89/5d/8c895d68027d0c947c837caf3753ed60.jpg",
  },
  {
    title: "Real-Time Rendering",
    description:
      "Your interactive real-time walkthroughs allow clients to explore designs in 3D, like a virtual tour.",
    image:
      "https://i.pinimg.com/236x/cb/fa/70/cbfa703ffda38d7d8ef4cbe86941051b.jpg",
  },
  {
    title: "Cloud-Based Accessibility",
    description:
      "Cost-effective & scalable, enabling more professionals to access cutting-edge visualization tools.",
    image:
      "https://i.pinimg.com/736x/bb/bd/e0/bbbde06fbd009bdc19181e86f031284b.jpg",
  },
  {
    title: "Interactive 3D Walkthroughs",
    description:
      "Improves client understanding and reduces last-minute revisions.",
    image:
      "https://i.pinimg.com/736x/07/da/a3/07daa3f2599ee112e6964ab0a852da6b.jpg",
  },
];

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export function Scrolltxt() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="py-20 text-center">
        <TextAnimation
          text="Transform Your Vision Into Reality. Now."
          variants={{
            hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: { ease: "linear" },
            },
          }}
          classname="text-4xl md:text-4xl capitalize font-bold"
        />

        <TextAnimation
          as="p"
          letterAnime={true}
          text="Unlock a new standard of excellence with precision, performance, and innovation. Experience seamless efficiency and unparalleled quality today."
          classname="text-xl md:text-xl w-full md:w-3/5 mx-auto lowercase leading-7 mt-6"
          variants={{
            hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
        />
        <>
          <svg className="clipppy absolute -top-[999px] -left-[999px] w-0 h-0">
            <defs>
              <clipPath id="clip-another2" clipPathUnits={"objectBoundingBox"}>
                <path
                  d="M0.1145 0.139138L0.235656 0.0147291C0.244771 0.0053695 0.257945 0 0.271794 0H0.5H0.96C0.982091 0 1 0.016076 1 0.0359066V0.964093C1 0.983924 0.982091 1 0.96 1H0.04C0.0179086 1 0 0.983924 0 0.964093V0.5V0.265845C0 0.255659 0.00428628 0.24585 0.0120005 0.238381L0.1145 0.139138Z"
                  fill="#D9D9D9"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex justify-center mt-8">
            <div className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px]  bg-white border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <figure style={{ clipPath: "url(#clip-another2)" }}>
                <img
                  className="transition-all duration-300 aspect-[4/5] min-h-full align-bottom object-cover hover:scale-105 w-full"
                  src="https://i.pinimg.com/736x/7e/2b/53/7e2b533e992bf7f4569c0fa04566e33a.jpg"
                  alt="Featured visual"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </>
      </div>

      <div className="">
        <TextAnimation
          text="Elevate your business with precision and efficiency."
          direction="left"
          lineAnime={true}
          classname="text-4xl md:text-4xl font-semibold capitalize"
        />
        <TextAnimation
          as="p"
          letterAnime={true}
          text="Streamline your operations and maximize productivity with our cutting-edge solutions."
          classname="text-xl md:text-xl w-full md:w-3/5 mx-auto lowercase leading-7 mt-6"
          variants={{
            hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
        />
        <>
          <svg className="clipppy absolute -top-[999px] -left-[999px] w-0 h-0">
            <defs>
              <clipPath id="clip-goey5" clipPathUnits={"objectBoundingBox"}>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z"
                  fill="#D9D9D9"
                />
              </clipPath>
            </defs>
          </svg>

          <div className="flex justify-center md:justify-end lg:justify-center mt-8 md:mt-0 lg:mt-1 relative z-10">
            <section className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px] bg-white border rounded-lg p-3 sm:p-4 md:p-5">
              <figure className="p-4 sm:p-6 md:p-8 group hover:p-2 sm:hover:p-3 md:hover:p-4 transition-all duration-200 bg-gradient-to-b to-[#022641] from-[#356778] rounded-lg sm:rounded-xl">
                <div style={{ clipPath: "url(#clip-goey5)" }}>
                  <img
                    className="transition-all duration-300 align-bottom aspect-square object-cover group-hover:scale-110 w-full"
                    src="https://i.pinimg.com/736x/dd/5c/ed/dd5ced3b2549974324f6a4b97f6224de.jpg"
                    alt="Business solutions"
                    loading="lazy"
                  />
                </div>
              </figure>
            </section>
          </div>
        </>
      </div>

      <div className="py-10">
        <TextAnimation
          text="Let's create something remarkable together."
          direction="right"
          lineAnime={true}
          classname="text-4xl md:text-4xl font-semibold capitalize text-right"
        />
        <TextAnimation
          as="p"
          letterAnime={true}
          text="Partner with us to turn your vision into an extraordinary digital reality."
          classname="text-xl md:text-xl w-full md:w-3/5 mx-auto lowercase leading-7 mt-6"
          variants={{
            hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
        />
        <>
          <svg className="clipppy absolute -top-[999px] -left-[999px] w-0 h-0">
            <defs>
              <clipPath id="clip-another3" clipPathUnits={"objectBoundingBox"}>
                <path
                  d="M0 0.0351351C0 0.0157306 0.0174609 0 0.039 0H0.5H0.727414C0.741798 0 0.755513 0.00547207 0.765179 0.0150678L0.858 0.107207L0.98622 0.236143C0.995093 0.245066 1 0.256625 1 0.268605V0.5V0.964865C1 0.984269 0.982539 1 0.961 1H0.039C0.0174609 1 0 0.984269 0 0.964865V0.0351351Z"
                  fill="#D9D9D9"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="flex justify-center mt-8">
            <div className="w-[280px] sm:w-[300px] md:w-[320px] lg:w-[280px] xl:w-[300px]  bg-white border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <figure style={{ clipPath: "url(#clip-another3)" }}>
                <img
                  className="transition-all duration-300 aspect-[4/5] min-h-full align-bottom object-cover hover:scale-105 w-full"
                  src="https://i.pinimg.com/736x/0d/fc/b8/0dfcb8bcda7f7776f1cfa5cd2f00a2b7.jpg"
                  alt=""
                />
              </figure>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <Card title="">
      <BlurText
        animationFrom={{
          filter: "blur(10px)",
          opacity: 0,
          transform: "translate3d(0,-50px,0)",
        }}
        animationTo={[
          {
            filter: "blur(5px)",
            opacity: 0.5,
            transform: "translate3d(0,5px,0)",
          },
          {
            filter: "blur(0px)",
            opacity: 1,
            transform: "translate3d(0,0,0)",
          },
        ]}
        text="Our Premium Solutions"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="mb-8 text-center pt-4 font-bold text-5xl bg-gradient-to-r from-white via-gray-400 to-black bg-clip-text"
      />

      <section className="relative w-full py-10 px-4 md:px-8 lg:px-16 bg-transparent text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotateX: 5 }}
                className="relative p-6 rounded-2xl border border-white/20 shadow-xl bg-white/10 backdrop-blur-md transition-all group hover:shadow-[0px_0px_40px_10px_rgba(255,187,118,0.3)]"
              >
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-300 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-300 text-sm">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Card>
  );
}
