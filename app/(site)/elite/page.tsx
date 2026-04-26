import Image from "next/image";
import Link from "next/link";
import { getEliteHorses } from "@/components/modules/site/home/data/horses";
import styles from "./ElitePage.module.scss";

export default function ElitePage() {
  const horses = getEliteHorses();

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Elitecollectie</span>

          <h1 className={styles.title}>Elitepaarden</h1>

          <p className={styles.subtitle}>
            Ontdek onze exclusieve selectie van uitzonderlijke paarden uit de
            meest prestigieuze bloedlijnen.
          </p>
        </div>

        <div className={styles.grid}>
          {horses.map((horse) => {
            const href = `/elite/${horse.slug}`;

            return (
              <article key={horse.id} className={styles.card}>
                <Link href={href} scroll className={styles.imageLink}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={horse.image}
                      alt={horse.imageAlt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 991px) 100vw, 33vw"
                    />

                    <span className={styles.badge}>{horse.badge}</span>
                  </div>
                </Link>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>
                    <Link href={href} scroll>
                      {horse.title}
                    </Link>
                  </h2>

                  <p className={styles.cardSubtitle}>{horse.subtitle}</p>

                  <div className={styles.meta}>
                    <span>{horse.location}</span>
                    <span>{horse.discipline}</span>
                  </div>

                  <div className={styles.bottomRow}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceLabel}>Huidig bod</span>
                      <strong className={styles.priceValue}>{horse.bid}</strong>
                    </div>

                    <Link href={href} scroll className={styles.button}>
                      Details bekijken
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}