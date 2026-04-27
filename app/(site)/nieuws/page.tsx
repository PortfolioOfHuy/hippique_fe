import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import { newsItems } from "@/components/modules/site/news/news-data";
import styles from "./NewsPage.module.scss";

export default function NewsPage() {
  const featuredNews = newsItems[0];
  const otherNews = newsItems.slice(1);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.kicker}>Nieuws & inzichten</span>

        <h1>Laatste nieuws uit de hippische veilingwereld</h1>

        <p>
          Ontdek updates, marktinzichten en praktische informatie over
          paardenveilingen, embryo’s, sperma-aanbiedingen, partners en
          internationale verkoop.
        </p>
      </section>

      <section className={styles.featuredSection}>
        <article className={styles.featuredCard}>
          <a
            href={`/nieuws/${featuredNews.slug}`}
            className={styles.featuredImage}
            aria-label={featuredNews.title}
          >
            <Image
              src={featuredNews.image}
              alt={featuredNews.imageAlt}
              width={760}
              height={520}
              priority
            />
          </a>

          <div className={styles.featuredContent}>
            <span className={styles.category}>{featuredNews.category}</span>

            <h2>
              <a href={`/nieuws/${featuredNews.slug}`}>
                {featuredNews.title}
              </a>
            </h2>

            <p>{featuredNews.summary}</p>

            <div className={styles.meta}>
              <span>
                <CalendarDays size={16} strokeWidth={2} />
                {featuredNews.date}
              </span>

              <span>
                <Clock3 size={16} strokeWidth={2} />
                {featuredNews.readTime}
              </span>
            </div>

            <a
              href={`/nieuws/${featuredNews.slug}`}
              className={styles.readMore}
            >
              <span>Lees meer</span>
              <ArrowRight size={17} strokeWidth={2.2} />
            </a>
          </div>
        </article>
      </section>

      <section className={styles.newsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.kicker}>Alle artikelen</span>
          <h2>Nieuwsoverzicht</h2>
        </div>

        <div className={styles.newsGrid}>
          {otherNews.map((item) => (
            <article key={item.id} className={styles.newsCard}>
              <a
                href={`/nieuws/${item.slug}`}
                className={styles.cardImage}
                aria-label={item.title}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={520}
                  height={360}
                />
              </a>

              <div className={styles.cardContent}>
                <span className={styles.category}>{item.category}</span>

                <h3>
                  <a href={`/nieuws/${item.slug}`}>{item.title}</a>
                </h3>

                <p>{item.summary}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.metaSmall}>
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>

                  <a
                    href={`/nieuws/${item.slug}`}
                    className={styles.cardArrow}
                    aria-label={`Lees meer over ${item.title}`}
                  >
                    <ArrowRight size={18} strokeWidth={2.2} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}