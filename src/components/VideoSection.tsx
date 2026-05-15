import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Tv, Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Hls from 'hls.js';

export default function VideoSection() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const initialUrl = config?.hls_primary || "https://playerado.top/embed2.php?id=starsp1&v=su";
  const initialTitle = config?.channels?.[0]?.name || "Star Sports 1 • HD Feed";

  const [broadcastUrl, setBroadcastUrl] = useState(initialUrl);
  const [broadcastTitle, setBroadcastTitle] = useState(initialTitle);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isHls = broadcastUrl.toLowerCase().includes('.m3u8') || broadcastUrl.toLowerCase().includes('.m3u');

  const getEmbedUrl = (url: string) => {
    if (!url || isHls) return "";
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&modestbranding=1&rel=0&iv_load_policy=3&controls=0&disablekb=1&showinfo=0`;
    }
    if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560&autoplay=true&mute=true&controls=false`;
    }
    const connector = url.includes('?') ? '&' : '?';
    return `${url}${connector}autoplay=1&mute=1&controls=0`;
  };

  const embedUrl = getEmbedUrl(broadcastUrl);

  const togglePlay = () => {
    if (isHls && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (isHls && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'broadcast'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.broadcastUrl) setBroadcastUrl(data.broadcastUrl);
        if (data.broadcastTitle) setBroadcastTitle(data.broadcastTitle);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (isHls && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(broadcastUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(e => console.log("Autoplay blocked", e));
        });
        return () => hls.destroy();
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = broadcastUrl;
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
      }
    }
  }, [broadcastUrl, isHls]);

  return (
    <section id="video-feature" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
            <Tv size={20} className="text-brand-green" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-brand-green">Live Broadcast</h2>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{broadcastTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-full">
           <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span className="text-[10px] text-red-600 font-black uppercase tracking-[0.2em]">Live Stream</span>
           </div>
           <div className="w-[1px] h-3 bg-red-600/20" />
           <span className="text-[10px] text-white/60 font-black tabular-nums">48,291 WATCHING</span>
        </div>
      </div>

      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        className="bento-card relative aspect-video overflow-hidden bg-black shadow-2xl shadow-brand-green/5 group"
      >
        {isHls ? (
          <video 
            ref={videoRef}
            className="absolute inset-0 w-full h-full z-10 object-cover"
            autoPlay
            muted
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <iframe 
            key={embedUrl}
            src={embedUrl}
            title="Live Sports Broadcast" 
            allow="autoplay; fullscreen; encrypted-media" 
            allowFullScreen 
            className="absolute inset-0 w-full h-full border-0 z-10 pointer-events-none"
            data-testid="iframe-player-1"
          ></iframe>
        )}

        {/* CUSTOM CONTROLS OVERLAY (for unbranded feel) */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-6 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
           <div className="flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-6">
                 {isHls && (
                   <button onClick={togglePlay} className="text-white hover:text-brand-green transition-colors">
                      {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                   </button>
                 )}
                 
                 {isHls && (
                   <div className="flex items-center gap-3">
                      <button onClick={toggleMute} className="text-white hover:text-brand-green transition-colors">
                         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden hidden md:block">
                         <div className={`h-full bg-brand-green transition-all duration-300 ${isMuted ? 'w-0' : 'w-2/3'}`} />
                      </div>
                   </div>
                 )}

                 {!isHls && (
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-brand-green/10 border border-brand-green/20 rounded-lg">
                       <ShieldCheck size={14} className="text-brand-green" />
                       <span className="text-[10px] font-black uppercase text-brand-green tracking-widest">Enhanced Playback Layer</span>
                    </div>
                 )}

                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Direct Feed</span>
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">Secure Handshake</span>
                 </div>
                 <button onClick={toggleFullscreen} className="text-white hover:text-brand-green transition-colors">
                    <Maximize2 size={20} />
                 </button>
              </div>
           </div>
        </div>

        {/* Watermark/Logo Overlay */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none select-none opacity-40">
           <span className="text-xl font-black italic tracking-tighter uppercase text-white drop-shadow-lg">
             TV<span className="text-brand-green">26</span>
           </span>
        </div>
        
        {/* Fallback/Blocked Message Overlay - Only visible if nothing is playing */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black pointer-events-auto">
           <div className="mb-6 rounded-3xl bg-neutral-900 p-6 border border-neutral-800">
              <ExternalLink size={32} className="text-neutral-700 mb-4 mx-auto" />
              <p className="text-sm font-black uppercase tracking-tighter mb-2">Live Broadcast Connection</p>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest max-w-[280px]">
                Preview mode may restrict auto-playback. Click below for immediate high-definition access.
              </p>
           </div>
           <a 
             href={broadcastUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-4 bg-brand-green text-black font-black text-sm uppercase rounded-full transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-xl shadow-brand-green/20"
           >
             Open Full Stream
           </a>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-4">
         <div className="flex gap-4">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Network Status</span>
               <span className="text-xs font-black text-brand-green uppercase">Optimal</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Latency</span>
               <span className="text-xs font-black text-white uppercase">~0.2s</span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Resolution</span>
               <span className="text-xs font-black text-white uppercase">1080P • 60FPS</span>
            </div>
         </div>
         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 text-center md:text-right">
            Broadcasting via Protected IFrame Layer • tv26 official partner
         </p>
      </div>
    </section>
  );
}
