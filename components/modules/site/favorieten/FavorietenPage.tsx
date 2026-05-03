"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  Eye,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import styles from "./FavorietenPage.module.scss";

type FavoriteCategory = "all" | "elite" | "young" | "sport";

type FavoriteHorse = {
  id: number;
  slug: string;
  name: string;
  image: string;
  category: Exclude<FavoriteCategory, "all">;
  breed: string;
  age: number;
  gender: string;
  location: string;
  discipline: string;
  seller: string;
  currentBid: string;
  nextEvent: string;
  rating: number;
  status: "Live veiling" | "Binnenkort" | "Nieuwe favoriet";
};

const favoriteHorses: FavoriteHorse[] = [
  {
    id: 1,
    slug: "velvet-legacy",
    name: "Velvet Legacy",
    image: "/img/hero/hero.webp",
    category: "elite",
    breed: "KWPN",
    age: 8,
    gender: "Merrie",
    location: "Amsterdam, Nederland",
    discipline: "Springen",
    seller: "Van Dijk Stables",
    currentBid: "€ 48.500",
    nextEvent: "Sluit over 02u 18m",
    rating: 4.9,
    status: "Live veiling",
  },
  {
    id: 2,
    slug: "golden-echo",
    name: "Golden Echo",
    image: "/img/hero/hero.webp",
    category: "young",
    breed: "BWP",
    age: 4,
    gender: "Hengst",
    location: "Utrecht, Nederland",
    discipline: "Dressuur",
    seller: "Echo Equestrian",
    currentBid: "€ 16.750",
    nextEvent: "Preview op vrijdag",
    rating: 4.7,
    status: "Binnenkort",
  },
  {
    id: 3,
    slug: "royal-sprint",
    name: "Royal Sprint",
    image: "/img/hero/hero.webp",
    category: "sport",
    breed: "Oldenburg",
    age: 9,
    gender: "Ruin",
    location: "Antwerpen, België",
    discipline: "Eventing",
    seller: "Royal Horse House",
    currentBid: "€ 31.200",
    nextEvent: "Nieuwe update vandaag",
    rating: 4.8,
    status: "Nieuwe favoriet",
  },
  {
    id: 4,
    slug: "northern-flame",
    name: "Northern Flame",
    image: "/img/hero/hero.webp",
    category: "elite",
    breed: "Hanoveraan",
    age: 7,
    gender: "Merrie",
    location: "Rotterdam, Nederland",
    discipline: "Springen",
    seller: "Flame Performance",
    currentBid: "€ 56.000",
    nextEvent: "Sluit morgen om 20:00",
    rating: 5.0,
    status: "Live veiling",
  },
  {
    id: 5,
    slug: "silver-orbit",
    name: "Silver Orbit",
    image: "/img/hero/hero.webp",
    category: "young",
    breed: "Hippique",
    age: 3,
    gender: "Hengst",
    location: "Eindhoven, Nederland",
    discipline: "Springen",
    seller: "Orbit Breeding",
    currentBid: "€ 12.900",
    nextEvent: "Video toegevoegd",
    rating: 4.6,
    status: "Nieuwe favoriet",
  },
  {
    id: 6,
    slug: "imperial-dream",
    name: "Imperial Dream",
    image: "/img/hero/hero.webp",
    category: "sport",
    breed: "AES",
    age: 10,
    gender: "Ruin",
    location: "Gent, België",
    discipline: "Dressuur",
    seller: "Imperial Dressage",
    currentBid: "€ 39.500",
    nextEvent: "Bezichtiging op afspraak",
    rating: 4.9,
    status: "Binnenkort",
  },
];

const filterTabs: Array<{
  key: FavoriteCategory;
  label: string;
}> = [
  { key: "all", label: "Alle favorieten" },
  { key: "elite", label: "Elite paarden" },
  { key: "young", label: "Jonge paarden" },
  { key: "sport", label: "Sportpaarden" },
];

function getStatusClassName(status: FavoriteHorse["status"]) {
  switch (status) {
    case "Live veiling":
      return "live";
    case "Binnenkort":
      return "soon";
    default:
      return "new";
  }
}

function getCategoryLabel(category: FavoriteHorse["category"]) {
  if (category === "elite") return "Elite paarden";
  if (category === "young") return "Jonge paarden";
  return "Sportpaarden";
}

function getHorseHref(horse: FavoriteHorse) {
  if (horse.category === "elite") {
    return `/elite/${horse.slug}`;
  }

  return `/paarden/${horse.slug}`;
}

