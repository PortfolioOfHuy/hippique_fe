"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Eye,
  Gavel,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { ProfileTabKey } from "./profile-data";
import styles from "./AuctionTabsPanel.module.scss";

type AuctionStatus =
  | "live"
  | "upcoming"
  | "closed"
  | "closed_no_winner"
  | "won"
  | "outbid";

type AuctionFilter = "all" | AuctionStatus;

type AuctionItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  lotCode: string;
  status: AuctionStatus;
  currentBid: string;
  nextBid: string;
  date: string;
  time: string;
  href: string;
  startPrice?: number;
};

type AuctionTabsPanelProps = {
  type: Extract<
    ProfileTabKey,
    "paardenveilingen" | "embryoveilingen" | "spermaveilingen"
  >;
};

const contentMap = {
  paardenveilingen: {
    kicker: "Mijn veilingen",
    title: "Paardenveilingen",
    description:
      "Bekijk je actieve biedingen, opgeslagen kavels en deelname aan paardenveilingen.",
    searchPlaceholder: "Zoek op paard, lotnummer of bloedlijn...",
    emptyTitle: "Geen paardenveilingen gevonden",
    emptyDescription:
      "Pas je zoekterm of filter aan om meer paardenveilingen te bekijken.",
  },
  embryoveilingen: {
    kicker: "Mijn veilingen",
    title: "Embryoveilingen",
    description:
      "Volg je geselecteerde embryo’s, biedstatussen en aankomende embryoveilingen.",
    searchPlaceholder: "Zoek op embryo, lotnummer of combinatie...",
    emptyTitle: "Geen embryoveilingen gevonden",
    emptyDescription:
      "Pas je zoekterm of filter aan om meer embryoveilingen te bekijken.",
  },
  spermaveilingen: {
    kicker: "Mijn veilingen",
    title: "Spermaveilingen",
    description:
      "Beheer je biedingen en interesses voor sperma-aanbiedingen binnen de veiling.",
    searchPlaceholder: "Zoek op sperma, lotnummer of hengst...",
    emptyTitle: "Geen spermaveilingen gevonden",
    emptyDescription:
      "Pas je zoekterm of filter aan om meer spermaveilingen te bekijken.",
  },
};

