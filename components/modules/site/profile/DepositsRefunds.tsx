"use client";

import { useMemo, useState } from "react";
import { Button, InputNumber, Modal, Space } from "antd";
import {
  Plus,
  BanknoteArrowDown,
  AlertCircle,
  CheckCircle2,
  WalletCards,
} from "lucide-react";
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

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function DepositsRefunds() {
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositSubmitted, setDepositSubmitted] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundSubmitted, setRefundSubmitted] = useState(false);

  const refundableDeposits = useMemo(() => {
    return depositHistory.filter((item) => item.status === "refundbaar");
  }, []);

  const selectedRefundDeposit = refundableDeposits[0] ?? null;

  const formattedDepositAmount =
    typeof depositAmount === "number" && depositAmount > 0
      ? formatEuro(depositAmount)
      : "€0,00";

  function openDepositModal() {
    setDepositSubmitted(false);
    setDepositAmount(null);
    setDepositModalOpen(true);
  }

  function closeDepositModal() {
    setDepositModalOpen(false);
    setDepositSubmitted(false);
    setDepositAmount(null);
  }

  function confirmDepositRequest() {
    if (!depositAmount || depositAmount <= 0) {
      return;
    }

    setDepositSubmitted(true);
  }

  function openRefundModal() {
    setRefundSubmitted(false);
    setRefundModalOpen(true);
  }

  function closeRefundModal() {
    setRefundModalOpen(false);
    setRefundSubmitted(false);
  }

  function confirmRefundRequest() {
    setRefundSubmitted(true);
  }

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
                aria-label="Nieuwe storting toevoegen"
                title="Nieuwe storting toevoegen"
                onClick={openDepositModal}
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
              onClick={openRefundModal}
            >
              <BanknoteArrowDown size={16} strokeWidth={2.4} />
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

      <Modal
        open={depositModalOpen}
        onCancel={closeDepositModal}
        footer={null}
        centered
        width={520}
        className={styles.depositModal}
        destroyOnHidden
      >
        <div className={styles.depositModalContent}>
          <div
            className={`${styles.depositModalIcon} ${
              depositSubmitted ? styles.depositModalIconSuccess : ""
            }`}
          >
            {depositSubmitted ? (
              <CheckCircle2 size={30} strokeWidth={2.3} />
            ) : (
              <WalletCards size={30} strokeWidth={2.3} />
            )}
          </div>

          {depositSubmitted ? (
            <>
              <h3>Storting bevestigd</h3>
              <p>
                Je stortingsaanvraag is succesvol aangemaakt. Volg de verdere
                betaalinstructies om je waarborgsom te voltooien.
              </p>

              <div className={styles.depositModalNotice}>
                <strong>Aangevraagd bedrag</strong>
                <span>{formattedDepositAmount}</span>
              </div>

              <div className={styles.depositModalActions}>
                <Button
                  type="primary"
                  className={styles.depositPrimaryButton}
                  onClick={closeDepositModal}
                >
                  Sluiten
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3>Nieuwe storting toevoegen</h3>
              <p>
                Vul het bedrag in dat je als waarborgsom wilt storten. Na
                bevestiging wordt je aanvraag klaargezet voor verwerking.
              </p>

              <div className={styles.depositFormBox}>
                <label htmlFor="deposit-amount">Bedrag</label>

<Space.Compact className={styles.depositAmountGroup}>
  <span className={styles.depositCurrencyPrefix}>€</span>

  <InputNumber
    id="deposit-amount"
    className={styles.depositAmountInput}
    min={1}
    step={100}
    value={depositAmount}
    placeholder="Voer bedrag in"
    controls={false}
    decimalSeparator=","
    onChange={(value) => {
      if (typeof value === "number") {
        setDepositAmount(value);
        return;
      }

      setDepositAmount(null);
    }}
  />
</Space.Compact>

                <small>
                  Controleer het bedrag zorgvuldig voordat je de storting
                  bevestigt.
                </small>
              </div>

              <div className={styles.depositPreview}>
                <span>Te bevestigen bedrag</span>
                <strong>{formattedDepositAmount}</strong>
              </div>

              <div className={styles.depositModalActions}>
                <Button
                  type="primary"
                  className={styles.depositPrimaryButton}
                  disabled={!depositAmount || depositAmount <= 0}
                  onClick={confirmDepositRequest}
                >
                  Bevestigen
                </Button>

                <Button
                  type="default"
                  className={styles.depositGhostButton}
                  onClick={closeDepositModal}
                >
                  Annuleren
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Modal
        open={refundModalOpen}
        onCancel={closeRefundModal}
        footer={null}
        centered
        width={520}
        className={styles.refundModal}
        destroyOnHidden
      >
        <div className={styles.refundModalContent}>
          <div
            className={`${styles.refundModalIcon} ${
              refundSubmitted ? styles.refundModalIconSuccess : ""
            }`}
          >
            {refundSubmitted ? (
              <CheckCircle2 size={30} strokeWidth={2.3} />
            ) : (
              <AlertCircle size={30} strokeWidth={2.3} />
            )}
          </div>

          {refundSubmitted ? (
            <>
              <h3>Terugbetaling aangevraagd</h3>
              <p>
                Uw terugbetalingsaanvraag is succesvol ingediend. Wij verwerken
                uw aanvraag en houden u op de hoogte van de status.
              </p>

              <div className={styles.refundModalNotice}>
                <strong>Status</strong>
                <span>In behandeling</span>
              </div>

              <div className={styles.refundModalActions}>
                <Button
                  type="primary"
                  className={styles.refundPrimaryButton}
                  onClick={closeRefundModal}
                >
                  Sluiten
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3>Terugbetaling bevestigen</h3>
              <p>
                Weet u zeker dat u een terugbetaling wilt aanvragen voor de
                beschikbare storting? Na bevestiging wordt uw aanvraag ter
                beoordeling ingediend.
              </p>

              {selectedRefundDeposit ? (
                <div className={styles.refundModalDetails}>
                  <div>
                    <span>Gekoppelde storting</span>
                    <strong>{selectedRefundDeposit.purpose}</strong>
                  </div>

                  <div>
                    <span>Referentie</span>
                    <strong>{selectedRefundDeposit.refCode}</strong>
                  </div>

                  <div>
                    <span>Bedrag</span>
                    <strong>{selectedRefundDeposit.amount}</strong>
                  </div>
                </div>
              ) : (
                <div className={styles.refundModalNotice}>
                  <strong>Geen terugbetaalbare storting</strong>
                  <span>
                    Er is momenteel geen storting beschikbaar voor een nieuwe
                    terugbetalingsaanvraag.
                  </span>
                </div>
              )}

              <div className={styles.refundModalActions}>
                <Button
                  type="primary"
                  className={styles.refundPrimaryButton}
                  disabled={!selectedRefundDeposit}
                  onClick={confirmRefundRequest}
                >
                  Bevestigen
                </Button>

                <Button
                  type="default"
                  className={styles.refundGhostButton}
                  onClick={closeRefundModal}
                >
                  Annuleren
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}