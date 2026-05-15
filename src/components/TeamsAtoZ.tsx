import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Globe } from 'lucide-react';

const TEAMS = [
  { name: "AC Milan", short: "ACM", league: "Serie A", color: "from-red-700 to-black" },
  { name: "Ajax", short: "AJX", league: "Eredivisie", color: "from-red-600 to-white" },
  { name: "Arsenal", short: "ARS", league: "Premier League", color: "from-red-600 to-rose-900" },
  { name: "Atletico Madrid", short: "ATM", league: "La Liga", color: "from-red-700 to-white" },
  { name: "Barcelona", short: "BAR", league: "La Liga", color: "from-blue-700 to-red-700" },
  { name: "Bayern Munich", short: "BAY", league: "Bundesliga", color: "from-red-700 to-blue-900" },
  { name: "Benfica", short: "BEN", league: "Primeira Liga", color: "from-red-700 to-white" },
  { name: "Borussia Dortmund", short: "BVB", league: "Bundesliga", color: "from-yellow-400 to-black" },
  { name: "Chelsea", short: "CHE", league: "Premier League", color: "from-blue-700 to-blue-900" },
  { name: "Inter Milan", short: "INT", league: "Serie A", color: "from-blue-700 to-black" },
  { name: "Juventus", short: "JUV", league: "Serie A", color: "from-zinc-900 to-zinc-700" },
  { name: "Liverpool", short: "LIV", league: "Premier League", color: "from-red-700 to-rose-950" },
  { name: "Manchester City", short: "MCI", league: "Premier League", color: "from-sky-400 to-sky-700" },
  { name: "Manchester United", short: "MUN", league: "Premier League", color: "from-red-700 to-yellow-600" },
  { name: "Napoli", short: "NAP", league: "Serie A", color: "from-sky-500 to-blue-800" },
  { name: "Newcastle", short: "NEW", league: "Premier League", color: "from-zinc-900 to-zinc-700" },
  { name: "Paris Saint-Germain", short: "PSG", league: "Ligue 1", color: "from-blue-900 to-red-700" },
  { name: "Real Madrid", short: "RMA", league: "La Liga", color: "from-white to-yellow-500" },
  { name: "Tottenham", short: "TOT", league: "Premier League", color: "from-white to-blue-800" },
];

export default function TeamsAtoZ() {
  const [search, setSearch] = useState("");
  
  const filtered = TEAMS.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.league.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc: any, team) => {
    const char = team.name[0].toUpperCase();
    if (!acc[char]) acc[char] = [];
    acc[char].push(team);
    return acc;
  }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <section id="teams" className="py-24 bg-neutral-900/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">Directory</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Teams A-Z</h3>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search teams or leagues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-brand-green outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-12">
          {letters.map(letter => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green font-black text-xl">
                  {letter}
                </div>
                <div className="flex-1 h-[1px] bg-linear-to-r from-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {grouped[letter].map((team: any) => (
                  <motion.div
                    key={team.name}
                    whileHover={{ scale: 1.05 }}
                    className="bg-neutral-900 border border-white/5 p-4 rounded-2xl hover-elevate cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${team.color} flex items-center justify-center text-xs font-black shadow-lg`}>
                          {team.short}
                       </div>
                       <div className="min-w-0">
                          <div className="text-sm font-black uppercase tracking-tight truncate">{team.name}</div>
                          <div className="text-[9px] font-bold text-neutral-500 uppercase flex items-center gap-1">
                             <Globe size={10} className="text-brand-green" />
                             {team.league}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          {letters.length === 0 && (
            <div className="py-20 text-center text-neutral-500 uppercase tracking-widest font-black text-xs">
               No results found for "{search}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
