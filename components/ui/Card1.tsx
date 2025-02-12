'use client'
import React from "react";
import { StyledWrapper } from "./Style/Card.styles";

interface Card1Props {
  title: string;
  className?: string;
  content?: {
    title: string;
    description: string;
    // Add any other content properties you need
  };
}

const Card = ({ title, className, content }: Card1Props) => {
  return (
    <StyledWrapper className={className}>
      <div className="card">
        <div className="content">
          <span>{title}</span>
          {content && (
            <div>
              <h2>{content.title}</h2>
              <p>{content.description}</p>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Card;
