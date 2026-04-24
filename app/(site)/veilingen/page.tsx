import Image from "next/image";
import Link from "next/link";
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
  if (category === "ending-soon") return "Ending soon";
  if (category === "newly-listed") return "Upcoming";
  return "Live now";
}

function getTagClassName(category: string) {
  if (category === "ending-soon") return styles.tagEnding;
  if (category === "newly-listed") return styles.tagUpcoming;
  return styles.tagLive;
}

function getPrimaryButtonText(category: string) {
  if (category === "ending-soon") return "Bid now";
  if (category === "newly-listed") return "View details";
  return "Place bid";
}

function getButtonClassName(category: string) {
  if (category === "ending-soon") return styles.buttonEnding;
  if (category === "newly-listed") return styles.buttonUpcoming;
  return styles.buttonLive;
}

function getPriceLabel(category: string) {
  if (category === "newly-listed") return "Starting price";
  return "Current bid";
}

function getTimeLabel(category: string) {
  if (category === "newly-listed") return "Starts in";
  return "Ends in";
}

function getTimeValue(category: string) {
  if (category === "ending-soon") return "00:08:42";
  if (category === "newly-listed") return "2d 08h";
  return "04:12:35";
}

function getLocation(category: string) {
  if (category === "ending-soon") return "Wellington, USA";
  if (category === "newly-listed") return "Starts Nov 12, 18:00 CET";
  return "Deauville, France";
}

const topTabs = [
  { label: "All", count: 124, active: true },
  { label: "Live now", count: 8 },
  { label: "Ending soon", count: 4 },
  { label: "Upcoming", count: 12 },
  { label: "Preview", count: 15 },
  { label: "Past results", count: 85 },
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
                className={`${styles.tabButton} ${tab.active ? styles.tabButtonActive : ""}`}
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
                placeholder="Search by name, sire..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.sortWrap}>
              <select className={styles.sortSelect} defaultValue="ending-soon">
                <option value="ending-soon">Ending soon</option>
                <option value="live-now">Live now</option>
                <option value="upcoming">Upcoming</option>
                <option value="latest">Latest</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.filtersBox}>
          <div className={styles.categoryRow}>
            <button type="button" className={`${styles.categoryChip} ${styles.categoryChipActive}`}>
              Horses
            </button>
            <button type="button" className={styles.categoryChip}>
              Embryo&apos;s
            </button>
            <button type="button" className={styles.categoryChip}>
              Semen
            </button>
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Breed</span>
              <select className={styles.filterSelect} defaultValue="all-breeds">
                <option value="all-breeds">All breeds</option>
                <option value="kwpn">KWPN</option>
                <option value="hannoveraan">Hannoveraan</option>
                <option value="zangersheide">Zangersheide</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Discipline</span>
              <select className={styles.filterSelect} defaultValue="show-jumping">
                <option value="show-jumping">Show Jumping</option>
                <option value="dressage">Dressage</option>
                <option value="allround">Allround</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Age</span>
              <select className={styles.filterSelect} defaultValue="any-age">
                <option value="any-age">Any age</option>
                <option value="4-6">4 - 6 jaar</option>
                <option value="7-10">7 - 10 jaar</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Gender</span>
              <select className={styles.filterSelect} defaultValue="all-genders">
                <option value="all-genders">All genders</option>
                <option value="mare">Merrie</option>
                <option value="stallion">Hengst</option>
                <option value="gelding">Ruin</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Location</span>
              <select className={styles.filterSelect} defaultValue="global">
                <option value="global">Global</option>
                <option value="netherlands">Nederland</option>
                <option value="france">Frankrijk</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>Price range</span>
              <select className={styles.filterSelect} defaultValue="any-price">
                <option value="any-price">Any price</option>
                <option value="0-50000">€0 - €50.000</option>
                <option value="50000-250000">€50.000 - €250.000</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.infoBar}>
          <div className={styles.infoLeft}>
            <span className={styles.infoDotLive}>8 lots live now</span>
            <span className={styles.infoDotEnding}>4 ending soon</span>
            <span className={styles.infoText}>Next auction starts in 2 days</span>
          </div>

          <div className={styles.infoRight}>Global shipping assistance available</div>
        </section>

        <section className={styles.grid}>
          {auctionItems.map((horse) => {
            const variant = getCardVariant(horse.category);

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
                <Link href={getHorseHref(horse.category, horse.slug)} className={styles.imageLink}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={horse.image}
                      alt={horse.imageAlt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 991px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    />

                    <span className={`${styles.tag} ${getTagClassName(horse.category)}`}>
                      {getTagText(horse.category)}
                    </span>
                  </div>
                </Link>

                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <div className={styles.titleWrap}>
                      <h2 className={styles.cardTitle}>
                        <Link href={getHorseHref(horse.category, horse.slug)}>
                          {horse.title}
                        </Link>
                      </h2>
                      <p className={styles.cardSubtitle}>{horse.subtitle}</p>
                    </div>

                    <button type="button" className={styles.favoriteButton} aria-label="Favoriet">
                      <Heart size={18} strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className={styles.metrics}>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>{getPriceLabel(horse.category)}</span>
                      <strong className={styles.metricValue}>{horse.bid}</strong>
                    </div>

                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>{getTimeLabel(horse.category)}</span>
                      <strong
                        className={`${styles.metricValue} ${
                          horse.category === "ending-soon" ? styles.metricValueEnding : ""
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

                  <Link
                    href={getHorseHref(horse.category, horse.slug)}
                    className={`${styles.cardButton} ${getButtonClassName(horse.category)}`}
                  >
                    {getPrimaryButtonText(horse.category)}
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}