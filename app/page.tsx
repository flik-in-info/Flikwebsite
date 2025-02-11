
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection"
import { CoverDemo } from "@/components/CoverDemo";
import ShowCase from "@/components/ShowCase";
import Intro from "@/components/Intro";
import Panorama from "@/components/ui/Panorama";
import Panorama2 from "@/components/ui/Panorama2";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CoverDemo/>
      <Intro/>
      <ShowCase/>
      
    </div>
  );
}
