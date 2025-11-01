// components/FancyHeading.js
import React, { useState } from 'react';

const FancyHeading = ({
  text = 'Scam Shield',
  fontSize = '5rem',
  colorFrom = '#00FFA3',
  colorTo = '#00B3FF',
  blurLayers = 4
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 40;
    const y = (e.clientY - innerHeight / 2) / 40;
    setMousePos({ x, y });
  };

  const layers = Array.from({ length: blurLayers }, (_, i) => {
    const blur = (i + 1) * 2;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          color: `rgba(255, 255, 255, ${0.1 + i * 0.1})`,
          textShadow: `${mousePos.x * (i + 1)}px ${mousePos.y * (i + 1)}px ${blur}px rgba(0,0,0,0.2)`,
          filter: `blur(${blur}px)`,
          pointerEvents: 'none',
        }}
      >
        {text}
      </div>
    );
  });

  return (
    <div
      className="relative inline-block font-extrabold select-none"
      style={{ fontSize }}
      onMouseMove={handleMouseMove}
    >
      {/* Blur Layers */}
      {layers}

      {/* Main Gradient Text Layer */}
      <span
        className="relative bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          zIndex: 10,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default FancyHeading;
