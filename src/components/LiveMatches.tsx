import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Circle, MapPin, Tv } from 'lucide-react';

export default function LiveMatches() {
  const [matches, setMatches] = useState<any[]>([]);
  const config = (window as any).__GOALSTREAM_CONFIG__;

  useEffect(() => {
    if (config?.matches) {
      const filtered = config.matches.filter((m: any) => m.status === 'live');
      setMatches(filtered);
    }
  }, [config]);

  // Helper to get initials or crest placeholder
  const getCrest = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111&color=fff&bold=true`;
  };

  return (
    <section id="live" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-brand-green/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">Live Action</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Ongoing Matches</h3>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] text-red-600 font-black uppercase tracking-widest leading-none">Real-time Feed</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bento-card p-6 flex flex-col gap-6 group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                 <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-neutral-400">
                   {match.league}
                 </span>
                 {match.status === 'live' && (
                   <span className="text-[10px] font-black text-red-500 animate-pulse">{match.liveMin}'</span>
                 )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(match.home)}&background=00e676&color=000&bold=true`} alt="" className="w-8 h-8 rounded-lg shadow-lg" />
                    <span className="font-black text-sm uppercase tracking-tight">{match.home}</span>
                  </div>
                  {match.status === 'live' && (
                    <span className="text-2xl font-black tabular-nums">{match.liveScore[0]}</span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(match.away)}&background=333&color=fff&bold=true`} alt="" className="w-8 h-8 rounded-lg shadow-lg" />
                    <span className="font-black text-sm uppercase tracking-tight">{match.away}</span>
                  </div>
                  {match.status === 'live' && (
                    <span className="text-2xl font-black tabular-nums">{match.liveScore[1]}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-1.5">
                    <MapPin size={10} className="text-brand-green" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{match.venue}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <Tv size={10} className="text-brand-green" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{match.channel}</span>
                 </div>
              </div>

              <div className="absolute inset-0 border-2 border-brand-green/0 group-hover:border-brand-green/10 rounded-3xl transition-all pointer-events-none" />
            </motion.div>
          ))}
          
          {matches.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl">
               <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-600 italic">No matches scheduled for today</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
