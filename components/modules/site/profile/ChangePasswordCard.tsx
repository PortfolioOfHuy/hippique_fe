"use client";

import { useState } from "react";
import styles from "./ChangePasswordCard.module.scss";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordCard() {
  const [form, setForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function updateField<K extends keyof PasswordForm>(
    key: K,
    value: PasswordForm[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError("");
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vul alle wachtwoordvelden in.");
      setMessage("");
      return;
    }

    if (form.newPassword.length < 12) {
      setError("Het nieuwe wachtwoord moet minimaal 12 tekens bevatten.");
      setMessage("");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("De wachtwoorden komen niet overeen.");
      setMessage("");
      return;
    }

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setError("");
    setMessage("Je wachtwoord is succesvol bijgewerkt.");
  }

  return (
    <section className={styles.card}>
      <h2>Wachtwoord wijzigen</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="currentPassword">Huidig wachtwoord</label>
          <input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            value={form.currentPassword}
            onChange={(event) =>
              updateField("currentPassword", event.target.value)
            }
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="newPassword">Nieuw wachtwoord</label>
          <input
            id="newPassword"
            type="password"
            placeholder="Min. 12 tekens"
            value={form.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="confirmPassword">Bevestig wachtwoord</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Voer opnieuw in"
            value={form.confirmPassword}
            onChange={(event) =>
              updateField("confirmPassword", event.target.value)
            }
          />
        </div>

        {error ? <div className={styles.errorBox}>{error}</div> : null}
        {message ? <div className={styles.successBox}>{message}</div> : null}

        <button type="submit" className={styles.submitButton}>
          Wachtwoord bijwerken
        </button>
      </form>
    </section>
  );
}