"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
    subtitle: "Dutch Warmblood / 6 jaar",
    bid: "€185.000",
    badge: "Uitgelicht",
    endsAt: "2026-07-23T04:12:33",
    image: "/img/featured-horses/which-recip-would-you-pick-v0-5g58v7jvufxg1.webp",
    imageAlt: "Silver Lining",
    href: "/paarden/silver-lining",
  },
  {
    id: 2,
    title: "Valentino Z",
    subtitle: "Zangersheide / 8 jaar",
    bid: "€320.000",
    badge: "Uitgelicht",
    endsAt: "2026-07-23T02:45:10",
    image: "/img/featured-horses/5253-18-z-wk-2023-61302.jpg",
    imageAlt: "Valentino Z",
    href: "/paarden/valentino-z",
  },
  {
    id: 3,
    title: "Midnight Express",
    subtitle: "Hannoveraan / 5 jaar",
    bid: "€95.000",
    badge: "Uitgelicht",
    endsAt: "2026-07-23T12:05:59",
    image: "/img/featured-horses/images.jpg",
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
      <a href={horse.href} className={styles.imageLink}>
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
      </a>

      <div className={styles.cardBody}>
        <div className={styles.topContent}>
          <h3 className={styles.cardTitle}>
            <a href={horse.href}>{horse.title}</a>
          </h3>

          <p className={styles.cardSubtitle}>{horse.subtitle}</p>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.priceBlock}>
            <span className={styles.priceLabel}>Huidig bod</span>
            <strong className={styles.priceValue}>{horse.bid}</strong>
          </div>

          <a href={horse.href} className={styles.bidButton}>
            Bied mee
          </a>
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
          <h2 className={styles.title}>Uitgelichte paarden</h2>
          <p className={styles.subtitle}>
            Zorgvuldig geselecteerde waardevolle kavels voor veeleisende kopers.
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