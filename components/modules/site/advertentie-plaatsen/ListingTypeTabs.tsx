"use client";

import styles from "./ListingTypeTabs.module.scss";

export type ListingType =
  | "paard"
  | "jonge-paarden"
  | "elite-paarden"
  | "embryo"
  | "sperma"
  | "partner";

type ListingTypeTabsProps = {
  activeType: ListingType;
  onChange: (value: ListingType) => void;
  description: string;
};

const tabs: Array<{ key: ListingType; label: string }> = [
  { key: "paard", label: "Paard" },
  { key: "jonge-paarden", label: "Jonge paarden" },
  { key: "elite-paarden", label: "Elite paarden" },
  { key: "embryo", label: "Embryo" },
  { key: "sperma", label: "Sperma" },
  { key: "partner", label: "Partner" },
];

export default function ListingTypeTabs({
  activeType,
  onChange,
  description,
}: ListingTypeTabsProps) {
  const activeLabel =
    tabs.find((item) => item.key === activeType)?.label ?? "Paard";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Selecteer categorie</span>
          <h2>Type vermelding</h2>
        </div>

        <div className={styles.selectedBox}>
          <span>Geselecteerd</span>
          <strong>{activeLabel}</strong>
        </div>
      </div>

      <div className={styles.tabList} role="tablist" aria-label="Type vermelding">
        {tabs.map((tab) => {
          const isActive = tab.key === activeType;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabButton} ${
                isActive ? styles.tabButtonActive : ""
              }`}
              onClick={() => onChange(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className={styles.info}>
        <span>Omschrijving</span>
        <p>{description}</p>
      </div>
    </div>
  );
}