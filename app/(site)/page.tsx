"use client";

import styles from "./site.module.scss";
import { siteMain } from "./siteFont";

export default function Home() {
  return <div className={`${styles.container} ${siteMain.variable}`}>Home</div>;
}