export default function FavorietenPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FavoriteCategory>("all");
  const [favorites, setFavorites] = useState<FavoriteHorse[]>(favoriteHorses);

  const filteredHorses = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return favorites.filter((horse) => {
      const matchesFilter =
        activeFilter === "all" ? true : horse.category === activeFilter;

      const searchableText = [
        horse.name,
        horse.breed,
        horse.discipline,
        horse.location,
        horse.seller,
        getCategoryLabel(horse.category),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = keyword ? searchableText.includes(keyword) : true;

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, favorites, query]);

  const liveCount = useMemo(() => {
    return favorites.filter((horse) => horse.status === "Live veiling").length;
  }, [favorites]);

  const removeFavorite = (horseId: number) => {
    setFavorites((prev) => prev.filter((horse) => horse.id !== horseId));
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.kicker}>Mijn account</span>
          <h1>Mijn favoriete paarden</h1>
          <p>
            Bewaar jouw favoriete paarden op één plek, vergelijk ze sneller en
            ga direct naar de detailpagina of actieve veiling.
          </p>

          <div className={styles.heroActions}>
            <Link href="/veilingen" className={styles.primaryButton}>
              Bekijk veilingen
            </Link>

            <Link href="/elite" className={styles.secondaryButton}>
              Ontdek elite paarden
            </Link>
          </div>
        </div>

        <div className={styles.heroStats}>
          <article className={styles.statCard}>
            <div className={styles.statIcon}>
              <Heart size={18} strokeWidth={2.2} />
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <span>Favoriete paarden</span>
            </div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statIcon}>
              <Sparkles size={18} strokeWidth={2.2} />
            </div>
            <div>
              <strong>{liveCount}</strong>
              <span>Actieve veilingen</span>
            </div>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statIcon}>
              <CalendarClock size={18} strokeWidth={2.2} />
            </div>
            <div>
              <strong>{favorites.length - liveCount}</strong>
              <span>Preview & updates</span>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.toolbarCard}>
        <div className={styles.searchBox}>
          <Search size={18} strokeWidth={2.1} />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Zoek op naam, ras, discipline of locatie..."
            aria-label="Zoek favoriete paarden"
          />
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterLabel}>
            <SlidersHorizontal size={16} strokeWidth={2.1} />
            <span>Filter</span>
          </div>

          <div className={styles.filterTabs}>
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`${styles.filterTab} ${
                  activeFilter === tab.key ? styles.filterTabActive : ""
                }`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.resultsHeader}>
        <div>
          <span className={styles.resultsKicker}>Overzicht</span>
          <h2>Paarden die jij hebt opgeslagen</h2>
        </div>

        <p>
          {filteredHorses.length} resultaat
          {filteredHorses.length === 1 ? "" : "en"} gevonden
        </p>
      </section>

      {filteredHorses.length > 0 ? (
        <section className={styles.grid}>
          {filteredHorses.map((horse) => {
            const href = getHorseHref(horse);

            return (
              <article key={horse.id} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={horse.image}
                    alt={horse.name}
                    width={720}
                    height={520}
                    className={styles.cardImage}
                  />

                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status${getStatusClassName(horse.status)}`]
                    }`}
                  >
                    {horse.status}
                  </span>

                  <button
                    type="button"
                    className={styles.favoriteButton}
                    aria-label={`Verwijder ${horse.name} uit favorieten`}
                    onClick={() => removeFavorite(horse.id)}
                  >
                    <Trash2 size={16} strokeWidth={2.1} />
                  </button>

                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3>{horse.name}</h3>
                      <p className={styles.cardSubtitle}>
                        {horse.breed} · {horse.age} jaar · {horse.gender}
                      </p>

                      <span className={styles.categoryInline}>
                        {getCategoryLabel(horse.category)}
                      </span>
                    </div>

                    <div className={styles.rating}>
                      <Star size={15} strokeWidth={2.1} />
                      <span>{horse.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className={styles.metaList}>
                    <div className={styles.metaItem}>
                      <MapPin size={15} strokeWidth={2.1} />
                      <span>{horse.location}</span>
                    </div>

                    <div className={styles.metaItem}>
                      <Sparkles size={15} strokeWidth={2.1} />
                      <span>{horse.discipline}</span>
                    </div>

                    <div className={styles.metaItem}>
                      <CalendarClock size={15} strokeWidth={2.1} />
                      <span>{horse.nextEvent}</span>
                    </div>
                  </div>

                  <div className={styles.sellerCard}>
                    <span>Aanbieder</span>
                    <strong>{horse.seller}</strong>
                  </div>

                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.priceLabel}>Huidig bod</span>
                      <strong className={styles.priceValue}>
                        {horse.currentBid}
                      </strong>
                    </div>

                    <div className={styles.cardActions}>
                      <Link href={href} className={styles.ghostButton}>
                        <Eye size={16} strokeWidth={2.1} />
                        Bekijk
                      </Link>

                      <Link href={href} className={styles.cardPrimaryButton}>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Heart size={30} strokeWidth={2} />
          </div>
          <h3>Geen favoriete paarden gevonden</h3>
          <p>
            Pas je zoekopdracht of filter aan, of voeg nieuwe paarden toe aan je
            favorieten vanuit de veiling- of detailpagina.
          </p>
          <Link href="/veilingen" className={styles.primaryButton}>
            Ga naar veilingen
          </Link>
        </section>
      )}
    </main>
  );
}
