"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getEliteHorses } from "@/components/modules/site/home/data/horses";
import styles from "./ElitePage.module.scss";

type TopTabKey =
  | "all"
  | "live"
  | "ending-soon"
  | "upcoming"
  | "preview"
  | "results";

type EliteCategoryKey = "all" | "young" | "sport";

type SelectFilters = {
  breed: string;
  discipline: string;
  age: string;
  gender: string;
  location: string;
  price: string;
};

const topTabs: Array<{
  key: TopTabKey;
  label: string;
  count: number;
}> = [
  { key: "all", label: "Alles", count: 124 },
  { key: "live", label: "Nu live", count: 8 },
  { key: "ending-soon", label: "Eindigt binnenkort", count: 4 },
  { key: "upcoming", label: "Binnenkort", count: 12 },
  { key: "preview", label: "Voorvertoning", count: 15 },
  { key: "results", label: "Eerdere resultaten", count: 85 },
];

const categoryTabs: Array<{
  key: EliteCategoryKey;
  label: string;
}> = [
  { key: "all", label: "Elitepaarden" },
  { key: "young", label: "Jonge paarden" },
  { key: "sport", label: "Sportpaarden" },
];

function getHorseSearchText(horse: ReturnType<typeof getEliteHorses>[number]) {
  return [
    horse.title,
    horse.subtitle,
    horse.badge,
    horse.location,
    horse.discipline,
    horse.bid,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getHorseCategory(horse: ReturnType<typeof getEliteHorses>[number]) {
  const searchableText = getHorseSearchText(horse);

  const isYoungHorse =
    searchableText.includes("jong") ||
    searchableText.includes("jonge") ||
    searchableText.includes("veulen") ||
    searchableText.includes("young") ||
    searchableText.includes("talent");

  return isYoungHorse ? "young" : "sport";
}

function getHorseStatus(horse: ReturnType<typeof getEliteHorses>[number]) {
  const searchableText = getHorseSearchText(horse);

  if (
    searchableText.includes("eindigt") ||
    searchableText.includes("ending") ||
    searchableText.includes("soon")
  ) {
    return "ending-soon";
  }

  if (
    searchableText.includes("binnenkort") ||
    searchableText.includes("preview") ||
    searchableText.includes("upcoming")
  ) {
    return "upcoming";
  }

  return "live";
}

function getPriceNumber(price: string) {
  const cleanPrice = price.replace(/[^\d]/g, "");
  return Number(cleanPrice || 0);
}

function matchesSelectFilters(
  horse: ReturnType<typeof getEliteHorses>[number],
  filters: SelectFilters,
) {
  const searchableText = getHorseSearchText(horse);
  const priceNumber = getPriceNumber(horse.bid);

  const matchBreed =
    filters.breed === "all-breeds" || searchableText.includes(filters.breed);

  const matchDiscipline =
    filters.discipline === "all-disciplines" ||
    searchableText.includes(filters.discipline);

  const matchAge =
    filters.age === "any-age" ||
    searchableText.includes(filters.age) ||
    searchableText.includes("jaar");

  const matchGender =
    filters.gender === "all-genders" ||
    searchableText.includes(filters.gender);

  const matchLocation =
    filters.location === "global" || searchableText.includes(filters.location);

  const matchPrice =
    filters.price === "any-price" ||
    (filters.price === "0-50000" && priceNumber <= 50000) ||
    (filters.price === "50000-250000" &&
      priceNumber >= 50000 &&
      priceNumber <= 250000) ||
    (filters.price === "250000-plus" && priceNumber >= 250000);

  return (
    matchBreed &&
    matchDiscipline &&
    matchAge &&
    matchGender &&
    matchLocation &&
    matchPrice
  );
}

export default function ElitePage() {
  const [activeTopTab, setActiveTopTab] = useState<TopTabKey>("all");
  const [activeCategory, setActiveCategory] =
    useState<EliteCategoryKey>("all");

  const [filters, setFilters] = useState<SelectFilters>({
    breed: "all-breeds",
    discipline: "all-disciplines",
    age: "any-age",
    gender: "all-genders",
    location: "global",
    price: "any-price",
  });

  const horses = useMemo(() => getEliteHorses(), []);

  const filteredHorses = useMemo(() => {
    return horses.filter((horse) => {
      const horseStatus = getHorseStatus(horse);
      const horseCategory = getHorseCategory(horse);

      const matchTopTab =
        activeTopTab === "all" || activeTopTab === horseStatus;

      const matchCategory =
        activeCategory === "all" || activeCategory === horseCategory;

      return (
        matchTopTab &&
        matchCategory &&
        matchesSelectFilters(horse, filters)
      );
    });
  }, [horses, activeTopTab, activeCategory, filters]);

  const handleFilterChange = (name: keyof SelectFilters, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  return (
    <main className={styles.page}>
      <div className={styles.inner}>

        <section className={styles.topbar}>
          <div className={styles.tabs} role="tablist" aria-label="Veilingstatus">
            {topTabs.map((tab) => {
              const isActive = activeTopTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabButton} ${
                    isActive ? styles.tabButtonActive : ""
                  }`}
                  onClick={() => setActiveTopTab(tab.key)}
                >
                  <span>{tab.label}</span>
                  <small>{tab.count}</small>
                </button>
              );
            })}
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.searchWrap}>
              <input
                type="text"
                placeholder="Zoek op naam, vaderlijn..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.sortWrap}>
              <select className={styles.sortSelect} defaultValue="ending-soon">
                <option value="ending-soon">Eindigt binnenkort</option>
                <option value="live-now">Nu live</option>
                <option value="upcoming">Binnenkort</option>
                <option value="latest">Nieuwste</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.filtersBox}>
          <div
            className={styles.categoryRow}
            role="tablist"
            aria-label="Elitepaarden categorie"
          >
            {categoryTabs.map((category) => {
              const isActive = activeCategory === category.key;

              return (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.categoryChip} ${
                    isActive ? styles.categoryChipActive : ""
                  }`}
                  onClick={() => setActiveCategory(category.key)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Ras</span>
              <select
                className={styles.filterSelect}
                value={filters.breed}
                onChange={(event) =>
                  handleFilterChange("breed", event.target.value)
                }
              >
                <option value="all-breeds">Alle rassen</option>
                <option value="kwpn">KWPN</option>
                <option value="hannoveraan">Hannoveraan</option>
                <option value="selle français">Selle Français</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Discipline</span>
              <select
                className={styles.filterSelect}
                value={filters.discipline}
                onChange={(event) =>
                  handleFilterChange("discipline", event.target.value)
                }
              >
                <option value="all-disciplines">Alle disciplines</option>
                <option value="springen">Springen</option>
                <option value="dressuur">Dressuur</option>
                <option value="eventing">Eventing</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Leeftijd</span>
              <select
                className={styles.filterSelect}
                value={filters.age}
                onChange={(event) =>
                  handleFilterChange("age", event.target.value)
                }
              >
                <option value="any-age">Elke leeftijd</option>
                <option value="jong">Jonge paarden</option>
                <option value="4-6">4 - 6 jaar</option>
                <option value="7-10">7 - 10 jaar</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Geslacht</span>
              <select
                className={styles.filterSelect}
                value={filters.gender}
                onChange={(event) =>
                  handleFilterChange("gender", event.target.value)
                }
              >
                <option value="all-genders">Alle geslachten</option>
                <option value="merrie">Merrie</option>
                <option value="hengst">Hengst</option>
                <option value="ruin">Ruin</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Locatie</span>
              <select
                className={styles.filterSelect}
                value={filters.location}
                onChange={(event) =>
                  handleFilterChange("location", event.target.value)
                }
              >
                <option value="global">Wereldwijd</option>
                <option value="nederland">Nederland</option>
                <option value="frankrijk">Frankrijk</option>
                <option value="belgië">België</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Prijsklasse</span>
              <select
                className={styles.filterSelect}
                value={filters.price}
                onChange={(event) =>
                  handleFilterChange("price", event.target.value)
                }
              >
                <option value="any-price">Elke prijs</option>
                <option value="0-50000">€0 - €50.000</option>
                <option value="50000-250000">€50.000 - €250.000</option>
                <option value="250000-plus">€250.000+</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.infoBar}>
          <div className={styles.infoLeft}>
            <span className={styles.infoDotLive}>8 kavels nu live</span>
            <span className={styles.infoDotEnding}>4 eindigen binnenkort</span>
            <span className={styles.infoText}>
              Volgende veiling start over 2 dagen
            </span>
          </div>

          <div className={styles.infoRight}>
            Wereldwijde transportbegeleiding beschikbaar
          </div>
        </section>

        {filteredHorses.length > 0 ? (
          <div className={styles.grid}>
            {filteredHorses.map((horse) => {
              const href = `/elite/${horse.slug}`;

              return (
                <article key={horse.id} className={styles.card}>
                  <a href={href} className={styles.imageLink}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={horse.image}
                        alt={horse.imageAlt}
                        fill
                        className={styles.image}
                        sizes="(max-width: 991px) 100vw, 33vw"
                      />

                      <span className={styles.badge}>{horse.badge}</span>
                    </div>
                  </a>

                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>
                      <a href={href}>{horse.title}</a>
                    </h2>

                    <p className={styles.cardSubtitle}>{horse.subtitle}</p>

                    <div className={styles.meta}>
                      <span>{horse.location}</span>
                      <span>{horse.discipline}</span>
                    </div>

                    <div className={styles.bottomRow}>
                      <div className={styles.priceBlock}>
                        <span className={styles.priceLabel}>Huidig bod</span>
                        <strong className={styles.priceValue}>
                          {horse.bid}
                        </strong>
                      </div>

                      <a href={href} className={styles.button}>
                        Details bekijken
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <section className={styles.emptyState}>
            <h2>Geen elitepaarden gevonden</h2>
            <p>
              Er zijn momenteel geen paarden beschikbaar binnen deze combinatie
              van filters. Kies een andere status, categorie of filter.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}