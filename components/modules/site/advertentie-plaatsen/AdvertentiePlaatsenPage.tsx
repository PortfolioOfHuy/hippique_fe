"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./AdvertentiePlaatsenPage.module.scss";
import ListingTypeTabs, {
  type ListingType,
} from "@/components/modules/site/advertentie-plaatsen/ListingTypeTabs";
import HorseListingWizard from "@/components/modules/site/advertentie-plaatsen/HorseListingWizard";
import SemenListingWizard from "@/components/modules/site/advertentie-plaatsen/SemenListingWizard";
import EmbryoListingWizard from "@/components/modules/site/advertentie-plaatsen/EmbryoListingWizard";
import PartnerListingWizard from "@/components/modules/site/advertentie-plaatsen/PartnerListingWizard";

const listingDescriptions: Record<ListingType, string> = {
  paard:
    "Plaats een veilingvermelding voor een individueel paard met volledige informatie, media en documentatie.",
  "jonge-paarden":
    "Voeg jonge paarden toe met focus op afstamming, potentieel en ontwikkelingsniveau.",
  "elite-paarden":
    "Maak een premium elitevermelding voor exclusieve paarden met extra presentatie.",
  embryo:
    "Plaats een embryo-aanbieding met donorinformatie, pedigree en relevante medische gegevens.",
  sperma:
    "Publiceer een sperma-aanbieding met hengsteninformatie, voorwaarden en documentatie.",
  partner:
    "Gebruik dit type voor partners, commerciële samenwerkingen of marketplace-gerelateerde plaatsingen.",
};

function ListingFormRenderer({ activeType }: { activeType: ListingType }) {
  if (
    activeType === "paard" ||
    activeType === "jonge-paarden" ||
    activeType === "elite-paarden"
  ) {
    return <HorseListingWizard type={activeType} />;
  }

  if (activeType === "embryo") {
    return <EmbryoListingWizard />;
  }

  if (activeType === "sperma") {
    return <SemenListingWizard />;
  }

  if (activeType === "partner") {
    return <PartnerListingWizard />;
  }

  return null;
}

export default function AdvertentiePlaatsenPage() {
  const [activeType, setActiveType] = useState<ListingType>("paard");

  const activeDescription = useMemo(() => {
    return listingDescriptions[activeType];
  }, [activeType]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Verkoperportaal</span>

        <h1>Advertentie plaatsen</h1>

        <p>
          Maak een nieuwe vermelding aan voor een paard, embryo, sperma,
          partnerplaatsing of andere geselecteerde categorie. Voeg
          basisinformatie, media, prijsdetails en publicatiegegevens toe.
        </p>

        <div className={styles.notice}>
          <span className={styles.noticeIcon}>i</span>

          <p>
            Wil je bestaande advertenties beheren?{" "}
            <Link href="/verkopersdashboard">Ga naar verkopersdashboard.</Link>
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <section className={styles.typesSection}>
          <ListingTypeTabs
            activeType={activeType}
            onChange={setActiveType}
            description={activeDescription}
          />
        </section>

        <section className={styles.contentSection}>
          <ListingFormRenderer activeType={activeType} />
        </section>
      </Suspense>
    </main>
  );
}