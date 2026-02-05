import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';
import Fireworks from '@/components/Fireworks';

interface TeasingPopup {
  id: number;
  text: string;
  x: number;
  y: number;
}

function App() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonInitialized, setIsNoButtonInitialized] = useState(false);
  const [teasingPopups, setTeasingPopups] = useState<TeasingPopup[]>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const teasingPhrases = [
    "No",
    "really",
    "no way",
    "you silly girl"
  ];

  const teasingPopupMessages = [
    "Think again! 💭",
    "Are you sure? 🤔",
    "Really? 😢",
    "Please? 🥺",
    "One more chance! 💕",
    "Don't be shy! 😊",
    "Come on! 💝",
    "Pretty please? 🌹"
  ];

  const currentNoLabel = teasingPhrases[noClickCount % teasingPhrases.length];

  // Initialize No button position on mount
  useEffect(() => {
    if (!containerRef.current || isNoButtonInitialized) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Start with a safe position on the right side
    const initialX = containerRect.width * 0.6;
    const initialY = containerRect.height * 0.5;
    
    setNoButtonPosition({ x: initialX, y: initialY });
    setIsNoButtonInitialized(true);
  }, [isNoButtonInitialized]);

  // Calculate safe random position within viewport
  const getRandomPosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Button dimensions (approximate)
    const buttonWidth = 200;
    const buttonHeight = 80;
    const padding = 40;

    const maxX = containerRect.width - buttonWidth - padding;
    const maxY = containerRect.height - buttonHeight - padding;

    const newX = Math.max(padding, Math.random() * maxX);
    const newY = Math.max(padding, Math.random() * maxY);

    return { x: newX, y: newY };
  };

  // Desktop: proximity-based evasion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current || !containerRef.current || showSuccess || !isNoButtonInitialized) return;

      const button = noButtonRef.current;
      const buttonRect = button.getBoundingClientRect();

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + 
        Math.pow(e.clientY - buttonCenterY, 2)
      );

      const proximityThreshold = 120;

      if (distance < proximityThreshold) {
        setNoButtonPosition(getRandomPosition());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showSuccess, isNoButtonInitialized]);

  // Mobile: touch-based evasion
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!noButtonRef.current || !containerRef.current || showSuccess || !isNoButtonInitialized) return;

      const button = noButtonRef.current;
      const buttonRect = button.getBoundingClientRect();
      const touch = e.touches[0];

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distance = Math.sqrt(
        Math.pow(touch.clientX - buttonCenterX, 2) + 
        Math.pow(touch.clientY - buttonCenterY, 2)
      );

      const proximityThreshold = 100;

      if (distance < proximityThreshold) {
        setNoButtonPosition(getRandomPosition());
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => window.removeEventListener('touchmove', handleTouchMove);
  }, [showSuccess, isNoButtonInitialized]);

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);

    // Spawn popup at random screen position
    if (typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Random position with padding from edges
      const padding = 100;
      const randomX = padding + Math.random() * (viewportWidth - padding * 2);
      const randomY = padding + Math.random() * (viewportHeight - padding * 2);
      
      const popupMessage = teasingPopupMessages[Math.floor(Math.random() * teasingPopupMessages.length)];
      
      const newPopup: TeasingPopup = {
        id: Date.now() + Math.random(),
        text: popupMessage,
        x: randomX,
        y: randomY
      };

      setTeasingPopups(prev => [...prev, newPopup]);

      // Remove popup after animation completes
      setTimeout(() => {
        setTeasingPopups(prev => prev.filter(p => p.id !== newPopup.id));
      }, 3000);
    }

    // Move button to new position immediately
    setNoButtonPosition(getRandomPosition());
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Premium Valentine Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-valentine-light via-valentine-medium to-valentine-dark">
        <div className="absolute inset-0 bg-gradient-radial-overlay opacity-40" />
        <div className="absolute inset-0 bg-texture-grain opacity-20" />
      </div>
      
      <FloatingHearts />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div ref={containerRef} className="w-full max-w-2xl relative min-h-[600px]">
          {!showSuccess ? (
            <div className="text-center space-y-12 animate-fade-in">
              {/* Cartoon Kitty Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src="/assets/generated/proposal-kitty-cartoon.dim_768x768.png" 
                    alt="Cute cartoon kitty with heart"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain animate-pulse-slow drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-valentine-glow rounded-full blur-3xl opacity-50 animate-pulse-slow" />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight animate-bounce-subtle">
                  Victoria will you be my valentine ?
                </h1>
              </div>

              {/* Buttons */}
              <div className="relative flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button
                  onClick={handleYesClick}
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-valentine-yes-start to-valentine-yes-end hover:from-valentine-yes-end hover:to-valentine-yes-start text-white font-bold text-2xl md:text-3xl px-12 py-8 rounded-full shadow-2xl hover:shadow-valentine-glow transition-all duration-300 hover:scale-110 border-4 border-white/30"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Yes 💖
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>

                {/* Persistent No Button - Always visible and positioned */}
                <Button
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-2xl md:text-3xl px-12 py-8 rounded-full shadow-2xl transition-all duration-200 border-4 border-white/50 touch-manipulation"
                  style={{
                    position: isNoButtonInitialized ? 'absolute' : 'relative',
                    left: isNoButtonInitialized ? `${noButtonPosition.x}px` : 'auto',
                    top: isNoButtonInitialized ? `${noButtonPosition.y}px` : 'auto',
                    transition: 'left 0.3s ease-out, top 0.3s ease-out',
                    visibility: isNoButtonInitialized ? 'visible' : 'visible'
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {currentNoLabel} 💔
                  </span>
                </Button>
              </div>

              {/* Floating Teasing Popups */}
              {teasingPopups.map(popup => (
                <div
                  key={popup.id}
                  className="fixed pointer-events-none z-50 animate-teasing-popup-drift"
                  style={{
                    left: `${popup.x}px`,
                    top: `${popup.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-white text-valentine-dark px-6 py-3 rounded-full shadow-2xl font-bold text-lg whitespace-nowrap border-4 border-valentine-medium">
                    {popup.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center space-y-12 animate-fade-in relative z-10">
              <Fireworks />
              
              {/* Kitty Success Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src="/assets/generated/kitty-love.dim_512x512.png" 
                    alt="Happy kitty"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain animate-heart-beat drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-valentine-glow rounded-full blur-3xl opacity-70 animate-pulse" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg leading-tight animate-bounce-subtle">
                  Yayyyy! ❤️
                </h1>
                <p className="text-3xl md:text-5xl font-semibold text-white/95 drop-shadow-md">
                  You're my Valentine!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center">
        <p className="text-white/80 text-sm md:text-base font-medium drop-shadow">
          © 2026. Built with <span className="inline-block animate-pulse">❤️</span> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
