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
            The premier destination for world-class sport horse auctions and
            equestrian excellence.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auctions">Auctions</Link>
            </li>
            <li>
              <Link href="/news">News</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Legal</h3>
          <ul>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Contact Information</h3>
          <ul className={styles.contactList}>
            <li>Telephone: 09090909</li>
            <li>Address:</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
