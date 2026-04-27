"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  Check,
  Globe,
  LogOut,
  Menu,
  PlusCircle,
  RotateCcw,
  UserRound,
  X,
} from "lucide-react";
import styles from "./Header.module.scss";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

type LanguageItem = {
  value: string;
  label: string;
};

type LanguageWithTimezone = {
  value: string;
  label: string;
  timezone: string;
  utcLabel: string;
};

const BASE_LANGUAGE = "nl";
const STORAGE_LANGUAGE_KEY = "site-language";
const STORAGE_TIMEZONE_KEY = "site-timezone";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Elite", href: "/elite" },
  { label: "Veilingen", href: "/veilingen" },
  { label: "Nieuws", href: "/nieuws" },
  { label: "Contact", href: "/contact" },
];

const languageNameMap: Record<string, string> = {
  nl: "Dutch",
  en: "English",
  fr: "French",
  de: "German",
  es: "Spanish",
  it: "Italian",
  pt: "Portuguese",
  vi: "Vietnamese",
  ja: "Japanese",
  ko: "Korean",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  ar: "Arabic",
  ru: "Russian",
  tr: "Turkish",
  pl: "Polish",
  cs: "Czech",
  sk: "Slovak",
  hu: "Hungarian",
  ro: "Romanian",
  bg: "Bulgarian",
  el: "Greek",
  uk: "Ukrainian",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  et: "Estonian",
  lv: "Latvian",
  lt: "Lithuanian",
  id: "Indonesian",
  ms: "Malay",
  th: "Thai",
  hi: "Hindi",
  bn: "Bengali",
  ur: "Urdu",
  fa: "Persian",
  he: "Hebrew",
  sw: "Swahili",
  af: "Afrikaans",
  ca: "Catalan",
  hr: "Croatian",
  sr: "Serbian",
  sl: "Slovenian",
  is: "Icelandic",
  mt: "Maltese",
  ga: "Irish",
  cy: "Welsh",
  mk: "Macedonian",
  sq: "Albanian",
};

