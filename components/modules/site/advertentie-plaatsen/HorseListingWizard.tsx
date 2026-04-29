"use client";

import { ChangeEvent, ReactNode, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgePlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  CreditCard,
  FileBadge2,
  FileCheck2,
  HeartPulse,
  ImagePlus,
  ShieldCheck,
  Stethoscope,
  Upload,
  Wallet,
} from "lucide-react";
import styles from "./HorseListingWizard.module.scss";

type Step = 1 | 2 | 3;

export type HorseListingType = "paard" | "jonge-paarden" | "elite-paarden";

export type RelistData = {
  mode: "relist";
  sourceAuctionId: string;
  title: string;
  subtitle: string;
  lotCode: string;
  originalPrice: number;
  startPrice: number;
};

type HorseListingWizardProps = {
  type?: HorseListingType;
  relistData?: RelistData | null;
};

type HorseListingContent = {
  title: string;
  stepOneLabel: string;
  typeLabel: string;
  introLabel: string;
  nameLabel: string;
  namePlaceholder: string;
};

type HorseFormState = {
  horseName: string;
  breed: string;
  birthYear: string;
  gender: string;
  height: string;
  color: string;
  discipline: string;
  location: string;
  performanceNotes: string;
  registrationNumber: string;
  ueln: string;
  videoUrl: string;
  curatorNote: string;
  startingBid: string;
  currency: string;
  sourceAuctionId: string;
};

type DocumentKey =
  | "vetCheck"
  | "xrayReports"
  | "healthReport"
  | "horsePassport";

type DocumentState = Record<DocumentKey, string | null>;

const horseListingContent: Record<HorseListingType, HorseListingContent> = {
  paard: {
    title: "Plaats een paard in de veiling",
    stepOneLabel: "Stap 1: informatie & media",
    typeLabel: "Paard",
    introLabel: "Essentiële identiteit",
    nameLabel: "Paardnaam / titel",
    namePlaceholder: "bijv. Vallegro’s Legacy",
  },
  "jonge-paarden": {
    title: "Plaats een jong paard in de veiling",
    stepOneLabel: "Stap 1: informatie & media voor jong paard",
    typeLabel: "Jonge paarden",
    introLabel: "Identiteit & potentieel",
    nameLabel: "Naam / titel jong paard",
    namePlaceholder: "bijv. Future Diamond",
  },
  "elite-paarden": {
    title: "Plaats een elitepaard in de veiling",
    stepOneLabel: "Stap 1: informatie & media voor elitepaard",
    typeLabel: "Elite paarden",
    introLabel: "Premium identiteit",
    nameLabel: "Elitepaard naam / titel",
    namePlaceholder: "bijv. Royal Champion Z",
  },
};

const documentMeta: Array<{
  key: DocumentKey;
  title: string;
  subtitle: string;
  icon: ReactNode;
}> = [
  {
    key: "vetCheck",
    title: "Veterinaire controle",
    subtitle: "Klinisch onderzoek",
    icon: <Stethoscope size={18} strokeWidth={2} />,
  },
  {
    key: "xrayReports",
    title: "Röntgenrapporten",
    subtitle: "Digitale opnames",
    icon: <ShieldCheck size={18} strokeWidth={2} />,
  },
  {
    key: "healthReport",
    title: "Gezondheidsrapport",
    subtitle: "Medische historie",
    icon: <HeartPulse size={18} strokeWidth={2} />,
  },
  {
    key: "horsePassport",
    title: "Paardenpaspoort",
    subtitle: "Identificatiedocument",
    icon: <FileBadge2 size={18} strokeWidth={2} />,
  },
];

