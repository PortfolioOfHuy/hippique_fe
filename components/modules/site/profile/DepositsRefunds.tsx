"use client";

import { Plus, Undo2 } from "lucide-react";
import styles from "./DepositsRefunds.module.scss";

type DepositSummaryItem = {
  id: string;
  label: string;
  value: string;
  tone?: "default" | "gold" | "muted";
};

type DepositStatus = "refundbaar" | "toegepast" | "terugbetaald";
type RefundStatus = "behandeling" | "goedgekeurd";

type DepositRecord = {
  id: string;
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  refCode: string;
  purpose: string;
  amount: string;
  status: DepositStatus;
};

type RefundRecord = {
  id: string;
  date: string;
  refCode: string;
  linkedDeposit: string;
  status: RefundStatus;
};

const summaryItems: DepositSummaryItem[] = [
  {
    id: "total-deposited",
    label: "Totaal gestort",
    value: "€17.000,00",
    tone: "default",
  },
  {
    id: "active-deposits",
    label: "Actieve stortingen",
    value: "€5.000,00",
    tone: "gold",
  },
  {
    id: "pending-refunds",
    label: "Lopende terugbetalingen",
    value: "€5.000,00",
    tone: "gold",
  },
  {
    id: "total-refunded",
    label: "Totaal terugbetaald",
    value: "€5.000,00",
    tone: "muted",
  },
];

const depositHistory: DepositRecord[] = [
  {
    id: "dep-1",
    dateDay: "24",
    dateMonth: "okt",
    dateYear: "2024",
    refCode: "ADM-EF-2024",
    purpose: "Veilingtoelating: Elite Foals",
    amount: "€5.000,00",
    status: "refundbaar",
  },
  {
    id: "dep-2",
    dateDay: "12",
    dateMonth: "okt",
    dateYear: "2024",
    refCode: "LOT-012-DP",
    purpose: "Toegepast: kavel #12 aanbetaling",
    amount: "€7.000,00",
    status: "toegepast",
  },
  {
    id: "dep-3",
    dateDay: "15",
    dateMonth: "sep",
    dateYear: "2024",
    refCode: "ADM-GP-2024",
    purpose: "Toelating: Grand Prix Select",
    amount: "€5.000,00",
    status: "terugbetaald",
  },
];

const refundRequests: RefundRecord[] = [
  {
    id: "ref-1",
    date: "26 okt 2024",
    refCode: "REF-00412",
    linkedDeposit: "Elite Foals toelating",
    status: "behandeling",
  },
  {
    id: "ref-2",
    date: "18 sep 2024",
    refCode: "REF-00389",
    linkedDeposit: "Grand Prix toelating",
    status: "goedgekeurd",
  },
];

function getDepositStatusLabel(status: DepositStatus) {
  const labels: Record<DepositStatus, string> = {
    refundbaar: "Terugbetaalbaar",
    toegepast: "Toegepast",
    terugbetaald: "Terugbetaald",
  };

  return labels[status];
}

function getRefundStatusLabel(status: RefundStatus) {
  const labels: Record<RefundStatus, string> = {
    behandeling: "In behandeling",
    goedgekeurd: "Goedgekeurd",
  };

  return labels[status];
}

export default function DepositsRefunds() {
  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <h2>Stortingen & terugbetalingen</h2>
        <p>
          Beheer je waarborgsommen voor biedingen en volg de status van je
          terugbetalingen voor al je veilingdeelnames.
        </p>
      </header>

      <div className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article
            key={item.id}
            className={`${styles.summaryCard} ${
              item.tone === "gold"
                ? styles.summaryCardGold
                : item.tone === "muted"
                  ? styles.summaryCardMuted
                  : ""
            }`}
          >
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </div>

      <div className={styles.bottomGrid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderMain}>
              <h3>Stortingen</h3>
            </div>

            <div className={styles.panelHeaderActions}>
              <div className={styles.panelMeta}>
                {depositHistory.length} transacties
              </div>

              <button
                type="button"
                className={styles.requestButton}
                aria-label="Cọc tiền"
                title="Cọc tiền"
              >
                <Plus size={16} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          <div className={styles.historyTableWrap}>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Doel</th>
                  <th>Bedrag</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {depositHistory.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Datum">
                      <div className={styles.dateCell}>
                        <div className={styles.dateMain}>
                          <span>{item.dateMonth}</span>
                          <strong>{item.dateDay}</strong>
                          <span>{item.dateYear}</span>
                        </div>

                        <small>{item.refCode}</small>
                      </div>
                    </td>

                    <td data-label="Doel">
                      <div className={styles.purposeCell}>{item.purpose}</div>
                    </td>

                    <td data-label="Bedrag">
                      <div className={styles.amountCell}>{item.amount}</div>
                    </td>

                    <td data-label="Status">
                      <span
                        className={`${styles.statusBadge} ${
                          styles[`statusDeposit_${item.status}`]
                        }`}
                      >
                        {getDepositStatusLabel(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelHeaderMain}>
              <h3>Terugbetalingen</h3>
            </div>

            <button
              type="button"
              className={styles.refundButton}
              aria-label="Terugbetaling aanvragen"
              title="Terugbetaling aanvragen"
            >
              <Undo2 size={16} strokeWidth={2.4} />
            </button>
          </div>

          <div className={styles.refundTableWrap}>
            <table className={styles.refundTable}>
              <thead>
                <tr>
                  <th>Aanvraagdatum</th>
                  <th>Gekoppelde storting</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {refundRequests.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Aanvraagdatum">
                      <div className={styles.requestDateCell}>
                        <strong>{item.date}</strong>
                        <small>{item.refCode}</small>
                      </div>
                    </td>

                    <td data-label="Gekoppelde storting">
                      <div className={styles.linkedDepositCell}>
                        {item.linkedDeposit}
                      </div>
                    </td>

                    <td data-label="Status">
                      <span
                        className={`${styles.statusDotBadge} ${
                          styles[`statusRefund_${item.status}`]
                        }`}
                      >
                        <i />
                        {getRefundStatusLabel(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}