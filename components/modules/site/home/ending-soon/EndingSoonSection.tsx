"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./EndingSoonSection.module.scss";

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
    title: "Lothario Z",
    subtitle: "Zangersheide / 10 Years",
    bid: "€112,000",
    badge: "Ending",
    endsAt: "2026-04-23T00:15:42",
    image: "/img/home/ending-soon/horse-1.webp",
    imageAlt: "Lothario Z",
    href: "/horses/lothario-z",
  },
  {
    id: 2,
    title: "Diamond Jewel",
    subtitle: "Oldenburg / 5 Years",
    bid: "€89,500",
    badge: "Ending",
    endsAt: "2026-04-23T00:42:11",
    image: "/img/home/ending-soon/horse-2.webp",
    imageAlt: "Diamond Jewel",
    href: "/horses/diamond-jewel",
  },
  {
    id: 3,
    title: "Quantum Leap",
    subtitle: "Hanoverian / 7 Years",
    bid: "€204,000",
    badge: "Ending",
    endsAt: "2026-04-23T01:05:59",
    image: "/img/home/ending-soon/horse-3.webp",
    imageAlt: "Quantum Leap",
    href: "/horses/quantum-leap",
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

export default function EndingSoonSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div className={styles.heading}>
            <h2 className={styles.title}>Ending Soon</h2>
            <p className={styles.subtitle}>
              Don&apos;t miss out on these final opportunities.
            </p>
          </div>

          <Link href="/auctions/ending-soon" className={styles.viewAll}>
            View All Closing Soon
          </Link>
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