import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Share2,
} from "lucide-react";
import {
  getNewsBySlug,
  getRelatedNews,
} from "@/components/modules/site/news/news-data";
import styles from "./NewsDetailPage.module.scss";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Nieuws niet gevonden - Hippique Auctions",
    };
  }

  return {
    title: `${news.title} - Hippique Auctions`,
    description: news.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  await connection();

  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const relatedNews = getRelatedNews(news.slug);

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Link href="/nieuws" className={styles.backLink}>
          <ArrowLeft size={17} strokeWidth={2.2} />
          <span>Terug naar nieuws</span>
        </Link>

        <header className={styles.hero}>
          <span className={styles.category}>{news.category}</span>

          <h1>{news.title}</h1>

          <p>{news.summary}</p>

          <div className={styles.meta}>
            <span>
              <CalendarDays size={16} strokeWidth={2} />
              {news.date}
            </span>

            <span>
              <Clock3 size={16} strokeWidth={2} />
              {news.readTime}
            </span>
          </div>
        </header>

        <div className={styles.imageWrap}>
          <Image
            src={news.image}
            alt={news.imageAlt}
            width={1280}
            height={720}
            priority
          />
        </div>

        <div className={styles.bodyLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <span>Artikel delen</span>

              <button type="button">
                <Share2 size={17} strokeWidth={2.2} />
                Delen
              </button>
            </div>

            <div className={styles.sidebarCard}>
              <span>Categorie</span>
              <strong>{news.category}</strong>
            </div>
          </aside>

          <div className={styles.content}>
            {news.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className={styles.noteBox}>
              <h2>Wilt u deelnemen aan een veiling?</h2>

              <p>
                Maak een account aan, bekijk de beschikbare kavels of plaats uw
                eigen advertentie via het verkopersportaal.
              </p>

              <div className={styles.noteActions}>
                <Link href="/registreren">Registreren</Link>
                <Link href="/advertentie-plaatsen">
                  Advertentie plaatsen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <span>Meer nieuws</span>
          <h2>Gerelateerde artikelen</h2>
        </div>

        <div className={styles.relatedGrid}>
          {relatedNews.map((item) => (
            <article key={item.id} className={styles.relatedCard}>
              <Link
                href={`/nieuws/${item.slug}`}
                className={styles.relatedImage}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={420}
                  height={280}
                />
              </Link>

              <div className={styles.relatedContent}>
                <span>{item.category}</span>

                <h3>
                  <Link href={`/nieuws/${item.slug}`}>{item.title}</Link>
                </h3>

                <Link
                  href={`/nieuws/${item.slug}`}
                  className={styles.relatedLink}
                >
                  Lees artikel
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}