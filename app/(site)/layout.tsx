import React, { Suspense } from "react";
import { mainFont } from "./font";
import styles from "./layout.module.scss";
import Header from "@/components/modules/site/header/Header";
import Footer from "@/components/modules/site/footer/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${mainFont.variable} ${styles.container}`}>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>

      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}