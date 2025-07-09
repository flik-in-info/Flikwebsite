'use client';

import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onMouseEnter: (element: string) => void;
  onMouseLeave: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onMouseEnter,
  onMouseLeave,
}) => {
  const tabs = ['home', 'portfolio', 'about', 'contact'];

  return (
    <nav className="flex justify-center mb-16">
      <div className="backdrop-blur-md bg-black/20 rounded-full p-1">
        <ul className="flex space-x-2">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={`px-6 py-3 rounded-full text-white/80 hover:text-white transition-colors ${activeTab === tab ? 'bg-white/5' : ''
                  }`}
                onClick={() => {
                  setActiveTab(tab);
                  const element = document.getElementById(tab);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => onMouseEnter('button')}
                onMouseLeave={onMouseLeave}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 