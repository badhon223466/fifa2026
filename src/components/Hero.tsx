import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background with Stadium feel */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/20 via-neutral-950/60 to-neutral-950" />
        <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-transparent to-transparent opacity-60" />
        
        {/* Animated gradients */}
        <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-brand-green/20 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center pt-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 py-1.5 pl-1.5 pr-4 w-fit uppercase tracking-widest leading-none">
            <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-black text-white animate-pulse">
              LIVE
            </span>
            <span className="text-[10px] font-black text-neutral-400 tracking-tighter">Premium Sports Streaming</span>
          </div>

          <h1 className="mb-6 text-6xl font-black leading-[0.85] tracking-tighter sm:text-7xl lg:text-9xl uppercase italic">
            Streaming <br />
            <span className="text-brand-green drop-shadow-[0_0_20px_rgba(0,230,118,0.4)]">Football</span> Live.
          </h1>

          <p className="mb-8 text-lg text-neutral-400 sm:text-xl max-w-xl font-medium tracking-tight">
            Access the world's biggest matches in full HD. No registration, no delay. Just pure football action from every corner of the globe.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <motion.a
              href="#watch"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-green text-black font-black text-sm uppercase rounded-full transition-all hover:bg-white shadow-[0_0_30px_rgba(0,230,118,0.4)]"
            >
              Watch Live Now
            </motion.a>
            <motion.a
              href="#live"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neutral-800/80 backdrop-blur border border-neutral-700 rounded-full font-black text-sm uppercase text-white hover-elevate transition-all"
            >
              Live Scores
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Stats Overlay (Desktop Only) */}
        <div className="absolute bottom-12 right-8 hidden flex-col gap-4 lg:flex">
          {[
            { label: 'Active Streams', value: '12+' },
            { label: 'Avg Latency', value: '0.4s' },
            { label: 'Global Fans', value: '78K' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="bg-neutral-900/50 backdrop-blur-md border border-white/5 flex flex-col items-end rounded-2xl p-6 text-right shadow-2xl"
            >
              <span className="text-3xl font-black text-brand-green">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
