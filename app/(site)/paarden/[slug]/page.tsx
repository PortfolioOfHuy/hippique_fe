import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, Play, Share2 } from "lucide-react";
import {
  getHorseBySlug,
  horses as allHorses,
} from "@/components/modules/site/home/data/horses";
import AuctionCountdown from "./AuctionCountdown";
import AuctionBidPanel from "./AuctionBidPanel";
import styles from "./HorseDetailPage.module.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function HorseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const horse = getHorseBySlug(slug);

  const auctionEndsAt = "2026-08-23T19:59:00";

  if (!horse || horse.category === "elite") {
    notFound();
  }

  const auctionHorses = allHorses.filter((item) => item.category !== "elite");
  const currentIndex = auctionHorses.findIndex((item) => item.slug === slug);

  const nextHorse =
    currentIndex >= 0 && auctionHorses.length > 0
      ? auctionHorses[(currentIndex + 1) % auctionHorses.length]
      : null;

  const nextHorseHref = nextHorse ? `/paarden/${nextHorse.slug}` : "/veilingen";
  const lotNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

  return (
    <main className={styles.page}>
      <div className={styles.auctionBar}>
        <div className={styles.inner}>
          <div className={styles.auctionBarLeft}>
            <div className={styles.auctionMeta}>
              <span className={styles.liveBadge}>Live veiling</span>
              <span className={styles.eventCode}>Event ID: EC-2026-AUG</span>
            </div>

            <div>
              <h1 className={styles.collectionTitle}>
                The Heritage Sport Horse Collection
              </h1>

              <p className={styles.collectionSubtitle}>
                Zorgvuldig geselecteerde sportpaarden uit Europese en
                Noord-Amerikaanse topfoklijnen. Live bieden actief.
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
              <strong className={styles.statValue}>142</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.topNav}>
          <Link href="/veilingen" scroll className={styles.backLink}>
            ← Terug naar collectie
          </Link>

          <div className={styles.topNavRight}>
            <span className={styles.lotBadge}>
              Lot #{String(lotNumber).padStart(2, "0")}
            </span>

            <span className={styles.periodText}>
              Biedperiode · 17/03/26 - 23/08/26 | 19:59
            </span>

            <Link href={nextHorseHref} scroll className={styles.nextLotButton}>
              Volgende lot →
            </Link>
          </div>
        </div>

        <section className={styles.heroGrid}>
          <div className={styles.mainColumn}>
            <div className={styles.titleRow}>
              <div className={styles.titleContent}>
                <h2 className={styles.horseTitle}>{horse.title}</h2>

                <p className={styles.horseSubtitle}>
                  Een eersteklas sportpaard met uitzonderlijke bloedlijn en
                  elite afstamming.
                </p>
              </div>

              <div className={styles.titleActions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Favoriet"
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
                <strong className={styles.specValue}>Bright Bay</strong>
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
            zorgvuldige techniek over de hindernissen. Momenteel succesvol in de
            rubrieken voor jonge paarden met constante foutloze rondes.
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

              <span className={styles.videoLabel}>4K performance reel</span>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <div className={styles.decorTitleWrap}>
            <span className={styles.decorLine} />
            <h3 className={styles.sectionTitleLarge}>Bloedlijn & prestaties</h3>
          </div>

          <div className={styles.twoColumnText}>
            <div className={styles.textCard}>
              <h4>Vaderlijn</h4>

              <p>
                De vader, Emerald van&apos;t Ruytershof, geldt als een pijler
                van moderne springsport. Zijn nakomelingen combineren kracht,
                snelheid en reflexen met uitzonderlijke techniek.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Moederlijn</h4>

              <p>
                De moederlijn komt uit een sterke prestatiegerichte familie,
                bekend om vermogen, balans en karakter. Deze basis zorgt voor
                een interessant profiel voor sport en fokkerij.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Prestatiehoogtepunten</h4>

              <p>
                {horse.title} heeft vroeg in zijn ontwikkeling veel kwaliteit
                getoond en combineert atletisch vermogen met focus en
                rijdbaarheid in de ring.
              </p>
            </div>

            <div className={styles.textCard}>
              <h4>Foknotities</h4>

              <p>
                Deze combinatie van bloed, type en prestatie maakt dit paard
                bijzonder aantrekkelijk voor ambitieuze sportstallen en
                investeerders.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionBlock}>
          <h3 className={styles.sectionTitleLarge}>Documentatie & rapporten</h3>

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
            <h3 className={styles.sectionTitleLarge}>Pedigree & afstamming</h3>
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
      </div>
    </main>
  );
}