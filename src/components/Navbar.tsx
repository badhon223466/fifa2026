import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Sun, Moon, Trophy, Lock } from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import { signInWithGoogle } from '../lib/firebase';

export default function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { user, isAdmin } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Live', href: '#live' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Teams', href: '#teams' },
    { name: 'News', href: '#news' },
    { name: 'Watch', href: '#watch' },
  ];

  return (
    <nav 
      className={`fixed z-40 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'top-0 w-full max-w-none rounded-none bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800 py-3 px-4' 
          : 'top-6 w-[92%] max-w-7xl rounded-3xl bg-neutral-900/50 backdrop-blur-md border border-neutral-800 py-5 px-6'
      }`}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.4)]">
            <Trophy className="text-black" size={18} />
          </div>
          <span className="font-display text-xl font-black tracking-tighter uppercase">
            GOAL<span className="text-brand-green">STREAM</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${
                link.name === 'Live' ? 'text-brand-green' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <button className="text-neutral-400 hover:text-white" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {isAdmin ? (
               <button 
                 onClick={onAdminClick}
                 className="flex items-center gap-2 p-2 rounded-lg bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-black transition-all"
               >
                 <Lock size={16} />
                 <span className="text-[10px] font-black uppercase">Admin</span>
               </button>
            ) : !user ? (
               <button 
                 onClick={signInWithGoogle}
                 className="bg-white text-black px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-brand-green transition-colors"
               >
                 Login
               </button>
            ) : (
              <div className="flex items-center gap-2">
                 <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-neutral-800" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="rounded-full p-2 text-white/70"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/70 hover:text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-dark-surface border-b border-white/10"
      >
        <div className="flex flex-col space-y-4 px-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-white/70 hover:text-brand-green"
            >
              {link.name}
            </a>
          ))}
          {!user ? (
             <button 
               onClick={signInWithGoogle}
               className="w-full rounded-lg bg-brand-green py-3 text-center font-bold text-black uppercase"
             >
               LOGIN
             </button>
          ) : isAdmin ? (
             <button 
               onClick={() => { onAdminClick(); setIsOpen(false); }}
               className="w-full rounded-lg bg-brand-green py-3 text-center font-bold text-black uppercase"
             >
               ADMIN PANEL
             </button>
          ) : null}
        </div>
      </motion.div>
    </nav>
  );
}
