"use client";

import { ChangeEvent, useState } from "react";
import {
  AlertTriangle,
  Banknote,
  FileText,
  ImageIcon,
  Plus,
  ShieldCheck,
  Upload,
} from "lucide-react";
import styles from "./SemenListingWizard.module.scss";

type SemenFormState = {
  savedAddress: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  fullAddress: string;

  listingTitle: string;
  stallionName: string;
  semenId: string;
  breed: string;
  collectionType: string;
  freshFrozen: string;
  quantity: string;
  motility: string;
  collectionDate: string;
  registry: string;
  location: string;
  pedigreeUrl: string;
  description: string;

  videoUrl: string;
  startingBid: string;
  currency: string;

  cryptoCurrency: string;
  blockchainNetwork: string;
  walletAddress: string;
  walletOwner: string;
  settlementInstructions: string;
};

type UploadKey =
  | "mainImages"
  | "pedigreeDocuments"
  | "healthCertificates"
  | "qualityAnalysis"
  | "supportingDocuments";

type UploadState = Record<UploadKey, string | null>;

const initialForm: SemenFormState = {
  savedAddress: "Main Stable - 123 Equestrian Lane...",
  fullName: "John Doe",
  email: "seller@example.com",
  phone: "+1 555-0123",
  companyName: "Majestic Stables",
  fullAddress: "123 Equestrian Lane, City, Country",

  listingTitle: "Premium sperma: [Hengstnaam]",
  stallionName: "Chacco Blue",
  semenId: "SEM-2024-882",
  breed: "Oldenburger",
  collectionType: "",
  freshFrozen: "bevroren",
  quantity: "3 rietjes",
  motility: "70% progressieve motiliteit",
  collectionDate: "",
  registry: "Zangersheide",
  location: "Brussel, België",
  pedigreeUrl: "https://...",
  description: "",

  videoUrl: "",
  startingBid: "0",
  currency: "EUR",
  cryptoCurrency: "USDT",
  blockchainNetwork: "Ethereum (ERC-20)",
  walletAddress: "",
  walletOwner: "Persoonlijke wallet / bedrijfsrekening",
  settlementInstructions: "",
};

const uploadCards: Array<{
  key: UploadKey;
  title: string;
  description: string;
}> = [
  {
    key: "pedigreeDocuments",
    title: "Pedigree documenten",
    description: "Afstamming en stamboekinformatie",
  },
  {
    key: "healthCertificates",
    title: "Gezondheid / fokcertificaten",
    description: "Medische en fokgerelateerde documenten",
  },
  {
    key: "qualityAnalysis",
    title: "Kwaliteitsanalyse / labdocumenten",
    description: "Motiliteit, kwaliteit en laboratoriumrapporten",
  },
  {
    key: "supportingDocuments",
    title: "Overige ondersteunende documenten",
    description: "Aanvullende bestanden voor deze vermelding",
  },
];

