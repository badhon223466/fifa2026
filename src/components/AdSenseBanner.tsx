import { useEffect } from 'react';

export default function AdSenseBanner() {
  const config = (window as any).__GOALSTREAM_CONFIG__;
  const ads = config?.ads;

  useEffect(() => {
    if (!ads?.adsense_publisher_id || document.getElementById("adsense-script")) return;

    const script = document.createElement("script");
    script.id = "adsense-script";
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ads.adsense_publisher_id}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, [ads]);

  if (!ads?.adsense_publisher_id) return null;

  return (
    <div className="w-full flex justify-center bg-background py-8 border-t border-white/5">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px", width: "100%" }}
        data-ad-client={ads.adsense_publisher_id}
        data-ad-slot={ads.adsense_slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}
