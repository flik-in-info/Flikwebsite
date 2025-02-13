'use client'
import React, { ReactNode } from "react";
import styled from "styled-components";

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <StyledWrapper>
      <div className="outer">
        <div className="dot" />
        <div className="card">
          <div className="ray" />
          <div className="text">{title}</div>
          {children} {/* Render children inside the Card */}
          <div className="line topl" />
          <div className="line leftl" />
          <div className="line bottoml" />
          <div className="line rightl" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  // .outer {
  //   width: 100%;
  //   height: auto;
  //   border-radius: 10px;
  //   padding: 1px;
  //   background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
  //   position: relative;
  // }
  .dot {
    width: 5px;
    aspect-ratio: 1;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 0 10px #ffffff;
    border-radius: 100px;
    z-index: 2;
    right: 2%;
    top: 1%;
    animation: moveDot 12s linear infinite;
  }

  @keyframes moveDot {
    0% { top: 1%; right: 2%; }
    25% { top: 1%; right: 98%; }
    50% { top: 98%; right: 98%; }
    75% { top: 98%; right: 2%; }
    100% { top: 1%; right: 2%; }
  }

  @media (min-width: 768px) {
    // .dot {
    //   top: 2%;
    //   animation-duration: 6s;
    // }
    
    // @keyframes moveDot {
    //   0% { top: 2%; right: 2%; }
    //   25% { top: 2%; right: 98%; }
    //   50% { top: 98%; right: 98%; }
    //   75% { top: 98%; right: 2%; }
    //   100% { top: 2%; right: 2%; }
    // }
  }

  .card {
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 9px;
    border: solid 1px #202222;
    background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    color: #fff;
  }
  .ray {
    width: 220px;
    height: 45px;
    border-radius: 100px;
    position: absolute;
    background-color: #c7c7c7;
    opacity: 0.4;
    box-shadow: 0 0 50px #fff;
    filter: blur(10px);
    transform-origin: 10%;
    top: 0%;
    left: 0;
    transform: rotate(40deg);
  }
  .card .text {
    padding-top: 2%;
    font-weight: bolder;
    font-size: 4rem;
    background: linear-gradient(45deg, #000000 4%, #fff, #000);
    background-clip: text;
    color: transparent;
  }
  .line {
  position: absolute;
  background-color: #2c2c2c;
}

// .topl {
//   top: 1%;
//   @media (min-width: 768px) {
//     top: 2%;
//   }
//   left: 5%;
//   width: 90%; /* Ensures it doesn't overflow */
//   height: 1px;
//   background: linear-gradient(90deg, #888888 30%, #1d1f1f 70%);
// }

// .bottoml {
//   bottom: 2%; /* Adjusted from 10% */
//   @media (min-width: 768px) {
//     bottom: 2%;
//   }
//   left: 5%;
//   width: 90%;
//   height: 1px;
// }

// .leftl {
//   left: 2%; /* Adjusted from 10% */
//   top: 5%;
//   width: 1px;
//   height: 90%; /* Adjusted height */
//   background: linear-gradient(180deg, #747474 30%, #222424 70%);
// }

// .rightl {
//   right: 2%; /* Adjusted from 10% */
//   top: 5%;
//   width: 1px;
//   height: 90%;
// }
`;

export default Card;