import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, ".ssr-temp");

const templateHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const ssrEntryPath = pathToFileURL(path.join(ssrDir, "entry-server.js")).href;
const { renderRoute, locationsData, videosData } = await import(ssrEntryPath);

const baseOrgGraph = [
  {
    "@type": "Organization",
    "@id": "https://thelocalguidems.com/#organization",
    name: "The Local Guide MS",
    alternateName: "The Local Guide Mississippi (@TheLocalGuide-MS)",
    url: "https://thelocalguidems.com/",
    logo: "https://thelocalguidems.com/apple-touch-icon.png",
    image: "https://thelocalguidems.com/assets/og-banner.jpg",
    description:
      "Independent Mississippi restaurant reviews, first-person POV food tours, Google Maps guides (2.2M+ photo views), and road trip itineraries hosted by Damein & Mary.",
    areaServed: {
      "@type": "State",
      name: "Mississippi",
    },
    founder: [
      { "@type": "Person", name: "Damein Donald" },
      { "@type": "Person", name: "Mary Donald" },
    ],
    sameAs: [
      "https://www.youtube.com/@TheLocalGuide-MS",
      "https://www.google.com/maps/contrib/117260776182521505370/reviews",
      "https://instagram.com/TheLocalGuideMS",
      "https://facebook.com/TheLocalGuideMS",
      "https://tiktok.com/@TheLocalGuideMS",
    ],
  },
  {
    "@type": "WebSite",
    "@id": "https://thelocalguidems.com/#website",
    name: "The Local Guide MS",
    alternateName: "The Local Guide MS — Eat Local. Support Local.",
    url: "https://thelocalguidems.com/",
    publisher: { "@id": "https://thelocalguidems.com/#organization" },
  },
];

const routes = [
  {
    routePath: "/",
    outFile: path.join(distDir, "index.html"),
    title: "The Local Guide MS | Mississippi Food & Travel Reviews",
    description:
      "Join Damein & Mary (@TheLocalGuide-MS) for honest, self-paid Mississippi restaurant reviews, BBQ & catfish picks, interactive food maps, and road trips.",
    canonical: "https://thelocalguidems.com/",
    schemaGraph: [
      ...baseOrgGraph,
      {
        "@type": "WebPage",
        "@id": "https://thelocalguidems.com/#webpage",
        name: "The Local Guide MS | Mississippi Food & Travel Reviews",
        url: "https://thelocalguidems.com/",
        isPartOf: { "@id": "https://thelocalguidems.com/#website" },
        about: { "@id": "https://thelocalguidems.com/#organization" },
      },
      ...videosData.slice(0, 3).map((v) => ({
        "@type": "VideoObject",
        name: v.title,
        description: v.description,
        thumbnailUrl: [`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`],
        uploadDate: `${v.publishedAt}T12:00:00Z`,
        embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
        contentUrl: v.watchUrl,
      })),
    ],
  },
  {
    routePath: "/spots",
    outFile: path.join(distDir, "spots", "index.html"),
    title: "Mississippi Restaurant Directory | The Local Guide MS",
    description:
      "Explore 16+ reviewed Mississippi BBQ pits, catfish lunch specials, small-town diners, and hidden gems across Jackson, Pearl, Clinton, Madison, and the Coast.",
    canonical: "https://thelocalguidems.com/spots",
    schemaGraph: [
      {
        "@type": "CollectionPage",
        "@id": "https://thelocalguidems.com/spots#webpage",
        name: "Mississippi Restaurant Directory | The Local Guide MS",
        url: "https://thelocalguidems.com/spots",
        isPartOf: { "@id": "https://thelocalguidems.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thelocalguidems.com/" },
          { "@type": "ListItem", position: 2, name: "MS Spots Directory", item: "https://thelocalguidems.com/spots" },
        ],
      },
      {
        "@type": "ItemList",
        name: "Top Reviewed Mississippi Restaurants & Local Gems",
        itemListElement: locationsData.map((loc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: `${loc.name} (${loc.city}, MS)`,
          url: `https://thelocalguidems.com/spots#${loc.id}`,
        })),
      },
    ],
  },
  {
    routePath: "/road-trips",
    outFile: path.join(distDir, "road-trips", "index.html"),
    title: "Mississippi Food Trails & Road Trips | The Local Guide MS",
    description:
      "Plan your next weekend food drive with step-by-step itineraries across the Highway 61 Blues & Tamales Trail, Gulf Coast Highway 90, and Jackson Metro.",
    canonical: "https://thelocalguidems.com/road-trips",
    schemaGraph: [
      {
        "@type": "CollectionPage",
        "@id": "https://thelocalguidems.com/road-trips#webpage",
        name: "Mississippi Food Trails & Road Trips | The Local Guide MS",
        url: "https://thelocalguidems.com/road-trips",
        isPartOf: { "@id": "https://thelocalguidems.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thelocalguidems.com/" },
          { "@type": "ListItem", position: 2, name: "Road Trips", item: "https://thelocalguidems.com/road-trips" },
        ],
      },
    ],
  },
  {
    routePath: "/suggest-a-spot",
    outFile: path.join(distDir, "suggest-a-spot", "index.html"),
    title: "Suggest a Mississippi Spot | The Local Guide MS",
    description:
      "Recommend a local Mississippi restaurant, BBQ joint, lunch special, or hidden gem for Damein & Mary (@TheLocalGuide-MS) to visit and review next.",
    canonical: "https://thelocalguidems.com/suggest-a-spot",
    schemaGraph: [
      {
        "@type": "ContactPage",
        "@id": "https://thelocalguidems.com/suggest-a-spot#webpage",
        name: "Suggest a Mississippi Spot | The Local Guide MS",
        url: "https://thelocalguidems.com/suggest-a-spot",
        isPartOf: { "@id": "https://thelocalguidems.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thelocalguidems.com/" },
          { "@type": "ListItem", position: 2, name: "Suggest a Spot", item: "https://thelocalguidems.com/suggest-a-spot" },
        ],
      },
    ],
  },
];

function escapeAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

for (const r of routes) {
  const appHtml = renderRoute(r.routePath);
  const seoHead = [
    `<title>${escapeAttr(r.title)}</title>`,
    `<meta name="description" content="${escapeAttr(r.description)}" />`,
    `<link rel="canonical" href="${r.canonical}" />`,
    `<meta property="og:title" content="${escapeAttr(r.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(r.description)}" />`,
    `<meta property="og:url" content="${r.canonical}" />`,
    `<meta property="og:site_name" content="The Local Guide MS" />`,
    `<meta property="og:image" content="https://thelocalguidems.com/assets/og-banner.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(r.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(r.description)}" />`,
    `<meta name="twitter:image" content="https://thelocalguidems.com/assets/og-banner.jpg" />`,
    `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": r.schemaGraph,
    })}</script>`,
  ].join("\n    ");

  const html = templateHtml
    .replace(
      /<!--SEO_HEAD-->[\s\S]*?<link rel="canonical"[^>]*>/,
      `<!--SEO_HEAD-->\n    ${seoHead}`
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  fs.mkdirSync(path.dirname(r.outFile), { recursive: true });
  fs.writeFileSync(r.outFile, html, "utf8");
  console.log(
    `[prerender] ${r.routePath} -> ${path.relative(rootDir, r.outFile)} (title=${r.title.length}c, desc=${r.description.length}c)`
  );
}

fs.rmSync(ssrDir, { recursive: true, force: true });
