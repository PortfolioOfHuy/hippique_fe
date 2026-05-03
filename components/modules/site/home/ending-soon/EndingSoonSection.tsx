"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
    subtitle: "Hippique / 10 jaar",
    bid: "€112.000",
    badge: "Bijna afgelopen",
    endsAt: "2026-07-23T00:15:42",
    image: "/img/ending-soon/horse1.jpg",
    imageAlt: "Lothario Z",
    href: "/paarden/lothario-z",
  },
  {
    id: 2,
    title: "Diamond Jewel",
    subtitle: "Oldenburg / 5 jaar",
    bid: "€89.500",
    badge: "Bijna afgelopen",
    endsAt: "2026-07-23T00:42:11",
    image: "/img/ending-soon/HHR8FsxWsAA_uGR.jpg",
    imageAlt: "Diamond Jewel",
    href: "/paarden/diamond-jewel",
  },
  {
    id: 3,
    title: "Quantum Leap",
    subtitle: "Hannoveraan / 7 jaar",
    bid: "€204.000",
    badge: "Bijna afgelopen",
    endsAt: "2026-07-23T01:05:59",
    image: "/img/ending-soon/Lot-601-12.jpg",
    imageAlt: "Quantum Leap",
    href: "/paarden/quantum-leap",
  },
];

function formatCountdown(targetDate: string, now: number) {
  const targetTime = new Date(targetDate).getTime();
  const distance = targetTime - now;

  if (Number.isNaN(targetTime) || distance <= 0) {
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
      return "--:--:--";
    }

    return formatCountdown(targetDate, now);
  }, [mounted, targetDate, now]);
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

export default function EndingSoonSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div className={styles.heading}>
            <h2 className={styles.title}>Binnenkort afgelopen</h2>
            <p className={styles.subtitle}>Mis deze laatste kansen niet.</p>
          </div>

          <a href="/veilingen" className={styles.viewAll}>
            Bekijk alle kavels die bijna sluiten
          </a>
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