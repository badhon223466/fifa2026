import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, RefreshCw, Maximize2, ShieldCheck, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Hls from 'hls.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function WatchSection() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const [activeChannel, setActiveChannel] = useState<any>(config?.channels?.[0] || null);
  const [playerType, setPlayerType] = useState<'iframe' | 'hls-primary' | 'hls-backup'>('iframe');
  const [refreshKey, setRefreshKey] = useState(0);
  const [hlsLinks, setHlsLinks] = useState({ primary: config?.hls_primary, backup: config?.hls_backup });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset hasStarted on player/channel switch
    setHasStarted(false);
  }, [playerType, activeChannel]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'broadcast'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setHlsLinks({
          primary: data.hlsPrimary || config?.hls_primary,
          backup: data.hlsBackup || config?.hls_backup
        });
      }
    });
    return unsub;
  }, [config]);

  useEffect(() => {
    if (playerType !== 'iframe' && videoRef.current) {
      const src = playerType === 'hls-primary' ? hlsLinks.primary : hlsLinks.backup;
      if (!src) return;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        });
        return () => hls.destroy();
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  }, [playerType, hlsLinks, refreshKey]);

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) containerRef.current.requestFullscreen();
      else document.exitFullscreen();
    }
  };

  const handleChannelSwitch = (ch: any) => {
    setActiveChannel(ch);
    setPlayerType('iframe');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <section id="watch" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-2">Live Transmission</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">High Definition Feed</h3>
          </div>
          <div className="flex items-center gap-4 px-4 py-2 bg-neutral-900 border border-white/5 rounded-2xl shadow-xl">
             <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">Stream Encryption</span>
                <span className="text-xs font-black text-brand-green uppercase">Verified Secured</span>
             </div>
             <ShieldCheck size={20} className="text-brand-green" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2 p-1 rounded-xl bg-neutral-900 border border-white/5">
                <button 
                  onClick={() => setPlayerType('iframe')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${playerType === 'iframe' ? 'bg-primary text-black' : 'text-neutral-500 hover:text-white'}`}
                >
                  Player 1 (Main)
                </button>
                <button 
                  onClick={() => setPlayerType('hls-primary')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${playerType === 'hls-primary' ? 'bg-primary text-black' : 'text-neutral-500 hover:text-white'}`}
                >
                  Player 2 (Direct)
                </button>
                <button 
                  onClick={() => setPlayerType('hls-backup')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${playerType === 'hls-backup' ? 'bg-primary text-black' : 'text-neutral-500 hover:text-white'}`}
                >
                  Player 3 (Backup)
                </button>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setRefreshKey(k => k + 1)} className="p-2 rounded-xl bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white transition-all">
                  <RefreshCw size={16} />
                </button>
                <button onClick={toggleFullscreen} className="p-2 rounded-xl bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white transition-all">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            <div 
              ref={containerRef}
              className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 group shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            >
              <AnimatePresence mode="wait">
                {playerType === 'iframe' ? (
                  <motion.div
                    key={`iframe-container-${activeChannel?.id}-${refreshKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <iframe
                      key={`iframe-${activeChannel?.id}-${refreshKey}`}
                      src={activeChannel?.url}
                      title={activeChannel?.name}
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture; xr-spatial-tracking; clipboard-write;"
                      sandbox="allow-forms allow-scripts allow-same-origin"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0 z-10"
                      data-testid="iframe-player-main"
                      referrerPolicy="no-referrer"
                    />
                    
                    {!hasStarted && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm group/start transition-all duration-500">
                         <div className="relative">
                            {/* Pulse background */}
                            <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-20" />
                            
                            <button 
                              onClick={() => setHasStarted(true)}
                              className="relative flex flex-col items-center gap-4 bg-brand-green hover:bg-white text-black p-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-[0_0_50px_rgba(0,230,118,0.4)]"
                            >
                               <Volume2 size={40} className="animate-bounce" />
                               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Unmute & Start</span>
                            </button>
                         </div>
                         
                         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Secure Stream Active</p>
                            <div className="flex gap-1">
                               {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-green animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                            </div>
                         </div>
                      </div>
                    )}

                    {/* Fallback Overlay (Z-index below iframe) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-8 text-center">
                       <ExternalLink size={32} className="text-neutral-700 mb-4" />
                       <p className="text-sm font-black uppercase tracking-tighter mb-2 text-white">Stream Security Active</p>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest max-w-[280px] mb-6">
                         If the player doesn't load below, use the direct link button.
                       </p>
                       <a 
                         href={activeChannel?.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase rounded-full transition-all hover:bg-brand-green"
                       >
                         Open Direct Player
                       </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`hls-${playerType}-${refreshKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <video 
                      ref={videoRef}
                      controls={false}
                      className="w-full h-full object-contain"
                      playsInline
                      muted={!hasStarted || isMuted}
                      onClick={() => setIsPlaying(!isPlaying)}
                    />
                    
                    {!hasStarted && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm group/start transition-all duration-500">
                         <div className="relative">
                            <div className="absolute inset-0 bg-brand-green rounded-full animate-ping opacity-20" />
                            <button 
                              onClick={() => { setHasStarted(true); setIsMuted(false); if (videoRef.current) videoRef.current.muted = false; }}
                              className="relative flex flex-col items-center gap-4 bg-brand-green hover:bg-white text-black p-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-[0_0_50px_rgba(0,230,118,0.4)]"
                            >
                               <Volume2 size={40} className="animate-bounce" />
                               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Unmute & Start</span>
                            </button>
                         </div>
                      </div>
                    )}
                    
                    {/* CUSTOM CONTROLS OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); if (isPlaying) videoRef.current?.pause(); else videoRef.current?.play(); }}>
                              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); if (videoRef.current) videoRef.current.muted = !isMuted; }}>
                              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                           </button>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> Live Feed
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Watermark */}
              <div className="absolute top-6 left-6 opacity-20 pointer-events-none select-none z-10">
                <span className="text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                  GOAL<span className="text-brand-green">STREAM</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_rgba(0,230,118,0.6)]" />
                  <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Broadcasting Status: <span className="text-white">Active HD Feed</span></span>
               </div>
               <div className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">
                  Secure Socket Layer • Protected Stream
               </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-2 px-1">Available Channels</h4>
             <div className="grid gap-2">
                {config?.channels ? config.channels.map((ch: any) => (
                  <button
                    key={ch.id}
                    onClick={() => handleChannelSwitch(ch)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all hover-elevate ${activeChannel?.id === ch.id ? 'bg-primary/10 border-brand-green/30' : 'bg-neutral-900 border-white/5 hover:border-white/10'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeChannel?.id === ch.id ? 'bg-brand-green text-black' : 'bg-black text-neutral-500'}`}>
                       <Tv size={16} />
                    </div>
                    <div>
                       <div className={`text-sm font-black uppercase tracking-tight ${activeChannel?.id === ch.id ? 'text-brand-green' : 'text-white'}`}>{ch.name}</div>
                       <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">{ch.tag} Feed</div>
                    </div>
                  </button>
                )) : null}
             </div>
             
             <div className="p-6 rounded-2xl bg-linear-to-br from-brand-green/10 to-transparent border border-brand-green/5 space-y-4">
                <p className="text-[11px] font-bold text-neutral-400 leading-relaxed uppercase tracking-tighter">
                   Tip: Try <span className="text-white font-black">Player 2</span> for a smoother experience on mobile devices.
                </p>
                <div className="h-[1px] bg-neutral-800" />
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                   <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">Servers Operational</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
