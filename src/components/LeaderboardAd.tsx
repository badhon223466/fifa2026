import { useEffect } from 'react';

export default function LeaderboardAd() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const ads = config?.ads;

  useEffect(() => {
    const key = ads?.leaderboard_key;
    const wrap = document.getElementById('leaderboard-banner-wrap');
    
    if (!key || !wrap || wrap.querySelector('script')) return;

    (window as any).atOptions = {
        'key' : key,
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    wrap.appendChild(script);
  }, [ads]);

  if (!ads?.leaderboard_key) return null;

  return (
    <div className="w-full flex justify-center py-6 bg-black/40 border-y border-white/5 min-h-[120px] items-center">
      <div id="leaderboard-banner-wrap" className="max-w-full overflow-hidden" />
    </div>
  );
}
