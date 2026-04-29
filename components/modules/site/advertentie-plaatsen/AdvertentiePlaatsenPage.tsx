"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./AdvertentiePlaatsenPage.module.scss";
import ListingTypeTabs, {
  type ListingType,
} from "@/components/modules/site/advertentie-plaatsen/ListingTypeTabs";
import HorseListingWizard from "@/components/modules/site/advertentie-plaatsen/HorseListingWizard";
import SemenListingWizard from "@/components/modules/site/advertentie-plaatsen/SemenListingWizard";
import EmbryoListingWizard from "@/components/modules/site/advertentie-plaatsen/EmbryoListingWizard";
import PartnerListingWizard from "@/components/modules/site/advertentie-plaatsen/PartnerListingWizard";

export type RelistData = {
  mode: "relist";
  sourceAuctionId: string;
  title: string;
  subtitle: string;
  lotCode: string;
  originalPrice: number;
  startPrice: number;
};

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

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRelistData(searchParams: URLSearchParams): RelistData | null {
  const mode = searchParams.get("mode");

  if (mode !== "relist") {
    return null;
  }

  const sourceAuctionId = searchParams.get("sourceAuctionId") ?? "";
  const title = searchParams.get("title") ?? "";
  const subtitle = searchParams.get("subtitle") ?? "";
  const lotCode = searchParams.get("lotCode") ?? "";
  const originalPrice = Number(searchParams.get("originalPrice") ?? 0);
  const startPrice = Number(searchParams.get("startPrice") ?? 0);

  if (!sourceAuctionId || !title || !startPrice) {
    return null;
  }

  return {
    mode: "relist",
    sourceAuctionId,
    title,
    subtitle,
    lotCode,
    originalPrice,
    startPrice,
  };
}

function ListingFormRenderer({
  activeType,
  relistData,
}: {
  activeType: ListingType;
  relistData: RelistData | null;
}) {
  if (
    activeType === "paard" ||
    activeType === "jonge-paarden" ||
    activeType === "elite-paarden"
  ) {
    return <HorseListingWizard type={activeType} relistData={relistData} />;
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

function AdvertentiePlaatsenContent() {
  const searchParams = useSearchParams();

  const relistData = useMemo(() => {
    return getRelistData(searchParams);
  }, [searchParams]);

  const [activeType, setActiveType] = useState<ListingType>("paard");

  const activeDescription = useMemo(() => {
    return listingDescriptions[activeType];
  }, [activeType]);

  return (
    <>
      {relistData ? (
        <section className={styles.relistBanner}>
          <span className={styles.relistLabel}>Opnieuw aanbieden</span>

          <div>
            <h2>{relistData.title}</h2>
            <p>
              Deze veiling is zonder winnaar geëindigd. De nieuwe startprijs is
              automatisch met 10% verlaagd van{" "}
              <strong>{formatEuro(relistData.originalPrice)}</strong> naar{" "}
              <strong>{formatEuro(relistData.startPrice)}</strong>.
            </p>
          </div>
        </section>
      ) : null}

      <section className={styles.typesSection}>
        <ListingTypeTabs
          activeType={activeType}
          onChange={setActiveType}
          description={activeDescription}
        />
      </section>

      <section className={styles.contentSection}>
        <ListingFormRenderer activeType={activeType} relistData={relistData} />
      </section>
    </>
  );
}

export default function AdvertentiePlaatsenPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Verkopersportaal</span>

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
            <a href="/verkopersdashboard">Ga naar het verkopersdashboard.</a>
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <AdvertentiePlaatsenContent />
      </Suspense>
    </main>
  );
}