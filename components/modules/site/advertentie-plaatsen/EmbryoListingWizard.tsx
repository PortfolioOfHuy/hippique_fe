"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CirclePlay,
  FileText,
  Heart,
  ImageIcon,
  Share2,
  ShieldCheck,
} from "lucide-react";
import styles from "./EmbryoListingWizard.module.scss";

type EmbryoFormState = {
  savedAddress: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  fullAddress: string;

  listingTitle: string;
  embryoId: string;
  sire: string;
  dam: string;
  breed: string;
  embryoStage: string;
  expectedBirthDate: string;
  collectionTransferDate: string;
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
  | "pedigreeDocs"
  | "vetBreedingCerts"
  | "transferRegDocs";

type UploadState = Record<UploadKey, string | null>;
type WizardStep = 1 | 2 | 3;

const initialForm: EmbryoFormState = {
  savedAddress: "Main Stable - 123 Equestrian Lane...",
  fullName: "John Doe",
  email: "seller@example.com",
  phone: "+1 555-0123",
  companyName: "Majestic Stables",
  fullAddress: "123 Equestrian Lane, City, Country",

  listingTitle: "Elite embryo: vader x moeder",
  embryoId: "EMB-2024-001",
  sire: "Chacco Blue",
  dam: "Ratina Z",
  breed: "KWPN",
  embryoStage: "ICSI embryo (bevroren)",
  expectedBirthDate: "",
  collectionTransferDate: "",
  registry: "KWPN",
  location: "Ermelo, Nederland",
  pedigreeUrl: "https://www.horsetelex.com/...",
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
    key: "pedigreeDocs",
    title: "Pedigree documenten",
    description: "Afstamming van vader en moeder",
  },
  {
    key: "vetBreedingCerts",
    title: "Dierenarts / fokcertificaten",
    description: "Embryo- en fokgerelateerde documenten",
  },
  {
    key: "transferRegDocs",
    title: "Transfer / registratiedocumenten",
    description: "Overdracht en registratie",
  },
];

const steps = [
  { step: 1 as WizardStep, label: "Informatie & media" },
  { step: 2 as WizardStep, label: "Voorbeeld" },
  { step: 3 as WizardStep, label: "Betaling" },
];

