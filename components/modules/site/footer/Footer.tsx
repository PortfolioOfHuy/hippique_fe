import Image from "next/image";
import styles from "./Footer.module.scss";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Veilingen", href: "/veilingen" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Servicevoorwaarden", href: "/servicevoorwaarden" },
  { label: "Privacybeleid", href: "/privacybeleid" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a href="/" className={styles.logoLink} aria-label="Hippique Auctions">
            <Image
              src="/img/logo/footer.png"
              alt="Hippique Auctions"
              width={180}
              height={180}
              className={styles.logo}
            />
          </a>

          <p className={styles.description}>
            De toonaangevende bestemming voor sportpaardenveilingen van
            wereldklasse en hippische topkwaliteit.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.title}>Navigatie</h3>

          <ul className={styles.linkList}>
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3 className={styles.title}>Juridisch</h3>

          <ul className={styles.linkList}>
            {legalLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h3 className={styles.title}>Contactinformatie</h3>

          <div className={styles.contactList}>
            <p className={styles.contactItem}>
              <span className={styles.contactLabel}>Telefoon:</span> 09090909
            </p>

            <p className={styles.contactItem}>
              <span className={styles.contactLabel}>Adres:</span> Nog in te vullen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}