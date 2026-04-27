import { notFound } from "next/navigation";
import Image from "next/image";
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

type AuctionStatus = "upcoming" | "live" | "ended";

function getAuctionStatusLabel(status: AuctionStatus) {
  if (status === "live") return "Live veiling";
  if (status === "upcoming") return "Binnenkort";
  return "Veiling gesloten";
}

function getBidPermissionLabel(canBid: boolean) {
  return canBid ? "Je kunt bieden" : "Bieden niet mogelijk";
}

function getBidPermissionText({
  isAuctionLive,
  canBid,
}: {
  isAuctionLive: boolean;
  canBid: boolean;
}) {
  if (!isAuctionLive) {
    return "Deze veiling is momenteel niet geopend voor biedingen.";
  }

  if (canBid) {
    return "Je account voldoet aan de voorwaarden om een bod te plaatsen.";
  }

  return "Deze veiling is live, maar je account voldoet nog niet aan alle biedvoorwaarden.";
}

export default async function HorseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const horse = getHorseBySlug(slug);

  const auctionEndsAt = "2026-08-23T19:59:00";

  /**
   * Later kun je deze waarden uit je backend/session halen:
   * - isAuctionLive: status van de veiling zelf
   * - canBid: of de huidige gebruiker mag bieden
   *
   * Voorbeeld:
   * const isAuctionLive = auction.status === "LIVE";
   * const canBid =
   *   user.isLoggedIn &&
   *   user.emailVerified &&
   *   user.phoneVerified &&
   *   user.depositActive &&
   *   !user.isBlocked;
   */
  const auctionStatus: AuctionStatus = "live";
  const isAuctionLive = auctionStatus === "live";

  /**
   * Zet deze tijdelijk op true om de variant "Je kunt bieden" te testen.
   * Zet false om te tonen dat de veiling live is, maar de gebruiker nog niet mag bieden.
   */
  const canBid = false;

  const bidPermissionLabel = getBidPermissionLabel(canBid);
  const bidPermissionText = getBidPermissionText({
    isAuctionLive,
    canBid,
  });

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

  const relatedAuctionHorses = auctionHorses
    .filter((item) => item.slug !== horse.slug)
    .slice(0, 3);

  return (
    <main className={styles.page}>
      <div className={styles.auctionBar}>
        <div className={styles.inner}>
          <div className={styles.auctionBarLeft}>
            <div className={styles.auctionMeta}>
              <span className={styles.liveBadge}>
                {getAuctionStatusLabel(auctionStatus)}
              </span>

              <span className={styles.eventCode}>
                Evenement-ID: EC-2026-AUG
              </span>
            </div>

            <div>
              <h1 className={styles.collectionTitle}>
                De Heritage Sportpaarden Collectie
              </h1>

              <p className={styles.collectionSubtitle}>
                Zorgvuldig geselecteerde sportpaarden uit Europese en
                Noord-Amerikaanse topfoklijnen.{" "}
                {isAuctionLive
                  ? "De veiling is live. Controleer je biedstatus om te zien of je een bod kunt plaatsen."
                  : "Deze veiling is momenteel niet geopend voor biedingen."}
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
          <a href="/veilingen" className={styles.backLink}>
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
                  Een eersteklas sportpaard met een uitzonderlijke bloedlijn en
                  elite-afstamming.
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
            <div className={styles.bidStatusCard}>
              <div>
                <span className={styles.bidStatusLabel}>Biedstatus</span>

                <strong
                  className={
                    canBid ? styles.bidStatusAvailable : styles.bidStatusBlocked
                  }
                >
                  {bidPermissionLabel}
                </strong>
              </div>

              <p>{bidPermissionText}</p>

              {!canBid ? (
                <a href="/profiel" className={styles.bidStatusAction}>
                  Biedvoorwaarden controleren
                </a>
              ) : null}
            </div>

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
            rondes.
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
                De vader, Emerald van&apos;t Ruytershof, geldt als een pijler
                van de moderne springsport. Zijn nakomelingen combineren kracht,
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

        {relatedAuctionHorses.length > 0 ? (
          <section className={styles.relatedHorsesSection}>
            <div className={styles.relatedHorsesHeader}>
              <div>
                <span className={styles.relatedHorsesKicker}>
                  Veilingcollectie
                </span>

                <h3 className={styles.relatedHorsesTitle}>
                  Andere veilingpaarden
                </h3>
              </div>

              <a href="/veilingen" className={styles.relatedHorsesViewAll}>
                Bekijk alle kavels →
              </a>
            </div>

            <div className={styles.relatedHorsesGrid}>
              {relatedAuctionHorses.map((item) => {
                const href = `/paarden/${item.slug}`;

                return (
                  <article key={item.id} className={styles.relatedHorseCard}>
                    <a href={href} className={styles.relatedHorseImageLink}>
                      <div className={styles.relatedHorseImageWrap}>
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className={styles.relatedHorseImage}
                          sizes="(max-width: 991px) 100vw, 33vw"
                        />

                        <span className={styles.relatedHorseBadge}>
                          {item.badge}
                        </span>
                      </div>
                    </a>

                    <div className={styles.relatedHorseBody}>
                      <h4 className={styles.relatedHorseTitle}>
                        <a href={href}>{item.title}</a>
                      </h4>

                      <p className={styles.relatedHorseSubtitle}>
                        {item.subtitle}
                      </p>

                      <div className={styles.relatedHorseMeta}>
                        <span>{item.location}</span>
                        <span>{item.discipline}</span>
                      </div>

                      <div className={styles.relatedHorseBottom}>
                        <div>
                          <span className={styles.relatedHorsePriceLabel}>
                            Huidig bod
                          </span>

                          <strong className={styles.relatedHorsePrice}>
                            {item.bid}
                          </strong>
                        </div>

                        <a href={href} className={styles.relatedHorseButton}>
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