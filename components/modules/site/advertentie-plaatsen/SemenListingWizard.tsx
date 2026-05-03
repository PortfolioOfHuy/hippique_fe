"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  FileText,
  ImageIcon,
  ShieldCheck,
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
type WizardStep = 1 | 2 | 3;

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
  registry: "Hippique",
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

const steps = [
  { step: 1 as WizardStep, label: "Informatie & media" },
  { step: 2 as WizardStep, label: "Voorbeeld" },
  { step: 3 as WizardStep, label: "Betaling" },
];

export default function SemenListingWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
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

  function goToStep(step: WizardStep) {
    setCurrentStep(step);
  }

  function goNext() {
    setCurrentStep((prev) => (prev < 3 ? ((prev + 1) as WizardStep) : prev));
  }

  function goPrev() {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as WizardStep) : prev));
  }

  const baseFee = 50;
  const cryptoFee = cryptoEnabled ? 10 : 0;
  const totalDue = baseFee + cryptoFee;

  const filledUploadCount = useMemo(() => {
    return Object.values(uploads).filter(Boolean).length;
  }, [uploads]);

  return (
    <div className={styles.wrapper}>
      <WizardSteps currentStep={currentStep} onStepClick={goToStep} />

      {currentStep === 1 ? (
        <>
          <section className={styles.card}>
            <SectionHeading number="01" title="Advertentie-informatie" />

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
                  onChange={(event) =>
                    updateField("freshFrozen", event.target.value)
                  }
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
                  onChange={(event) => updateField("registry", event.target.value)}
                >
                  <option>Hippique</option>
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
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Vermeld opslaginformatie, drachtgaranties, verzendbeperkingen of aanvullende voorwaarden..."
                />
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <SectionHeading number="02" title="Media & documenten" />

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
                    onChange={(event) => updateField("videoUrl", event.target.value)}
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

          <div className={styles.wizardActions}>
            <div className={styles.stepHelper}>
              Vul eerst de informatie en media in voordat je het voorbeeld controleert.
            </div>

            <button type="button" className={styles.primaryStepButton} onClick={goNext}>
              Doorgaan naar voorbeeld
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </>
      ) : null}

      {currentStep === 2 ? (
        <>
          <section className={styles.card}>
            <SectionHeading number="02" title="Voorbeeld van je advertentie" />

            <div className={styles.previewHero}>
              <div className={styles.previewImageBox}>
                <ImageIcon size={42} strokeWidth={1.7} />
                <strong>{uploads.mainImages ?? "Nog geen hoofdafbeelding geüpload"}</strong>
                <span>
                  Dit blok toont later de hoofdafbeelding van je sperma listing.
                </span>
              </div>

              <div className={styles.previewHeroContent}>
                <span className={styles.previewBadge}>Sperma listing preview</span>
                <h3>{form.listingTitle || "Titel van de advertentie"}</h3>
                <p>
                  {form.description ||
                    "Voeg een beschrijving toe om kopers duidelijkheid te geven over kwaliteit, opslag, verzending en fokvoorwaarden."}
                </p>

                <div className={styles.previewMetaRow}>
                  <span>{form.breed || "Ras onbekend"}</span>
                  <span>{form.freshFrozen === "vers" ? "Vers" : "Bevroren"}</span>
                  <span>{form.location || "Locatie onbekend"}</span>
                </div>
              </div>
            </div>

            <div className={styles.previewGrid}>
              <div className={styles.previewCard}>
                <h4>Kerngegevens</h4>
                <PreviewRow label="Hengstnaam" value={form.stallionName} />
                <PreviewRow label="Sperma-ID" value={form.semenId} />
                <PreviewRow label="Collectietype" value={form.collectionType || "Nog niet ingevuld"} />
                <PreviewRow label="Aantal doses" value={form.quantity} />
                <PreviewRow label="Motiliteit / kwaliteit" value={form.motility} />
                <PreviewRow label="Collectiedatum" value={form.collectionDate || "Nog niet ingevuld"} />
                <PreviewRow label="Stamboek / register" value={form.registry} />
                <PreviewRow label="Pedigree URL" value={form.pedigreeUrl} />
              </div>

              <div className={styles.previewCard}>
                <h4>Media & documenten</h4>
                <PreviewRow label="Hoofdafbeelding" value={uploads.mainImages || "Nog niet geüpload"} />
                <PreviewRow label="Pedigree documenten" value={uploads.pedigreeDocuments || "Nog niet geüpload"} />
                <PreviewRow label="Gezondheid / fokcertificaten" value={uploads.healthCertificates || "Nog niet geüpload"} />
                <PreviewRow label="Kwaliteitsanalyse" value={uploads.qualityAnalysis || "Nog niet geüpload"} />
                <PreviewRow label="Overige documenten" value={uploads.supportingDocuments || "Nog niet geüpload"} />
                <PreviewRow label="Video URL" value={form.videoUrl || "Geen video toegevoegd"} />
                <PreviewRow label="Totaal uploads" value={`${filledUploadCount} bestand(en)`} />
              </div>

              <div className={styles.previewCard}>
                <h4>Verkoper & publicatie</h4>
                <PreviewRow label="Naam" value={form.fullName} />
                <PreviewRow label="E-mail" value={form.email} />
                <PreviewRow label="Telefoon" value={form.phone} />
                <PreviewRow label="Bedrijf" value={form.companyName} />
                <PreviewRow label="Adres" value={form.fullAddress} />
                <PreviewRow label="Startbod" value={`${form.currency} ${form.startingBid || "0"}`} />
              </div>
            </div>
          </section>

          <div className={styles.wizardActions}>
            <button type="button" className={styles.secondaryStepButton} onClick={goPrev}>
              <ArrowLeft size={18} strokeWidth={2} />
              Terug naar informatie
            </button>

            <button type="button" className={styles.primaryStepButton} onClick={goNext}>
              Doorgaan naar betaling
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </>
      ) : null}

      {currentStep === 3 ? (
        <>
          <section className={styles.pricingCard}>
            <div className={styles.pricingBlock}>
              <SectionHeading number="03" title="Prijs & betalingsopties" />

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
                    onChange={(event) => updateField("currency", event.target.value)}
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
                <h3>Optionele crypto-afwikkeling buiten platform</h3>

                <button
                  type="button"
                  className={`${styles.toggle} ${cryptoEnabled ? styles.toggleActive : ""}`}
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
                      <label htmlFor="cryptoCurrency">Geaccepteerde cryptovaluta</label>
                      <select
                        id="cryptoCurrency"
                        value={form.cryptoCurrency}
                        onChange={(event) => updateField("cryptoCurrency", event.target.value)}
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
                        onChange={(event) => updateField("blockchainNetwork", event.target.value)}
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
                <label htmlFor="settlementInstructions">Afwikkelingsinstructies</label>
                <textarea
                  id="settlementInstructions"
                  rows={4}
                  value={form.settlementInstructions}
                  onChange={(event) => updateField("settlementInstructions", event.target.value)}
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
              <h3>Samenvatting publicatiekosten</h3>

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
                onChange={(event) => setConfirmedAccurate(event.target.checked)}
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
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <span>
                Ik ga akkoord met de verkopersvoorwaarden en het commissiebeleid
                van de marktplaats.
              </span>
            </label>
          </div>

          <div className={styles.wizardActions}>
            <button type="button" className={styles.secondaryStepButton} onClick={goPrev}>
              <ArrowLeft size={18} strokeWidth={2} />
              Terug naar voorbeeld
            </button>

            <button
              type="button"
              className={styles.primaryStepButton}
              disabled={!confirmedAccurate || !acceptedTerms}
            >
              <CheckCircle2 size={18} strokeWidth={2} />
              Controleren & doorgaan naar betaling
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function WizardSteps({
  currentStep,
  onStepClick,
}: {
  currentStep: WizardStep;
  onStepClick: (step: WizardStep) => void;
}) {
  return (
    <div className={styles.stepsShell}>
      <div className={styles.stepsTopRow}>
        <span className={styles.stepsCount}>{`Stap ${String(currentStep).padStart(2, "0")} / 03`}</span>
        <span className={styles.stepsStatus}>Bezig</span>
      </div>

      <div className={styles.stepsTrack}>
        {steps.map((item) => {
          const isActive = item.step === currentStep;
          const isCompleted = item.step < currentStep;

          return (
            <button
              key={item.step}
              type="button"
              className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ""} ${isCompleted ? styles.stepItemCompleted : ""}`}
              onClick={() => onStepClick(item.step)}
            >
              <span className={styles.stepLine} />
              <span className={styles.stepLabel}>{item.label}</span>
            </button>
          );
        })}
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

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.previewRow}>
      <span>{label}</span>
      <strong>{value}</strong>
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
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
