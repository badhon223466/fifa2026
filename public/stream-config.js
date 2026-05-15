window.__GOALSTREAM_CONFIG__ = {
    // IFRAME CHANNELS (Player 1)
    channels: [
        {
            id: "starsp1",
            name: "Star Sports 1",
            tag: "HD",
            url: "https://playerado.top/embed2.php?id=starsp1&v=su"
        },
        {
            id: "starsp2",
            name: "Star Sports 2",
            tag: "HD",
            url: "https://playerado.top/embed2.php?id=starsp2&v=su"
        },
        {
            id: "sony6",
            name: "Sony Six",
            tag: "HD",
            url: "https://playerado.top/embed2.php?id=sony6&v=su"
        },
        {
            id: "ddsports",
            name: "DD Sports",
            tag: "FREE",
            url: "https://playerado.top/embed2.php?id=ddsports&v=su"
        }
    ],

    // HLS DIRECT STREAM (.m3u8 link)
    hls_primary: "https://dz2.bhalocast.com:7059/hls/star1kibich2.m3u8?md5=bUoIjNIWC-KfYb_hRrzyJg&expires=1776872187&ch=star1kibich2&s=f1498429615704da04c8cebb1c2d3a5f",
    hls_backup: "https://kick.bhalocast.com:7059/hls/ptvscpr.m3u8?md5=YofZxjBw3whZUEdGgMObZw&expires=1772741901&ch=ptvscpr&s=ce39d4edeaa9071ed052526f7069bbc1",

    // MATCHES
    matches: [
        {
            home: "Manchester City",
            away: "Real Madrid",
            league: "UCL Semi-Final",
            venue: "Etihad Stadium",
            channel: "Star Sports 1",
            kickoff: "2026-04-22 18:30",
            status: "live",
            liveMin: 67,
            liveScore: [2, 1]
        },
        {
            home: "Bayern Munich",
            away: "Paris Saint-Germain",
            league: "UCL Semi-Final",
            venue: "Allianz Arena",
            channel: "Sony Six",
            kickoff: "2026-04-22 18:30",
            status: "live",
            liveMin: 41,
            liveScore: [1, 1]
        },
        {
            home: "Arsenal",
            away: "Chelsea",
            league: "Premier League",
            venue: "Emirates Stadium",
            channel: "Star Sports 2",
            kickoff: "2026-04-23 22:00",
            status: "upcoming"
        }
    ],

    // AD CODES & STATIC BANNERS
    ads: {
        popunder_url: "https://pl29452904.profitablecpmratenetwork.com/9b/a3/0a/9ba30af4fb25f6fe82bd3394de778286.js",
        top_banner_key: "e9ea26c4dbf4100e57d7df821e66c8bf",
        leaderboard_key: "c4e3e5a2dbe394e11f2ac8c44c299741",
        native_banner_container: "container-088f78ae1a9a8ac91b28e8d69fb71acc",
        native_banner_url: "https://pl28852010.effectivegatecpm.com/088f78ae1a9a8ac91b28e8d69fb71acc/invoke.js",
        adsense_publisher_id: "",
        adsense_slot: "",
        
        // Custom Banners for different sections
        static_banners: {
            header: [
                { imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop", link: "#" }
            ],
            sidebar: [
                { imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop", link: "#" }
            ],
            footer: [
                { imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop", link: "#" }
            ]
        }
    }
};
