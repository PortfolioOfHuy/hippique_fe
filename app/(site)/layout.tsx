import React from "react";
import { mainFont } from "./font";
import styles from "./layout.module.scss";
import Header from "@/components/modules/site/header/Header";
import Footer from "@/components/modules/site/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${mainFont.variable} ${styles.container}`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}