const timezoneMap: Record<string, { timezone: string; utcLabel: string }> = {
  nl: { timezone: "Europe/Amsterdam", utcLabel: "UTC +1" },
  en: { timezone: "Europe/London", utcLabel: "UTC +0" },
  fr: { timezone: "Europe/Paris", utcLabel: "UTC +1" },
  de: { timezone: "Europe/Berlin", utcLabel: "UTC +1" },
  es: { timezone: "Europe/Madrid", utcLabel: "UTC +1" },
  it: { timezone: "Europe/Rome", utcLabel: "UTC +1" },
  pt: { timezone: "Europe/Lisbon", utcLabel: "UTC +0" },
  vi: { timezone: "Asia/Ho_Chi_Minh", utcLabel: "UTC +7" },
  ja: { timezone: "Asia/Tokyo", utcLabel: "UTC +9" },
  ko: { timezone: "Asia/Seoul", utcLabel: "UTC +9" },
  "zh-CN": { timezone: "Asia/Shanghai", utcLabel: "UTC +8" },
  "zh-TW": { timezone: "Asia/Taipei", utcLabel: "UTC +8" },
  ar: { timezone: "Asia/Dubai", utcLabel: "UTC +4" },
  ru: { timezone: "Europe/Moscow", utcLabel: "UTC +3" },
  tr: { timezone: "Europe/Istanbul", utcLabel: "UTC +3" },
  pl: { timezone: "Europe/Warsaw", utcLabel: "UTC +1" },
  cs: { timezone: "Europe/Prague", utcLabel: "UTC +1" },
  sk: { timezone: "Europe/Bratislava", utcLabel: "UTC +1" },
  hu: { timezone: "Europe/Budapest", utcLabel: "UTC +1" },
  ro: { timezone: "Europe/Bucharest", utcLabel: "UTC +2" },
  bg: { timezone: "Europe/Sofia", utcLabel: "UTC +2" },
  el: { timezone: "Europe/Athens", utcLabel: "UTC +2" },
  uk: { timezone: "Europe/Kyiv", utcLabel: "UTC +2" },
  sv: { timezone: "Europe/Stockholm", utcLabel: "UTC +1" },
  no: { timezone: "Europe/Oslo", utcLabel: "UTC +1" },
  da: { timezone: "Europe/Copenhagen", utcLabel: "UTC +1" },
  fi: { timezone: "Europe/Helsinki", utcLabel: "UTC +2" },
  et: { timezone: "Europe/Tallinn", utcLabel: "UTC +2" },
  lv: { timezone: "Europe/Riga", utcLabel: "UTC +2" },
  lt: { timezone: "Europe/Vilnius", utcLabel: "UTC +2" },
  id: { timezone: "Asia/Jakarta", utcLabel: "UTC +7" },
  ms: { timezone: "Asia/Kuala_Lumpur", utcLabel: "UTC +8" },
  th: { timezone: "Asia/Bangkok", utcLabel: "UTC +7" },
  hi: { timezone: "Asia/Kolkata", utcLabel: "UTC +5:30" },
  bn: { timezone: "Asia/Dhaka", utcLabel: "UTC +6" },
  ur: { timezone: "Asia/Karachi", utcLabel: "UTC +5" },
  fa: { timezone: "Asia/Tehran", utcLabel: "UTC +3:30" },
  he: { timezone: "Asia/Jerusalem", utcLabel: "UTC +2" },
  sw: { timezone: "Africa/Nairobi", utcLabel: "UTC +3" },
  af: { timezone: "Africa/Johannesburg", utcLabel: "UTC +2" },
  ca: { timezone: "Europe/Madrid", utcLabel: "UTC +1" },
  hr: { timezone: "Europe/Zagreb", utcLabel: "UTC +1" },
  sr: { timezone: "Europe/Belgrade", utcLabel: "UTC +1" },
  sl: { timezone: "Europe/Ljubljana", utcLabel: "UTC +1" },
  is: { timezone: "Atlantic/Reykjavik", utcLabel: "UTC +0" },
  mt: { timezone: "Europe/Malta", utcLabel: "UTC +1" },
  ga: { timezone: "Europe/Dublin", utcLabel: "UTC +0" },
  cy: { timezone: "Europe/London", utcLabel: "UTC +0" },
  mk: { timezone: "Europe/Skopje", utcLabel: "UTC +1" },
  sq: { timezone: "Europe/Tirane", utcLabel: "UTC +1" },
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getTimezoneInfo(lang: string) {
  return timezoneMap[lang] || timezoneMap[BASE_LANGUAGE];
}

function getLanguageDisplayName(lang: string, fallbackLabel: string) {
  return languageNameMap[lang] || fallbackLabel;
}

function getSavedLanguage() {
  if (typeof window === "undefined") return BASE_LANGUAGE;
  return window.localStorage.getItem(STORAGE_LANGUAGE_KEY) || BASE_LANGUAGE;
}

function getSavedTimezone() {
  if (typeof window === "undefined") return timezoneMap[BASE_LANGUAGE].timezone;
  return (
    window.localStorage.getItem(STORAGE_TIMEZONE_KEY) ||
    timezoneMap[BASE_LANGUAGE].timezone
  );
}

function formatCurrentTime(timezone: string) {
  if (!timezone) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "";
  }
}

function setGoogleTranslateCookie(lang: string) {
  if (typeof document === "undefined") return;

  const value = lang === BASE_LANGUAGE ? "" : `/${BASE_LANGUAGE}/${lang}`;
  const expires = lang === BASE_LANGUAGE ? "Thu, 01 Jan 1970 00:00:00 GMT" : "";

  document.cookie = `googtrans=${value};path=/;${expires ? `expires=${expires};` : ""}`;
  document.cookie = `googtrans=${value};path=/;domain=${window.location.hostname};${
    expires ? `expires=${expires};` : ""
  }`;
}

function removeGoogleTranslateArtifacts() {
  if (typeof window === "undefined") return;

  document.body.style.top = "0px";
  document.documentElement.style.marginTop = "0px";

  const selectors = [
    "iframe.goog-te-banner-frame",
    ".goog-te-banner-frame",
    "#goog-gt-tt",
    ".goog-tooltip",
    ".goog-text-highlight",
    ".goog-te-balloon-frame",
    ".VIpgJd-ZVi9od-aZ2wEe-wOHMyf",
    ".VIpgJd-ZVi9od-aZ2wEe-OiiCO",
    ".VIpgJd-ZVi9od-ORHb",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "none";
        el.style.visibility = "hidden";
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
      }
    });
  });
}

