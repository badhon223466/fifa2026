import { useEffect } from 'react';

export default function BannerAd() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const ads = config?.ads;

  useEffect(() => {
    const key = ads?.top_banner_key;
    const wrap = document.getElementById('top-banner-wrap-react');
    
    if (!key || !wrap || wrap.querySelector('script')) return;

    (window as any).atOptions = {
        'key' : key,
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    wrap.appendChild(script);
  }, [ads]);

  if (!ads?.top_banner_key) return null;

  return (
    <div className="w-full flex justify-center py-4 bg-black border-y border-white/5 min-h-[90px] items-center">
      <div id="top-banner-wrap-react" className="max-w-full overflow-hidden" />
    </div>
  );
}
