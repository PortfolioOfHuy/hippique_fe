import Link from "next/link";
import styles from "./footer.module.scss";
import { footerFont } from "./footerFont";

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${footerFont.variable}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Hippique Auctions">
            <img src="/assets/img/logo/footer.png" alt="Hippique Auctions" />
          </Link>

          <p className={styles.description}>
            De toonaangevende bestemming voor eersteklas sportpaardenveilingen
            en uitmuntendheid in de paardensport.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Navigatie</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auctions">Veilingen</Link>
            </li>
            <li>
              <Link href="/news">Nieuws</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Juridisch</h3>
          <ul>
            <li>
              <Link href="/terms-of-service">Algemene voorwaarden</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacybeleid</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Contactgegevens</h3>
          <ul className={styles.contactList}>
            <li>Telefoon: 09090909</li>
            <li>Adres:</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
