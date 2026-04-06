import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFoundPage() {
  return (
    <main className={styles.notFound}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1>Pagina niet gevonden</h1>
        <p className={styles.text}>
          Sorry, de pagina die je zoekt bestaat niet of is mogelijk verplaatst.
        </p>
        <Link href="/" className={styles.button}>
          Terug naar home
        </Link>
      </div>
    </main>
  );
}
