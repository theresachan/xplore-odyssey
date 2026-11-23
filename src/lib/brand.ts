/** Xplore Odyssey brand system: single source of truth for site + guideline */

export const WHATSAPP = "https://wa.me/639000000000";
export const EMAIL = "hello@xploreodyssey.ph";
export const BRAND = "Xplore Odyssey";
export const TAGLINE = "Airport to coast across Iloilo.";
export const LOCATION = "Iloilo City · Philippines";
export const LOCATION_LINE =
  "Private hire with a licensed local driver. Churches, coasts, markets, and the long roads in between.";

export const colors = {
  mist: {
    hex: "#E4E8DE",
    name: "Leaf wash",
    token: "--mist",
    role: "Page ground: green-cast light, not sterile gray",
  },
  ink: {
    hex: "#0E1410",
    name: "Canopy black",
    token: "--ink",
    role: "Text, dark bands, primary CTAs",
  },
  canopy: {
    hex: "#3A5230",
    name: "Canopy",
    token: "--canopy",
    role: "Labels, trust accents, map fill",
  },
  brass: {
    hex: "#B8922A",
    name: "Brass",
    token: "--brass",
    role: "Prices + rare highlights",
  },
  hush: {
    hex: "#CED4C6",
    name: "Shade",
    token: "--hush",
    role: "Alternate bands (pricing, book)",
  },
  paper: {
    hex: "#EEF1E8",
    name: "Pale leaf",
    token: "--paper",
    role: "Cards, plates, map board",
  },
} as const;

export const fonts = {
  display: { family: "Syne", role: "Headlines, brand mark, prices", weights: "600–800" },
  body: { family: "Figtree", role: "UI, paragraphs, forms", weights: "400–700" },
} as const;

export const voice = {
  use: [
    "Short, direct sentences",
    "Local place names (Ajuy, Estancia, Panay)",
    "Concrete promises: on time, whole van, WhatsApp reply",
    "CTAs: “Book a van”, “See pricing”, “Send request”",
  ],
  avoid: [
    "Generic travel brochure fluff",
    "“Revolutionize your journey” AI copy",
    "Emoji clutter in primary UI",
    "Surge / gimmick pricing language",
  ],
} as const;
