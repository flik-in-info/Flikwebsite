import React from 'react'

const Intro = () => {
  return (
    <>
       <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
       <h2 
        style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          lineHeight: '1.2', // Reduces extra height
        }}
      >
        Elevating Architectural Visualization with Cutting-Edge Technology
      </h2>
      <p 
        style={{ 
          marginBottom: '1rem', 
          fontSize: '1rem', 
          lineHeight: '1.5' 
        }}
      >
        Flik delivers high-quality architectural renderings, including 360-degree views, walk-throughs, and VR experiences. We empower architects, developers, and real estate professionals to bring ideas to life with precision, speed, and seamless collaboration.
      </p>

    </section>
    
    </>
  )
}

export default Intro