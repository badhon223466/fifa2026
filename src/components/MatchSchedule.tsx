import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function MatchSchedule() {
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const config = (window as any).__GOALSTREAM_CONFIG__;

  useEffect(() => {
    if (config?.matches) {
      const filtered = config.matches.filter((m: any) => m.status === 'upcoming');
      setUpcoming(filtered);
    }
  }, [config]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="schedule" className="py-24 bg-neutral-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">The Calendar</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Upcoming Fixtures</h3>
          </div>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest max-w-sm md:text-right">
            Stay updated with the full broadcast schedule for the next 7 days.
          </p>
        </div>

        <div className="grid gap-4">
          {upcoming.map((match, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card p-6 flex flex-col md:grid md:grid-cols-12 items-center gap-6 group hover:translate-x-2 transition-transform"
            >
              <div className="md:col-span-2 flex flex-col items-center md:items-start">
                 <div className="flex items-center gap-2 text-brand-green mb-1">
                    <Calendar size={14} />
                    <span className="text-xs font-black uppercase tracking-widest">{formatDate(match.kickoff)}</span>
                 </div>
                 <div className="flex items-center gap-2 text-neutral-400">
                    <Clock size={14} />
                    <span className="text-sm font-black tabular-nums">{formatTime(match.kickoff)}</span>
                 </div>
              </div>

              <div className="md:col-span-1 hidden md:flex justify-center">
                 <div className="w-[1px] h-12 bg-neutral-800" />
              </div>

              <div className="md:col-span-6 flex items-center justify-center md:justify-start gap-8 w-full">
                 <div className="flex-1 flex items-center justify-end gap-3">
                    <span className="font-black text-sm md:text-lg uppercase tracking-tight text-right">{match.home}</span>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(match.home)}&background=111&color=fff&bold=true`} alt="" className="w-8 h-8 rounded bg-neutral-800" />
                 </div>
                 
                 <div className="px-3 py-1 rounded bg-brand-green/10 border border-brand-green/20 text-[10px] font-black text-brand-green uppercase">VS</div>

                 <div className="flex-1 flex items-center justify-start gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(match.away)}&background=111&color=fff&bold=true`} alt="" className="w-8 h-8 rounded bg-neutral-800" />
                    <span className="font-black text-sm md:text-lg uppercase tracking-tight">{match.away}</span>
                 </div>
              </div>

              <div className="md:col-span-3 flex flex-col items-center md:items-end w-full">
                 <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">{match.league}</span>
                 <div className="flex items-center gap-1.5 text-neutral-400">
                    <MapPin size={12} />
                    <span className="text-[10px] font-black uppercase tracking-tighter truncate max-w-[120px]">{match.venue}</span>
                 </div>
              </div>

              <div className="absolute inset-0 bg-linear-to-r from-brand-green/0 via-brand-green/[0.02] to-brand-green/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
          
          {upcoming.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-neutral-800 rounded-3xl">
               <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-600 italic">No upcoming matches scheduled</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
           <button className="px-8 py-3 rounded-xl border border-neutral-800 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              View Full Season Schedule
           </button>
        </div>
      </div>
    </section>
  );
}
