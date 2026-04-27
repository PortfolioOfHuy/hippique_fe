"use client";

import styles from "./InloggenPage.module.scss";

export default function InloggenPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.location.href = "/";
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.heading}>
          <span className={styles.kicker}>Hippique Auction House</span>

          <h1 id="login-title">Inloggen</h1>

          <p>Vul je gegevens in om toegang te krijgen tot je account.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">E-mailadres</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="curator@example.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="password">Wachtwoord</label>

              <a href="/" className={styles.forgotLink}>
                Wachtwoord vergeten?
              </a>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <label className={styles.remember}>
            <input type="checkbox" />
            <span>Ingelogd blijven gedurende 30 dagen</span>
          </label>

          <button type="submit" className={styles.loginButton}>
            Inloggen
          </button>
        </form>

        <div className={styles.divider} />

        <div className={styles.register}>
          <p>Nog geen account bij het veilinghuis?</p>

          <a href="/registreren" className={styles.registerButton}>
            Registreren om te bieden
          </a>
        </div>
      </section>
    </main>
  );
}