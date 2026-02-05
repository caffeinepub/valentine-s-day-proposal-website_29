import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  life: number;
}

export default function Fireworks() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'oklch(0.75 0.25 15)',
      'oklch(0.85 0.20 340)',
      'oklch(0.90 0.15 350)',
      'oklch(0.95 0.10 355)',
      'oklch(0.98 0.05 360)',
      'oklch(0.80 0.22 10)'
    ];

    const createFirework = (centerX: number, centerY: number) => {
      const newParticles: Particle[] = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: centerX,
          y: centerY,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          velocity: 2 + Math.random() * 3,
          life: 1
        });
      }

      return newParticles;
    };

    const fireworkPositions = [
      { x: 20, y: 30 },
      { x: 80, y: 25 },
      { x: 50, y: 40 },
      { x: 35, y: 20 },
      { x: 65, y: 35 }
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      const pos = fireworkPositions[currentIndex % fireworkPositions.length];
      const newParticles = createFirework(pos.x, pos.y);
      
      setParticles(prev => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles(prev => 
          prev.filter(p => !newParticles.find(np => np.id === p.id))
        );
      }, 2000);

      currentIndex++;
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-firework-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
            '--angle': `${particle.angle}rad`,
            '--velocity': particle.velocity
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
