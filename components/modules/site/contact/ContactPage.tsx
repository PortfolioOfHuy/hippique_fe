"use client";

import { FormEvent, useState } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import styles from "./ContactPage.module.scss";

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactItems = [
  {
    icon: MapPin,
    label: "Adres",
    value: "Amsterdam, Nederland",
  },
  {
    icon: Phone,
    label: "Telefoon",
    value: "+31 20 123 4567",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@hippique-auctions.com",
  },
  {
    icon: Clock3,
    label: "Openingstijden",
    value: "Maandag - Vrijdag, 09:00 - 18:00",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Contact</span>

        <h1>Neem contact met ons op</h1>

        <p>
          Heeft u vragen over veilingen, biedingen, partnerplaatsingen of het
          aanbieden van paarden, embryo’s of sperma? Ons team helpt u graag
          verder.
        </p>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.infoPanel}>
          <div className={styles.infoHeader}>
            <span className={styles.kicker}>Hippique Auctions</span>
            <h2>Wij staan voor u klaar</h2>
            <p>
              Stuur ons een bericht of neem rechtstreeks contact op met ons
              team. Wij reageren zo snel mogelijk op uw aanvraag.
            </p>
          </div>

          <div className={styles.infoList}>
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.label} className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Icon size={20} strokeWidth={2.1} />
                  </div>

                  <div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.zaloBox}>
            <div className={styles.zaloIcon}>
              <MessageCircle size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h3>Direct bericht sturen</h3>
              <p>
                U kunt deze contactflow later koppelen aan Zalo OA, WhatsApp of
                een intern notificatiesysteem wanneer de backend klaar is.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h2>Stuur een bericht</h2>
            <p>
              Vul het formulier in. Ons team neemt binnenkort contact met u op.
            </p>
          </div>

          {submitted ? (
            <div className={styles.successBox}>
              <ShieldCheck size={18} strokeWidth={2.2} />
              <span>
                Uw bericht is succesvol voorbereid. Zodra de backend gekoppeld
                is, wordt dit automatisch verzonden.
              </span>
            </div>
          ) : null}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor="fullName">Volledige naam</label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="Uw naam"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">E-mailadres</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="uwemail@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">Telefoonnummer</label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+31 ..."
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="subject">Onderwerp</label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                  required
                >
                  <option value="">Selecteer onderwerp</option>
                  <option value="auction">Veilinginformatie</option>
                  <option value="bidding">Bieden & account</option>
                  <option value="seller">Paard aanbieden</option>
                  <option value="partner">Partner worden</option>
                  <option value="support">Algemene ondersteuning</option>
                </select>
              </div>

              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label htmlFor="message">Bericht</label>
                <textarea
                  id="message"
                  rows={7}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Schrijf uw bericht..."
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              <Send size={17} strokeWidth={2.2} />
              <span>Bericht verzenden</span>
            </button>
          </form>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapHeader}>
          <span className={styles.kicker}>Locatie</span>
          <h2>Vind ons kantoor</h2>
          <p>
            Deze kaart kan later worden vervangen door de exacte Google Maps
            iframe van uw bedrijf.
          </p>
        </div>

        <div className={styles.mapBox}>
          <iframe
            title="Hippique Auctions locatie"
            src="https://www.google.com/maps?q=Amsterdam%20Netherlands&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}