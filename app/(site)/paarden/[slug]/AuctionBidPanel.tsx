"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, Select } from "antd";
import {
  AlertTriangle,
  Bell,
  Check,
  Clock3,
  Gavel,
  Mail,
  Trophy,
  X,
} from "lucide-react";
import styles from "./HorseDetailPage.module.scss";

type CurrencyCode = "EUR" | "USD" | "GBP" | "VND";

type PopupType = "outbid" | "endingSoon" | "won";

type AuctionBidPanelProps = {
  horse: {
    title: string;
    image: string;
    imageAlt: string;
    bid: string;
    slug: string;
    breed?: string;
  };
};

const currencyOptions: Array<{
  value: CurrencyCode;
  label: string;
  symbol: string;
  rate: number;
}> = [
  {
    value: "EUR",
    label: "EUR",
    symbol: "€",
    rate: 1,
  },
  {
    value: "USD",
    label: "USD",
    symbol: "$",
    rate: 1.08,
  },
  {
    value: "GBP",
    label: "GBP",
    symbol: "£",
    rate: 0.86,
  },
  {
    value: "VND",
    label: "VND",
    symbol: "₫",
    rate: 27000,
  },
];

function parseEuroAmount(value: string) {
  const cleaned = value.replace(/[^\d]/g, "");
  const amount = Number(cleaned);

  return Number.isFinite(amount) ? amount : 0;
}

function formatCurrency(amount: number, currency: CurrencyCode) {
  const option = currencyOptions.find((item) => item.value === currency);
  const symbol = option?.symbol ?? "€";

  if (currency === "VND") {
    return `${Math.round(amount).toLocaleString("vi-VN")} ${symbol}`;
  }

  return `${symbol}${Math.round(amount).toLocaleString("nl-NL")}`;
}

