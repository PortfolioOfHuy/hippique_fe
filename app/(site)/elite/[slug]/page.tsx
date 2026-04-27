import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Heart, Play, Share2 } from "lucide-react";
import {
  getEliteHorses,
  getHorseBySlug,
} from "@/components/modules/site/home/data/horses";
import AuctionCountdown from "./AuctionCountdown";
import styles from "./EliteDetailPage.module.scss";
import AuctionBidPanel from "./AuctionBidPanel";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EliteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const horse = getHorseBySlug(slug);

  const auctionEndsAt = "2026-08-23T19:59:00";

  if (!horse || horse.category !== "elite") {
    notFound();
  }

  const eliteHorses = getEliteHorses();
  const currentIndex = eliteHorses.findIndex((item) => item.slug === slug);

  const nextHorse =
    currentIndex >= 0 && eliteHorses.length > 0
      ? eliteHorses[(currentIndex + 1) % eliteHorses.length]
      : null;

  const nextHorseHref = nextHorse ? `/elite/${nextHorse.slug}` : "/elite";
  const lotNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

  const relatedEliteHorses = eliteHorses
    .filter((item) => item.slug !== horse.slug)
    .slice(0, 3);

  return (
    <main className={styles.page}>
      <div className={styles.auctionBar}>
        <div className={styles.auctionInner}>
          <div className={styles.auctionBarLeft}>
            <div className={styles.auctionMeta}>
              <span className={styles.liveBadge}>Live veiling</span>
              <span className={styles.eventCode}>Event-ID: EC-2026-AUG</span>
            </div>

            <div>
              <h1 className={styles.collectionTitle}>
                De Heritage Sportpaarden Collectie
              </h1>

              <p className={styles.collectionSubtitle}>
                Exclusief geselecteerde elitepaarden uit vooraanstaande Europese
                en Noord-Amerikaanse bloedlijnen. Live bieden is nu actief.
              </p>
            </div>
          </div>

          <div className={styles.auctionBarRight}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Veiling eindigt over</span>
              <strong className={styles.statValue} suppressHydrationWarning>
                <AuctionCountdown endsAt={auctionEndsAt} />
              </strong>
            </div>

            <div className={styles.statBox}>
              <span className={styles.statLabel}>Geregistreerde bieders</span>
              <strong className={styles.statValue1}>142</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.topNav}>
          <a href="/elite" className={styles.backLink}>
            ← Terug naar collectie
          </a>

          <div className={styles.topNavRight}>
            <span className={styles.lotBadge}>
              Kavel #{String(lotNumber).padStart(2, "0")}
            </span>

            <span className={styles.periodText}>
              Biedperiode · 17-03-2026 - 23-08-2026 | 19:59
            </span>

            <a href={nextHorseHref} className={styles.nextLotButton}>
              Volgende kavel →
            </a>
          </div>
        </div>

        <section className={styles.heroGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.titleRow}>
              <div className={styles.titleContent}>
                <h2 className={styles.horseTitle}>{horse.title}</h2>

                <p className={styles.horseSubtitle}>
                  Een springprospect van wereldklasse met uitzonderlijke
                  afstamming en een elitebloedlijn.
                </p>
              </div>

              <div className={styles.titleActions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Toevoegen aan favorieten"
                >
                  <Heart size={18} strokeWidth={1.8} />
                </button>

                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Delen"
                >
                  <Share2 size={18} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div className={styles.gallery}>
              <div className={styles.mainImageWrap}>
                <Image
                  src={horse.image}
                  alt={horse.imageAlt}
                  fill
                  className={styles.mainImage}
                  priority
                  sizes="(max-width: 991px) 100vw, 56vw"
                />
              </div>

              <div className={styles.sideImages}>
                <div className={styles.sideImageWrap}>
                  <Image
                    src={horse.image}
                    alt={horse.imageAlt}
                    fill
                    className={styles.sideImage}
                    sizes="(max-width: 991px) 50vw, 18vw"
                  />
                </div>

                <div className={styles.sideImageWrap}>
                  <Image
                    src={horse.image}
                    alt={horse.imageAlt}
                    fill
                    className={styles.sideImage}
                    sizes="(max-width: 991px) 50vw, 18vw"
                  />
                </div>
              </div>
            </div>

            <div className={styles.specPanel}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Geboortedatum</span>
                <strong className={styles.specValue}>12 mei 2018</strong>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Schofthoogte</span>
                <strong className={styles.specValue}>{horse.height}</strong>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Stamboek</span>
                <strong className={styles.specValue}>{horse.breed}</strong>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Kleur</span>
                <strong className={styles.specValue}>Bruin</strong>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Geslacht</span>
                <strong className={styles.specValue}>{horse.gender}</strong>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Huidige locatie</span>
                <strong className={styles.specValue}>{horse.location}</strong>
              </div>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <AuctionBidPanel horse={horse} />

            <div className={styles.activityCard}>
              <div className={styles.activityTopNote}>
                Je hebt nog geen bod geplaatst
              </div>

              <div className={styles.activityHeader}>
                <h3 className={styles.activityTitle}>Recente biedactiviteit</h3>
              </div>

              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div>
                    <strong>Bieder #712</strong>
                    <span>2 min geleden</span>
                  </div>

                  <strong>€ 64.500</strong>
                </div>

                <div className={styles.activityItem}>
                  <div>
                    <strong>Bieder #104</strong>
                    <span>5 min geleden</span>
                  </div>

                  <strong>€ 63.000</strong>
                </div>

                <div className={styles.activityItem}>
                  <div>
                    <strong>Bieder #889</strong>
                    <span>12 min geleden</span>
                  </div>

                  <strong>€ 62.500</strong>
                </div>
              </div>

              <button type="button" className={styles.historyButton}>
                Bekijk alle biedingen
              </button>
            </div>
          </aside>
        </section>

        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionTitle}>Notitie van de curator</h3>

          <p className={styles.sectionText}>
            {horse.title} is een modern sportpaard met uitzonderlijke
            bloedlijnen. Hij toont een ritmische, gronddekkende galop en een
            zorgvuldige techniek over de hindernissen. Momenteel presteert hij
            succesvol in rubrieken voor jonge paarden met constante foutloze
            rondes. Het veterinaire rapport en de röntgenopnames zijn
            beschikbaar in de beveiligde documentatie.
          </p>

          <div className={styles.videoCard}>
            <div className={styles.videoImageWrap}>
              <Image
                src={horse.image}
                alt={horse.imageAlt}
                fill
                className={styles.videoImage}
                sizes="100vw"
              />

              <button
                type="button"
                className={styles.playButton}
                aria-label="Video afspelen"
              >
                <Play size={26} fill="currentColor" />
              </button>

              <span className={styles.videoLabel}>4K prestatievideo</span>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.decorTitleWrap}>
            <span className={styles.decorLine} />
            <h3 className={styles.sectionTitleLarge}>
              Bloedlijn & prestaties
            </h3>
          </div>

          <div className={styles.twoColumnText}>
            <div className={styles.textCard}>
              <h4>Vaderlijn</h4>

              <p>
                De vaderlijn staat bekend om modern springvermogen, elasticiteit
                en scherpte op de hindernis. Deze afstamming levert al jarenlang
                paarden voor internationaal topniveau.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Moederlijn</h4>

              <p>
                De moederlijn is prestatiegericht gefokt met focus op balans,
                voorzichtigheid en instelling. Hierdoor ontstaat een complete en
                commercieel zeer interessante combinatie.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Prestatiehoogtepunten</h4>

              <p>
                {horse.title} heeft vroeg in zijn ontwikkeling veel kwaliteit
                laten zien. De combinatie van kracht, reactievermogen en
                rijdbaarheid maakt hem geschikt voor ambitieuze sportstallen.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Foknotities</h4>

              <p>
                Dankzij zijn moderne model, sterke bovenlijn en
                prestatie-afstamming is dit paard niet alleen interessant voor
                sport, maar ook voor toekomstige fokkerij.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionTitleLarge}>
            Documentatie & rapporten
          </h3>

          <div className={styles.accordionList}>
            <button type="button" className={styles.accordionItem}>
              <span>Veterinaire keuring</span>
              <ChevronDown size={18} strokeWidth={1.8} />
            </button>

            <button type="button" className={styles.accordionItem}>
              <span>Röntgenfoto&apos;s</span>
              <ChevronDown size={18} strokeWidth={1.8} />
            </button>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.decorTitleWrap}>
            <span className={styles.decorLine} />
            <h3 className={styles.sectionTitleLarge}>
              Pedigree & afstamming
            </h3>
          </div>

          <div className={styles.pedigreePanel}>
            <div className={styles.pedigreeGrid}>
              <div className={styles.pedigreeMainCard}>
                <span className={styles.pedigreeType}>Vader</span>
                <strong>{horse.pedigree[0] ?? "Onbekend"}</strong>
                <span>{horse.breed}</span>
              </div>

              <div className={styles.pedigreeMainCard}>
                <span className={styles.pedigreeType}>Moeder</span>
                <strong>{horse.pedigree[1] ?? "Onbekend"}</strong>
                <span>{horse.breed}</span>
              </div>

              <div className={styles.pedigreeColumn}>
                <div className={styles.pedigreeMiniCard}>
                  Diamant de Semilly
                </div>
                <div className={styles.pedigreeMiniCard}>Carthina Z</div>
                <div className={styles.pedigreeMiniCard}>Nabab de Reve</div>
                <div className={styles.pedigreeMiniCard}>Ulara</div>
              </div>

              <div className={styles.pedigreeColumn}>
                <div className={styles.pedigreeMiniCard}>Le Tot de Semilly</div>
                <div className={styles.pedigreeMiniCard}>Carthago Z</div>
                <div className={styles.pedigreeMiniCard}>Quidam de Revel</div>
                <div className={styles.pedigreeMiniCard}>Chin Chin</div>
              </div>

              <div className={styles.pedigreeColumnThin}>
                <span>Grand Veneur</span>
                <span>Capitol I</span>
                <span>Perra</span>
                <span>Constant</span>
                <span>Larso</span>
                <span>Aime Z</span>
              </div>
            </div>
          </div>
        </section>

        {relatedEliteHorses.length > 0 ? (
          <section className={styles.relatedEliteSection}>
            <div className={styles.relatedEliteHeader}>
              <div>
                <span className={styles.relatedEliteKicker}>
                  Elite collectie
                </span>

                <h3 className={styles.relatedEliteTitle}>
                  Andere elitepaarden
                </h3>
              </div>

              <a href="/elite" className={styles.relatedEliteViewAll}>
                Bekijk alle elitepaarden →
              </a>
            </div>

            <div className={styles.relatedEliteGrid}>
              {relatedEliteHorses.map((item) => {
                const href = `/elite/${item.slug}`;

                return (
                  <article key={item.id} className={styles.relatedEliteCard}>
                    <a href={href} className={styles.relatedEliteImageLink}>
                      <div className={styles.relatedEliteImageWrap}>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className={styles.relatedEliteImage}
                          sizes="(max-width: 991px) 100vw, 33vw"
                        />

                        <span className={styles.relatedEliteBadge}>
                          {item.badge}
                        </span>
                      </div>
                    </a>

                    <div className={styles.relatedEliteBody}>
                      <h4 className={styles.relatedEliteCardTitle}>
                        <a href={href}>{item.title}</a>
                      </h4>

                      <p className={styles.relatedEliteSubtitle}>
                        {item.subtitle}
                      </p>

                      <div className={styles.relatedEliteMeta}>
                        <span>{item.location}</span>
                        <span>{item.discipline}</span>
                      </div>

                      <div className={styles.relatedEliteBottom}>
                        <div>
                          <span className={styles.relatedElitePriceLabel}>
                            Huidig bod
                          </span>

                          <strong className={styles.relatedElitePrice}>
                            {item.bid}
                          </strong>
                        </div>

                        <a href={href} className={styles.relatedEliteButton}>
                          Details bekijken
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}