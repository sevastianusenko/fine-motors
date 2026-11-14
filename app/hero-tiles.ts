// Shared between the server page (fetch + fallback) and the client collage.

export type HeroTile = {
  src: string;     // bare image URL (Sanity CDN or Unsplash); size params are appended by the collage
  label?: string;  // "2021 Toyota RAV4" — only for real inventory, shown inside the tile
};

// Used when Sanity has fewer than MIN_REAL_TILES photos (dev, or a brand-new dataset).
// Mainstream sedans / SUVs / trucks only — the lot sells Subarus, not Lamborghinis.
export const FALLBACK_HERO_TILES: HeroTile[] = [
  "photo-1621007947382-bb3c3994e3fb", // Camry, dark
  "photo-1533473359331-0135ef1b58bf", // Expedition
  "photo-1555215695-3004980ad54e",   // BMW, white
  "photo-1551830820-330a71b99659",   // F-150, blue
  "photo-1519641471654-76ce0107ad1b", // CR-V, white
  "photo-1492144534655-ae79c964c9d7", // Camaro in garage
  "photo-1560958089-b8a1929cea89",   // Tesla, white
  "photo-1606664515524-ed2f786a0bd6", // Audi, dark
  "photo-1550355291-bbee04a92027",   // Hyundai, red
  "photo-1541899481282-d53bffe3c35d", // VW, blue
  "photo-1494976388531-d1058494cdd8", // Mustang
  "photo-1580273916550-e323be2ae537", // BMW, grey
  "photo-1609521263047-f8f205293f24", // Juke
  "photo-1601362840469-51e4d8d58785", // BMW 7
  "photo-1619767886558-efdc259cde1a", // Hyundai, black
  "photo-1502877338535-766e1452684a", // BMW, blue
  "photo-1507136566006-cfc505b114fc", // Jaguar, red
  "photo-1626668893632-6f3a4466d22f", // Challenger in garage
  "photo-1547744152-14d985cb937f",   // Mustang, black
  "photo-1504215680853-026ed2a45def", // Audi at sunset
].map(id => ({ src: `https://images.unsplash.com/${id}` }));

export const MIN_REAL_TILES = 8;
