"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  ImagePlus,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
} from "lucide-react";
import styles from "./PartnerListingWizard.module.scss";

type PartnerFormState = {
  brandName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  partnerType: string;
  location: string;
  shortDescription: string;
  displayOrder: string;
  status: string;
};

const initialForm: PartnerFormState = {
  brandName: "Nova Land",
  companyName: "Nova Land Equestrian Group",
  contactName: "John Doe",
  email: "partner@example.com",
  phone: "+31 20 123 4567",
  websiteUrl: "https://example.com",
  partnerType: "Hoofdpartner",
  location: "Amsterdam, Nederland",
  shortDescription:
    "Toonaangevende partner binnen premium equestrian services en internationale veilingondersteuning.",
  displayOrder: "1",
  status: "concept",
};

export default function PartnerListingWizard() {
  const [form, setForm] = useState<PartnerFormState>(initialForm);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function updateField<K extends keyof PartnerFormState>(
    key: K,
    value: PartnerFormState[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoFileName(file.name);
    setLogoPreview(URL.createObjectURL(file));
  }

  const homepagePreviewName = useMemo(() => {
    return form.brandName.trim() || "Partnernaam";
  }, [form.brandName]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeading}>
        <span>02</span>
        <h2>Partnerinformatie</h2>
      </div>

      <section className={styles.card}>
        <div className={styles.intro}>
          <div>
            <span className={styles.kicker}>Homepage partner</span>
            <h3>Partner toevoegen aan homepage</h3>
            <p>
              Vul de gegevens van de partner in. Deze informatie kan later via
              de backend of admin worden gebruikt om het logo en de link te
              tonen in de homepage-sectie “Our Partners”.
            </p>
          </div>

          <div className={styles.statusBadge}>
            <ShieldCheck size={16} strokeWidth={2.2} />
            Klaar voor review
          </div>
        </div>

        <div className={styles.formLayout}>
          <div className={styles.logoColumn}>
            <label className={styles.logoUpload}>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />

              {logoPreview ? (
                <img src={logoPreview} alt={homepagePreviewName} />
              ) : (
                <div className={styles.logoEmpty}>
                  <ImagePlus size={34} strokeWidth={1.8} />
                  <strong>Partnerlogo uploaden</strong>
                  <span>PNG, JPG, SVG of WEBP</span>
                </div>
              )}
            </label>

            {logoFileName ? (
              <div className={styles.uploadedFile}>
                <Upload size={16} strokeWidth={2} />
                <span>{logoFileName}</span>
              </div>
            ) : null}
          </div>

          <div className={styles.formGrid}>
            <TextField
              label="Partnernaam / merknaam"
              value={form.brandName}
              onChange={(value) => updateField("brandName", value)}
            />

            <TextField
              label="Bedrijfsnaam"
              value={form.companyName}
              onChange={(value) => updateField("companyName", value)}
            />

            <TextField
              label="Contactpersoon"
              value={form.contactName}
              onChange={(value) => updateField("contactName", value)}
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
              label="Website URL"
              value={form.websiteUrl}
              onChange={(value) => updateField("websiteUrl", value)}
            />

            <div className={styles.field}>
              <label htmlFor="partnerType">Partnertype</label>
              <select
                id="partnerType"
                value={form.partnerType}
                onChange={(event) =>
                  updateField("partnerType", event.target.value)
                }
              >
                <option>Hoofdpartner</option>
                <option>Veilingpartner</option>
                <option>Media partner</option>
                <option>Veterinaire partner</option>
                <option>Transportpartner</option>
                <option>Fokkerijpartner</option>
              </select>
            </div>

            <TextField
              label="Locatie"
              value={form.location}
              onChange={(value) => updateField("location", value)}
            />

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="shortDescription">Korte omschrijving</label>
              <textarea
                id="shortDescription"
                rows={5}
                value={form.shortDescription}
                onChange={(event) =>
                  updateField("shortDescription", event.target.value)
                }
                placeholder="Beschrijf kort waarom deze partner relevant is voor de homepage..."
              />
            </div>

            <TextField
              label="Weergavevolgorde"
              value={form.displayOrder}
              onChange={(value) => updateField("displayOrder", value)}
            />

            <div className={styles.field}>
              <label htmlFor="status">Publicatiestatus</label>
              <select
                id="status"
                value={form.status}
                onChange={(event) => updateField("status", event.target.value)}
              >
                <option value="concept">Concept</option>
                <option value="review">Wacht op review</option>
                <option value="published">Publiceren op homepage</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.sectionHeading}>
        <span>03</span>
        <h2>Homepage preview</h2>
      </div>

      <section className={styles.previewCard}>
        <div className={styles.homePreviewHeader}>
          <h3>Our Partners</h3>
          <p>
            Collaborating with the world’s leading brands in equestrian
            excellence.
          </p>
        </div>

        <div className={styles.partnerPreviewRow}>
          <article className={styles.partnerLogoCard}>
            {logoPreview ? (
              <img src={logoPreview} alt={homepagePreviewName} />
            ) : (
              <span>{homepagePreviewName}</span>
            )}
          </article>

          <article className={styles.partnerLogoCard}>
            <span>Central</span>
          </article>

          <article className={styles.partnerLogoCard}>
            <span>ATAD</span>
          </article>

          <article className={styles.partnerLogoCard}>
            <span>AZB</span>
          </article>
        </div>

        <div className={styles.previewInfo}>
          <div>
            <Building2 size={18} strokeWidth={2} />
            <span>{form.companyName || "Bedrijfsnaam"}</span>
          </div>

          <div>
            <ExternalLink size={18} strokeWidth={2} />
            <span>{form.websiteUrl || "Website URL"}</span>
          </div>

          <div>
            <Mail size={18} strokeWidth={2} />
            <span>{form.email || "E-mailadres"}</span>
          </div>

          <div>
            <Phone size={18} strokeWidth={2} />
            <span>{form.phone || "Telefoonnummer"}</span>
          </div>
        </div>
      </section>

      <section className={styles.publishCard}>
        <div className={styles.publishText}>
          <h3>Publicatieverzoek</h3>
          <p>
            Na verzending kan deze partnervermelding door admin worden
            gecontroleerd en gekoppeld aan de homepage partnersectie.
          </p>
        </div>

        <label className={styles.confirmRow}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
          />
          <span>
            Ik bevestig dat ik toestemming heb om dit partnerlogo en deze
            bedrijfsgegevens te gebruiken.
          </span>
        </label>

        <button
          type="button"
          className={styles.submitButton}
          disabled={!confirmed}
        >
          <CheckCircle2 size={18} strokeWidth={2.2} />
          Partnervermelding indienen
        </button>
      </section>
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