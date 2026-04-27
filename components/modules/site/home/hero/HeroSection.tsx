"use client";

import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src="/img/hero/hero.webp"
          alt="Hippique veilingen"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>HIPPIQUE AUCTIONS</span>

          <h1 className={styles.title}>
            Wereldklasse
            <br />
            Paardenveilingen
          </h1>

          <p className={styles.description}>
            Ontdek uitzonderlijke sportpaarden van prestigieuze fokkers van over
            de hele wereld. Geselecteerde afstamming, bewezen prestaties en een
            naadloze internationale aankoopervaring.
          </p>

          <div className={styles.actions}>
            <a href="/veilingen" className={styles.primaryButton}>
              Bekijk veilingen
            </a>

            <a href="/registreren" className={styles.secondaryButton}>
              Registreer nu
            </a>
          </div>
        </div>

        <div className={styles.searchCard}>
          <div className={styles.searchGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Paardnaam</span>
              <input
                type="text"
                placeholder="Voer paardnaam in..."
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Ras</span>
              <div className={styles.selectWrap}>
                <select className={styles.select} defaultValue="">
                  <option value="">Alle rassen</option>
                  <option value="kwpn">KWPN</option>
                  <option value="hannoveraan">Hannoveraan</option>
                  <option value="holsteiner">Holsteiner</option>
                  <option value="oldenburger">Oldenburger</option>
                </select>
                <ChevronDown className={styles.selectIcon} size={18} />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Prijsklasse</span>
              <div className={styles.selectWrap}>
                <select className={styles.select} defaultValue="">
                  <option value="">Alle prijzen</option>
                  <option value="0-10000">€0 - €10.000</option>
                  <option value="10000-50000">€10.000 - €50.000</option>
                  <option value="50000-100000">€50.000 - €100.000</option>
                  <option value="100000+">€100.000+</option>
                </select>
                <ChevronDown className={styles.selectIcon} size={18} />
              </div>
            </label>

            <button type="button" className={styles.searchButton}>
              <Search size={18} />
              <span>Zoeken</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}