const dataMap: Record<AuctionTabsPanelProps["type"], AuctionItem[]> = {
  paardenveilingen: [
    {
      id: "horse-1",
      title: "Royal Jumper",
      subtitle: "Elite springpaard met internationale bloedlijn",
      category: "Paard",
      image: "/img/horses/horse-1.jpg",
      lotCode: "Lot #42",
      status: "live",
      currentBid: "€145.000",
      nextBid: "€150.000",
      date: "Live nu",
      time: "Nog 02:14:36",
      href: "/veilingen/royal-jumper",
      startPrice: 145000,
    },
    {
      id: "horse-2",
      title: "Diamant’s Legacy",
      subtitle: "Sportpaard met bewezen aanleg voor dressuur",
      category: "Paard",
      image: "/img/horses/horse-2.jpg",
      lotCode: "Lot #12",
      status: "upcoming",
      currentBid: "€82.000",
      nextBid: "€85.000",
      date: "12 juni 2024",
      time: "18:00",
      href: "/veilingen/diamants-legacy",
      startPrice: 82000,
    },
    {
      id: "horse-3",
      title: "Fine Design",
      subtitle: "Jonge hengst uit Oldenburger premier selectie",
      category: "Paard",
      image: "/img/horses/horse-3.jpg",
      lotCode: "Lot #05",
      status: "won",
      currentBid: "€115.000",
      nextBid: "Afgerond",
      date: "04 mei 2024",
      time: "20:30",
      href: "/veilingen/fine-design",
      startPrice: 115000,
    },
    {
      id: "horse-4",
      title: "Noble Star",
      subtitle: "Veelbelovend springpaard, opnieuw beschikbaar voor verkoop",
      category: "Paard",
      image: "/img/horses/horse-1.jpg",
      lotCode: "Lot #61",
      status: "closed_no_winner",
      currentBid: "Geen winnend bod",
      nextBid: "Opnieuw aanbieden",
      date: "18 mei 2024",
      time: "Afgesloten",
      href: "/veilingen/noble-star",
      startPrice: 90000,
    },
  ],

  embryoveilingen: [
    {
      id: "embryo-1",
      title: "Chacco Blue x Ratina Z",
      subtitle: "Embryo uit uitzonderlijke springlijn",
      category: "Embryo",
      image: "/img/horses/horse-2.jpg",
      lotCode: "Embryo #18",
      status: "live",
      currentBid: "€32.500",
      nextBid: "€34.000",
      date: "Live nu",
      time: "Nog 01:22:10",
      href: "/veilingen/chacco-blue-ratina-z",
      startPrice: 32500,
    },
    {
      id: "embryo-2",
      title: "Emerald x Comme Il Faut",
      subtitle: "Premium embryo voor topsportfokkerij, opnieuw beschikbaar",
      category: "Embryo",
      image: "/img/horses/horse-1.jpg",
      lotCode: "Embryo #07",
      status: "closed_no_winner",
      currentBid: "Geen winnend bod",
      nextBid: "Opnieuw aanbieden",
      date: "12 okt 2024",
      time: "Afgesloten",
      href: "/veilingen/emerald-comme-il-faut",
      startPrice: 21000,
    },
    {
      id: "embryo-3",
      title: "Cornet Obolensky x Baloubet",
      subtitle: "Veelbelovende combinatie voor internationale sport",
      category: "Embryo",
      image: "/img/horses/horse-3.jpg",
      lotCode: "Embryo #22",
      status: "upcoming",
      currentBid: "€18.000",
      nextBid: "€19.000",
      date: "28 nov 2024",
      time: "19:30",
      href: "/veilingen/cornet-obolensky-baloubet",
      startPrice: 18000,
    },
  ],

  spermaveilingen: [
    {
      id: "semen-1",
      title: "Emerald van’t Ruytershof",
      subtitle: "Diepvries sperma beschikbaar voor sportfokkerij",
      category: "Sperma",
      image: "/img/horses/horse-3.jpg",
      lotCode: "Sperma #31",
      status: "live",
      currentBid: "€2.800",
      nextBid: "€3.000",
      date: "Live nu",
      time: "Nog 00:48:12",
      href: "/veilingen/emerald-vant-ruytershof",
      startPrice: 2800,
    },
    {
      id: "semen-2",
      title: "Grand Prix Select",
      subtitle: "Bewezen hengst met sterke nakomelingen",
      category: "Sperma",
      image: "/img/horses/horse-1.jpg",
      lotCode: "Sperma #14",
      status: "upcoming",
      currentBid: "€1.950",
      nextBid: "€2.100",
      date: "18 sep 2024",
      time: "15:00",
      href: "/veilingen/grand-prix-select",
      startPrice: 1950,
    },
    {
      id: "semen-3",
      title: "Oldenburger Premier Line",
      subtitle: "Exclusieve dekking uit premium dressuurlijn, opnieuw beschikbaar",
      category: "Sperma",
      image: "/img/horses/horse-2.jpg",
      lotCode: "Sperma #09",
      status: "closed_no_winner",
      currentBid: "Geen winnend bod",
      nextBid: "Opnieuw aanbieden",
      date: "01 aug 2024",
      time: "Afgesloten",
      href: "/veilingen/oldenburger-premier-line",
      startPrice: 2350,
    },
  ],
};

const filterOrder: AuctionFilter[] = [
  "all",
  "live",
  "upcoming",
  "won",
  "outbid",
  "closed_no_winner",
  "closed",
];

function getStatusLabel(status: AuctionStatus) {
  const labels: Record<AuctionStatus, string> = {
    live: "Live nu",
    upcoming: "Binnenkort",
    closed: "Gesloten",
    closed_no_winner: "Geen winnaar",
    won: "Gewonnen",
    outbid: "Overboden",
  };

  return labels[status];
}

