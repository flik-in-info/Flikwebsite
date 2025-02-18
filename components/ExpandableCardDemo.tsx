"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/components/ui/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(null)
  );

  return (
    
    <> 
    <AnimatePresence>
      {active && typeof active === "object" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10"
        />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {active && typeof active === "object" ? (
        <div className="fixed inset-0  grid place-items-center z-[100]">
          <motion.button
            key={`button-${active.title}-${id}`}
            layout
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}
          >
            <CloseIcon />
          </motion.button>
          <motion.div
            layoutId={`card-${active.title}-${id}`}
            ref={ref}
            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
          >
            <motion.div layoutId={`image-${active.title}-${id}`}>
              <Image
                priority
                width={1920}
                height={1080}
                quality={100}
                src={active.src}
                alt={active.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
              />
            </motion.div>

            <div>
              <div className="flex justify-between items-start p-4">
                <div className="">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-medium text-black dark:text-neutral-200 text-base"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <motion.a
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={active.ctaLink}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                >
                  {active.ctaText}
                </motion.a>
              </div>
              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
    <ul className="max-w-full lg:max-w-[85%] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4 lg:gap-6 px-4 lg:px-8">
      {cards.map((card) => (
        <motion.div
          layoutId={`card-${card.title}-${id}`}
          key={card.title}
          onClick={() => setActive(card)}
          className="p-4 lg:p-5 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer lg:hover:shadow-lg lg:transition-all lg:duration-300"
        >
          <div className="flex gap-4 flex-col w-full">
            <motion.div layoutId={`image-${card.title}-${id}`}>
              <Image
                width={1280}
                height={720}
                quality={100}
                src={card.src}
                alt={card.title}
                className="h-60 lg:h-64 w-full rounded-lg object-cover object-center"
              />
            </motion.div>
            <div className="flex justify-center items-center flex-col lg:py-2">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-bold text-xl text-neutral-800 dark:text-white text-center md:text-left text-base lg:text-lg"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-neutral-600 dark:text-white text-center md:text-left text-base lg:mt-2"
              >
                {card.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      ))}
    </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "High-quality static images for marketing, real estate, and presentations.",
    title: " Photorealistic Rendering",
    src: "https://i.pinimg.com/736x/61/c9/b8/61c9b83b1842f4dba9d1d8708be2c099.jpg",
    ctaText: "Get in Touch",
    ctaLink:
      "https://flik.in/contact",
    content: () => {
      return (
        <p>
          At Flik, we bring architectural designs to life with high-quality photorealistic rendering, creating visually stunning images that showcase every detail with precision. Whether for real estate, marketing, or client presentations, our renders provide a true-to-life representation of spaces, materials, and lighting. With advanced rendering techniques and cutting-edge software, we ensure that each image captures the essence of your design, making it easier for clients to visualize the final project before construction begins. <br /> <br /> Our photorealistic renders help architects, designers, and developers communicate their vision effectively, reducing uncertainties and speeding up decision-making. By emphasizing textures, natural lighting, and environmental effects, we create immersive visuals that evoke emotions and leave a lasting impression. Whether you need high-resolution stills for brochures, website portfolios, or investor presentations, our expertly crafted renders elevate your project’s visual appeal, ensuring it stands out in a competitive market.s
          accolades.
        </p>
      );
    },
  },
  {
    description: "Cinematic video tours showcasing the project dynamically.",
    title: "3D Walkthrough & Animation",
    src: "https://i.pinimg.com/736x/74/89/4b/74894b30898149ea388bbebd0618fb58.jpg",
    ctaText: "Get in Touch",
    ctaLink:
      "https://flik.in/contact",
    content: () => {
      return (
        <p>
          Our 3D walkthroughs and animations bring architectural projects to life with cinematic video tours that showcase every detail dynamically. By simulating real-world lighting, materials, and movement, we create engaging visual experiences that help clients explore spaces before they are built. <br /> <br /> Ideal for presentations, marketing, and real estate, these animations provide a seamless virtual tour, making complex designs easy to understand. Whether it’s a residential property, commercial space, or large-scale development, our high-quality animations enhance storytelling and leave a lasting impression.
        </p>
      );
    },
  },

  {
    description: "Fully interactive experiences for immersive client engagement.",
    title: "360° Virtual Tours & VR",
    src: "https://i.pinimg.com/736x/c8/61/e2/c861e223cfcec851345547f62e841337.jpg",
    ctaText: "Get in Touch",
    ctaLink:
      "https://flik.in/contact",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        </p>
      );
    },
  },
  {
    description: "Unreal Engine or Unity-based interactive models where clients can explore spaces freely.",
    title: "Real-time Interactive Experiences",
    src: "https://i.pinimg.com/736x/69/ed/63/69ed63fa941c264d278e4695b294df0c.jpg",
    ctaText: "Get in Touch",
    ctaLink:
      "https://flik.in/contact",
    content: () => {
      return (
        <p>
          Ideal for presentations, marketing, and real estate, our photorealistic renderings transform concepts into stunning visuals, making complex designs easy to understand. These high-resolution images capture every detail with precision, showcasing textures, lighting, and materials realistically.<br /> <br /> Whether it’s a residential property, commercial space, or large-scale development, our renderings help clients visualize projects before construction begins. By enhancing presentations and marketing materials, they create a powerful impact, ensuring a compelling and immersive experience.
        </p>
      );
    },
  },
];
