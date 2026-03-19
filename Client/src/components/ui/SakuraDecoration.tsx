
import React from 'react';

export const SakuraDecoration: React.FC = () => {

  const petals = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 7}s`,
    size: `${12 + Math.random() * 12}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-sakura-fall"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        >
          <div 
            className="bg-gradient-to-br from-sakura-300 to-sakura-400 rounded-[150%_0_150%_0] opacity-60 rotate-45"
            style={{ 
              width: petal.size, 
              height: petal.size,
              boxShadow: '0 0 10px rgba(255,183,201,0.3)',
            }}
          >
            <div className="absolute -top-1 left-1 w-1/2 h-1/2 bg-sakura-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};