function getFilterLabel(filter: AuctionFilter) {
  if (filter === "all") return "Alles";
  return getStatusLabel(filter);
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRelistType(type: AuctionTabsPanelProps["type"]) {
  const typeMap: Record<AuctionTabsPanelProps["type"], string> = {
    paardenveilingen: "paard",
    embryoveilingen: "embryo",
    spermaveilingen: "sperma",
  };

  return typeMap[type];
}

function getRelistNoticeText(type: AuctionTabsPanelProps["type"]) {
  const textMap: Record<
    AuctionTabsPanelProps["type"],
    {
      title: string;
      description: string;
    }
  > = {
    paardenveilingen: {
      title: "Deze veiling is zonder winnaar geëindigd.",
      description:
        "Je kunt dit paard opnieuw aanbieden met een automatisch verlaagde startprijs van",
    },
    embryoveilingen: {
      title: "Deze embryoveiling is zonder winnaar geëindigd.",
      description:
        "Je kunt dit embryo opnieuw aanbieden met een automatisch verlaagde startprijs van",
    },
    spermaveilingen: {
      title: "Deze spermaveiling is zonder winnaar geëindigd.",
      description:
        "Je kunt dit sperma opnieuw aanbieden met een automatisch verlaagde startprijs van",
    },
  };

  return textMap[type];
}

function getRelistHref(item: AuctionItem, type: AuctionTabsPanelProps["type"]) {
  const originalPrice = item.startPrice ?? 0;
  const reducedPrice = Math.round(originalPrice * 0.9);

  const params = new URLSearchParams({
    mode: "relist",
    type: getRelistType(type),
    sourceAuctionId: item.id,
    title: item.title,
    subtitle: item.subtitle,
    lotCode: item.lotCode,
    originalPrice: String(originalPrice),
    startPrice: String(reducedPrice),
  });

  return `/opnieuw-verkopen?${params.toString()}`;
}

export default function AuctionTabsPanel({ type }: AuctionTabsPanelProps) {
  const content = contentMap[type];
  const items = dataMap[type];

  const [activeFilter, setActiveFilter] = useState<AuctionFilter>("all");
  const [searchValue, setSearchValue] = useState("");

  const filterOptions = useMemo(() => {
    return filterOrder
      .map((filter) => {
        const count =
          filter === "all"
            ? items.length
            : items.filter((item) => item.status === filter).length;

        return {
          key: filter,
          label: getFilterLabel(filter),
          count,
        };
      })
      .filter((filter) => filter.key === "all" || filter.count > 0);
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus =
        activeFilter === "all" || item.status === activeFilter;

      const searchableText = [
        item.title,
        item.subtitle,
        item.category,
        item.lotCode,
        item.currentBid,
        item.nextBid,
        item.date,
        item.time,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !keyword || searchableText.includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, items, searchValue]);

  const hasActiveFilter = activeFilter !== "all" || searchValue.trim() !== "";

  function handleResetFilters() {
    setActiveFilter("all");
    setSearchValue("");
  }

  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <span>{content.kicker}</span>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </header>

      <div className={styles.filterPanel}>
        <div className={styles.filterHeader}>
          <div>
            <span>
              <SlidersHorizontal size={15} strokeWidth={2.3} />
              Filter veilingen
            </span>
            <strong>
              {filteredItems.length} van {items.length} resultaten
            </strong>
          </div>

          {hasActiveFilter ? (
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleResetFilters}
            >
              <X size={15} strokeWidth={2.4} />
              Wissen
            </button>
          ) : null}
        </div>

        <div className={styles.filterControls}>
          <label className={styles.searchBox}>
            <Search size={18} strokeWidth={2.2} />
            <input
              type="search"
              value={searchValue}
              placeholder={content.searchPlaceholder}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </label>

          <div className={styles.statusFilters} aria-label="Veilingstatus filter">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`${styles.filterButton} ${
                  activeFilter === filter.key ? styles.activeFilter : ""
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                <span>{filter.label}</span>
                <strong>{filter.count}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className={styles.list}>
          {filteredItems.map((item) => {
            const canRelist = item.status === "closed_no_winner";

            const reducedPrice = item.startPrice
              ? Math.round(item.startPrice * 0.9)
              : null;

            const relistNotice = getRelistNoticeText(type);

            return (
              <article key={item.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={220}
                    height={180}
                    className={styles.image}
                  />

                  <span
                    className={`${styles.statusBadge} ${
                      styles[`status_${item.status}`]
                    }`}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <div>
                      <span className={styles.category}>{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>

                    <span className={styles.lotCode}>{item.lotCode}</span>
                  </div>

                  {canRelist && reducedPrice ? (
                    <div className={styles.relistNotice}>
                      <strong>{relistNotice.title}</strong>
                      <span>
                        {relistNotice.description} {formatEuro(reducedPrice)}.
                      </span>
                    </div>
                  ) : null}

                  <div className={styles.metaGrid}>
                    <div>
                      <span>Huidig bod</span>
                      <strong>{item.currentBid}</strong>
                    </div>

                    <div>
                      <span>Volgend bod</span>
                      <strong>{item.nextBid}</strong>
                    </div>

                    <div>
                      <span>Datum</span>
                      <strong>{item.date}</strong>
                    </div>

                    <div>
                      <span>Tijd</span>
                      <strong>{item.time}</strong>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    {canRelist ? (
                      <a
                        href={getRelistHref(item, type)}
                        className={styles.relistAction}
                      >
                        <RefreshCcw size={16} strokeWidth={2.2} />
                        <span>Opnieuw aanbieden</span>
                      </a>
                    ) : (
                      <a href={item.href} className={styles.primaryAction}>
                        <Gavel size={16} strokeWidth={2.2} />
                        <span>Bieden bekijken</span>
                      </a>
                    )}

                    <a href={item.href} className={styles.secondaryAction}>
                      <Eye size={16} strokeWidth={2.2} />
                      <span>Details</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div>
            <Search size={24} strokeWidth={2.2} />
          </div>
          <h3>{content.emptyTitle}</h3>
          <p>{content.emptyDescription}</p>

          <button type="button" onClick={handleResetFilters}>
            Filters wissen
          </button>
        </div>
      )}
    </section>
  );
}