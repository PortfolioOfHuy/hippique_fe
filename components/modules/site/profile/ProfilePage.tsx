"use client";

import { useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInformation from "./ProfileInformation";
import ChangePasswordCard from "./ChangePasswordCard";
import AddressBookCard from "./AddressBookCard";
import AuctionHistory from "./AuctionHistory";
import DepositsRefunds from "./DepositsRefunds";
import {
  initialAddresses,
  initialProfileData,
  type AddressItem,
  type ProfileData,
  type ProfileTabKey,
} from "./profile-data";
import styles from "./ProfilePage.module.scss";
import AuctionTabsPanel from "./AuctionTabsPanel";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabKey>("profiel");
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);

  function handleAddAddress() {
    setAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        tag: "Nieuw adres",
        title: "Nieuw afleveradres",
        addressLine1: "Adres nog niet ingesteld",
        addressLine2: "Klik later om te bewerken",
      },
    ]);
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <ProfileSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

        <section className={styles.content}>
  {activeTab === "profiel" ? (
    <>
      <header className={styles.pageHeader}>
        <span className={styles.kicker}>Accountbeheer</span>
        <h1>Mijn profiel</h1>
        <p>Gedetailleerde informatie en accountbeheer</p>
      </header>

      <ProfileInformation profile={profile} onSaveProfile={setProfile} />

      <div className={styles.bottomGrid}>
        <ChangePasswordCard />

        <AddressBookCard
          addresses={addresses}
          onAddAddress={handleAddAddress}
        />
      </div>
    </>
  ) : activeTab === "paardenveilingen" ||
    activeTab === "embryoveilingen" ||
    activeTab === "spermaveilingen" ? (
    <AuctionTabsPanel type={activeTab} />
  ) : activeTab === "veilinggeschiedenis" ? (
    <AuctionHistory />
  ) : activeTab === "stortingen-terugbetalingen" ? (
    <DepositsRefunds />
  ) : (
    <section className={styles.emptyState}>
      <span>Binnenkort beschikbaar</span>
      <h2>{getTabTitle(activeTab)}</h2>
      <p>
        Deze sectie is voorbereid voor toekomstige koppeling met de veilingdata
        en gebruikershistorie.
      </p>
    </section>
  )}
</section>
      </div>
    </main>
  );
}

function getTabTitle(tab: ProfileTabKey) {
  const titleMap: Record<ProfileTabKey, string> = {
    profiel: "Mijn profiel",
    paardenveilingen: "Paardenveilingen",
    embryoveilingen: "Embryoveilingen",
    spermaveilingen: "Spermaveilingen",
    veilinggeschiedenis: "Veilinggeschiedenis",
    "stortingen-terugbetalingen": "Stortingen & terugbetalingen",
  };

  return titleMap[tab];
}