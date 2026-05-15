import { useEffect } from 'react';

export default function NativeBanner() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const ads = config?.ads;

  useEffect(() => {
    if (!ads?.native_banner_url || !ads?.native_banner_container) return;
    
    const container = document.getElementById(ads.native_banner_container);
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = ads.native_banner_url;
    container.appendChild(script);
  }, [ads]);

  if (!ads?.native_banner_container) return null;

  return (
    <div className="w-full flex justify-center py-4 bg-background">
      <div id={ads.native_banner_container} />
    </div>
  );
}
