"use client";

import { useEffect, useMemo, useState } from "react";

type AuctionCountdownProps = {
  endsAt: string;
};

function formatCountdown(targetDate: string, now: number) {
  const targetTime = new Date(targetDate).getTime();

  if (Number.isNaN(targetTime)) {
    return "00 : 00 : 00";
  }

  const distance = targetTime - now;

  if (distance <= 0) {
    return "00 : 00 : 00";
  }

  const totalSeconds = Math.floor(distance / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const timeText = `${String(hours).padStart(2, "0")} : ${String(
    minutes,
  ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

  if (days > 0) {
    return `${String(days).padStart(2, "0")}d ${timeText}`;
  }

  return timeText;
}

export default function AuctionCountdown({ endsAt }: AuctionCountdownProps) {
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

  const countdown = useMemo(() => {
    if (now === null) {
      return "-- : -- : --";
    }

    return formatCountdown(endsAt, now);
  }, [endsAt, now]);

  return <>{countdown}</>;
}