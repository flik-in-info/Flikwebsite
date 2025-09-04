'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
}

interface ParticleBackgroundProps {
  className?: string;
}

export default function ParticleBackground({ className = "fixed inset-0 z-0 pointer-events-none" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Spatial partitioning configuration
    const CONNECTION_DISTANCE = 80;
    const GRID_SIZE = CONNECTION_DISTANCE; // Grid cell size equals connection distance
    let gridCols = 0;
    let gridRows = 0;
    let spatialGrid: Set<number>[][] = [];

    // Set canvas size and initialize spatial grid
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize spatial partitioning grid
      gridCols = Math.ceil(canvas.width / GRID_SIZE);
      gridRows = Math.ceil(canvas.height / GRID_SIZE);
      spatialGrid = Array(gridRows).fill(null).map(() => 
        Array(gridCols).fill(null).map(() => new Set<number>())
      );
    };

    // Get grid coordinates for a particle
    const getGridCoords = (x: number, y: number) => {
      return {
        col: Math.floor(x / GRID_SIZE),
        row: Math.floor(y / GRID_SIZE)
      };
    };

    // Add particle to spatial grid
    const addToGrid = (particleIndex: number, x: number, y: number) => {
      const { col, row } = getGridCoords(x, y);
      if (row >= 0 && row < gridRows && col >= 0 && col < gridCols) {
        spatialGrid[row][col].add(particleIndex);
      }
    };

    // Get nearby particles using spatial partitioning
    const getNearbyParticles = (particleIndex: number, x: number, y: number): number[] => {
      const { col, row } = getGridCoords(x, y);
      const nearbyParticles: number[] = [];
      
      // Check current cell and 8 adjacent cells
      for (let r = Math.max(0, row - 1); r <= Math.min(gridRows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(gridCols - 1, col + 1); c++) {
          spatialGrid[r][c].forEach(otherIndex => {
            if (otherIndex !== particleIndex) {
              nearbyParticles.push(otherIndex);
            }
          });
        }
      }
      
      return nearbyParticles;
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(window.innerWidth / 10); // Adjust particle density

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          color: `rgba(16, 185, 129, ${Math.random() * 0.3 + 0.1})`,
        });
      }
    };

    // Animation loop with spatial partitioning
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Clear spatial grid
      spatialGrid.forEach(row => row.forEach(cell => cell.clear()));
      
      // Update particle positions and add to spatial grid
      particlesRef.current.forEach((particle, index) => {
        // Simple animation without mouse interaction
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Add particle to spatial grid
        addToGrid(index, particle.x, particle.y);
      });
      
      // Draw particles and connections using spatial partitioning
      const drawnConnections = new Set<string>();
      
      particlesRef.current.forEach((particle, index) => {
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect to nearby particles using spatial partitioning
        const nearbyParticles = getNearbyParticles(index, particle.x, particle.y);
        
        nearbyParticles.forEach(otherIndex => {
          // Avoid duplicate connections
          const connectionKey = `${Math.min(index, otherIndex)}-${Math.max(index, otherIndex)}`;
          if (drawnConnections.has(connectionKey)) return;
          
          const otherParticle = particlesRef.current[otherIndex];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / CONNECTION_DISTANCE)})`;
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            
            drawnConnections.add(connectionKey);
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Set up and start animation
    setCanvasSize();
    initParticles();
    animate();
    
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
}