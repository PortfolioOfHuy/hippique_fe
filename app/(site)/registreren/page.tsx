"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./RegistrerenPage.module.scss";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  emailOtp: string;
  phoneOtp: string;
};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  if (name.length <= 2) {
    return `${name[0] ?? "*"}***@${domain}`;
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

function maskPhone(phone: string) {
  const clean = phone.replace(/\s+/g, "");
  if (clean.length <= 4) return clean;
  return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
}

export default function RegistrerenPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    emailOtp: "",
    phoneOtp: "",
  });

  const [emailSentCode, setEmailSentCode] = useState("");
  const [phoneSentCode, setPhoneSentCode] = useState("");

  const [emailCountdown, setEmailCountdown] = useState(0);
  const [phoneCountdown, setPhoneCountdown] = useState(0);

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEmailCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      setPhoneCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.password.trim() !== "" &&
      emailVerified &&
      phoneVerified
    );
  }, [form, emailVerified, phoneVerified]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      setEmailVerified(false);
      setEmailMessage("");
    }

    if (key === "phone") {
      setPhoneVerified(false);
      setPhoneMessage("");
    }

    setSubmitError("");
    setSubmitMessage("");
  }

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value: string) {
    return /^[+\d][\d\s\-().]{7,}$/.test(value);
  }

  function handleSendEmailOtp() {
    if (!isValidEmail(form.email.trim())) {
      setEmailMessage("Vul eerst een geldig e-mailadres in.");
      setEmailVerified(false);
      return;
    }

    const code = generateOtp();
    setEmailSentCode(code);
    setEmailCountdown(60);
    setEmailVerified(false);
    setForm((prev) => ({ ...prev, emailOtp: "" }));
    setEmailMessage(
      `OTP is verzonden naar ${maskEmail(form.email.trim())}. Dit is een demo-flow zonder backend.`,
    );
  }

  function handleSendPhoneOtp() {
    if (!isValidPhone(form.phone.trim())) {
      setPhoneMessage("Vul eerst een geldig telefoonnummer in.");
      setPhoneVerified(false);
      return;
    }

    const code = generateOtp();
    setPhoneSentCode(code);
    setPhoneCountdown(60);
    setPhoneVerified(false);
    setForm((prev) => ({ ...prev, phoneOtp: "" }));
    setPhoneMessage(
      `OTP is verzonden naar ${maskPhone(form.phone.trim())}. Dit is een demo-flow zonder backend.`,
    );
  }

  function handleVerifyEmailOtp() {
    if (!emailSentCode) {
      setEmailMessage("Verstuur eerst een OTP naar je e-mailadres.");
      setEmailVerified(false);
      return;
    }

    if (form.emailOtp.trim() === emailSentCode) {
      setEmailVerified(true);
      setEmailMessage("E-mailadres succesvol geverifieerd.");
      return;
    }

    setEmailVerified(false);
    setEmailMessage("De ingevoerde e-mailcode is niet correct.");
  }

  function handleVerifyPhoneOtp() {
    if (!phoneSentCode) {
      setPhoneMessage("Verstuur eerst een OTP naar je telefoonnummer.");
      setPhoneVerified(false);
      return;
    }

    if (form.phoneOtp.trim() === phoneSentCode) {
      setPhoneVerified(true);
      setPhoneMessage("Telefoonnummer succesvol geverifieerd.");
      return;
    }

    setPhoneVerified(false);
    setPhoneMessage("De ingevoerde sms-code is niet correct.");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setSubmitMessage("");

    if (!canSubmit) {
      setSubmitError(
        "Vul alle velden in en verifieer zowel je e-mailadres als je telefoonnummer.",
      );
      return;
    }

    setSubmitMessage(
      "Registratie geslaagd. Je wordt doorgestuurd naar de inlogpagina...",
    );

    window.setTimeout(() => {
      router.push("/inloggen");
    }, 1200);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="register-title">
        <div className={styles.heading}>
          <span className={styles.kicker}>Hippique Auction House</span>
          <h1 id="register-title">Registreren</h1>
          <p>
            Maak een account aan om te bieden. Verifieer je e-mailadres en
            telefoonnummer met een OTP-code.
          </p>
        </div>

        <div className={styles.demoNotice}>
          <div className={styles.demoBadge}>Demo modus</div>
          <p>
            Er is nog geen backend gekoppeld. Daarom tonen we na het verzenden
            van een OTP ook een <strong>demo-code</strong> in de interface,
            zodat klanten de volledige verificatieflow toch kunnen zien.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="fullName">Volledige naam</label>
              <input
                id="fullName"
                type="text"
                placeholder="Bijv. Jan de Vries"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Wachtwoord</label>
              <input
                id="password"
                type="password"
                placeholder="Kies een sterk wachtwoord"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.verifyCard}>
            <div className={styles.verifyTop}>
              <div>
                <h3>E-mailverificatie</h3>
                <p>Bevestig je e-mailadres met een OTP-code.</p>
              </div>

              {emailVerified ? (
                <span className={styles.verifiedBadge}>Geverifieerd</span>
              ) : (
                <span className={styles.pendingBadge}>Nog niet geverifieerd</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">E-mailadres</label>
              <div className={styles.inlineRow}>
                <input
                  id="email"
                  type="email"
                  placeholder="jan@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleSendEmailOtp}
                  disabled={emailCountdown > 0}
                >
                  {emailCountdown > 0
                    ? `Opnieuw in ${emailCountdown}s`
                    : "Verstuur OTP"}
                </button>
              </div>
            </div>

            {emailSentCode ? (
              <div className={styles.otpPreview} aria-live="polite">
                <div className={styles.otpPreviewText}>
                  <strong>OTP verzonden</strong>
                  <span>{emailMessage}</span>
                </div>

                <div className={styles.demoCodeBox}>
                  <span>Demo code</span>
                  <strong>{emailSentCode}</strong>
                </div>
              </div>
            ) : null}

            <div className={styles.field}>
              <label htmlFor="emailOtp">OTP voor e-mail</label>
              <div className={styles.inlineRow}>
                <input
                  id="emailOtp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Voer de 6-cijferige code in"
                  value={form.emailOtp}
                  onChange={(e) => updateField("emailOtp", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.outlineButton}
                  onClick={handleVerifyEmailOtp}
                >
                  Verifieer
                </button>
              </div>
            </div>

            {emailMessage && !emailSentCode ? (
              <p className={styles.helperText}>{emailMessage}</p>
            ) : null}
          </div>

          <div className={styles.verifyCard}>
            <div className={styles.verifyTop}>
              <div>
                <h3>Telefoonverificatie</h3>
                <p>Bevestig je telefoonnummer met een OTP-code.</p>
              </div>

              {phoneVerified ? (
                <span className={styles.verifiedBadge}>Geverifieerd</span>
              ) : (
                <span className={styles.pendingBadge}>Nog niet geverifieerd</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Telefoonnummer</label>
              <div className={styles.inlineRow}>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+31 6 1234 5678"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleSendPhoneOtp}
                  disabled={phoneCountdown > 0}
                >
                  {phoneCountdown > 0
                    ? `Opnieuw in ${phoneCountdown}s`
                    : "Verstuur OTP"}
                </button>
              </div>
            </div>

            {phoneSentCode ? (
              <div className={styles.otpPreview} aria-live="polite">
                <div className={styles.otpPreviewText}>
                  <strong>OTP verzonden</strong>
                  <span>{phoneMessage}</span>
                </div>

                <div className={styles.demoCodeBox}>
                  <span>Demo code</span>
                  <strong>{phoneSentCode}</strong>
                </div>
              </div>
            ) : null}

            <div className={styles.field}>
              <label htmlFor="phoneOtp">OTP voor telefoon</label>
              <div className={styles.inlineRow}>
                <input
                  id="phoneOtp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Voer de 6-cijferige code in"
                  value={form.phoneOtp}
                  onChange={(e) => updateField("phoneOtp", e.target.value)}
                />
                <button
                  type="button"
                  className={styles.outlineButton}
                  onClick={handleVerifyPhoneOtp}
                >
                  Verifieer
                </button>
              </div>
            </div>

            {phoneMessage && !phoneSentCode ? (
              <p className={styles.helperText}>{phoneMessage}</p>
            ) : null}
          </div>

          {submitError ? (
            <div className={styles.errorBox} aria-live="polite">
              {submitError}
            </div>
          ) : null}

          {submitMessage ? (
            <div className={styles.successBox} aria-live="polite">
              {submitMessage}
            </div>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!canSubmit}
          >
            Account aanmaken
          </button>
        </form>

        <div className={styles.footer}>
          <p>Heb je al een account?</p>
          <Link href="/inloggen">Ga naar inloggen</Link>
        </div>
      </section>
    </main>
  );
}