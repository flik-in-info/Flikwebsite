
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection"
import { CoverDemo } from "@/components/CoverDemo";
import ShowCase from "@/components/ShowCase";
import Intro from "@/components/Intro";
import SolutionSection from "@/components/SolutionSection";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CoverDemo/>
      <Intro/>
      <SolutionSection/>
      <ShowCase/>
      
    </div>
  );
}