export default function SemenListingWizard() {
  const [form, setForm] = useState<SemenFormState>(initialForm);
  const [cryptoEnabled, setCryptoEnabled] = useState(true);
  const [confirmedAccurate, setConfirmedAccurate] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [uploads, setUploads] = useState<UploadState>({
    mainImages: null,
    pedigreeDocuments: null,
    healthCertificates: null,
    qualityAnalysis: null,
    supportingDocuments: null,
  });

  function updateField<K extends keyof SemenFormState>(
    key: K,
    value: SemenFormState[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleUpload(key: UploadKey, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploads((prev) => ({
      ...prev,
      [key]: file.name,
    }));
  }

  const baseFee = 50;
  const cryptoFee = cryptoEnabled ? 10 : 0;
  const totalDue = baseFee + cryptoFee;

  return (
    <div className={styles.wrapper}>
      <SectionHeading number="02" title="Verkoperinformatie" />

      <section className={styles.card}>
        <div className={styles.addressHeader}>
          <div className={styles.field}>
            <label htmlFor="savedAddress">Opgeslagen adres</label>
            <select
              id="savedAddress"
              value={form.savedAddress}
              onChange={(e) => updateField("savedAddress", e.target.value)}
            >
              <option>Main Stable - 123 Equestrian Lane...</option>
              <option>Private Stable - Amsterdam</option>
              <option>Breeding Center - Brussel</option>
            </select>
          </div>

          <button type="button" className={styles.linkButton}>
            Nieuw adres toevoegen
          </button>
        </div>

        <div className={styles.formGridTwo}>
          <TextField
            label="Volledige naam / primaire contactpersoon"
            value={form.fullName}
            onChange={(value) => updateField("fullName", value)}
          />

          <TextField
            label="E-mailadres"
            value={form.email}
            type="email"
            onChange={(value) => updateField("email", value)}
          />

          <TextField
            label="Telefoonnummer"
            value={form.phone}
            onChange={(value) => updateField("phone", value)}
          />

          <TextField
            label="Bedrijf / stalnaam"
            value={form.companyName}
            onChange={(value) => updateField("companyName", value)}
          />

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="fullAddress">Volledig adres</label>
            <input
              id="fullAddress"
              value={form.fullAddress}
              onChange={(e) => updateField("fullAddress", e.target.value)}
            />
          </div>
        </div>
      </section>

      <SectionHeading number="03" title="Advertentie-informatie" />

      <section className={styles.card}>
        <div className={styles.formGridTwo}>
          <TextField
            label="Advertentietitel"
            value={form.listingTitle}
            onChange={(value) => updateField("listingTitle", value)}
          />

          <TextField
            label="Hengstnaam"
            value={form.stallionName}
            onChange={(value) => updateField("stallionName", value)}
          />

          <TextField
            label="Sperma-ID / registratienummer"
            value={form.semenId}
            onChange={(value) => updateField("semenId", value)}
          />

          <TextField
            label="Ras"
            value={form.breed}
            onChange={(value) => updateField("breed", value)}
          />

          <TextField
            label="Collectietype"
            value={form.collectionType}
            placeholder="bijv. ICSI, conventioneel"
            onChange={(value) => updateField("collectionType", value)}
          />

          <div className={styles.field}>
            <label htmlFor="freshFrozen">Vers / bevroren</label>
            <select
              id="freshFrozen"
              value={form.freshFrozen}
              onChange={(e) => updateField("freshFrozen", e.target.value)}
            >
              <option value="bevroren">Bevroren</option>
              <option value="vers">Vers</option>
            </select>
          </div>

          <TextField
            label="Aantal doses / hoeveelheid"
            value={form.quantity}
            onChange={(value) => updateField("quantity", value)}
          />

          <TextField
            label="Motiliteit / kwaliteit"
            value={form.motility}
            onChange={(value) => updateField("motility", value)}
          />

          <TextField
            label="Collectiedatum"
            value={form.collectionDate}
            type="date"
            onChange={(value) => updateField("collectionDate", value)}
          />

          <div className={styles.field}>
            <label htmlFor="registry">Stamboek / register</label>
            <select
              id="registry"
              value={form.registry}
              onChange={(e) => updateField("registry", e.target.value)}
            >
              <option>Zangersheide</option>
              <option>KWPN</option>
              <option>Oldenburger</option>
              <option>Hannoveraner</option>
            </select>
          </div>

          <TextField
            label="Locatie"
            value={form.location}
            onChange={(value) => updateField("location", value)}
          />

          <TextField
            label="Pedigree URL"
            value={form.pedigreeUrl}
            onChange={(value) => updateField("pedigreeUrl", value)}
          />

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="description">Beschrijving / fokvoorwaarden</label>
            <textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Vermeld opslaginformatie, drachtgaranties, verzendbeperkingen of aanvullende voorwaarden..."
            />
          </div>
        </div>
      </section>

      <SectionHeading number="04" title="Media & documenten" />

      <section className={styles.card}>
        <div className={styles.mediaGrid}>
          <label className={styles.mainUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleUpload("mainImages", event)}
            />

            <ImageIcon size={34} strokeWidth={1.8} />
            <strong>Hoofdafbeelding & galerijbeelden</strong>
            <span>
              Upload beelden met hoge resolutie van de hengst of spermarietjes.
            </span>

            {uploads.mainImages ? <em>{uploads.mainImages}</em> : null}
          </label>

          <div className={styles.videoBox}>
            <div className={styles.field}>
              <label htmlFor="videoUrl">YouTube / video URL</label>
              <input
                id="videoUrl"
                value={form.videoUrl}
                onChange={(e) => updateField("videoUrl", e.target.value)}
                placeholder="Plak YouTube/Vimeo URL hier..."
              />
            </div>
          </div>
        </div>

        <div className={styles.uploadGrid}>
          {uploadCards.map((item) => (
            <label key={item.key} className={styles.uploadCard}>
              <input
                type="file"
                onChange={(event) => handleUpload(item.key, event)}
              />

              <FileText size={26} strokeWidth={1.8} />
              <strong>{item.title}</strong>
              <span>{uploads[item.key] ?? item.description}</span>
            </label>
          ))}
        </div>
      </section>

      <SectionHeading number="05" title="Prijs & betalingsopties" />

      <section className={styles.pricingCard}>
        <div className={styles.pricingBlock}>
          <h3>1. Veilingprijs</h3>

          <div className={styles.formGridTwo}>
            <TextField
              label="Startbod"
              value={form.startingBid}
              onChange={(value) => updateField("startingBid", value)}
            />

            <div className={styles.field}>
              <label htmlFor="currency">Valuta</label>
              <select
                id="currency"
                value={form.currency}
                onChange={(e) => updateField("currency", e.target.value)}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.pricingBlock}>
          <div className={styles.toggleHeader}>
            <h3>2. Optionele crypto-afwikkeling buiten platform</h3>

            <button
              type="button"
              className={`${styles.toggle} ${
                cryptoEnabled ? styles.toggleActive : ""
              }`}
              aria-pressed={cryptoEnabled}
              onClick={() => setCryptoEnabled((prev) => !prev)}
            >
              <span />
            </button>
          </div>

          {cryptoEnabled ? (
            <div className={styles.cryptoBox}>
              <div className={styles.formGridTwo}>
                <div className={styles.field}>
                  <label htmlFor="cryptoCurrency">
                    Geaccepteerde cryptovaluta
                  </label>
                  <select
                    id="cryptoCurrency"
                    value={form.cryptoCurrency}
                    onChange={(e) =>
                      updateField("cryptoCurrency", e.target.value)
                    }
                  >
                    <option>USDT</option>
                    <option>USDC</option>
                    <option>ETH</option>
                    <option>BTC</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="blockchainNetwork">Blockchainnetwerk</label>
                  <select
                    id="blockchainNetwork"
                    value={form.blockchainNetwork}
                    onChange={(e) =>
                      updateField("blockchainNetwork", e.target.value)
                    }
                  >
                    <option>Ethereum (ERC-20)</option>
                    <option>Tron (TRC-20)</option>
                    <option>BNB Smart Chain (BEP-20)</option>
                    <option>Bitcoin</option>
                  </select>
                </div>
              </div>

              <TextField
                label="Walletadres"
                value={form.walletAddress}
                placeholder="0x..."
                onChange={(value) => updateField("walletAddress", value)}
              />

              <TextField
                label="Walletlabel / eigenaar"
                value={form.walletOwner}
                onChange={(value) => updateField("walletOwner", value)}
              />
            </div>
          ) : null}

          <div className={styles.field}>
            <label htmlFor="settlementInstructions">
              Afwikkelingsinstructies
            </label>
            <textarea
              id="settlementInstructions"
              rows={4}
              value={form.settlementInstructions}
              onChange={(e) =>
                updateField("settlementInstructions", e.target.value)
              }
              placeholder="Voorbeeld: vermeld het listingreferentienummer in de overschrijvingsnotities..."
            />
          </div>

          <div className={styles.warningBox}>
            <AlertTriangle size={22} strokeWidth={2} />
            <p>
              Het platform verwerkt geen koper-naar-verkoperbetalingen. Eventuele
              crypto-afwikkeling wordt rechtstreeks tussen koper en verkoper
              buiten het platform geregeld.
            </p>
          </div>

          <p className={styles.cryptoDisclaimer}>
            Cryptowalletgegevens worden uitsluitend verstrekt voor informatieve
            afwikkelingsdoeleinden.
          </p>
        </div>

        <div className={styles.summaryBlock}>
          <h3>3. Samenvatting publicatiekosten</h3>

          <div className={styles.feeRows}>
            <div>
              <span>Basis publicatiekosten</span>
              <strong>€{baseFee.toFixed(2).replace(".", ",")}</strong>
            </div>

            <div>
              <span>Optionele crypto servicekosten</span>
              <strong>€{cryptoFee.toFixed(2).replace(".", ",")}</strong>
            </div>

            <div className={styles.totalRow}>
              <span>Totaal nu te betalen</span>
              <strong>€{totalDue.toFixed(2).replace(".", ",")}</strong>
            </div>
          </div>

          <div className={styles.infoBox}>
            <ShieldCheck size={18} strokeWidth={2} />
            <p>
              De publicatiekosten worden veilig via Stripe betaald. Je wordt
              doorgestuurd naar de beveiligde betaalomgeving.
            </p>
          </div>

          <button type="button" className={styles.stripeButton}>
            <Banknote size={18} strokeWidth={2} />
            Doorgaan naar Stripe checkout
          </button>
        </div>
      </section>

      <div className={styles.confirmation}>
        <label>
          <input
            type="checkbox"
            checked={confirmedAccurate}
            onChange={(e) => setConfirmedAccurate(e.target.checked)}
          />
          <span>
            Ik bevestig dat alle verstrekte informatie correct is en dat ik
            bevoegd ben deze vermelding te verkopen.
          </span>
        </label>

        <label>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span>
            Ik ga akkoord met de verkopersvoorwaarden en het commissiebeleid van
            de marktplaats.
          </span>
        </label>

        <button
          type="button"
          className={styles.reviewButton}
          disabled={!confirmedAccurate || !acceptedTerms}
        >
          Controleren & doorgaan naar betaling
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className={styles.sectionHeading}>
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const inputId = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={styles.field}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}