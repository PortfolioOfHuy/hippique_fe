import Image from "next/image";
import { Heart, MapPin, CalendarDays } from "lucide-react";
import { horses } from "@/components/modules/site/home/data/horses";
import styles from "./VeilingenPage.module.scss";

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

function getTimeValue(category: string) {
  if (category === "ending-soon") return "00:08:42";
  if (category === "newly-listed") return "2d 08u";
  return "04:12:35";
}

function getLocation(category: string) {
  if (category === "ending-soon") return "Wellington, VS";
  if (category === "newly-listed") return "Start op 12 nov., 18:00 CET";
  return "Deauville, Frankrijk";
}

const topTabs = [
  { label: "Alles", count: 124, active: true },
  { label: "Nu live", count: 8 },
  { label: "Eindigt binnenkort", count: 4 },
  { label: "Binnenkort", count: 12 },
  { label: "Voorvertoning", count: 15 },
  { label: "Eerdere resultaten", count: 85 },
];

export default function VeilingenPage() {
  const auctionItems = horses.slice(0, 9);

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <section className={styles.topbar}>
          <div className={styles.tabs}>
            {topTabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={`${styles.tabButton} ${
                  tab.active ? styles.tabButtonActive : ""
                }`}
              >
                <span>{tab.label}</span>
                <small>{tab.count}</small>
              </button>
            ))}
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
          <div className={styles.categoryRow}>
            <button
              type="button"
              className={`${styles.categoryChip} ${styles.categoryChipActive}`}
            >
              Paarden
            </button>

            <button type="button" className={styles.categoryChip}>
              Embryo&apos;s
            </button>

            <button type="button" className={styles.categoryChip}>
              Sperma
            </button>
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

        <section className={styles.grid}>
          {auctionItems.map((horse) => {
            const variant = getCardVariant(horse.category);
            const href = getHorseHref(horse.category, horse.slug);

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

                      <p className={styles.cardSubtitle}>{horse.subtitle}</p>
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
                        {getTimeValue(horse.category)}
                      </strong>
                    </div>
                  </div>

                  <div className={styles.locationRow}>
                    {horse.category === "newly-listed" ? (
                      <>
                        <CalendarDays size={14} strokeWidth={1.8} />
                        <span>{getLocation(horse.category)}</span>
                      </>
                    ) : (
                      <>
                        <MapPin size={14} strokeWidth={1.8} />
                        <span>{getLocation(horse.category)}</span>
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
      </div>
    </main>
  );
}