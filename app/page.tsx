
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection"
import { CoverDemo } from "@/components/CoverDemo";
import ShowCase from "@/components/ShowCase";
import Intro from "@/components/Intro";
import SolutionSection, { Scrolltxt } from "@/components/SolutionSection";
import { Services } from "@/components/Services";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar/>
      <HeroSection/>
      <CoverDemo/>
      <Intro/>
      <SolutionSection/>
      <Services/>
      <Scrolltxt/>
      <ShowCase/>
    </div>
  );
}
