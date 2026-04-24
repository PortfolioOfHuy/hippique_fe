import Image from "next/image";
import styles from "./PartnersSection.module.scss";

type PartnerItem = {
  id: number;
  name: string;
  logo: string;
};

const partners: PartnerItem[] = [
  {
    id: 1,
    name: "Vinaconex",
    logo: "/img/home/partners/vinaconex.png",
  },
  {
    id: 2,
    name: "Nova Land",
    logo: "/img/home/partners/novaland.png",
  },
  {
    id: 3,
    name: "Central",
    logo: "/img/home/partners/central.png",
  },
  {
    id: 4,
    name: "ATAD",
    logo: "/img/home/partners/atad.png",
  },
  {
    id: 5,
    name: "AZB",
    logo: "/img/home/partners/azb.png",
  },
  {
    id: 6,
    name: "Coteccons",
    logo: "/img/home/partners/coteccons.png",
  },
];

const duplicatedPartners = [...partners, ...partners];

export default function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Our Partners</h2>
          <p className={styles.subtitle}>
            Collaborating with the world&apos;s leading brands in equestrian
            excellence.
          </p>
        </div>

        <div className={styles.slider} aria-label="Our partners">
          <div className={styles.track}>
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className={styles.card}
                aria-label={partner.name}
              >
                <div className={styles.logoWrap}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className={styles.logo}
                    sizes="220px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}