export default function AuctionBidPanel({ horse }: AuctionBidPanelProps) {
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [bidAmount, setBidAmount] = useState("65500");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>("outbid");
  const [popupIndex, setPopupIndex] = useState(0);

  const currentBidBase = useMemo(() => {
    return parseEuroAmount(horse.bid);
  }, [horse.bid]);

  const selectedCurrency = useMemo(() => {
    return (
      currencyOptions.find((item) => item.value === currency) ??
      currencyOptions[0]
    );
  }, [currency]);

  const convertedCurrentBid = currentBidBase * selectedCurrency.rate;
  const convertedLastBid = 12000 * selectedCurrency.rate;
  const convertedWinningBid = 18000 * selectedCurrency.rate;
  const convertedMaxBid = 9000 * selectedCurrency.rate;
  const convertedMinimumBid = 65500 * selectedCurrency.rate;

  const formattedCurrentBid = formatCurrency(convertedCurrentBid, currency);
  const formattedLastBid = formatCurrency(convertedLastBid, currency);
  const formattedWinningBid = formatCurrency(convertedWinningBid, currency);
  const formattedMaxBid = formatCurrency(convertedMaxBid, currency);
  const formattedMinimumBid = formatCurrency(convertedMinimumBid, currency);

  function openNextPopup() {
    const popupSequence: PopupType[] = ["outbid", "endingSoon", "won"];
    const nextType = popupSequence[popupIndex % popupSequence.length];

    setPopupType(nextType);
    setPopupIndex((prev) => prev + 1);
    setPopupOpen(true);
  }

  function addQuickBid(amount: number) {
    const currentAmount = Number(bidAmount.replace(/[^\d]/g, ""));
    const nextAmount = Number.isFinite(currentAmount)
      ? currentAmount + amount
      : amount;

    setBidAmount(String(nextAmount));
  }

  function renderPopupContent() {
    if (popupType === "outbid") {
      return (
        <div className={styles.auctionPopupContent}>
          <div className={styles.popupBadgeDanger}>
            <span />
            Live auction alert
          </div>

          <button
            type="button"
            className={styles.popupCloseButton}
            onClick={() => setPopupOpen(false)}
            aria-label="Close popup"
          >
            <X size={18} strokeWidth={1.8} />
          </button>

          <div className={styles.popupIconDanger}>
            <AlertTriangle size={30} strokeWidth={1.9} />
          </div>

          <h3 className={styles.popupTitle}>You have been outbid</h3>

          <p className={styles.popupDescription}>
            Another bidder has placed a higher bid on{" "}
            <strong>{horse.title}</strong>.
          </p>

          <div className={styles.popupHorseCard}>
            <div className={styles.popupHorseImage}>
              <Image
                src={horse.image}
                alt={horse.imageAlt}
                fill
                sizes="72px"
                className={styles.popupImage}
              />
            </div>

            <div>
              <strong>{horse.title}</strong>
              <span>Lot 12 · Arabian Stallion · Grey · 5 yrs</span>

              <div className={styles.popupHorseMeta}>
                <span className={styles.liveDot}>Live</span>
                <span>Ends in 02:14:32</span>
              </div>
            </div>
          </div>

          <div className={styles.popupPriceGrid}>
            <div>
              <span>Current bid</span>
              <strong className={styles.popupPriceDanger}>
                {formattedCurrentBid}
              </strong>
            </div>

            <div>
              <span>Your last bid</span>
              <strong>{formattedLastBid}</strong>
            </div>
          </div>

          <div className={styles.popupNotifyRow}>
            <span className={styles.popupNotifySuccess}>
              <Mail size={14} strokeWidth={1.8} />
              Email sent
            </span>

            <span className={styles.popupNotifyInfo}>
              <Bell size={14} strokeWidth={1.8} />
              Platform notification
            </span>
          </div>

          <button
            type="button"
            className={styles.popupPrimaryButton}
            onClick={() => setPopupOpen(false)}
          >
            <Gavel size={18} strokeWidth={1.9} />
            Place a new bid
          </button>

          <Link
            href={`/elite/${horse.slug}`}
            className={styles.popupSecondaryButton}
            onClick={() => setPopupOpen(false)}
          >
            View auction
          </Link>
        </div>
      );
    }

    if (popupType === "endingSoon") {
      return (
        <div className={styles.auctionPopupContent}>
          <div className={styles.popupBadgeWarning}>
            <span />
            Live auction alert
          </div>

          <button
            type="button"
            className={styles.popupCloseButton}
            onClick={() => setPopupOpen(false)}
            aria-label="Close popup"
          >
            <X size={18} strokeWidth={1.8} />
          </button>

          <div className={styles.popupIconWarning}>
            <Clock3 size={32} strokeWidth={1.9} />
          </div>

          <h3 className={styles.popupTitle}>Auction ending soon</h3>

          <p className={styles.popupDescription}>
            The auction for <strong>{horse.title}</strong> ends in{" "}
            <strong>15 minutes</strong>.
          </p>

          <div className={styles.popupHorseCard}>
            <div className={styles.popupHorseImage}>
              <Image
                src={horse.image}
                alt={horse.imageAlt}
                fill
                sizes="72px"
                className={styles.popupImage}
              />
            </div>

            <div>
              <strong>{horse.title}</strong>
              <span>Lot 15 · Dutch Warmblood · Grey · 7 yrs</span>

              <div className={styles.popupHorseMeta}>
                <span className={styles.liveDot}>LIVE</span>
                <span>Ends in 00:14:59</span>
              </div>
            </div>
          </div>

          <div className={styles.popupCountdownBox}>
            <Clock3 size={26} strokeWidth={1.8} />
            <strong>00:14:59</strong>
            <span>remaining</span>
          </div>

          <div className={styles.popupPriceGrid}>
            <div>
              <span>Current bid</span>
              <strong>{formatCurrency(8750 * selectedCurrency.rate, currency)}</strong>
            </div>

            <div>
              <span>Your max bid</span>
              <strong>{formattedMaxBid}</strong>
            </div>
          </div>

          <div className={styles.popupNotifyRow}>
            <span className={styles.popupNotifySuccess}>
              <Mail size={14} strokeWidth={1.8} />
              Email sent
            </span>

            <span className={styles.popupNotifyInfo}>
              <Bell size={14} strokeWidth={1.8} />
              Platform notification
            </span>
          </div>

          <button
            type="button"
            className={styles.popupPrimaryButton}
            onClick={() => setPopupOpen(false)}
          >
            <Gavel size={18} strokeWidth={1.9} />
            Go to auction
          </button>

          <button
            type="button"
            className={styles.popupSecondaryButton}
            onClick={() => setPopupOpen(false)}
          >
            Increase max bid
          </button>
        </div>
      );
    }

    return (
      <div className={styles.auctionPopupContent}>
        <div className={styles.popupBadgeGold}>
          <Trophy size={13} strokeWidth={1.9} />
          Auction won
        </div>

        <button
          type="button"
          className={styles.popupCloseButton}
          onClick={() => setPopupOpen(false)}
          aria-label="Close popup"
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        <div className={styles.popupIconSuccess}>
          <Check size={34} strokeWidth={2.2} />
        </div>

        <h3 className={styles.popupTitle}>Congratulations, you won the auction</h3>

        <p className={styles.popupDescription}>
          You are the winning bidder for <strong>{horse.title}</strong>.
        </p>

        <div className={styles.popupHorseCard}>
          <div className={styles.popupHorseImage}>
            <Image
              src={horse.image}
              alt={horse.imageAlt}
              fill
              sizes="72px"
              className={styles.popupImage}
            />
          </div>

          <div>
            <strong>{horse.title}</strong>
            <span>Lot 27 · Friesian · Black · 6 yrs</span>

            <div className={styles.popupHorseMeta}>
              <span className={styles.goldText}>Auction ended on 02:14:32</span>
            </div>
          </div>
        </div>

        <div className={styles.popupPriceGrid}>
          <div>
            <span>Winning bid</span>
            <strong className={styles.popupPriceSuccess}>
              {formattedWinningBid}
            </strong>
          </div>

          <div>
            <span>Auction status</span>
            <strong className={styles.popupPriceSuccess}>Closed</strong>
          </div>
        </div>

        <div className={styles.popupFullNotice}>
          <Mail size={15} strokeWidth={1.8} />
          Confirmation sent by email
        </div>

        <div className={styles.popupNotifyRowCenter}>
          <span className={styles.popupNotifyInfo}>
            <Bell size={14} strokeWidth={1.8} />
            Platform notification
          </span>
        </div>

        <button
          type="button"
          className={styles.popupPrimaryButton}
          onClick={() => setPopupOpen(false)}
        >
          <Trophy size={18} strokeWidth={1.9} />
          View next steps
        </button>

        <Link
          href={`/elite/${horse.slug}`}
          className={styles.popupSecondaryButton}
          onClick={() => setPopupOpen(false)}
        >
          View auction details
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.bidCard}>
        <div className={styles.bidHeader}>
          <div>
            <span className={styles.bidLabel}>Huidig hoogste bod</span>
            <strong className={styles.bidValue}>{formattedCurrentBid}</strong>
          </div>

          <span className={styles.bidStatus}>Bieden actief</span>
        </div>

        <div className={styles.currencyRow}>
          <span>Valuta weergeven</span>

<Select
  value={currency}
  onChange={(value: CurrencyCode) => setCurrency(value)}
  options={currencyOptions.map((item) => ({
    value: item.value,
    label: `${item.label} ${item.symbol}`,
  }))}
  className={styles.currencySelect}
  classNames={{
    popup: {
      root: styles.currencyDropdown,
    },
  }}
/>
        </div>

        <div className={styles.minimumBid}>
          <span>Volgend minimumbod</span>
          <strong>{formattedMinimumBid}</strong>
        </div>

        <div className={styles.bidInputWrap}>
          <input
            type="text"
            value={bidAmount}
            onChange={(event) => setBidAmount(event.target.value)}
            placeholder="Voer biedbedrag in"
            className={styles.bidInput}
          />
        </div>

        <div className={styles.quickBidRow}>
          <button
            type="button"
            className={styles.quickBidButton}
            onClick={() => addQuickBid(500)}
          >
            + {formatCurrency(500 * selectedCurrency.rate, currency)}
          </button>

          <button
            type="button"
            className={styles.quickBidButton}
            onClick={() => addQuickBid(1000)}
          >
            + {formatCurrency(1000 * selectedCurrency.rate, currency)}
          </button>

          <button
            type="button"
            className={styles.quickBidButton}
            onClick={() => addQuickBid(5000)}
          >
            + {formatCurrency(5000 * selectedCurrency.rate, currency)}
          </button>
        </div>

        <button
          type="button"
          className={styles.primaryBidButton}
          onClick={openNextPopup}
        >
          Plaats bod nu
        </button>

        <button type="button" className={styles.secondaryBidButton}>
          Boek try-out
        </button>

        <p className={styles.bidNote}>
          *Door te bieden ga je akkoord met de veilingvoorwaarden. Alle biedingen
          zijn exclusief btw en transportkosten.
        </p>
      </div>

      <Modal
        open={popupOpen}
        onCancel={() => setPopupOpen(false)}
        footer={null}
        centered
        width={430}
        closeIcon={null}
        className={styles.auctionPopupModal}
        destroyOnHidden
      >
        {renderPopupContent()}
      </Modal>
    </>
  );
}