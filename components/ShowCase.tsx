import React from 'react'
import Particles from './ui/Practicals';
const ShowCase = () => {
  return (
    <div>

    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Particles
        particleColors={['#91fe7c', '#ffffff']}
        particleCount={800}
        particleSpread={10}
        speed={0.3}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
    </div>
  )
}

export default ShowCase