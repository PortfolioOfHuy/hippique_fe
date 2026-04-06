"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import styles from "./header.module.scss";
import { headerFont } from "./headerFont";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            autoDisplay?: boolean;
            layout?: unknown;
          },
          elementId: string,
        ) => void;
      };
    };
  }
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Veilingen", href: "/auctions" },
  { label: "Nieuws", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const languages = [
  { label: "Nederlands", value: "nl" },
  { label: "English", value: "en" },
  { label: "Tiếng Việt", value: "vi" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]',
    );

    window.googleTranslateElementInit = () => {
      if (
        !window.google?.translate?.TranslateElement ||
        document.getElementById("google_translate_element")?.childElementCount
      ) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "nl",
          includedLanguages: "nl,en,vi,fr,de",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      cleanupGoogleTranslateUI();
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const cleanupGoogleTranslateUI = () => {
    document.body.style.top = "0px";
    document.body.style.position = "static";

    const selectors = [
      ".goog-te-banner-frame",
      ".goog-te-banner-frame.skiptranslate",
      ".goog-te-balloon-frame",
      ".goog-tooltip",
      ".goog-text-highlight",
      "#goog-gt-tt",
      "iframe.skiptranslate",
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        const element = el as HTMLElement;
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
        element.style.pointerEvents = "none";
        element.style.height = "0";
        element.style.maxHeight = "0";
      });
    });

    document
      .querySelectorAll("font.goog-text-highlight, span.goog-text-highlight")
      .forEach((el) => {
        const element = el as HTMLElement;
        element.style.background = "transparent";
        element.style.boxShadow = "none";
        element.style.color = "inherit";
      });
  };

  const setGoogleTranslateLanguage = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;

    if (!select) return;

    document.cookie = `googtrans=/nl/${lang};path=/`;
    document.cookie = `googtrans=/nl/${lang};path=/;domain=${window.location.hostname}`;

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    setLangOpen(false);

    setTimeout(() => {
      cleanupGoogleTranslateUI();
    }, 50);

    setTimeout(() => {
      cleanupGoogleTranslateUI();
    }, 300);

    setTimeout(() => {
      cleanupGoogleTranslateUI();
    }, 1000);
  };

  return (
    <>
      <header className={`${styles.header} ${headerFont.variable}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="Hippique Auctions">
            <img src="/assets/img/logo/logo.png" alt="Hippique Auctions" />
          </Link>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${
                  isActive(item.href) ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.languageWrap} ref={langRef}>
              <button
                type="button"
                className={styles.languageBtn}
                onClick={() => setLangOpen((prev) => !prev)}
                aria-label="Kies taal"
              >
                <Globe size={18} strokeWidth={2} />
              </button>

              <div
                className={`${styles.languageDropdown} ${
                  langOpen ? styles.languageDropdownShow : ""
                }`}
              >
                {languages.map((language) => (
                  <button
                    key={language.value}
                    type="button"
                    className={styles.languageItem}
                    onClick={() => setGoogleTranslateLanguage(language.value)}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/sign-in" className={styles.signIn}>
              Registreren
            </Link>
            <Link href="/log-in" className={styles.logIn}>
              Inloggen
            </Link>
          </div>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div id="google_translate_element" className={styles.translateHidden} />
      </header>

      <div
        className={`${styles.overlay} ${mobileOpen ? styles.overlayShow : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuShow : ""
        }`}
      >
        <div className={styles.mobileTop}>
          <Link href="/" className={styles.mobileLogo}>
            <img src="/assets/img/logo/logo.png" alt="Hippique Auctions" />
          </Link>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={isActive(item.href) ? styles.mobileActive : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.mobileLang}>
          <p className={styles.mobileLangTitle}>Taal</p>
          <div className={styles.mobileLangList}>
            {languages.map((language) => (
              <button
                key={language.value}
                type="button"
                className={styles.mobileLangItem}
                onClick={() => {
                  setGoogleTranslateLanguage(language.value);
                  setMobileOpen(false);
                }}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mobileActions}>
          <Link
            href="/sign-in"
            className={styles.mobileSignIn}
            onClick={() => setMobileOpen(false)}
          >
            Registreren
          </Link>
          <Link
            href="/log-in"
            className={styles.mobileLogIn}
            onClick={() => setMobileOpen(false)}
          >
            Inloggen
          </Link>
        </div>
      </aside>
    </>
  );
}
