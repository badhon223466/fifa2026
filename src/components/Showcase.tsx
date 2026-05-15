import { motion } from 'motion/react';
import { User, Twitter, Instagram, Globe } from 'lucide-react';

const TEAMS = [
  { name: 'Argentina', rank: 1, star: 'Lionel Messi', color: '#75AADB', logo: 'https://flagcdn.com/w40/ar.png' },
  { name: 'France', rank: 2, star: 'Kylian Mbappé', color: '#002395', logo: 'https://flagcdn.com/w40/fr.png' },
  { name: 'Brazil', rank: 3, star: 'Vinícius Jr.', color: '#FEDF00', logo: 'https://flagcdn.com/w40/br.png' },
  { name: 'England', rank: 4, star: 'Jude Bellingham', color: '#CF081F', logo: 'https://flagcdn.com/w40/gb-eng.png' },
];

export default function Showcase() {
  return (
    <section id="teams" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest text-brand-green">Star Players to Watch</h2>
          <button className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] hover:text-white">Full Squads</button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEAMS.map((team, i) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-full aspect-square bg-neutral-900 bento-card overflow-hidden relative border border-transparent group-hover:border-brand-green">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20 group-hover:opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-black to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-2 mb-1">
                      <img src={team.logo} alt="" className="w-4 h-3 object-cover rounded-xs" aria-hidden="true" />
                      <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{team.name}</span>
                   </div>
                   <h4 className="text-xl font-black uppercase tracking-tighter group-hover:text-brand-green transition-colors">{team.star.split(' ').pop()}</h4>
                </div>
              </div>
              <div className="flex items-center justify-between w-full px-2">
                 <span className="text-[11px] font-black uppercase tracking-widest">{team.star}</span>
                 <span className="text-[9px] font-black text-neutral-600">RANK #{team.rank}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
