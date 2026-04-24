"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewlyListedSection.module.scss";

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
    title: "Starlight Gazer",
    subtitle: "Holsteiner / 4 Years",
    bid: "€45,000",
    badge: "New",
    endsAt: "2026-04-26T00:00:00",
    image: "/img/home/newly-listed/horse-1.webp",
    imageAlt: "Starlight Gazer",
    href: "/horses/starlight-gazer",
  },
  {
    id: 2,
    title: "Arctic Storm",
    subtitle: "Oldenburg / 7 Years",
    bid: "€72,000",
    badge: "New",
    endsAt: "2026-04-25T20:15:20",
    image: "/img/home/newly-listed/horse-2.webp",
    imageAlt: "Arctic Storm",
    href: "/horses/arctic-storm",
  },
  {
    id: 3,
    title: "Bella Notte",
    subtitle: "Italian Sport Horse / 6 Years",
    bid: "€55,000",
    badge: "New",
    endsAt: "2026-04-25T22:45:12",
    image: "/img/home/newly-listed/horse-3.webp",
    imageAlt: "Bella Notte",
    href: "/horses/bella-notte",
  },
];

function formatCountdown(targetDate: string, now: number | null) {
  if (now === null) {
    return "--:--:--";
  }

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
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

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

export default function NewlyListedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Newly Listed in the Last 24 Hours</h2>
          <p className={styles.subtitle}>
            The latest additions to our exclusive collections.
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