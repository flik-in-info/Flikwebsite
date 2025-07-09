'use client';

import React from 'react';

const ShineEffect: React.FC = () => (
  <div className="absolute -inset-[500px] animate-[spin_15s_linear_infinite] opacity-20">
    <div className="absolute top-1/2 left-1/2 w-[1000px] h-[200px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent rotate-45"></div>
    <div className="absolute top-1/2 left-1/2 w-[1000px] h-[200px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -rotate-45"></div>
  </div>
);

export default ShineEffect; 