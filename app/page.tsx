
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection"
import { CoverDemo } from "@/components/CoverDemo";
import ShowCase from "@/components/ShowCase";
import Intro from "@/components/Intro";
import SolutionSection, { Scrolltxt } from "@/components/SolutionSection";
import { Services } from "@/components/Services";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar/>
      <HeroSection/>
      <CoverDemo/>
      <Intro/>
      <SolutionSection/>
      <ShowCase/>
      <Services/>
      <Scrolltxt/>
      <Footer/>
      
    </div>
  );
}
