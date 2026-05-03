"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Heart, MapPin, CalendarDays } from "lucide-react";
import { horses } from "@/components/modules/site/home/data/horses";
import styles from "./VeilingenPage.module.scss";

type TopTabKey =
  | "all"
  | "live"
  | "ending-soon"
  | "upcoming"
  | "preview"
  | "results";

type CategoryKey = "paarden" | "embryos" | "sperma";

type CountdownMap = Record<string, number>;

function getHorseHref(category: string, slug: string) {
  if (category === "elite") {
    return `/elite/${slug}`;
  }

  return `/paarden/${slug}`;
}

function getCardVariant(category: string) {
  if (category === "ending-soon") return "ending";
  if (category === "newly-listed") return "upcoming";
  return "live";
}

function getAuctionStatus(category: string): TopTabKey {
  if (category === "ending-soon") return "ending-soon";
  if (category === "newly-listed") return "upcoming";
  return "live";
}

function getAuctionType(horse: unknown): CategoryKey {
  const item = horse as Record<string, unknown>;

  const type =
    typeof item.auctionType === "string"
      ? item.auctionType
      : typeof item.type === "string"
        ? item.type
        : typeof item.kind === "string"
          ? item.kind
          : "paarden";

  if (type === "embryos" || type === "embryo") return "embryos";
  if (type === "sperma" || type === "sperm") return "sperma";

  return "paarden";
}

function getTagText(category: string) {
  if (category === "ending-soon") return "Eindigt binnenkort";
  if (category === "newly-listed") return "Binnenkort";
  return "Nu live";
}

function getTagClassName(category: string) {
  if (category === "ending-soon") return styles.tagEnding;
  if (category === "newly-listed") return styles.tagUpcoming;
  return styles.tagLive;
}

function getPrimaryButtonText(category: string) {
  if (category === "ending-soon") return "Bied nu";
  if (category === "newly-listed") return "Bekijk details";
  return "Plaats bod";
}

function getButtonClassName(category: string) {
  if (category === "ending-soon") return styles.buttonEnding;
  if (category === "newly-listed") return styles.buttonUpcoming;
  return styles.buttonLive;
}

function getPriceLabel(category: string) {
  if (category === "newly-listed") return "Startprijs";
  return "Huidig bod";
}

function getTimeLabel(category: string) {
  if (category === "newly-listed") return "Start over";
  return "Eindigt over";
}

function getInitialCountdownSeconds(category: string) {
  if (category === "ending-soon") return 8 * 60 + 42;
  if (category === "newly-listed") return 2 * 24 * 60 * 60 + 8 * 60 * 60;
  return 4 * 60 * 60 + 12 * 60 + 35;
}

