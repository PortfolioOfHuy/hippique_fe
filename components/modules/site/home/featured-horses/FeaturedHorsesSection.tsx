"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./FeaturedHorsesSection.module.scss";

type HorseItem = {
  id: number;
  title: string;
  subtitle: string;
  bid: string;
  badge: string;
  endsAt: string;
  image: string;
  imageAlt: string;
  href: string;
};

const horses: HorseItem[] = [
  {
    id: 1,
    title: "Silver Lining",
    subtitle: "Dutch Warmblood / 6 Years",
    bid: "€185,000",
    badge: "Featured",
    endsAt: "2026-04-23T04:12:33",
    image: "/img/home/featured-horses/horse-1.webp",
    imageAlt: "Silver Lining",
    href: "/horses/silver-lining",
  },
  {
    id: 2,
    title: "Valentino Z",
    subtitle: "Zangersheide / 8 Years",
    bid: "€320,000",
    badge: "Featured",
    endsAt: "2026-04-23T02:45:10",
    image: "/img/home/featured-horses/horse-2.webp",
    imageAlt: "Valentino Z",
    href: "/horses/valentino-z",
  },
  {
    id: 3,
    title: "Midnight Express",
    subtitle: "Hanoverian / 5 Years",
    bid: "€95,000",
    badge: "Featured",
    endsAt: "2026-04-23T12:05:59",
    image: "/img/home/featured-horses/horse-3.webp",
    imageAlt: "Midnight Express",
    href: "/horses/midnight-express",
  },
];

function formatCountdown(targetDate: string, now: number) {
  const distance = new Date(targetDate).getTime() - now;

  if (Number.isNaN(distance) || distance <= 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(distance / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(seconds).padStart(2, "0")}`;
}

function useCountdown(targetDate: string) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => formatCountdown(targetDate, now), [targetDate, now]);
}

function HorseCard({ horse }: { horse: HorseItem }) {
  const countdown = useCountdown(horse.endsAt);

  return (
    <article className={styles.card}>
      <Link href={horse.href} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={horse.image}
            alt={horse.imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 991px) 100vw, 33vw"
          />

          <span className={styles.badge}>{horse.badge}</span>

          <div className={styles.closingBox}>
            <span className={styles.closingLabel}>Ends In</span>
            <strong className={styles.closingTime}>{countdown}</strong>
          </div>
        </div>
      </Link>

      <div className={styles.cardBody}>
        <div className={styles.topContent}>
          <h3 className={styles.cardTitle}>
            <Link href={horse.href}>{horse.title}</Link>
          </h3>

          <p className={styles.cardSubtitle}>{horse.subtitle}</p>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Current Bid</span>
            <strong className={styles.priceValue}>{horse.bid}</strong>
          </div>

          <Link href={horse.href} className={styles.bidButton}>
            Place Bid
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedHorsesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Featured Horses</h2>
          <p className={styles.subtitle}>
            Curated high-value lots for discriminating buyers.
          </p>
        </div>

        <div className={styles.grid}>
          {horses.map((horse) => (
            <HorseCard key={horse.id} horse={horse} />
          ))}
        </div>
      </div>
    </section>
  );
}