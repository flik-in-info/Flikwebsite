"use client";
import React from "react";
import styled from "styled-components";
import Particles from "./ui/Practicals";
import { AuroraText } from "@/components/magicui/aurora-text";
import Button1 from "./ui/Buttons/Button1";

const ShowCase = () => {
  return (
    <>
    <div className="border-b-2 border-black w-full mx-auto mt-5"></div>
    <h1 className="text-5xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-center mt-10">
          Visual <AuroraText>Showcase</AuroraText>
        </h1>
        <h1 className="text-2xl font-bold tracking-tighter md:text-2xl lg:text-4xl text-center mt-10">Our Showcase – Experience Architectural Excellence</h1>
        <p className="text-center mt-10 text-lg lg:text-3xl">
  At <strong>Flik</strong>, we bring architecture to life through cutting-edge visualization techniques. Explore our portfolio and immerse yourself in stunning, lifelike experiences.
</p>
<h4 className="text-center mt-10 lg:text-3xl hidden md:block">
  Step into the world of <strong>Flik</strong>, where creativity meets precision. Our <strong>Photo Gallery</strong> showcases breathtaking high-resolution renders, capturing every intricate detail with stunning realism. The <strong>Video Gallery</strong> takes you on cinematic walkthroughs, offering a dynamic and immersive perspective of architectural spaces. For a truly interactive experience, our <strong>Panorama Section</strong> allows you to explore environments in full 360°, making you feel as if you are standing right inside the design.  
  <br /><br />
  Experience architectural visualization like never before—crafted with passion, innovation, and an unwavering commitment to excellence.
</h4>

    
    <StyledContainer>
      <div className="content">
        <div className="gallery-container flex justify-center items-center">
          
          <PhotoGallery />
          <VideoGallery />
          <Panorama />
          

        </div>
        <Particles
          particleColors={["#406a2c", "#406a2c"]}
          particleCount={800}
          particleSpread={10}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
    </StyledContainer>

    </>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 70vh; /* Default height for desktop */
  position: relative;

  @media (max-width: 1024px) {
    height: 130vh; /* Tablet view */
  }

  @media (max-width: 768px) {
    height: 150vh; /* Mobile view */
  }

  
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    // padding-top: 20px; /* Optional: Adds more top spacing */
  }

  h1 {
    margin-bottom: 40px; /* Adds space between the title and the cards */
    margin-top: 30px;
  }

  .gallery-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(
      -50%,
      -50%
    ); /* Centering both horizontally & vertically */
    display: flex;
    gap: 20px;
    z-index: 1;
    flex-wrap: wrap;
    padding: 20px;
    max-width: 1200px;
    width: 100%;
    flex-direction: row;
    align-items: center; /* Centers items vertically */
    justify-content: center; /* Centers items horizontally */
  }
`;

const PhotoGallery = () => {
  return (
    <StyledWrapper>
      <div
        className="card"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/8f/cc/dc/8fccdca8101e6689147fd2c5a3ea99e2.jpg')",
        }}
      >
        <div className="details">
          <div className="cardHeader">Photo Gallery</div>
          <div className="cardText">
            Explore our photo gallery showcasing stunning visuals and creative
            designs.
          </div>
          <div className="button" onClick={() => window.open('https://flik.in/glyimg', '_blank')}>
            <Button1 text="View Gallery"/>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const VideoGallery = () => {
  return (
    <StyledWrapper>
      <div
        className="card"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/04/0c/da/040cdaa8cd7cb8eb2bd1731cd67e3529.jpg",
        }}
      >
        <div className="details">
          <div className="cardHeader">Video Gallery</div>
          <div className="cardText">
            Discover our collection of high-quality videos showcasing creativity
            and innovation.
          </div>
          <div className="button" onClick={() => window.open('https://flik.in/glyvid', '_blank')}>
            <Button1 text="View Videos"/>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const Panorama = () => {
  return (
    <StyledWrapper>
      <div
        className="card"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/09/59/98/095998c1541e85b669e5fcd3d9532c0a.jpg",
        }}
      >
        <div className="details">
          <div className="cardHeader">Panorama</div>
          <div className="cardText">
            Experience breathtaking panoramic views and immersive environments.
          </div>
          <div className="button" onClick={() => window.open('https://flik.in/glypan ', '_blank')}>
            <Button1 text="View Panorama"/>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  .card {
    position: relative;
    width: 100%;
    max-width: 250px;
    min-width: 200px;
    height: 350px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 7.5px;
    transition: 0.5s ease;
    color: white;
    flex: 1 1 250px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 3px solid black;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.5);
  }

  /* Increase card size for desktop */
  @media (min-width: 1024px) {
    .card {
      max-width: 300px;
      height: 400px;
    }
  }

  /* Move the title higher */
  .details {
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 5px;
    transform: translateY(70%); /* Move it up */
    transition: all 0.5s ease;
    background: rgba(0, 0, 0, 0.6); /* Optional: Darken text area */
    padding: 10px;
    border-radius: 5px;
  }

  .cardHeader {
    font-size: 1.5rem;
    font-weight: bold;
  }

  

  .card:hover .details {
    transform: translateY(0%);
    transition-delay: 0.5s;
  }

  .card:hover {
    transform: scale(1.1);
    border-radius: 15px;
  }

  @media (max-width: 768px) {
    .card {
      max-width: 80%;
      height: 280px;
    }
  }
`;

export default ShowCase;
