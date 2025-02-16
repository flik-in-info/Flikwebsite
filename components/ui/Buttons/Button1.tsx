import React from 'react';
import styled from 'styled-components';

const Button = ({ text }: { text: string }) => {
  return (
    <StyledWrapper>
      <button className="button">
        {text}
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    position: relative;
    padding: 10px 24px;
    font-size: 18px;
    color: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 34px;
    background-color: transparent;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    background-color: rgb(193, 163, 98);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button:hover::before {
    scale: 5;
    background-color: #0b2916;
  }

  .button:hover {
    color: #4ecc7c;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98,0.4);
  }

  .button:active {
    scale: 1;
  }`;

export default Button;
