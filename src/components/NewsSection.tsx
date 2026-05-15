import { motion } from 'motion/react';
import { ArrowUpRight, Calendar } from 'lucide-react';

const NEWS = [
  {
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
    title: "Mbappé's record-breaking transfer reshapes Europe",
    excerpt: "Inside the deal that changes the balance of power in club football for the next decade.",
    date: "Apr 21, 2026",
    tag: "Transfer"
  },
  {
    img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
    title: "How Pep rebuilt the City press from scratch",
    excerpt: "A tactical breakdown of the new high-pressing system that's unlocked the Champions League run.",
    date: "Apr 20, 2026",
    tag: "Analysis"
  },
  {
    img: "https://images.unsplash.com/photo-1543351611-58f6a1836f90?q=80&w=800&auto=format&fit=crop",
    title: "The road to the Champions League final",
    excerpt: "Four giants left, two semi-finals to play. Who lifts the trophy in Wembley this June?",
    date: "Apr 19, 2026",
    tag: "Feature"
  }
];

export default function NewsSection() {
  return (
    <section id="news" className="py-24 bg-neutral-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">Editorials</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">Football Stories</h3>
          </div>
          <button className="text-xs font-black text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1 uppercase tracking-widest">
            Explore All News
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-3xl bg-neutral-900 overflow-hidden border border-white/5 hover:border-white/10 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.img} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 bg-brand-green text-black text-[9px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                   {item.tag}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">
                   <Calendar size={12} className="text-brand-green" />
                   <span>{item.date}</span>
                </div>
                
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-brand-green transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-neutral-400 font-medium leading-relaxed line-clamp-3 mb-8">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest group-hover:text-white transition-colors">Read Full Story</span>
                   <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-brand-green transition-all">
                      <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-black" />
                   </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