function initGoogleTranslate() {
  if (
    typeof window === "undefined" ||
    !window.google ||
    !window.google.translate ||
    !window.google.translate.TranslateElement
  ) {
    return;
  }

  const desktopEl = document.getElementById("google_translate_element_desktop");
  const mobileEl = document.getElementById("google_translate_element_mobile");

  if (desktopEl && desktopEl.childElementCount === 0) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: BASE_LANGUAGE,
        autoDisplay: false,
      },
      "google_translate_element_desktop",
    );
  }

  if (mobileEl && mobileEl.childElementCount === 0) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: BASE_LANGUAGE,
        autoDisplay: false,
      },
      "google_translate_element_mobile",
    );
  }
}

function readGoogleLanguages(): LanguageItem[] {
  if (typeof window === "undefined") return [];

  const select = document.querySelector(
    ".goog-te-combo",
  ) as HTMLSelectElement | null;

  const baseItem: LanguageItem = {
    value: BASE_LANGUAGE,
    label: languageNameMap[BASE_LANGUAGE] || "Dutch",
  };

  if (!select) return [baseItem];

  const googleItems = Array.from(select.options)
    .map((option) => ({
      value: option.value,
      label: option.text.trim(),
    }))
    .filter((item) => item.value && item.label);

  const hasBaseLanguage = googleItems.some((item) => item.value === BASE_LANGUAGE);

  return hasBaseLanguage ? googleItems : [baseItem, ...googleItems];
}

