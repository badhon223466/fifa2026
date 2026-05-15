import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdPlaceholder({ position = "in-content" }: { position?: "header" | "sidebar" | "in-content" }) {
  const [ads, setAds] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Firebase positions are header, sidebar, footer. Mapping "in-content" to footer for management
    const pos = position === "in-content" ? "footer" : position;
    const q = query(collection(db, 'ads'), where('position', '==', pos), where('isActive', '==', true));
    
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setAds([]);
      }
      setCurrentIndex(0);
    });
    return unsub;
  }, [position]);

  useEffect(() => {
    if (ads.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000); // Cycle every 5 seconds

    return () => clearInterval(timer);
  }, [ads.length]);

  const styles = {
    header: "relative mx-auto h-24 w-full max-w-4xl bg-neutral-900 border border-dashed border-neutral-800 flex items-center justify-center text-[10px] font-bold tracking-widest text-neutral-600 rounded-2xl my-4 uppercase overflow-hidden group/ad",
    sidebar: "relative h-64 w-full bg-neutral-900 border border-dashed border-neutral-800 flex items-center justify-center text-[10px] font-bold tracking-widest text-neutral-600 rounded-3xl uppercase overflow-hidden group/ad",
    "in-content": "relative h-32 w-full bg-neutral-900 border border-dashed border-neutral-800 flex items-center justify-center text-[10px] font-bold tracking-widest text-neutral-600 rounded-3xl my-8 uppercase overflow-hidden group/ad",
  };

  const currentAd = ads[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  return (
    <div className={styles[position]}>
      <AnimatePresence mode="wait">
        {currentAd ? (
          <motion.a 
            key={currentAd.id || currentAd.imageUrl}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            href={currentAd.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full relative block"
          >
            <img src={currentAd.imageUrl} alt="Advertisement" className="w-full h-full object-cover" />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Carousel Indicators */}
            {ads.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {ads.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-brand-green' : 'w-1 bg-white/20'}`}
                  />
                ))}
              </div>
            )}
          </motion.a>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            AD SPACE [{position.toUpperCase()}]
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Controls */}
      {ads.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/50 hover:text-white hover:bg-black/60 opacity-0 group-hover/ad:opacity-100 transition-all duration-300 cursor-pointer"
            aria-label="Previous ad"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-3 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/50 hover:text-white hover:bg-black/60 opacity-0 group-hover/ad:opacity-100 transition-all duration-300 cursor-pointer"
            aria-label="Next ad"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}
