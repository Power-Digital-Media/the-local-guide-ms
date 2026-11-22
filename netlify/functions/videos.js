// Serverless YouTube RSS feed fetcher for @TheLocalGuide-MS (UChQYSDOBc89Pcv-CA9M7ITQ)
const CHANNEL_ID = "UChQYSDOBc89Pcv-CA9M7ITQ";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

function decodeXmlEntities(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function handler() {
  try {
    const res = await fetch(RSS_URL, {
      headers: { "User-Agent": "TheLocalGuideMS-Bot/1.0" },
    });
    if (!res.ok) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videos: [], error: `YouTube RSS returned ${res.status}` }),
      };
    }

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 12);

    const videos = entries.map((match, idx) => {
      const block = match[1];
      const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || "";
      const rawTitle = (block.match(/<title>([^<]+)<\/title>/) || [])[1] || "Untitled Episode";
      const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1] || "";
      const altUrl = (block.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] || `https://www.youtube.com/watch?v=${videoId}`;
      const rawDesc = (block.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || "";
      const views = (block.match(/<media:statistics views="(\d+)"/) || [])[1] || null;

      const cleanTitle = decodeXmlEntities(rawTitle).replace(/\s*#shorts\b/gi, "").trim();
      const firstPara = decodeXmlEntities(rawDesc)
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .find((p) => p.length > 25) || "Authentic first-person restaurant review and local exploration across Mississippi.";

      return {
        id: `yt-${videoId}`,
        youtubeId: videoId,
        title: cleanTitle,
        publishedAt: published,
        isShort: altUrl.includes("/shorts/"),
        watchUrl: altUrl,
        thumbnail: `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
        views: views ? Number(views) : null,
        description: firstPara.slice(0, 220),
        featured: idx === 0,
      };
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
      body: JSON.stringify({ channelId: CHANNEL_ID, videos }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videos: [], error: err.message }),
    };
  }
}
