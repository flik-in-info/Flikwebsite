
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection"
import { CoverDemo } from "@/components/CoverDemo";
import ShowCase from "@/components/ShowCase";
import Intro from "@/components/Intro";

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
