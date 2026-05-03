export type HorseCategory =
  | "elite"
  | "featured"
  | "ending-soon"
  | "newly-listed";

export type HorseDetailItem = {
  id: number;
  slug: string;
  category: HorseCategory;
  title: string;
  subtitle: string;
  bid: string;
  badge: string;
  endsAt: string;
  image: string;
  imageAlt: string;
  breed: string;
  age: string;
  gender: string;
  height: string;
  location: string;
  discipline: string;
  description: string;
  pedigree: string[];
  highlights: string[];
};

export const horses: HorseDetailItem[] = [
  {
    id: 1,
    slug: "imperial-majesty",
    category: "elite",
    title: "Imperial Majesty",
    subtitle: "Hannoveraan / Grand Prix Dressuur",
    bid: "€2.850.000",
    badge: "Elite",
    endsAt: "2026-05-23T14:22:00",
    image: "/img/elite/bb554bb1-ce99-4b1b-9a5d-943e4c1f7b2b.jpg",
    imageAlt: "Imperial Majesty",
    breed: "Hannoveraan",
    age: "9 jaar",
    gender: "Hengst",
    height: "1.72 m",
    location: "Amsterdam, Nederland",
    discipline: "Dressuur",
    description:
      "Imperial Majesty is een uitzonderlijk elite dressuurpaard met een indrukwekkende uitstraling, krachtige bewegingen en een uitstekend wedstrijdtemperament. Dit paard combineert souplesse, balans en elasticiteit met een bewezen internationale afstamming.",
    pedigree: ["Totilas", "Jazz", "Ferro"],
    highlights: [
      "Internationale dressuurlijn",
      "Uitstekende stap, draf en galop",
      "Sterke uitstraling en karakter",
      "Geschikt voor topniveau sport",
    ],
  },
  {
    id: 2,
    slug: "silver-sovereign",
    category: "elite",
    title: "Silver Sovereign",
    subtitle: "KWPN / Internationale springer",
    bid: "€1.675.000",
    badge: "Elite",
    endsAt: "2026-05-22T08:45:00",
    image: "/img/elite/mqdefault.jpg",
    imageAlt: "Silver Sovereign",
    breed: "KWPN",
    age: "8 jaar",
    gender: "Ruin",
    height: "1.70 m",
    location: "Utrecht, Nederland",
    discipline: "Springen",
    description:
      "Silver Sovereign is een modern elite springpaard met vermogen, reflexen en een zeer voorzichtige techniek boven de hindernis. Ideaal voor ruiters die een competitief paard zoeken met internationale potentie.",
    pedigree: ["Cornet Obolensky", "Kannan", "Voltaire"],
    highlights: [
      "Veel vermogen",
      "Internationale springafstamming",
      "Voorzichtige techniek",
      "Klaar voor hoger niveau",
    ],
  },
  {
    id: 3,
    slug: "royal-vanguard",
    category: "elite",
    title: "Royal Vanguard",
    subtitle: "Selle Français / Jong springtalent",
    bid: "€520.000",
    badge: "Jong talent",
    endsAt: "2026-05-24T02:10:00",
    image:
      "/img/elite/pre-stallion-7years-161-hh-grey-eventinghorses-navas-del-madrono_08338f82-736a-4ac3-bda5-2550e4cc02d6.jpg",
    imageAlt: "Royal Vanguard",
    breed: "Selle Français",
    age: "4 jaar",
    gender: "Hengst",
    height: "1.68 m",
    location: "Rotterdam, Nederland",
    discipline: "Jong talent",
    description:
      "Royal Vanguard is een jong elitepaard met veel bloed, atletisch vermogen en een sterke galop. Dit jonge talent is interessant voor ambitieuze ruiters, fokkers en investeerders die vroeg willen instappen in een veelbelovend sportpaard.",
    pedigree: ["Diamant de Semilly", "Baloubet du Rouet", "Quick Star"],
    highlights: [
      "Jong talent met veel potentie",
      "Exclusieve springafstamming",
      "Atletische bouw",
      "Interessant voor verdere opleiding",
    ],
  },

  {
    id: 4,
    slug: "silver-lining",
    category: "featured",
    title: "Silver Lining",
    subtitle: "Dutch Warmblood / 6 jaar",
    bid: "€185.000",
    badge: "Featured",
    endsAt: "2026-04-23T04:12:33",
    image: "/img/featured-horses/which-recip-would-you-pick-v0-5g58v7jvufxg1.webp",
    imageAlt: "Silver Lining",
    breed: "Dutch Warmblood",
    age: "6 jaar",
    gender: "Merrie",
    height: "1.68 m",
    location: "Eindhoven, Nederland",
    discipline: "Allround sport",
    description:
      "Silver Lining is een elegant sportpaard met een fijne instelling, moderne bouw en veel potentie voor zowel amateur als professional.",
    pedigree: ["Johnson", "Apache", "Krack C"],
    highlights: [
      "Elegant model",
      "Goede instelling",
      "Veel potentie",
      "Interessant voor verdere opleiding",
    ],
  },
  {
    id: 5,
    slug: "valentino-z",
    category: "featured",
    title: "Valentino Z",
    subtitle: "Hippique / 8 jaar",
    bid: "€320.000",
    badge: "Featured",
    endsAt: "2026-04-23T02:45:10",
    image: "/img/featured-horses/5253-18-z-wk-2023-61302.jpg",
    imageAlt: "Valentino Z",
    breed: "Hippique",
    age: "8 jaar",
    gender: "Hengst",
    height: "1.73 m",
    location: "Breda, Nederland",
    discipline: "Springen",
    description:
      "Valentino Z is een krachtig en commercieel springpaard met veel aanwezigheid, een goede galop en een betrouwbare instelling in het parcours.",
    pedigree: ["Emerald", "Nabab de Rêve", "Carthago"],
    highlights: [
      "Sterk springvermogen",
      "Goede galop",
      "Commercieel interessant",
      "Veel kwaliteit in de sprong",
    ],
  },
  {
    id: 6,
    slug: "midnight-express",
    category: "featured",
    title: "Midnight Express",
    subtitle: "Hanoverian / 5 jaar",
    bid: "€95.000",
    badge: "Featured",
    endsAt: "2026-04-23T12:05:59",
    image: "/img/featured-horses/images.jpg",
    imageAlt: "Midnight Express",
    breed: "Hanoverian",
    age: "5 jaar",
    gender: "Ruin",
    height: "1.69 m",
    location: "Den Haag, Nederland",
    discipline: "Dressuur",
    description:
      "Midnight Express is een jong dressuurpaard met veel uitstraling, een goed achterbeen en fijne rideability.",
    pedigree: ["Desperados", "Sandro Hit", "Rohdiamant"],
    highlights: [
      "Jong talent",
      "Veel uitstraling",
      "Lichte aanleuning",
      "Goede rideability",
    ],
  },

  {
    id: 7,
    slug: "lothario-z",
    category: "ending-soon",
    title: "Lothario Z",
    subtitle: "Hippique / 10 jaar",
    bid: "€112.000",
    badge: "Ending",
    endsAt: "2026-04-23T00:15:42",
    image: "/img/ending-soon/horse1.jpg",
    imageAlt: "Lothario Z",
    breed: "Hippique",
    age: "10 jaar",
    gender: "Ruin",
    height: "1.71 m",
    location: "Nijmegen, Nederland",
    discipline: "Springen",
    description:
      "Lothario Z is een ervaren sportpaard met veel routine, betrouwbaarheid en een correcte techniek.",
    pedigree: ["Levisto Z", "Cento", "Landgraf I"],
    highlights: [
      "Veel ervaring",
      "Betrouwbaar karakter",
      "Correcte techniek",
      "Direct inzetbaar",
    ],
  },
  {
    id: 8,
    slug: "diamond-jewel",
    category: "ending-soon",
    title: "Diamond Jewel",
    subtitle: "Oldenburg / 5 jaar",
    bid: "€89.500",
    badge: "Ending",
    endsAt: "2026-04-23T00:42:11",
    image: "/img/ending-soon/HHR8FsxWsAA_uGR.jpg",
    imageAlt: "Diamond Jewel",
    breed: "Oldenburg",
    age: "5 jaar",
    gender: "Merrie",
    height: "1.67 m",
    location: "Arnhem, Nederland",
    discipline: "Dressuur",
    description:
      "Diamond Jewel is een charmante merrie met drie correcte basisgangen en een aantrekkelijk profiel voor de toekomst.",
    pedigree: ["Don Juan", "Bordeaux", "Florestan"],
    highlights: [
      "Correcte basisgangen",
      "Mooie merrie-uitstraling",
      "Interessant voor opleiding",
      "Goede instelling",
    ],
  },
  {
    id: 9,
    slug: "quantum-leap",
    category: "ending-soon",
    title: "Quantum Leap",
    subtitle: "Hanoverian / 7 jaar",
    bid: "€204.000",
    badge: "Ending",
    endsAt: "2026-04-23T01:05:59",
    image: "/img/ending-soon/Lot-601-12.jpg",
    imageAlt: "Quantum Leap",
    breed: "Hanoverian",
    age: "7 jaar",
    gender: "Hengst",
    height: "1.72 m",
    location: "Zwolle, Nederland",
    discipline: "Show & presentatie",
    description:
      "Quantum Leap is een representatieve hengst met veel front, uitstraling en een sterke commerciële presentatie.",
    pedigree: ["Quaterback", "Rubinstein", "Donnerhall"],
    highlights: [
      "Veel front",
      "Sterke presentatie",
      "Goede bloedlijn",
      "Opvallend model",
    ],
  },

  {
    id: 10,
    slug: "starlight-gazer",
    category: "newly-listed",
    title: "Starlight Gazer",
    subtitle: "Holsteiner / 4 jaar",
    bid: "€45.000",
    badge: "New",
    endsAt: "2026-04-26T00:00:00",
    image: "/img/newly-listed/109a2e81929f48f199f7fdd98c54aa97_m.jpg",
    imageAlt: "Starlight Gazer",
    breed: "Holsteiner",
    age: "4 jaar",
    gender: "Merrie",
    height: "1.66 m",
    location: "Leiden, Nederland",
    discipline: "Jong talent",
    description:
      "Starlight Gazer is een veelbelovende jonge merrie met een moderne bouw en veel natuurlijke balans.",
    pedigree: ["Casall", "Corrado I", "Caretino"],
    highlights: [
      "Jonge merrie met potentie",
      "Moderne bouw",
      "Goede balans",
      "Interessant voor opleiding",
    ],
  },
  {
    id: 11,
    slug: "arctic-storm",
    category: "newly-listed",
    title: "Arctic Storm",
    subtitle: "Oldenburg / 7 jaar",
    bid: "€72.000",
    badge: "New",
    endsAt: "2026-04-25T20:15:20",
    image: "/img/newly-listed/8763sk_c1109_alt6.webp",
    imageAlt: "Arctic Storm",
    breed: "Oldenburg",
    age: "7 jaar",
    gender: "Ruin",
    height: "1.70 m",
    location: "Haarlem, Nederland",
    discipline: "Dressuur",
    description:
      "Arctic Storm beschikt over veel kracht, goede schoudervrijheid en een aansprekende uitstraling voor de ring.",
    pedigree: ["Sir Donnerhall", "Fürst Heinrich", "Weltmeyer"],
    highlights: [
      "Veel kracht",
      "Aansprekende uitstraling",
      "Goede beweging",
      "Interessant voor sport",
    ],
  },
  {
    id: 12,
    slug: "bella-notte",
    category: "newly-listed",
    title: "Bella Notte",
    subtitle: "Italian Sport Horse / 6 jaar",
    bid: "€55.000",
    badge: "New",
    endsAt: "2026-04-25T22:45:12",
    image: "/img/newly-listed/imago0081934167s.jpg",
    imageAlt: "Bella Notte",
    breed: "Italian Sport Horse",
    age: "6 jaar",
    gender: "Merrie",
    height: "1.68 m",
    location: "Maastricht, Nederland",
    discipline: "Allround",
    description:
      "Bella Notte is een elegant en vriendelijk paard met veel potentie voor allround gebruik en verdere ontwikkeling.",
    pedigree: ["Tangelo van de Zuuthoeve", "Indoctro", "Lux Z"],
    highlights: [
      "Elegant model",
      "Vriendelijk karakter",
      "Veel potentie",
      "Breed inzetbaar",
    ],
  },
];

export function getHorseBySlug(slug: string) {
  return horses.find((horse) => horse.slug === slug);
}

export function getEliteHorses() {
  return horses.filter((horse) => horse.category === "elite");
}

export function getRegularHorses() {
  return horses.filter((horse) => horse.category !== "elite");
}