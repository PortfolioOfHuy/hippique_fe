import Image from "next/image";
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
                <a href={href} className={styles.imageLink}>
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
                </a>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>
                    <a href={href}>{horse.title}</a>
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

                    <a href={href} className={styles.button}>
                      Details bekijken
                    </a>
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