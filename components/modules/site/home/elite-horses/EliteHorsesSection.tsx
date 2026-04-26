"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./EliteHorsesSection.module.scss";

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
    title: "Imperial Majesty",
    subtitle: "Hannoveraan • Grand Prix Dressuur",
    bid: "€2.850.000",
    badge: "Topselectie",
    endsAt: "2026-05-23T14:22:00",
    image: "/img/home/elite/horse-1.webp",
    imageAlt: "Imperial Majesty",
    href: "/elite/imperial-majesty",
  },
  {
    id: 2,
    title: "Silver Sovereign",
    subtitle: "KWPN • Internationale springer",
    bid: "€1.675.000",
    badge: "Elite",
    endsAt: "2026-05-22T08:45:00",
    image: "/img/home/elite/horse-2.webp",
    imageAlt: "Silver Sovereign",
    href: "/elite/silver-sovereign",
  },
  {
    id: 3,
    title: "Royal Vanguard",
    subtitle: "Selle Français • Elite hengst",
    bid: "€1.520.000",
    badge: "Topselectie",
    endsAt: "2026-05-24T02:10:00",
    image: "/img/home/elite/horse-3.webp",
    imageAlt: "Royal Vanguard",
    href: "/elite/royal-vanguard",
  },
];

function formatCountdown(targetDate: string, now: number) {
  const targetTime = new Date(targetDate).getTime();
  const distance = targetTime - now;

  if (Number.isNaN(targetTime) || distance <= 0) {
    return "Gesloten";
  }

  const totalSeconds = Math.floor(distance / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(
    2,
    "0",
  )}u ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(
    2,
    "0",
  )}s`;
}

function useCountdown(targetDate: string) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return useMemo(() => {
    if (!mounted || now === 0) {
      return "--d --u --m --s";
    }

    return formatCountdown(targetDate, now);
  }, [mounted, targetDate, now]);
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
            <span className={styles.closingLabel}>Sluit over</span>
            <strong className={styles.closingTime} suppressHydrationWarning>
              {countdown}
            </strong>
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
            <span className={styles.priceLabel}>Huidig bod</span>
            <strong className={styles.priceValue}>{horse.bid}</strong>
          </div>

          <Link href={horse.href} className={styles.bidButton}>
            Bied mee
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function EliteHorsesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Elite Paarden</h2>
          <p className={styles.subtitle}>
            Exclusieve selecties uit de meest gerenommeerde bloedlijnen ter
            wereld.
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