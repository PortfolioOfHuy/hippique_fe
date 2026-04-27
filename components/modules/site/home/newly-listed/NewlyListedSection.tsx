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
    title: "Silver Lining",
    subtitle: "Dutch Warmblood / 6 jaar",
    bid: "€185.000",
    badge: "Nieuw",
    endsAt: "2026-05-23T04:12:33",
    image: "/img/home/featured-horses/horse-1.webp",
    imageAlt: "Silver Lining",
    href: "/paarden/silver-lining",
  },
  {
    id: 2,
    title: "Valentino Z",
    subtitle: "Zangersheide / 8 jaar",
    bid: "€320.000",
    badge: "Nieuw",
    endsAt: "2026-05-23T02:45:10",
    image: "/img/home/featured-horses/horse-2.webp",
    imageAlt: "Valentino Z",
    href: "/paarden/valentino-z",
  },
  {
    id: 3,
    title: "Midnight Express",
    subtitle: "Hannoveraan / 5 jaar",
    bid: "€95.000",
    badge: "Nieuw",
    endsAt: "2026-05-23T12:05:59",
    image: "/img/home/featured-horses/horse-3.webp",
    imageAlt: "Midnight Express",
    href: "/paarden/midnight-express",
  },
];

function formatCountdown(targetDate: string, now: number) {
  const targetTime = new Date(targetDate).getTime();

  if (Number.isNaN(targetTime)) {
    return "00:00:00";
  }

  const distance = targetTime - now;

  if (distance <= 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(distance / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const timeText = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (days > 0) {
    return `${String(days).padStart(2, "0")}d ${timeText}`;
  }

  return timeText;
}

function useCountdown(targetDate: string) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return useMemo(() => {
    if (now === null) {
      return "--:--:--";
    }

    return formatCountdown(targetDate, now);
  }, [targetDate, now]);
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
            <span className={styles.closingLabel}>Eindigt over</span>
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

export default function NewlyListedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Nieuw aangeboden</h2>
          <p className={styles.subtitle}>
            Ontdek de nieuwste paarden die recent aan de veiling zijn toegevoegd.
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