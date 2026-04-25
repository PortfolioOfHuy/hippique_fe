import Image from "next/image";
import styles from "./AuctionHistory.module.scss";

type AuctionStatus = "active" | "won" | "outbid" | "lost";

type AuctionRecord = {
  id: number;
  auctionName: string;
  lotName: string;
  image?: string;
  status: AuctionStatus;
  price: string;
  dateTime: string;
};

const auctionRecords: AuctionRecord[] = [
  {
    id: 1,
    auctionName: "The Autumn Elite Collection",
    lotName: "Lot #42: Royal Jumper",
    image: "/img/horses/horse-1.jpg",
    status: "active",
    price: "€145.000",
    dateTime: "Live nu",
  },
  {
    id: 2,
    auctionName: "Zangersheide Quality Auction",
    lotName: "Chacco Blue x Ratina Z",
    image: "/img/horses/horse-2.jpg",
    status: "won",
    price: "€32.500",
    dateTime: "15 okt 2023, 14:30",
  },
  {
    id: 3,
    auctionName: "World Stallion Selection",
    lotName: "Emerald van’t Ruytershof",
    image: "/img/horses/horse-3.jpg",
    status: "outbid",
    price: "€2.800",
    dateTime: "12 okt 2023, 09:15",
  },
  {
    id: 4,
    auctionName: "Summer Sport Horse Sale",
    lotName: "Lot #12: Diamant’s Legacy",
    status: "lost",
    price: "€82.000",
    dateTime: "12 juni 2024, 18:00",
  },
  {
    id: 5,
    auctionName: "Oldenburger Premier Auction",
    lotName: "Lot #05: Fine Design",
    status: "won",
    price: "€115.000",
    dateTime: "04 mei 2024, 20:30",
  },
];

function getStatusLabel(status: AuctionStatus) {
  const labels: Record<AuctionStatus, string> = {
    active: "Actief",
    won: "Gewonnen",
    outbid: "Overboden",
    lost: "Verloren",
  };

  return labels[status];
}

export default function AuctionHistory() {
  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <span className={styles.kicker}>Veilingactiviteit</span>
        <h2>Veilinggeschiedenis</h2>
        <p>
          Bekijk je volledige biedgeschiedenis en afgeronde transacties binnen
          onze zorgvuldig samengestelde collecties.
        </p>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableTitle}>
          <h3>Transactierecord</h3>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Veilingnaam</th>
                <th>Kavelnaam</th>
                <th>Resultaat/status</th>
                <th>Eindprijs / jouw bod</th>
                <th>Datum/tijd</th>
              </tr>
            </thead>

            <tbody>
              {auctionRecords.map((record) => (
                <tr key={record.id}>
                  <td data-label="Veilingnaam">
                    <span className={styles.auctionName}>
                      {record.auctionName}
                    </span>
                  </td>

                  <td data-label="Kavelnaam">
                    <div className={styles.lotCell}>
                      {record.image ? (
                        <div className={styles.lotImage}>
                          <Image
                            src={record.image}
                            alt={record.lotName}
                            width={52}
                            height={52}
                          />
                        </div>
                      ) : (
                        <div className={styles.lotPlaceholder}>
                          <span>H</span>
                        </div>
                      )}

                      <span className={styles.lotName}>{record.lotName}</span>
                    </div>
                  </td>

                  <td data-label="Resultaat/status">
                    <span
                      className={`${styles.status} ${
                        styles[`status_${record.status}`]
                      }`}
                    >
                      {record.status === "active" ? <i /> : null}
                      {getStatusLabel(record.status)}
                    </span>
                  </td>

                  <td data-label="Eindprijs / jouw bod">
                    <span className={styles.price}>{record.price}</span>
                  </td>

                  <td data-label="Datum/tijd">
                    <span className={styles.dateTime}>{record.dateTime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}