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
        popunder_url: "",
        top_banner_key: "",
        leaderboard_key: "",
        native_banner_container: "",
        native_banner_url: "",
        adsense_publisher_id: "",
        adsense_slot: "",
        
        static_banners: {
            header: [],
            sidebar: [],
            footer: []
        }
    }
};
