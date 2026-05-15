import { Trophy, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between py-8 px-8 glass rounded-3xl">
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
          <a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-green transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-green transition-colors">Cookie Settings</a>
          <a href="#" className="hover:text-brand-green transition-colors">Contact Us</a>
        </div>
        
        <div className="mt-8 md:mt-0 flex flex-col md:items-end gap-2 text-center md:text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600">© 2026 GOALSTREAM LIVE</span>
          <div className="flex gap-4">
             <Trophy size={14} className="text-neutral-800" />
             <span className="text-[10px] font-black text-neutral-800 uppercase tracking-widest">Independent Media Feed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
