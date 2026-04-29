import Image from "next/image";
import { Eye, Gavel, RefreshCcw, ShieldCheck } from "lucide-react";
import type { ProfileTabKey } from "./profile-data";
import styles from "./AuctionTabsPanel.module.scss";

type AuctionStatus =
  | "live"
  | "upcoming"
  | "closed"
  | "closed_no_winner"
  | "won"
  | "outbid";

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
  },
  embryoveilingen: {
    kicker: "Mijn veilingen",
    title: "Embryoveilingen",
    description:
      "Volg je geselecteerde embryo’s, biedstatussen en aankomende embryoveilingen.",
  },
  spermaveilingen: {
    kicker: "Mijn veilingen",
    title: "Spermaveilingen",
    description:
      "Beheer je biedingen en interesses voor sperma-aanbiedingen binnen de veiling.",
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
    },
    {
      id: "embryo-2",
      title: "Emerald x Comme Il Faut",
      subtitle: "Premium embryo voor topsportfokkerij",
      category: "Embryo",
      image: "/img/horses/horse-1.jpg",
      lotCode: "Embryo #07",
      status: "outbid",
      currentBid: "€21.000",
      nextBid: "€22.000",
      date: "12 okt 2024",
      time: "09:15",
      href: "/veilingen/emerald-comme-il-faut",
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
    },
    {
      id: "semen-3",
      title: "Oldenburger Premier Line",
      subtitle: "Exclusieve dekking uit premium dressuurlijn",
      category: "Sperma",
      image: "/img/horses/horse-2.jpg",
      lotCode: "Sperma #09",
      status: "closed",
      currentBid: "€2.350",
      nextBid: "Afgerond",
      date: "01 aug 2024",
      time: "21:00",
      href: "/veilingen/oldenburger-premier-line",
    },
  ],
};

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

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRelistHref(item: AuctionItem) {
  const originalPrice = item.startPrice ?? 0;
  const reducedPrice = Math.round(originalPrice * 0.9);

  const params = new URLSearchParams({
    mode: "relist",
    type: "paard",
    sourceAuctionId: item.id,
    title: item.title,
    subtitle: item.subtitle,
    lotCode: item.lotCode,
    originalPrice: String(originalPrice),
    startPrice: String(reducedPrice),
  });

  return `/advertentie-plaatsen?${params.toString()}`;
}

export default function AuctionTabsPanel({ type }: AuctionTabsPanelProps) {
  const content = contentMap[type];
  const items = dataMap[type];

  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <span>{content.kicker}</span>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
      </header>

      <div className={styles.statsGrid}>
        <article>
          <span>Actieve biedingen</span>
          <strong>{items.filter((item) => item.status === "live").length}</strong>
        </article>

        <article>
          <span>Opgeslagen kavels</span>
          <strong>{items.length}</strong>
        </article>

        <article>
          <span>Gewonnen veilingen</span>
          <strong>{items.filter((item) => item.status === "won").length}</strong>
        </article>
      </div>

      <div className={styles.list}>
        {items.map((item) => {
          const canRelist =
            type === "paardenveilingen" && item.status === "closed_no_winner";

          const reducedPrice = item.startPrice
            ? Math.round(item.startPrice * 0.9)
            : null;

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
                    <strong>Deze veiling is zonder winnaar geëindigd.</strong>
                    <span>
                      Je kunt dit paard opnieuw aanbieden met een automatisch
                      verlaagde startprijs van {formatEuro(reducedPrice)}.
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
                    <a href={getRelistHref(item)} className={styles.relistAction}>
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

      <div className={styles.infoPanel}>
        <ShieldCheck size={20} strokeWidth={2.2} />
        <div>
          <h3>Geverifieerde deelname</h3>
          <p>
            Deze tab is voorbereid als klantomgeving. Later kun je hier echte
            biedingen, gewonnen kavels en veilingstatussen vanuit je backend
            koppelen.
          </p>
        </div>
      </div>
    </section>
  );
}