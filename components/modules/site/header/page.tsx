"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import { headerFont } from "./headerFont";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Veilingen", href: "/auctions" },
  { label: "Nieuws", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
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
            <Link href="/sign-in" className={styles.signIn}>
              Sign In
            </Link>
            <Link href="/log-in" className={styles.logIn}>
              Log In
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
