import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <img src="/images/Hero(1).png" alt="Hero Mobile" />
      ) : (
        <img src="/images/Hero(2).png" alt="Hero Desktop" />
      )}
    </div>
  );
}
