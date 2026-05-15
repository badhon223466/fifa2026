import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';

export default function LoadingScreen({ isLoaded }: { isLoaded: boolean }) {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative"
          >
            <Trophy size={80} className="text-brand-green" />
            <motion.div 
              className="absolute -inset-4 rounded-full border-2 border-brand-blue opacity-20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 font-display text-4xl font-black tracking-tighter uppercase leading-none"
          >
            WORLD CUP <span className="text-brand-green">2026</span>
          </motion.h2>
          <motion.div 
            className="mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-neutral-800"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-full w-full bg-brand-green"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