function formatEuroDetailed(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function EmbryoListingWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [form, setForm] = useState<EmbryoFormState>(initialForm);
  const [cryptoEnabled, setCryptoEnabled] = useState(true);
  const [confirmedAccurate, setConfirmedAccurate] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [uploads, setUploads] = useState<UploadState>({
    mainImages: null,
    pedigreeDocs: null,
    vetBreedingCerts: null,
    transferRegDocs: null,
  });

  function updateField<K extends keyof EmbryoFormState>(
    key: K,
    value: EmbryoFormState[K],
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

    if (key === "mainImages" && file.type.startsWith("image/")) {
      setMainImagePreview(URL.createObjectURL(file));
    }
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

  const completion = useMemo(() => {
    const fields = [
      form.listingTitle,
      form.embryoId,
      form.sire,
      form.dam,
      form.breed,
      form.embryoStage,
      form.registry,
      form.location,
      form.startingBid,
    ];

    const completed = fields.filter((item) => item.trim() !== "").length;
    return Math.round((completed / fields.length) * 100);
  }, [
    form.breed,
    form.dam,
    form.embryoId,
    form.embryoStage,
    form.listingTitle,
    form.location,
    form.registry,
    form.sire,
    form.startingBid,
  ]);

  const previewTitle = form.listingTitle.trim() || "Elite embryo: vader x moeder";
  const previewBreed = form.breed.trim() || "KWPN";
  const previewRegistry = form.registry.trim() || "KWPN";
  const previewLocation = form.location.trim() || "Ermelo, Nederland";
  const previewStage = form.embryoStage.trim() || "ICSI embryo";
  const previewSire = form.sire.trim() || "Chacco Blue";
  const previewDam = form.dam.trim() || "Ratina Z";
  const previewBid = form.startingBid.trim()
    ? `${form.currency} ${form.startingBid}`
    : `${form.currency} 0`;

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
                label="Embryo-ID / registratienummer"
                value={form.embryoId}
                onChange={(value) => updateField("embryoId", value)}
              />

              <TextField
                label="Vader"
                value={form.sire}
                onChange={(value) => updateField("sire", value)}
              />

              <TextField
                label="Moeder"
                value={form.dam}
                onChange={(value) => updateField("dam", value)}
              />

              <TextField
                label="Ras"
                value={form.breed}
                onChange={(value) => updateField("breed", value)}
              />

              <div className={styles.field}>
                <label htmlFor="embryoStage">Embryostadium</label>
                <select
                  id="embryoStage"
                  value={form.embryoStage}
                  onChange={(event) =>
                    updateField("embryoStage", event.target.value)
                  }
                >
                  <option>ICSI embryo (bevroren)</option>
                  <option>ET embryo</option>
                  <option>Vers embryo</option>
                  <option>Bevroren embryo</option>
                </select>
              </div>

              <TextField
                label="Verwachte geboortedatum"
                value={form.expectedBirthDate}
                type="date"
                onChange={(value) => updateField("expectedBirthDate", value)}
              />

              <TextField
                label="Collectie- / transferdatum"
                value={form.collectionTransferDate}
                type="date"
                onChange={(value) =>
                  updateField("collectionTransferDate", value)
                }
              />

              <div className={styles.field}>
                <label htmlFor="registry">Stamboek / register</label>
                <select
                  id="registry"
                  value={form.registry}
                  onChange={(event) => updateField("registry", event.target.value)}
                >
                  <option>KWPN</option>
                  <option>Hippique</option>
                  <option>Oldenburger</option>
                  <option>Hannoveraner</option>
                </select>
              </div>

              <TextField
                label="Locatie"
                value={form.location}
                onChange={(value) => updateField("location", value)}
              />

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="pedigreeUrl">Pedigree URL</label>
                <input
                  id="pedigreeUrl"
                  value={form.pedigreeUrl}
                  onChange={(event) =>
                    updateField("pedigreeUrl", event.target.value)
                  }
                />
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="description">Beschrijving / foknotities</label>
                <textarea
                  id="description"
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Details over de prestaties van de moeder, nakomelingen van de vader en gezondheid van het embryo..."
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

                {mainImagePreview ? (
                  <img
                    src={mainImagePreview}
                    alt="Hoofdafbeelding preview"
                    className={styles.mainUploadPreview}
                  />
                ) : (
                  <>
                    <ImageIcon size={34} strokeWidth={1.8} />
                    <strong>Hoofdafbeelding & galerij</strong>
                    <span>
                      Upload beelden met hoge resolutie van vader, moeder of het
                      certificaat van het embryo.
                    </span>
                  </>
                )}

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
              Vul eerst de informatie en media in voordat je het voorbeeld
              controleert.
            </div>

            <button
              type="button"
              className={styles.primaryStepButton}
              onClick={goNext}
            >
              Doorgaan naar voorbeeld
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>
        </>
      ) : null}

      {currentStep === 2 ? (
        <>
          <section className={styles.previewPage}>
            <div className={styles.previewAuctionBar}>
              <div className={styles.previewAuctionLeft}>
                <div className={styles.previewAuctionMeta}>
                  <span className={styles.previewLiveBadge}>Preview</span>
                  <span className={styles.previewEventCode}>
                    Event-ID: DRAFT-EMBRYO
                  </span>
                </div>

                <div>
                  <h3 className={styles.previewCollectionTitle}>
                    De Premium Embryo Collectie
                  </h3>

                  <p className={styles.previewCollectionSubtitle}>
                    Dit is een voorbeeld van hoe je embryo-advertentie eruitziet
                    op de veilingdetailpagina.
                  </p>
                </div>
              </div>

              <div className={styles.previewAuctionRight}>
                <div className={styles.previewStatBox}>
                  <span>Veiling eindigt over</span>
                  <strong>14d 08u 22m</strong>
                </div>

                <div className={styles.previewStatBox}>
                  <span>Compleet</span>
                  <strong>{completion}%</strong>
                </div>
              </div>
            </div>

            <div className={styles.previewTopNav}>
              <span>← Terug naar collectie</span>

              <div className={styles.previewTopNavRight}>
                <span>{form.embryoId || "Embryo #01"}</span>
                <span>Biedperiode · Draft preview</span>
                <span>Volgende embryo →</span>
              </div>
            </div>

            <div className={styles.previewHeroGrid}>
              <div className={styles.previewMainColumn}>
                <div className={styles.previewTitleRow}>
                  <div>
                    <h3 className={styles.previewHorseTitle}>{previewTitle}</h3>

                    <p className={styles.previewHorseSubtitle}>
                      {previewSire} x {previewDam} · {previewStage}
                    </p>
                  </div>

                  <div className={styles.previewTitleActions}>
                    <button type="button" aria-label="Favoriet">
                      <Heart size={17} strokeWidth={2.2} />
                    </button>

                    <button type="button" aria-label="Delen">
                      <Share2 size={17} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>

                <div className={styles.previewGallery}>
                  <div className={styles.previewMainImageWrap}>
                    {mainImagePreview ? (
                      <img
                        src={mainImagePreview}
                        alt={previewTitle}
                        className={styles.previewImage}
                      />
                    ) : (
                      <div className={styles.previewImagePlaceholder}>
                        <ImageIcon size={38} strokeWidth={1.8} />
                        <strong>Hoofdafbeelding preview</strong>
                        <span>Upload een hoofdafbeelding in stap 1</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.previewSideImages}>
                    {[uploads.pedigreeDocs, uploads.vetBreedingCerts].map(
                      (item, index) => (
                        <div
                          key={`${item ?? "doc"}-${index}`}
                          className={styles.previewSideImageWrap}
                        >
                          <div className={styles.previewSmallPlaceholder}>
                            <FileText size={22} strokeWidth={1.8} />
                            <span>{item || "Document"}</span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className={styles.previewSpecPanel}>
                  <div>
                    <span>Embryo-ID</span>
                    <strong>{form.embryoId || "Nog niet ingevuld"}</strong>
                  </div>

                  <div>
                    <span>Vader</span>
                    <strong>{previewSire}</strong>
                  </div>

                  <div>
                    <span>Moeder</span>
                    <strong>{previewDam}</strong>
                  </div>

                  <div>
                    <span>Stamboek</span>
                    <strong>{previewRegistry}</strong>
                  </div>

                  <div>
                    <span>Stadium</span>
                    <strong>{previewStage}</strong>
                  </div>

                  <div>
                    <span>Locatie</span>
                    <strong>{previewLocation}</strong>
                  </div>
                </div>
              </div>

              <aside className={styles.previewSidebar}>
                <div className={styles.previewBidCard}>
                  <div className={styles.previewBidHeader}>
                    <div>
                      <span>Startbod</span>
                      <strong>{previewBid}</strong>
                    </div>

                    <em>Bieden actief</em>
                  </div>

                  <div className={styles.previewMinimumBid}>
                    <span>Volgend minimumbod</span>
                    <strong>{previewBid}</strong>
                  </div>

                  <div className={styles.previewBidInput}>Voer biedbedrag in</div>

                  <div className={styles.previewQuickBids}>
                    <button type="button">+ 500</button>
                    <button type="button">+ 1.000</button>
                    <button type="button">+ 5.000</button>
                  </div>

                  <button type="button" className={styles.previewPrimaryBid}>
                    Plaats bod nu
                  </button>

                  <button type="button" className={styles.previewSecondaryBid}>
                    Vraag documentatie aan
                  </button>

                  <p>*Door te bieden ga je akkoord met de veilingvoorwaarden.</p>
                </div>

                <div className={styles.previewActivityCard}>
                  <div className={styles.previewActivityTop}>
                    Je hebt nog geen bod geplaatst
                  </div>

                  <h4>Recente biedactiviteit</h4>

                  <div className={styles.previewActivityList}>
                    <div>
                      <span>
                        <strong>Bieder #712</strong>
                        <small>2 min geleden</small>
                      </span>
                      <strong>{previewBid}</strong>
                    </div>

                    <div>
                      <span>
                        <strong>Bieder #104</strong>
                        <small>5 min geleden</small>
                      </span>
                      <strong>{form.currency} 4.800</strong>
                    </div>

                    <div>
                      <span>
                        <strong>Bieder #889</strong>
                        <small>12 min geleden</small>
                      </span>
                      <strong>{form.currency} 4.500</strong>
                    </div>
                  </div>

                  <button type="button">Bekijk alle biedingen</button>
                </div>
              </aside>
            </div>

            <section className={styles.previewSectionBlock}>
              <h3>Foknotities & beschrijving</h3>

              <p>
                {form.description.trim() ||
                  `${previewTitle} is een veelbelovend embryo met een sterke combinatie van vader- en moederlijn. Voeg in stap 1 een beschrijving toe om kopers meer inzicht te geven in fokwaarde, genetische kwaliteit en documentatie.`}
              </p>

              <div className={styles.previewVideoCard}>
                {mainImagePreview ? (
                  <img src={mainImagePreview} alt={previewTitle} />
                ) : null}

                <div className={styles.previewVideoOverlay}>
                  <CirclePlay size={44} strokeWidth={1.8} />
                  <span>
                    {form.videoUrl.trim()
                      ? "Videopreview beschikbaar"
                      : "Embryo presentatievideo"}
                  </span>
                </div>
              </div>
            </section>

            <section className={styles.previewSectionBlock}>
              <div className={styles.previewDecorTitle}>
                <span />
                <h3>Bloedlijn & genetische waarde</h3>
              </div>

              <div className={styles.previewTextGrid}>
                <div>
                  <h4>Vaderlijn</h4>
                  <p>
                    {previewSire} staat bekend om sportkwaliteit, vermogen en
                    sterke genetische vererving.
                  </p>
                </div>

                <div>
                  <h4>Moederlijn</h4>
                  <p>
                    {previewDam} biedt een sterke basis voor fokwaarde,
                    atletisch vermogen en commerciële aantrekkelijkheid.
                  </p>
                </div>

                <div>
                  <h4>Embryostadium</h4>
                  <p>
                    {previewStage} ·{" "}
                    {form.expectedBirthDate
                      ? `verwachte geboortedatum: ${form.expectedBirthDate}.`
                      : "verwachte geboortedatum nog niet ingevuld."}
                  </p>
                </div>

                <div>
                  <h4>Registratie</h4>
                  <p>
                    {previewRegistry} ·{" "}
                    {form.pedigreeUrl
                      ? `Pedigree beschikbaar via ${form.pedigreeUrl}`
                      : "voeg een pedigree URL toe voor meer vertrouwen."}
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.previewSectionBlock}>
              <h3>Documentatie & rapporten</h3>

              <div className={styles.previewDocumentList}>
                <div>
                  <span>Hoofdafbeelding</span>
                  <strong>{uploads.mainImages || "Nog niet toegevoegd"}</strong>
                </div>

                <div>
                  <span>Pedigree documenten</span>
                  <strong>{uploads.pedigreeDocs || "Nog niet toegevoegd"}</strong>
                </div>

                <div>
                  <span>Dierenarts / fokcertificaten</span>
                  <strong>
                    {uploads.vetBreedingCerts || "Nog niet toegevoegd"}
                  </strong>
                </div>

                <div>
                  <span>Transfer / registratiedocumenten</span>
                  <strong>{uploads.transferRegDocs || "Nog niet toegevoegd"}</strong>
                </div>
              </div>
            </section>

            <section className={styles.previewSectionBlock}>
              <div className={styles.previewDecorTitle}>
                <span />
                <h3>Pedigree & afstamming</h3>
              </div>

              <div className={styles.previewPedigreePanel}>
                <div>
                  <span>Vader</span>
                  <strong>{previewSire}</strong>
                  <small>{previewBreed}</small>
                </div>

                <div>
                  <span>Moeder</span>
                  <strong>{previewDam}</strong>
                  <small>{previewBreed}</small>
                </div>

                <div>
                  <strong>Chacco Blue</strong>
                  <strong>Baloubet du Rouet</strong>
                  <strong>Heartbreaker</strong>
                  <strong>Ratina Z</strong>
                </div>

                <div>
                  <strong>Carthago Z</strong>
                  <strong>Quidam de Revel</strong>
                  <strong>Nabab de Reve</strong>
                  <strong>Diamant de Semilly</strong>
                </div>
              </div>
            </section>
          </section>

          <div className={styles.wizardActions}>
            <button
              type="button"
              className={styles.secondaryStepButton}
              onClick={goPrev}
            >
              <ArrowLeft size={18} strokeWidth={2} />
              Terug naar informatie
            </button>

            <button
              type="button"
              className={styles.primaryStepButton}
              onClick={goNext}
            >
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
                  label="Startbod / vraagprijs"
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
                      <label htmlFor="cryptoCurrency">
                        Geaccepteerde cryptovaluta
                      </label>
                      <select
                        id="cryptoCurrency"
                        value={form.cryptoCurrency}
                        onChange={(event) =>
                          updateField("cryptoCurrency", event.target.value)
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
                        onChange={(event) =>
                          updateField("blockchainNetwork", event.target.value)
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
                  onChange={(event) =>
                    updateField("settlementInstructions", event.target.value)
                  }
                  placeholder="Voorbeeld: vermeld het listingreferentienummer in de overschrijvingsnotities..."
                />
              </div>

              <div className={styles.warningBox}>
                <AlertTriangle size={22} strokeWidth={2} />
                <p>
                  Het platform verwerkt geen koper-naar-verkoperbetalingen.
                  Eventuele crypto-afwikkeling wordt rechtstreeks tussen koper en
                  verkoper buiten het platform geregeld.
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
                  <strong>{formatEuroDetailed(baseFee)}</strong>
                </div>

                <div>
                  <span>Optionele crypto servicekosten</span>
                  <strong>{formatEuroDetailed(cryptoFee)}</strong>
                </div>

                <div className={styles.totalRow}>
                  <span>Totaal nu te betalen</span>
                  <strong>{formatEuroDetailed(totalDue)}</strong>
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
            <button
              type="button"
              className={styles.secondaryStepButton}
              onClick={goPrev}
            >
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
        <span className={styles.stepsCount}>{`Stap ${String(currentStep).padStart(
          2,
          "0",
        )} / 03`}</span>
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
              className={`${styles.stepItem} ${
                isActive ? styles.stepItemActive : ""
              } ${isCompleted ? styles.stepItemCompleted : ""}`}
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