function triggerGoogleTranslate(lang: string) {
  if (!lang || lang === BASE_LANGUAGE) return false;

  const selects = document.querySelectorAll(".goog-te-combo");

  if (!selects.length) return false;

  selects.forEach((select) => {
    const el = select as HTMLSelectElement;
    el.value = lang;
    el.dispatchEvent(new Event("change"));
  });

  return true;
}

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [languages, setLanguages] = useState<LanguageItem[]>([
    {
      value: BASE_LANGUAGE,
      label: languageNameMap[BASE_LANGUAGE] || "Dutch",
    },
  ]);
  const [translateReady, setTranslateReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(BASE_LANGUAGE);
  const [selectedTimezone, setSelectedTimezone] = useState(
    timezoneMap[BASE_LANGUAGE].timezone,
  );
  const [currentTime, setCurrentTime] = useState("");

  const langRef = useRef<HTMLDivElement | null>(null);
  const mobileLangRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<number | null>(null);

  const languageOptions = useMemo<LanguageWithTimezone[]>(() => {
    return languages.map((item) => {
      const info = getTimezoneInfo(item.value);

      return {
        value: item.value,
        label: getLanguageDisplayName(item.value, item.label),
        timezone: info?.timezone || "",
        utcLabel: info?.utcLabel || "",
      };
    });
  }, [languages]);

  const selectedLanguageItem = useMemo(() => {
    return (
      languageOptions.find((item) => item.value === selectedLanguage) ??
      languageOptions.find((item) => item.value === BASE_LANGUAGE) ??
      null
    );
  }, [languageOptions, selectedLanguage]);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    const savedTimezone = getSavedTimezone();
    const info = getTimezoneInfo(savedLanguage);

    setSelectedLanguage(savedLanguage);
    setSelectedTimezone(savedTimezone || info?.timezone || "");
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const clickedDesktopLang = langRef.current?.contains(target);
      const clickedMobileLang = mobileLangRef.current?.contains(target);

      if (!clickedDesktopLang && !clickedMobileLang) {
        setLangOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function updateTime() {
      setCurrentTime(formatCurrentTime(selectedTimezone));
    }

    updateTime();

    const timer = window.setInterval(updateTime, 30000);

    return () => {
      window.clearInterval(timer);
    };
  }, [selectedTimezone]);

  useEffect(() => {
    const cleanupTimer = window.setInterval(() => {
      removeGoogleTranslateArtifacts();
    }, 1000);

    return () => {
      window.clearInterval(cleanupTimer);
    };
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      initGoogleTranslate();
      removeGoogleTranslateArtifacts();

      if (pollRef.current) {
        window.clearInterval(pollRef.current);
      }

      pollRef.current = window.setInterval(() => {
        const items = readGoogleLanguages();

        removeGoogleTranslateArtifacts();

        if (items.length > 0) {
          setLanguages(items);
          setTranslateReady(true);

          const savedLanguage = getSavedLanguage();
          const info = getTimezoneInfo(savedLanguage);

          setSelectedLanguage(savedLanguage);
          setSelectedTimezone(getSavedTimezone() || info?.timezone || "");

          if (savedLanguage && savedLanguage !== BASE_LANGUAGE) {
            window.setTimeout(() => {
              triggerGoogleTranslate(savedLanguage);

              window.setTimeout(() => {
                removeGoogleTranslateArtifacts();
              }, 300);
            }, 500);
          }

          window.setTimeout(() => {
            removeGoogleTranslateArtifacts();
          }, 150);

          if (pollRef.current) {
            window.clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      }, 300);
    };

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }

    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, []);

  function selectLanguage(item: LanguageWithTimezone) {
    const isChanged = selectedLanguage !== item.value;

    setSelectedLanguage(item.value);
    setSelectedTimezone(item.timezone);
    setLangOpen(false);
    setProfileOpen(false);
    setMobileOpen(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_LANGUAGE_KEY, item.value);
      window.localStorage.setItem(STORAGE_TIMEZONE_KEY, item.timezone);

      setGoogleTranslateCookie(item.value);
    }

    if (item.value !== BASE_LANGUAGE && translateReady) {
      triggerGoogleTranslate(item.value);
    }

    window.setTimeout(() => {
      removeGoogleTranslateArtifacts();

      if (isChanged) {
        window.location.reload();
      }
    }, 300);
  }

  function renderTranslateHeader() {
    return (
      <div className={styles.translateDropdownHeader}>
        <div className={styles.translateHeaderTop}>
          <span className={styles.translateHeaderCountry}>
            {selectedLanguageItem
              ? `${selectedLanguageItem.label}${
                  selectedLanguageItem.utcLabel
                    ? ` (${selectedLanguageItem.utcLabel})`
                    : ""
                }`
              : "Select language"}
          </span>
        </div>

        {currentTime ? (
          <div className={styles.translateHeaderMeta}>
            <span>{currentTime}</span>
          </div>
        ) : null}
      </div>
    );
  }

  function renderLanguageList() {
    if (!translateReady && languageOptions.length <= 1) {
      return <div className={styles.languageLoading}>Laden...</div>;
    }

    return languageOptions.map((item) => {
      const active = selectedLanguage === item.value;

      return (
        <button
          key={item.value}
          type="button"
          className={`${styles.languageButton} ${
            active ? styles.languageButtonActive : ""
          }`}
          onClick={() => selectLanguage(item)}
        >
          <span className={styles.languageButtonMain}>
            <span className={styles.languageCountry}>
              {item.label}
              {item.utcLabel ? ` (${item.utcLabel})` : ""}
            </span>

            {active ? <Check size={15} strokeWidth={2.4} /> : null}
          </span>
        </button>
      );
    });
  }

  return (
    <>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      <header className={`${styles.header} notranslate`} translate="no">
        <div className={styles.inner}>
          <Link href="/" className={styles.logoLink} aria-label="Hippique Auctions">
            <Image
              src="/img/logo/logo.png"
              alt="Hippique Auctions"
              width={320}
              height={90}
              priority
              className={styles.logo}
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Hoofdnavigatie">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${active ? styles.active : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.desktopActions}>
            <div className={styles.translateDropdown} ref={langRef}>
              <button
                type="button"
                className={`${styles.translateIconButton} ${
                  langOpen ? styles.translateIconButtonOpen : ""
                }`}
                aria-label="Taal en tijdzone kiezen"
                aria-expanded={langOpen}
                onClick={() => {
                  setLangOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
              >
                <Globe size={18} strokeWidth={2} />
              </button>

              <div
                className={`${styles.translateDropdownMenu} ${
                  langOpen ? styles.translateDropdownMenuOpen : ""
                }`}
              >
                {renderTranslateHeader()}

                <div className={styles.languageList}>{renderLanguageList()}</div>

                <div
                  id="google_translate_element_desktop"
                  className={styles.googleTranslateHost}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className={styles.profileDropdown} ref={profileRef}>
              <button
                type="button"
                className={`${styles.profileIconButton} ${
                  profileOpen ? styles.profileIconButtonOpen : ""
                }`}
                aria-label="Accountmenu openen"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setLangOpen(false);
                }}
              >
                <UserRound size={18} strokeWidth={2} />
              </button>

              <div
                className={`${styles.profileDropdownMenu} ${
                  profileOpen ? styles.profileDropdownMenuOpen : ""
                }`}
              >
                <div className={styles.profileDropdownHeader}>
                  <span>Welkom terug</span>
                  <strong>Premium lid</strong>
                </div>

                <Link href="/profiel" className={styles.profileDropdownItem}>
                  <UserRound size={17} strokeWidth={2.1} />
                  <span>Mijn profiel</span>
                </Link>

                <Link
                  href="/advertentie-plaatsen"
                  className={styles.profileDropdownItem}
                >
                  <PlusCircle size={17} strokeWidth={2.1} />
                  <span>Advertentie plaatsen</span>
                </Link>

                <Link href="/opnieuw-verkopen" className={styles.profileDropdownItem}>
                  <RotateCcw size={17} strokeWidth={2.1} />
                  <span>Opnieuw verkopen</span>
                </Link>

                <Link
                  href="/inloggen"
                  className={`${styles.profileDropdownItem} ${styles.profileDropdownLogout}`}
                >
                  <LogOut size={17} strokeWidth={2.1} />
                  <span>Uitloggen</span>
                </Link>
              </div>
            </div>

            <Link href="/registreren" className={styles.registerButton}>
              Registreren
            </Link>

            <Link href="/inloggen" className={styles.loginButton}>
              Inloggen
            </Link>
          </div>

          <div
            className={`${styles.mobileHeaderActions} ${
              mobileOpen ? styles.mobileHeaderActionsHidden : ""
            }`}
          >
            <div className={styles.mobileTranslateDropdown} ref={mobileLangRef}>
              <button
                type="button"
                className={`${styles.mobileTranslateButton} ${
                  langOpen ? styles.mobileTranslateButtonOpen : ""
                }`}
                aria-label="Taal en tijdzone kiezen"
                aria-expanded={langOpen}
                onClick={() => {
                  setLangOpen((prev) => !prev);
                  setProfileOpen(false);
                  setMobileOpen(false);
                }}
              >
                <Globe size={19} strokeWidth={2} />
              </button>

              <div
                className={`${styles.mobileTranslateMenu} ${
                  langOpen ? styles.mobileTranslateMenuOpen : ""
                }`}
              >
                {renderTranslateHeader()}

                <div className={styles.languageList}>{renderLanguageList()}</div>

                <div
                  id="google_translate_element_mobile"
                  className={styles.googleTranslateHost}
                  aria-hidden="true"
                />
              </div>
            </div>

            <button
              type="button"
              className={styles.mobileToggle}
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen(true);
                setLangOpen(false);
              }}
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div
          className={`${styles.mobileOverlay} ${
            mobileOpen ? styles.mobileOverlayOpen : ""
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={`${styles.mobileDrawer} ${
            mobileOpen ? styles.mobileDrawerOpen : ""
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className={styles.mobileDrawerHeader}>
            <Link
              href="/"
              className={styles.mobileLogoLink}
              aria-label="Hippique Auctions"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/img/logo/logo.png"
                alt="Hippique Auctions"
                width={240}
                height={68}
                className={styles.mobileLogo}
              />
            </Link>

            <button
              type="button"
              className={styles.mobileClose}
              aria-label="Menu sluiten"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Hoofdnavigatie mobiel">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${
                    active ? styles.mobileActive : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.mobileActions}>
            <Link
              href="/profiel"
              className={styles.mobileProfileButton}
              onClick={() => setMobileOpen(false)}
            >
              <UserRound size={18} strokeWidth={2} />
              <span>Mijn profiel</span>
            </Link>

            <Link
              href="/advertentie-plaatsen"
              className={styles.mobileProfileButton}
              onClick={() => setMobileOpen(false)}
            >
              <PlusCircle size={18} strokeWidth={2} />
              <span>Advertentie plaatsen</span>
            </Link>

            <Link
              href="/opnieuw-verkopen"
              className={styles.mobileProfileButton}
              onClick={() => setMobileOpen(false)}
            >
              <RotateCcw size={18} strokeWidth={2} />
              <span>Opnieuw verkopen</span>
            </Link>

            <Link
              href="/registreren"
              className={styles.registerButton}
              onClick={() => setMobileOpen(false)}
            >
              Registreren
            </Link>

            <Link
              href="/inloggen"
              className={styles.loginButton}
              onClick={() => setMobileOpen(false)}
            >
              Inloggen
            </Link>

            <Link
              href="/inloggen"
              className={styles.mobileLogoutButton}
              onClick={() => setMobileOpen(false)}
            >
              <LogOut size={18} strokeWidth={2} />
              <span>Uitloggen</span>
            </Link>
          </div>
        </aside>
      </header>
    </>
  );
}