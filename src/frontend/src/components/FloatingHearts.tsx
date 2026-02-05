import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const newHearts: HeartParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      size: 20 + Math.random() * 30
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle pattern overlay with better opacity for premium look */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: 'url(/assets/generated/floating-hearts-pattern.dim_1024x768.png)',
          backgroundSize: '800px 600px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            bottom: '-50px'
          }}
        >
          <Heart
            className="text-white/20 fill-white/10"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`
            }}
          />
        </div>
      ))}
    </div>
  );
}