function formatCountdown(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);

  const days = Math.floor(safeSeconds / 86400);
  const hours = Math.floor((safeSeconds % 86400) / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const pad = (value: number) => String(value).padStart(2, "0");

  if (days > 0) {
    return `${days}d ${pad(hours)}u ${pad(minutes)}m`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function getLocation(category: string, fallbackLocation?: string) {
  if (fallbackLocation) return fallbackLocation;

  if (category === "ending-soon") return "Wellington, VS";
  if (category === "newly-listed") return "Start op 12 nov., 18:00 CET";
  return "Deauville, Frankrijk";
}

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
  key: CategoryKey;
  label: string;
}> = [
  { key: "paarden", label: "Paarden" },
  { key: "embryos", label: "Embryo's" },
  { key: "sperma", label: "Sperma" },
];

export default function VeilingenPage() {
  const [activeTopTab, setActiveTopTab] = useState<TopTabKey>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("paarden");
  const [countdowns, setCountdowns] = useState<CountdownMap>({});

  const auctionItems = useMemo(() => {
    return horses
      .filter((horse) => horse.category !== "elite")
      .filter((horse) => {
        const horseStatus = getAuctionStatus(horse.category);
        const horseType = getAuctionType(horse);

        const matchTopTab =
          activeTopTab === "all" || horseStatus === activeTopTab;

        const matchCategory = horseType === activeCategory;

        return matchTopTab && matchCategory;
      })
      .slice(0, 9);
  }, [activeTopTab, activeCategory]);

  useEffect(() => {
    setCountdowns((prevCountdowns) => {
      const nextCountdowns: CountdownMap = {};

      auctionItems.forEach((horse) => {
        const key = String(horse.id);

        nextCountdowns[key] =
          prevCountdowns[key] ?? getInitialCountdownSeconds(horse.category);
      });

      return nextCountdowns;
    });
  }, [auctionItems]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const nextCountdowns: CountdownMap = {};

        Object.entries(prevCountdowns).forEach(([key, value]) => {
          nextCountdowns[key] = Math.max(0, value - 1);
        });

        return nextCountdowns;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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
            aria-label="Veilingcategorie"
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
              <select className={styles.filterSelect} defaultValue="all-breeds">
                <option value="all-breeds">Alle rassen</option>
                <option value="kwpn">KWPN</option>
                <option value="hannoveraan">Hannoveraan</option>
                <option value="zangersheide">Zangersheide</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Discipline</span>
              <select
                className={styles.filterSelect}
                defaultValue="show-jumping"
              >
                <option value="show-jumping">Springen</option>
                <option value="dressage">Dressuur</option>
                <option value="allround">Allround</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Leeftijd</span>
              <select className={styles.filterSelect} defaultValue="any-age">
                <option value="any-age">Elke leeftijd</option>
                <option value="4-6">4 - 6 jaar</option>
                <option value="7-10">7 - 10 jaar</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Geslacht</span>
              <select
                className={styles.filterSelect}
                defaultValue="all-genders"
              >
                <option value="all-genders">Alle geslachten</option>
                <option value="mare">Merrie</option>
                <option value="stallion">Hengst</option>
                <option value="gelding">Ruin</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Locatie</span>
              <select className={styles.filterSelect} defaultValue="global">
                <option value="global">Wereldwijd</option>
                <option value="netherlands">Nederland</option>
                <option value="france">Frankrijk</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Prijsklasse</span>
              <select className={styles.filterSelect} defaultValue="any-price">
                <option value="any-price">Elke prijs</option>
                <option value="0-50000">€0 - €50.000</option>
                <option value="50000-250000">€50.000 - €250.000</option>
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

        {auctionItems.length > 0 ? (
          <section className={styles.grid}>
            {auctionItems.map((horse) => {
              const variant = getCardVariant(horse.category);
              const href = getHorseHref(horse.category, horse.slug);
              const countdownKey = String(horse.id);
              const countdownValue =
                countdowns[countdownKey] ??
                getInitialCountdownSeconds(horse.category);

              return (
                <article
                  key={horse.id}
                  className={`${styles.card} ${
                    variant === "ending"
                      ? styles.cardEnding
                      : variant === "upcoming"
                        ? styles.cardUpcoming
                        : styles.cardLive
                  }`}
                >
                  <a href={href} className={styles.imageLink}>
                    <div className={styles.imageWrap}>
                      <Image
                        src={horse.image}
                        alt={horse.imageAlt}
                        fill
                        className={styles.image}
                        sizes="(max-width: 991px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      />

                      <span
                        className={`${styles.tag} ${getTagClassName(
                          horse.category,
                        )}`}
                      >
                        {getTagText(horse.category)}
                      </span>
                    </div>
                  </a>

                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <div className={styles.titleWrap}>
                        <h2 className={styles.cardTitle}>
                          <a href={href}>{horse.title}</a>
                        </h2>

                        <p className={styles.cardSubtitle}>
                          {horse.subtitle}
                        </p>
                      </div>

                      <button
                        type="button"
                        className={styles.favoriteButton}
                        aria-label="Toevoegen aan favorieten"
                      >
                        <Heart size={18} strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className={styles.metrics}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>
                          {getPriceLabel(horse.category)}
                        </span>

                        <strong className={styles.metricValue}>
                          {horse.bid}
                        </strong>
                      </div>

                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>
                          {getTimeLabel(horse.category)}
                        </span>

                        <strong
                          className={`${styles.metricValue} ${
                            horse.category === "ending-soon"
                              ? styles.metricValueEnding
                              : ""
                          }`}
                        >
                          {formatCountdown(countdownValue)}
                        </strong>
                      </div>
                    </div>

                    <div className={styles.locationRow}>
                      {horse.category === "newly-listed" ? (
                        <>
                          <CalendarDays size={14} strokeWidth={1.8} />
                          <span>
                            {getLocation(horse.category, horse.location)}
                          </span>
                        </>
                      ) : (
                        <>
                          <MapPin size={14} strokeWidth={1.8} />
                          <span>
                            {getLocation(horse.category, horse.location)}
                          </span>
                        </>
                      )}
                    </div>

                    <a
                      href={href}
                      className={`${styles.cardButton} ${getButtonClassName(
                        horse.category,
                      )}`}
                    >
                      {getPrimaryButtonText(horse.category)}
                    </a>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className={styles.emptyState}>
            <h2>Geen kavels gevonden</h2>
            <p>
              Er zijn momenteel geen resultaten voor deze combinatie van filters.
              Kies een andere status of categorie.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}