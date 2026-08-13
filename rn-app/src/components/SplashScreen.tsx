"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Only show the splash screen once per session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (!hasSeenSplash) {
      setIsVisible(true);
      
      // Start fading out after 2.5 seconds
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 2500);

      // completely remove after 3 seconds
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative animate-[scale-up_1.5s_ease-out]">
        <img 
          src="/logo.jpeg" 
          alt="R.N. Enterprises Logo" 
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-[0_0_40px_rgba(38,50,56,0.3)] ring-4 ring-primary/20 animate-pulse"
        />
        <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" style={{ animationDuration: '3s' }}></div>
      </div>
      <h1 className="mt-8 font-headline-display text-4xl text-primary animate-[fade-in-up_1s_ease-out_0.5s_both]">
        R.N. Enterprises
      </h1>
      <p className="mt-4 font-body-lg text-on-surface-variant animate-[fade-in-up_1s_ease-out_1s_both]">
        Architectural Integrity in Every Grain.
      </p>
    </div>
  );
}
