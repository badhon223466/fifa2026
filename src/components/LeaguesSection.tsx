import { motion } from 'motion/react';
import { Trophy, ArrowRight } from 'lucide-react';

const LEAGUES = [
  { name: "UEFA Champions League", short: "UCL", img: "https://images.unsplash.com/photo-1543351611-58f6a1836f90?q=80&w=800&auto=format&fit=crop", count: "32 Clubs" },
  { name: "Premier League", short: "EPL", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop", count: "20 Clubs" },
  { name: "La Liga", short: "ESP", img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop", count: "20 Clubs" }
];

export default function LeaguesSection() {
  return (
    <section id="leagues" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">Tournaments</h2>
          <h3 className="text-4xl font-black uppercase tracking-tighter italic">Major Leagues</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEAGUES.map((league, idx) => (
            <motion.div
              key={league.short}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                 <img 
                   src={league.img} 
                   alt={league.name} 
                   className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                 <div className="absolute top-4 right-4 bg-brand-green text-black text-[10px] font-black px-2 py-1 rounded shadow-lg">
                    {league.short}
                 </div>
              </div>

              <div className="p-8">
                 <div className="flex items-center gap-2 mb-2">
                    <Trophy size={14} className="text-brand-green" />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{league.count}</span>
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-brand-green transition-colors">{league.name}</h4>
                 
                 <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white transition-all">
                    <span>View Matches</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-all" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
