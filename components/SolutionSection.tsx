'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Card from "@/components/ui/Card";

const solutions = [
  {
    title: "AI-Powered Optimization",
    description: "Enhance performance with real-time AI-driven adjustments.",
    image: "https://i.pinimg.com/736x/f5/ea/06/f5ea0631219c51b2bc78ecb69b1af76c.jpg",
  },
  {
    title: "Ultra-Responsive Design",
    description: "Experience seamless interactions across all devices.",
    image: "https://i.pinimg.com/736x/31/54/42/3154425838bf85764cec81a466a448f8.jpg",
  },
  {
    title: "Secure & Scalable",
    description: "Built with enterprise-level security and infinite scalability.",
    image: "https://i.pinimg.com/236x/8c/89/5d/8c895d68027d0c947c837caf3753ed60.jpg",
  },
  {
    title: "Real-Time Rendering",
    description: "Your interactive real-time walkthroughs allow clients to explore designs in 3D, like a virtual tour.",
    image: "https://i.pinimg.com/236x/cb/fa/70/cbfa703ffda38d7d8ef4cbe86941051b.jpg",
  },
  {
    title: "Cloud-Based Accessibility",
    description: "Cost-effective & scalable, enabling more professionals to access cutting-edge visualization tools..",
    image: "https://i.pinimg.com/736x/bb/bd/e0/bbbde06fbd009bdc19181e86f031284b.jpg",
  },
  {
    title: "Interactive 3D Walkthroughs",
    description: "Improves client understanding and reduces last-minute revisions..",
    image: "https://i.pinimg.com/736x/07/da/a3/07daa3f2599ee112e6964ab0a852da6b.jpg",
  },
];

export default function SolutionSection() {
    return (
      <Card title="Our Premium Solutions">
        <section className="relative w-full py-10 bg-transparent text-white px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative p-6 rounded-2xl border border-white/20 shadow-[0px_0px_20px_5px_rgba(255,255,255,0.2)]
                hover:shadow-[0px_0px_30px_10px_rgba(255,187,118,0.4)]
                bg-white/10 backdrop-blur-md transition-all"
              >
                {/* Background Glow */}
                <div className="absolute -top-5 -right-5 w-16 h-16  rounded-full blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-12 h-12  rounded-full blur-xl"></div>

                {/* Image */}
                <div className="relative w-full h-48 mb-6">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-gray-300 text-sm">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </Card>
    );
  }