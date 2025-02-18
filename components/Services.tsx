"use client"
import React from 'react'
import { ExpandableCardDemo } from './ExpandableCardDemo'

export const Services = () => {
  return (
    <div>
      <h1 className='text-6xl font-bold text-center mt-11'>Services</h1>
      <br /> 
      <p className='text-center text-lg lg:text-3xl'>At Flik, we specialize in high-end architectural visualization, delivering stunning, immersive, and interactive experiences. Our services are designed to bring your vision to life with precision and realism, helping you present projects in the most compelling way possible.</p>
      <ExpandableCardDemo/>
    </div>
  )
}