function createInitialForm(relistData?: RelistData | null): HorseFormState {
  return {
    horseName: relistData?.title ?? "",
    breed: "",
    birthYear: "",
    gender: "hengst",
    height: "",
    color: "",
    discipline: "dressuur",
    location: "",
    performanceNotes: relistData?.subtitle ?? "",
    registrationNumber: "",
    ueln: "",
    videoUrl: "",
    curatorNote: relistData
      ? `Deze vermelding is opnieuw aangeboden na een veiling zonder winnaar. De startprijs is automatisch met 10% verlaagd.`
      : "",
    startingBid: relistData?.startPrice ? String(relistData.startPrice) : "",
    currency: "EUR",
    sourceAuctionId: relistData?.sourceAuctionId ?? "",
  };
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatEuroDetailed(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function HorseListingWizard({
  type = "paard",
  relistData = null,
}: HorseListingWizardProps) {
  const content = horseListingContent[type];

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<HorseFormState>(() =>
    createInitialForm(relistData),
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [documents, setDocuments] = useState<DocumentState>({
    vetCheck: null,
    xrayReports: null,
    healthReport: null,
    horsePassport: null,
  });

  const [enableCryptoSettlement, setEnableCryptoSettlement] = useState(false);
  const [acceptedCryptoCurrency, setAcceptedCryptoCurrency] =
    useState("USDT (Tether)");
  const [blockchainNetwork, setBlockchainNetwork] = useState(
    "ERC-20 (Ethereum)",
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [walletLabel, setWalletLabel] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [confirmInformation, setConfirmInformation] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isRelistMode = relistData?.mode === "relist";

  const listingFee = 50;
  const cryptoServiceFee = enableCryptoSettlement ? 10 : 0;
  const totalDueNow = listingFee + cryptoServiceFee;
  const canProceedToCheckout = confirmInformation && acceptTerms;

  function updateField<K extends keyof HorseFormState>(
    key: K,
    value: HorseFormState[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setCoverPreview(URL.createObjectURL(file));
  }

  function handleGalleryChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const previews = files.slice(0, 4).map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  }

  function handleDocumentUpload(
    key: DocumentKey,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setDocuments((prev) => ({
      ...prev,
      [key]: file.name,
    }));
  }

  function goToPreviousStep() {
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  }

  function goToNextStep() {
    setStep((prev) => (prev < 3 ? ((prev + 1) as Step) : prev));
  }

  const completion = useMemo(() => {
    const fields = [
      form.horseName,
      form.breed,
      form.birthYear,
      form.gender,
      form.height,
      form.color,
      form.discipline,
      form.location,
      form.startingBid,
    ];

    const completed = fields.filter((item) => item.trim() !== "").length;
    return Math.round((completed / fields.length) * 100);
  }, [
    form.breed,
    form.birthYear,
    form.color,
    form.discipline,
    form.gender,
    form.height,
    form.horseName,
    form.location,
    form.startingBid,
  ]);

  const previewTitle = form.horseName.trim() || "Royal Champion Z";
  const previewBreed = form.breed.trim() || "KWPN";
  const previewBirthYear = form.birthYear.trim() || "2018";
  const previewHeight = form.height.trim() || "16.2";
  const previewColor = form.color.trim() || "Bruin";
  const previewLocation = form.location.trim() || "Wellington, FL";
  const previewDiscipline = form.discipline.trim() || "Dressuur";
  const previewBid = form.startingBid.trim()
    ? `${form.currency} ${form.startingBid}`
    : `${form.currency} 50.000`;
  const previewMainImage = coverPreview || galleryPreviews[0] || null;
  const previewGalleryImages = galleryPreviews.length > 0 ? galleryPreviews : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.topMeta}>
        <span>Stap {String(step).padStart(2, "0")} / 03</span>
        <strong>{isRelistMode ? "Opnieuw aanbieden" : "Bezig"}</strong>
      </div>

      {isRelistMode ? (
        <div className={styles.relistInlineNotice}>
          <strong>Opnieuw aanbieden na veiling zonder winnaar</strong>
          <span>
            De startprijs is automatisch verlaagd van{" "}
            {formatEuro(relistData.originalPrice)} naar{" "}
            {formatEuro(relistData.startPrice)}. Je kunt de gegevens hieronder
            nog aanpassen voordat je de plaatsing opnieuw aanvraagt.
          </span>
        </div>
      ) : null}

      <div className={styles.progressNav}>
        <button
          type="button"
          className={`${styles.progressStep} ${
            step === 1 ? styles.progressStepActive : ""
          } ${step > 1 ? styles.progressStepDone : ""}`}
          onClick={() => setStep(1)}
        >
          <span className={styles.progressLine} />
          <small>Informatie & media</small>
        </button>

        <button
          type="button"
          className={`${styles.progressStep} ${
            step === 2 ? styles.progressStepActive : ""
          } ${step > 2 ? styles.progressStepDone : ""}`}
          onClick={() => setStep(2)}
        >
          <span className={styles.progressLine} />
          <small>Voorbeeld</small>
        </button>

        <button
          type="button"
          className={`${styles.progressStep} ${
            step === 3 ? styles.progressStepActive : ""
          }`}
          onClick={() => setStep(3)}
        >
          <span className={styles.progressLine} />
          <small>Betaling</small>
        </button>
      </div>

      <div className={styles.heading}>
        <h2>{content.title}</h2>
        <p>
          {step === 1 && content.stepOneLabel}
          {step === 2 && "Stap 2: voorbeeld van je veilingpagina"}
          {step === 3 && "Stap 3: betaling en afronding"}
        </p>
      </div>

      {step === 1 ? (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Basisinformatie</h3>
              <span>{content.introLabel}</span>
            </div>

            {isRelistMode ? (
              <input
                type="hidden"
                name="sourceAuctionId"
                value={form.sourceAuctionId}
              />
            ) : null}

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <label htmlFor="horseName">{content.nameLabel}</label>
                <input
                  id="horseName"
                  value={form.horseName}
                  onChange={(e) => updateField("horseName", e.target.value)}
                  placeholder={content.namePlaceholder}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="breed">Ras</label>
                <input
                  id="breed"
                  value={form.breed}
                  onChange={(e) => updateField("breed", e.target.value)}
                  placeholder="bijv. KWPN"
                />
              </div>
            </div>

            <div className={styles.formGridFour}>
              <div className={styles.field}>
                <label htmlFor="birthYear">Geboortejaar</label>
                <input
                  id="birthYear"
                  value={form.birthYear}
                  onChange={(e) => updateField("birthYear", e.target.value)}
                  placeholder="2018"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="gender">Geslacht</label>
                <select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="hengst">Hengst</option>
                  <option value="merrie">Merrie</option>
                  <option value="ruin">Ruin</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="height">Hoogte (hh)</label>
                <input
                  id="height"
                  value={form.height}
                  onChange={(e) => updateField("height", e.target.value)}
                  placeholder="16.2"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="color">Kleur</label>
                <input
                  id="color"
                  value={form.color}
                  onChange={(e) => updateField("color", e.target.value)}
                  placeholder="Bruin"
                />
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <label htmlFor="discipline">Primaire discipline</label>
                <select
                  id="discipline"
                  value={form.discipline}
                  onChange={(e) => updateField("discipline", e.target.value)}
                >
                  <option value="dressuur">Dressuur</option>
                  <option value="springen">Springen</option>
                  <option value="eventing">Eventing</option>
                  <option value="fokkerij">Fokkerij</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="location">Huidige locatie</label>
                <input
                  id="location"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="bijv. Wellington, FL"
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Bloedlijn & prestaties</h3>
              <span>Carrièrehoogtepunten</span>
            </div>

            <div className={styles.field}>
              <label htmlFor="performanceNotes">
                Wedstrijdhistorie & prestatienotities
              </label>
              <textarea
                id="performanceNotes"
                rows={7}
                value={form.performanceNotes}
                onChange={(e) => updateField("performanceNotes", e.target.value)}
                placeholder="Beschrijf belangrijke wedstrijden, prestaties, opvallende kwaliteiten of aanvullende notities..."
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Afstamming & herkomst</h3>
              <span>Genetische achtergrond</span>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <label htmlFor="registrationNumber">Registratienummer</label>
                <input
                  id="registrationNumber"
                  value={form.registrationNumber}
                  onChange={(e) =>
                    updateField("registrationNumber", e.target.value)
                  }
                  placeholder="bijv. KWPN 528.003.000"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="ueln">UELN</label>
                <input
                  id="ueln"
                  value={form.ueln}
                  onChange={(e) => updateField("ueln", e.target.value)}
                  placeholder="bijv. 5280032014102345"
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Visuele media</h3>
              <span>Galerij & film</span>
            </div>

            <div className={styles.mediaLayout}>
              <div className={styles.coverBlock}>
                <label className={styles.mediaLabel}>Omslagfoto</label>

                <label className={styles.coverTile}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />

                  {coverPreview ? (
                    <img src={coverPreview} alt="Omslagpreview" />
                  ) : (
                    <div className={styles.emptyMedia}>
                      <ImagePlus size={28} strokeWidth={2} />
                      <strong>Omslagfoto uploaden</strong>
                      <span>Voeg een hoofdafbeelding toe</span>
                    </div>
                  )}

                  <span className={styles.coverBadge}>Omslagfoto</span>
                </label>
              </div>

              <div className={styles.galleryBlock}>
                <label className={styles.mediaLabel}>Galerij</label>

                <div className={styles.galleryGrid}>
                  {galleryPreviews.map((preview, index) => (
                    <div
                      key={`${preview}-${index}`}
                      className={styles.galleryTile}
                    >
                      <img src={preview} alt={`Galerij ${index + 1}`} />
                    </div>
                  ))}

                  {Array.from({
                    length: Math.max(1, 4 - galleryPreviews.length),
                  }).map((_, index) => (
                    <label key={index} className={styles.uploadTile}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple={index === 0}
                        onChange={handleGalleryChange}
                      />
                      <BadgePlus size={22} strokeWidth={2} />
                      <span>Afbeelding toevoegen</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.mediaRowTwo}>
              <div className={styles.field}>
                <label htmlFor="videoUrl">YouTube / videolink</label>
                <input
                  id="videoUrl"
                  value={form.videoUrl}
                  onChange={(e) => updateField("videoUrl", e.target.value)}
                  placeholder="https://youtube.com/..."
                />

                <div className={styles.videoPreview}>
                  <div className={styles.videoPlay}>
                    <CirclePlay size={32} strokeWidth={2} />
                  </div>

                  <div className={styles.videoText}>
                    <strong>Videopreview</strong>
                    <span>
                      {form.videoUrl.trim() !== ""
                        ? form.videoUrl
                        : "Voeg een videolink toe om de presentatie compleet te maken."}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="curatorNote">Curatornotitie / beoordeling</label>
                <textarea
                  id="curatorNote"
                  rows={7}
                  value={form.curatorNote}
                  onChange={(e) => updateField("curatorNote", e.target.value)}
                  placeholder="Schrijf een professionele beoordeling over het potentieel, de kwaliteit en de pedigree van het paard..."
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Documentatie</h3>
              <span>Certificaten & rapporten</span>
            </div>

            <div className={styles.documentsGrid}>
              {documentMeta.map((doc) => (
                <label key={doc.key} className={styles.documentCard}>
                  <input
                    type="file"
                    onChange={(event) => handleDocumentUpload(doc.key, event)}
                  />

                  <div className={styles.documentIcon}>{doc.icon}</div>

                  <div className={styles.documentInfo}>
                    <strong>{doc.title}</strong>
                    <span>{doc.subtitle}</span>

                    {documents[doc.key] ? (
                      <em>{documents[doc.key]}</em>
                    ) : (
                      <em>Bestand uploaden</em>
                    )}
                  </div>

                  <Upload
                    size={18}
                    strokeWidth={2}
                    className={styles.documentUpload}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Veilingprijs</h3>
              <span>Financiële details</span>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <label htmlFor="startingBid">
                  {isRelistMode ? "Nieuw startbod" : "Startbod"}
                </label>
                <input
                  id="startingBid"
                  value={form.startingBid}
                  onChange={(e) => updateField("startingBid", e.target.value)}
                  placeholder="bijv. 50000"
                />

                {isRelistMode ? (
                  <small className={styles.fieldHint}>
                    Eerder startbod: {formatEuro(relistData.originalPrice)} ·
                    Nieuw startbod: {formatEuro(relistData.startPrice)}
                  </small>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="currency">Valuta</label>
                <select
                  id="currency"
                  value={form.currency}
                  onChange={(e) => updateField("currency", e.target.value)}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {step === 2 ? (
        <section className={styles.previewPage}>
          <div className={styles.previewAuctionBar}>
            <div className={styles.previewAuctionLeft}>
              <div className={styles.previewAuctionMeta}>
                <span className={styles.previewLiveBadge}>Preview</span>
                <span className={styles.previewEventCode}>
                  {isRelistMode
                    ? `Relist-ID: ${form.sourceAuctionId}`
                    : "Event-ID: DRAFT-AUCTION"}
                </span>
              </div>

              <div>
                <h3 className={styles.previewCollectionTitle}>
                  De Heritage Sportpaarden Collectie
                </h3>

                <p className={styles.previewCollectionSubtitle}>
                  Dit is een voorbeeld van hoe je advertentie eruitziet op de
                  veilingdetailpagina.
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
              <span>{relistData?.lotCode || "Kavel #01"}</span>
              <span>Biedperiode · Draft preview</span>
              <span>Volgende kavel →</span>
            </div>
          </div>

          <div className={styles.previewHeroGrid}>
            <div className={styles.previewMainColumn}>
              <div className={styles.previewTitleRow}>
                <div>
                  <h3 className={styles.previewHorseTitle}>{previewTitle}</h3>

                  <p className={styles.previewHorseSubtitle}>
                    Een eersteklas sportpaard met een uitzonderlijke bloedlijn
                    en veilingwaardige presentatie.
                  </p>
                </div>

                <div className={styles.previewTitleActions}>
                  <button type="button" aria-label="Favoriet">
                    ♥
                  </button>

                  <button type="button" aria-label="Delen">
                    ↗
                  </button>
                </div>
              </div>

              <div className={styles.previewGallery}>
                <div className={styles.previewMainImageWrap}>
                  {previewMainImage ? (
                    <img
                      src={previewMainImage}
                      alt={previewTitle}
                      className={styles.previewImage}
                    />
                  ) : (
                    <div className={styles.previewImagePlaceholder}>
                      <strong>Omslagfoto preview</strong>
                      <span>Upload een omslagfoto in stap 1</span>
                    </div>
                  )}
                </div>

                <div className={styles.previewSideImages}>
                  {[0, 1].map((index) => {
                    const image = previewGalleryImages[index];

                    return (
                      <div key={index} className={styles.previewSideImageWrap}>
                        {image ? (
                          <img
                            src={image}
                            alt={`${previewTitle} galerij ${index + 1}`}
                            className={styles.previewImage}
                          />
                        ) : (
                          <div className={styles.previewSmallPlaceholder}>
                            Galerie
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.previewSpecPanel}>
                <div>
                  <span>Geboortejaar</span>
                  <strong>{previewBirthYear}</strong>
                </div>

                <div>
                  <span>Schofthoogte</span>
                  <strong>{previewHeight}</strong>
                </div>

                <div>
                  <span>Stamboek</span>
                  <strong>{previewBreed}</strong>
                </div>

                <div>
                  <span>Kleur</span>
                  <strong>{previewColor}</strong>
                </div>

                <div>
                  <span>Geslacht</span>
                  <strong>{form.gender || "Hengst"}</strong>
                </div>

                <div>
                  <span>Huidige locatie</span>
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

                  <em>{isRelistMode ? "Opnieuw aangeboden" : "Bieden actief"}</em>
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
                  Boek try-out
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
                    <strong>{form.currency} 48.000</strong>
                  </div>

                  <div>
                    <span>
                      <strong>Bieder #889</strong>
                      <small>12 min geleden</small>
                    </span>
                    <strong>{form.currency} 45.000</strong>
                  </div>
                </div>

                <button type="button">Bekijk alle biedingen</button>
              </div>
            </aside>
          </div>

          <section className={styles.previewSectionBlock}>
            <h3>Notitie van de curator</h3>

            <p>
              {form.curatorNote.trim() ||
                `${previewTitle} is een modern sportpaard met een sterke uitstraling, correcte bouw en veel potentieel voor sport of fokkerij. Voeg in stap 1 een curatornotitie toe om deze tekst te personaliseren.`}
            </p>

            <div className={styles.previewVideoCard}>
              {previewMainImage ? (
                <img src={previewMainImage} alt={previewTitle} />
              ) : null}

              <div className={styles.previewVideoOverlay}>
                <CirclePlay size={44} strokeWidth={1.8} />
                <span>
                  {form.videoUrl.trim()
                    ? "Videopreview beschikbaar"
                    : "4K prestatievideo"}
                </span>
              </div>
            </div>
          </section>

          <section className={styles.previewSectionBlock}>
            <div className={styles.previewDecorTitle}>
              <span />
              <h3>Bloedlijn & prestaties</h3>
            </div>

            <div className={styles.previewTextGrid}>
              <div>
                <h4>Vaderlijn</h4>
                <p>
                  De vaderlijn staat bekend om sportiviteit, instelling en
                  prestatiegericht vermogen.
                </p>
              </div>

              <div>
                <h4>Moederlijn</h4>
                <p>
                  De moederlijn biedt een sterke basis voor balans, rijdbaarheid
                  en karakter.
                </p>
              </div>

              <div>
                <h4>Prestatiehoogtepunten</h4>
                <p>
                  {form.performanceNotes.trim() ||
                    "Voeg prestatienotities toe om wedstrijdresultaten en kwaliteiten te tonen."}
                </p>
              </div>

              <div>
                <h4>Foknotities</h4>
                <p>
                  Deze combinatie van bloed, type en presentatie maakt het paard
                  interessant voor kopers en investeerders.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.previewSectionBlock}>
            <h3>Documentatie & rapporten</h3>

            <div className={styles.previewDocumentList}>
              {documentMeta.map((doc) => (
                <div key={doc.key}>
                  <span>{doc.title}</span>
                  <strong>{documents[doc.key] || "Nog niet toegevoegd"}</strong>
                </div>
              ))}
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
                <strong>{form.registrationNumber || "Onbekend"}</strong>
                <small>{previewBreed}</small>
              </div>

              <div>
                <span>Moeder</span>
                <strong>{form.ueln || "Onbekend"}</strong>
                <small>{previewBreed}</small>
              </div>

              <div>
                <strong>Diamant de Semilly</strong>
                <strong>Carthina Z</strong>
                <strong>Nabab de Reve</strong>
                <strong>Ulara</strong>
              </div>

              <div>
                <strong>Le Tot de Semilly</strong>
                <strong>Carthago Z</strong>
                <strong>Quidam de Revel</strong>
                <strong>Chin Chin</strong>
              </div>
            </div>
          </section>
        </section>
      ) : null}

      {step === 3 ? (
        <section className={styles.paymentSection}>
          <div className={styles.paymentHeaderCompact}>
            <div>
              <h3>Betaling & afwikkelingsopties</h3>
              <p>
                Rond je veilingaanvraag af. De publicatiekosten worden via
                Stripe betaald. Indien gewenst kun je daarnaast off-platform
                crypto-afwikkelingsgegevens toevoegen voor koper en verkoper.
              </p>
            </div>

            <div className={styles.paymentBadge}>
              {isRelistMode ? "Herplaatsing" : "Nieuwe plaatsing"}
            </div>
          </div>

          <div className={styles.paymentLayout}>
            <div className={styles.paymentOptionsColumn}>
              <button
                type="button"
                className={`${styles.settlementOptionCard} ${styles.settlementOptionCardActive}`}
              >
                <div className={styles.settlementOptionIcon}>
                  <CreditCard size={20} strokeWidth={2.2} />
                </div>

                <div className={styles.settlementOptionContent}>
                  <div className={styles.settlementOptionTitleRow}>
                    <strong>Betaal publicatiekosten via Stripe</strong>
                    <span className={styles.settlementOptionCheck}>
                      <CheckCircle2 size={18} strokeWidth={2.5} />
                    </span>
                  </div>

                  <p>
                    Veilige kaartbetaling voor de publicatie van je
                    veilingvermelding. Na bevestiging wordt de verkoper
                    doorgestuurd naar Stripe Checkout.
                  </p>
                </div>
              </button>

              <button
                type="button"
                className={`${styles.settlementOptionCard} ${
                  enableCryptoSettlement
                    ? styles.settlementOptionCardEnabled
                    : ""
                }`}
                onClick={() => setEnableCryptoSettlement((prev) => !prev)}
              >
                <div className={styles.settlementOptionIcon}>
                  <Wallet size={20} strokeWidth={2.2} />
                </div>

                <div className={styles.settlementOptionContent}>
                  <div className={styles.settlementOptionTitleRow}>
                    <strong>
                      Off-platform crypto-afwikkelingsgegevens inschakelen
                    </strong>
                    <span
                      className={`${styles.optionToggle} ${
                        enableCryptoSettlement ? styles.optionToggleActive : ""
                      }`}
                    >
                      <span />
                    </span>
                  </div>

                  <p>
                    Voeg optioneel walletgegevens toe voor directe afwikkeling
                    tussen koper en verkoper. Dit vervangt de Stripe-betaling
                    voor de publicatiekosten niet. Bij inschakeling wordt een
                    extra crypto service fee toegevoegd.
                  </p>
                </div>
              </button>

              {enableCryptoSettlement ? (
                <div className={styles.cryptoSettlementPanel}>
                  <div className={styles.cryptoSettlementHeader}>
                    <h4>Off-platform crypto-afwikkelingsinformatie</h4>
                  </div>

                  <div className={styles.cryptoWarningBox}>
                    <div className={styles.cryptoWarningIcon}>
                      <AlertTriangle size={18} strokeWidth={2.3} />
                    </div>

                    <div>
                      <strong>
                        Koper en verkoper regelen de betaling rechtstreeks met
                        elkaar. Het platform is niet betrokken bij deze
                        transactie.
                      </strong>
                      <span>
                        Walletgegevens worden uitsluitend geregistreerd voor
                        informatieve afwikkelingsdoeleinden.
                      </span>
                    </div>
                  </div>

                  <div className={styles.cryptoFieldGrid}>
                    <div className={styles.cryptoField}>
                      <label htmlFor="acceptedCryptoCurrency">
                        Geaccepteerde cryptocurrency
                      </label>
                      <select
                        id="acceptedCryptoCurrency"
                        value={acceptedCryptoCurrency}
                        onChange={(e) =>
                          setAcceptedCryptoCurrency(e.target.value)
                        }
                      >
                        <option value="USDT (Tether)">USDT (Tether)</option>
                        <option value="USDC">USDC</option>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                      </select>
                    </div>

                    <div className={styles.cryptoField}>
                      <label htmlFor="blockchainNetwork">
                        Blockchain netwerk
                      </label>
                      <select
                        id="blockchainNetwork"
                        value={blockchainNetwork}
                        onChange={(e) => setBlockchainNetwork(e.target.value)}
                      >
                        <option value="ERC-20 (Ethereum)">
                          ERC-20 (Ethereum)
                        </option>
                        <option value="TRC-20 (Tron)">TRC-20 (Tron)</option>
                        <option value="BEP-20 (BNB Smart Chain)">
                          BEP-20 (BNB Smart Chain)
                        </option>
                        <option value="Solana">Solana</option>
                      </select>
                    </div>

                    <div
                      className={`${styles.cryptoField} ${styles.cryptoFieldFull}`}
                    >
                      <label htmlFor="walletAddress">Walletadres</label>
                      <input
                        id="walletAddress"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="0x..."
                      />
                    </div>

                    <div
                      className={`${styles.cryptoField} ${styles.cryptoFieldFull}`}
                    >
                      <label htmlFor="walletLabel">
                        Walletlabel / naam eigenaar
                      </label>
                      <input
                        id="walletLabel"
                        value={walletLabel}
                        onChange={(e) => setWalletLabel(e.target.value)}
                        placeholder="bijv. John Doe - Primary USDT"
                      />
                    </div>

                    <div
                      className={`${styles.cryptoField} ${styles.cryptoFieldFull}`}
                    >
                      <label htmlFor="specialInstructions">
                        Speciale instructies (optioneel)
                      </label>
                      <textarea
                        id="specialInstructions"
                        rows={4}
                        value={specialInstructions}
                        onChange={(e) =>
                          setSpecialInstructions(e.target.value)
                        }
                        placeholder="Eventuele aanvullende instructies voor de koper..."
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className={styles.paymentSummaryCard}>
              <div className={styles.paymentSummaryHeader}>
                <h4>Publicatiekostenoverzicht</h4>
              </div>

              <div className={styles.paymentSummaryRows}>
                <div className={styles.paymentSummaryRow}>
                  <span>Basis listing fee</span>
                  <strong>{formatEuroDetailed(listingFee)}</strong>
                </div>

                <div className={styles.paymentSummaryRow}>
                  <span>Crypto service fee</span>
                  <strong>{formatEuroDetailed(cryptoServiceFee)}</strong>
                </div>
              </div>

              <div className={styles.paymentSummaryTotal}>
                <span>Totaal nu te betalen</span>
                <strong>{formatEuroDetailed(totalDueNow)}</strong>
              </div>

              <div className={styles.paymentSummaryNotes}>
                <div className={styles.paymentSummaryNoteItem}>
                  <FileCheck2 size={15} strokeWidth={2.2} />
                  <span>
                    De crypto service fee wordt alleen toegepast wanneer
                    crypto-afwikkelingsgegevens zijn ingeschakeld.
                  </span>
                </div>

                <div className={styles.paymentSummaryNoteItem}>
                  <ShieldCheck size={15} strokeWidth={2.2} />
                  <span>Alle publicatiekosten worden betaald via Stripe.</span>
                </div>

                <div className={styles.paymentSummaryNoteItem}>
                  <Wallet size={15} strokeWidth={2.2} />
                  <span>
                    Walletgegevens worden enkel opgeslagen als referentie voor
                    off-platform afwikkeling.
                  </span>
                </div>
              </div>

              <div className={styles.paymentConfirmList}>
                <label className={styles.paymentConfirmItem}>
                  <input
                    type="checkbox"
                    checked={confirmInformation}
                    onChange={(e) => setConfirmInformation(e.target.checked)}
                  />
                  <span>
                    Ik bevestig dat alle verstrekte informatie correct is.
                  </span>
                </label>

                <label className={styles.paymentConfirmItem}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>
                    Ik accepteer de Terms of Acquisition en het Auction
                    Protocol.
                  </span>
                </label>
              </div>

              <button
                type="button"
                className={styles.paymentCheckoutButton}
                disabled={!canProceedToCheckout}
              >
                <span>Doorgaan naar Stripe Checkout</span>
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>

              {!canProceedToCheckout ? (
                <p className={styles.paymentCheckoutHint}>
                  Vink eerst beide bevestigingen aan om verder te gaan.
                </p>
              ) : null}
            </aside>
          </div>
        </section>
      ) : null}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.backButton}
          onClick={goToPreviousStep}
        >
          <ChevronLeft size={16} strokeWidth={2.4} />
          <span>Terug</span>
        </button>

        <div className={styles.actionRight}>
          {step === 3 ? (
            <>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setStep(2)}
              >
                Terug naar voorbeeld
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setStep(1)}
              >
                Bewerken
              </button>
            </>
          ) : (
            <>
              {step !== 2 ? (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(2)}
                >
                  Voorbeeld
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(1)}
                >
                  Bewerken
                </button>
              )}

              <button
                type="button"
                className={styles.primaryButton}
                onClick={goToNextStep}
              >
                <span>{step === 2 ? "Verder naar betaling" : "Doorgaan"}</span>
                <ChevronRight size={16} strokeWidth={2.4} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}