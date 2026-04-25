export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  content: string[];
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: "elite-paardenveilingen-in-europa-groeien-snel",
    title: "Elite paardenveilingen in Europa groeien snel",
    summary:
      "De vraag naar zorgvuldig geselecteerde sportpaarden blijft toenemen binnen internationale veilingplatformen.",
    category: "Veilingen",
    date: "12 juni 2024",
    readTime: "4 min lezen",
    image: "/img/news/news-1.jpg",
    imageAlt: "Elite paardenveiling",
    content: [
      "De Europese markt voor elitepaarden blijft zich sterk ontwikkelen. Steeds meer kopers zoeken naar transparante veilingplatformen waar kwaliteit, afstamming, medische documentatie en prestaties duidelijk worden gepresenteerd.",
      "Voor verkopers betekent dit dat een professionele online presentatie steeds belangrijker wordt. Niet alleen de foto’s en video’s spelen een rol, maar ook de volledigheid van stamboomgegevens, veterinaire rapporten en duidelijke veilingvoorwaarden.",
      "Hippique Auctions richt zich op een zorgvuldig samengestelde ervaring waarin kopers en verkopers elkaar binnen een betrouwbare digitale omgeving kunnen ontmoeten.",
    ],
  },
  {
    id: 2,
    slug: "waarom-digitale-documentatie-belangrijk-is",
    title: "Waarom digitale documentatie belangrijk is bij veilingen",
    summary:
      "Volledige documentatie verhoogt het vertrouwen van kopers en maakt het biedproces professioneler.",
    category: "Documentatie",
    date: "04 juni 2024",
    readTime: "3 min lezen",
    image: "/img/news/news-2.jpg",
    imageAlt: "Digitale documentatie voor paarden",
    content: [
      "Bij online veilingen is vertrouwen essentieel. Kopers kunnen het paard of embryo vaak niet fysiek beoordelen voordat zij een bod plaatsen. Daarom speelt digitale documentatie een belangrijke rol.",
      "Denk aan veterinaire controles, röntgenrapporten, stamboomgegevens, video’s en duidelijke beschrijvingen van prestaties of fokpotentieel. Hoe completer de informatie, hoe sterker de positie van de verkoper.",
      "Een goed opgebouwde listing maakt het voor kopers eenvoudiger om snel een onderbouwde beslissing te nemen.",
    ],
  },
  {
    id: 3,
    slug: "nieuwe-trends-in-embryo-en-spermaveilingen",
    title: "Nieuwe trends in embryo- en spermaveilingen",
    summary:
      "Fokkers tonen steeds meer interesse in genetisch sterke combinaties via digitale veilingen.",
    category: "Fokkerij",
    date: "28 mei 2024",
    readTime: "5 min lezen",
    image: "/img/news/news-3.jpg",
    imageAlt: "Embryo en sperma veilingen",
    content: [
      "Embryo- en spermaveilingen worden steeds relevanter binnen de internationale paardenwereld. Kopers kijken niet alleen naar het huidige prestatieniveau, maar vooral naar genetisch potentieel.",
      "Sterke vader- en moederlijnen, bewezen sportprestaties en transparante fokinformatie vormen de basis voor succesvolle listings.",
      "Voor platformen betekent dit dat categorieën zoals embryo’s en sperma een eigen structuur nodig hebben, met velden voor donorinformatie, registraties, kwaliteit en medische gegevens.",
    ],
  },
  {
    id: 4,
    slug: "hoe-bereid-je-een-paard-voor-op-online-verkoop",
    title: "Hoe bereid je een paard voor op online verkoop?",
    summary:
      "Een goede voorbereiding bestaat uit professionele media, duidelijke beschrijving en betrouwbare gegevens.",
    category: "Verkopers",
    date: "16 mei 2024",
    readTime: "4 min lezen",
    image: "/img/news/news-4.jpg",
    imageAlt: "Paard voorbereiden op online verkoop",
    content: [
      "Een succesvolle online verkoop begint met voorbereiding. Professionele foto’s, duidelijke video’s en een eerlijke beschrijving zorgen voor een sterke eerste indruk.",
      "Daarnaast is het belangrijk om alle gegevens vooraf te verzamelen: leeftijd, ras, hoogte, discipline, stamboekgegevens, prestaties, locatie en relevante documenten.",
      "Een transparante presentatie vergroot de kans op serieuze biedingen en vermindert vragen tijdens het veilingproces.",
    ],
  },
  {
    id: 5,
    slug: "partnernetwerk-versterkt-internationale-groei",
    title: "Partnernetwerk versterkt internationale groei",
    summary:
      "Samenwerkingen met gespecialiseerde partners maken internationale transacties eenvoudiger en betrouwbaarder.",
    category: "Partners",
    date: "02 mei 2024",
    readTime: "3 min lezen",
    image: "/img/news/news-5.jpg",
    imageAlt: "Partnernetwerk Hippique Auctions",
    content: [
      "Een sterk partnernetwerk is belangrijk voor de groei van een internationaal veilingplatform. Denk aan veterinaire specialisten, transportpartners, mediapartners en fokkerijorganisaties.",
      "Door samen te werken met betrouwbare partijen kan een platform kopers en verkopers beter ondersteunen in elke fase van het proces.",
      "De partnersectie op de homepage helpt om deze samenwerkingen zichtbaar te maken en vertrouwen op te bouwen.",
    ],
  },
  {
    id: 6,
    slug: "veilig-bieden-begint-met-een-goed-accountproces",
    title: "Veilig bieden begint met een goed accountproces",
    summary:
      "Verificatie, duidelijke biedvoorwaarden en veilige communicatie zijn essentieel voor een betrouwbaar platform.",
    category: "Account",
    date: "20 april 2024",
    readTime: "4 min lezen",
    image: "/img/news/news-6.jpg",
    imageAlt: "Veilig accountproces",
    content: [
      "Een betrouwbaar veilingplatform vraagt om een zorgvuldig accountproces. Kopers moeten weten dat biedingen serieus zijn en verkopers moeten vertrouwen hebben in de deelnemers.",
      "Verificatie via e-mail, telefoonnummer en eventueel een bieddeposito kan helpen om misbruik te voorkomen.",
      "Daarnaast zijn duidelijke meldingen, biedgeschiedenis en accountbeheer belangrijk voor een professionele gebruikerservaring.",
    ],
  },
];

export function getNewsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

export function getRelatedNews(currentSlug: string) {
  return newsItems.filter((item) => item.slug !== currentSlug).slice(0, 3);
}