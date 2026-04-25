"use client";

import { ChangeEvent, ReactNode, useMemo, useState } from "react";
import {
  BadgePlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  FileBadge2,
  FileCheck2,
  FileText,
  HeartPulse,
  ImagePlus,
  ShieldCheck,
  Stethoscope,
  Upload,
} from "lucide-react";
import styles from "./HorseListingWizard.module.scss";

type Step = 1 | 2 | 3;

export type HorseListingType = "paard" | "jonge-paarden" | "elite-paarden";

type HorseListingWizardProps = {
  type?: HorseListingType;
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

const initialForm: HorseFormState = {
  horseName: "",
  breed: "",
  birthYear: "",
  gender: "hengst",
  height: "",
  color: "",
  discipline: "dressuur",
  location: "",
  performanceNotes: "",
  registrationNumber: "",
  ueln: "",
  videoUrl: "",
  curatorNote: "",
  startingBid: "",
  currency: "EUR",
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

export default function HorseListingWizard({
  type = "paard",
}: HorseListingWizardProps) {
  const content = horseListingContent[type];

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<HorseFormState>(initialForm);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [documents, setDocuments] = useState<DocumentState>({
    vetCheck: null,
    xrayReports: null,
    healthReport: null,
    horsePassport: null,
  });

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.topMeta}>
        <span>Stap {String(step).padStart(2, "0")} / 03</span>
        <strong>Bezig</strong>
      </div>

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
          <small>Controle</small>
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
          {step === 2 && "Stap 2: controle van je vermelding"}
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
                    <div key={`${preview}-${index}`} className={styles.galleryTile}>
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
                <label htmlFor="startingBid">Startbod</label>
                <input
                  id="startingBid"
                  value={form.startingBid}
                  onChange={(e) => updateField("startingBid", e.target.value)}
                  placeholder="bijv. 50000"
                />
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
        <section className={styles.reviewSection}>
          <div className={styles.reviewHeader}>
            <div>
              <h3>Controleoverzicht</h3>
              <p>
                Bekijk alle ingevulde informatie voordat je doorgaat naar
                betaling.
              </p>
            </div>

            <div className={styles.completionBadge}>
              <CheckCircle2 size={18} strokeWidth={2} />
              <span>{completion}% compleet</span>
            </div>
          </div>

          <div className={styles.reviewGrid}>
            <div className={styles.reviewCard}>
              <h4>Basisinformatie</h4>
              <ul>
                <li>
                  <span>Type vermelding</span>
                  <strong>{content.typeLabel}</strong>
                </li>
                <li>
                  <span>Naam / titel</span>
                  <strong>{form.horseName || "-"}</strong>
                </li>
                <li>
                  <span>Ras</span>
                  <strong>{form.breed || "-"}</strong>
                </li>
                <li>
                  <span>Geboortejaar</span>
                  <strong>{form.birthYear || "-"}</strong>
                </li>
                <li>
                  <span>Geslacht</span>
                  <strong>{form.gender || "-"}</strong>
                </li>
                <li>
                  <span>Hoogte</span>
                  <strong>{form.height || "-"}</strong>
                </li>
                <li>
                  <span>Kleur</span>
                  <strong>{form.color || "-"}</strong>
                </li>
                <li>
                  <span>Discipline</span>
                  <strong>{form.discipline || "-"}</strong>
                </li>
                <li>
                  <span>Locatie</span>
                  <strong>{form.location || "-"}</strong>
                </li>
              </ul>
            </div>

            <div className={styles.reviewCard}>
              <h4>Afstamming & media</h4>
              <ul>
                <li>
                  <span>Registratienummer</span>
                  <strong>{form.registrationNumber || "-"}</strong>
                </li>
                <li>
                  <span>UELN</span>
                  <strong>{form.ueln || "-"}</strong>
                </li>
                <li>
                  <span>Omslagfoto</span>
                  <strong>{coverPreview ? "Toegevoegd" : "Niet toegevoegd"}</strong>
                </li>
                <li>
                  <span>Galerij</span>
                  <strong>{galleryPreviews.length} bestanden</strong>
                </li>
                <li>
                  <span>Video</span>
                  <strong>
                    {form.videoUrl.trim() !== ""
                      ? "Toegevoegd"
                      : "Niet toegevoegd"}
                  </strong>
                </li>
                <li>
                  <span>Documenten</span>
                  <strong>
                    {
                      Object.values(documents).filter((item) => item !== null)
                        .length
                    }{" "}
                    geüpload
                  </strong>
                </li>
              </ul>
            </div>

            <div className={styles.reviewCard}>
              <h4>Beschrijving & prijs</h4>
              <ul>
                <li>
                  <span>Prestatienotities</span>
                  <strong>
                    {form.performanceNotes.trim() !== ""
                      ? "Ingevuld"
                      : "Nog niet ingevuld"}
                  </strong>
                </li>
                <li>
                  <span>Curatornotitie</span>
                  <strong>
                    {form.curatorNote.trim() !== ""
                      ? "Ingevuld"
                      : "Nog niet ingevuld"}
                  </strong>
                </li>
                <li>
                  <span>Startbod</span>
                  <strong>{form.startingBid || "-"}</strong>
                </li>
                <li>
                  <span>Valuta</span>
                  <strong>{form.currency || "-"}</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className={styles.paymentSection}>
          <div className={styles.paymentCard}>
            <div className={styles.paymentHeader}>
              <div>
                <h3>Betaling & publicatie</h3>
                <p>
                  Rond je plaatsing af en bereid de advertentie voor op
                  publicatie in de veilingomgeving.
                </p>
              </div>

              <div className={styles.paymentStatus}>Klaar voor afronding</div>
            </div>

            <div className={styles.paymentGrid}>
              <div className={styles.paymentInfo}>
                <h4>Overzicht plaatsing</h4>
                <ul>
                  <li>
                    <span>Type vermelding</span>
                    <strong>{content.typeLabel}</strong>
                  </li>
                  <li>
                    <span>Naam / titel</span>
                    <strong>{form.horseName || "-"}</strong>
                  </li>
                  <li>
                    <span>Startbod</span>
                    <strong>
                      {form.startingBid || "0"} {form.currency}
                    </strong>
                  </li>
                  <li>
                    <span>Media gereed</span>
                    <strong>
                      {coverPreview || galleryPreviews.length > 0 ? "Ja" : "Nee"}
                    </strong>
                  </li>
                </ul>
              </div>

              <div className={styles.paymentInfo}>
                <h4>Publicatiepakket</h4>
                <div className={styles.planCard}>
                  <strong>Veilingplaatsing standaard</strong>
                  <span>Professionele listing + review + publicatiekoppeling</span>
                  <b>€ 195,00</b>
                </div>
              </div>
            </div>

            <div className={styles.paymentNote}>
              <FileCheck2 size={18} strokeWidth={2} />
              <p>
                Deze stap is momenteel voorbereid als UI-flow. Zodra je backend
                klaar is, kun je hier checkout, betaalstatus en submit-logica
                koppelen.
              </p>
            </div>
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

          {step < 3 ? (
            <button
              type="button"
              className={styles.primaryButton}
              onClick={goToNextStep}
            >
              <span>{step === 2 ? "Verder naar betaling" : "Doorgaan"}</span>
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          ) : (
            <button type="button" className={styles.primaryButton}>
              <span>Publicatie aanvragen</span>
              <FileText size={16} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}