import { Noto_Serif } from "next/font/google";

export const headerFont = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
  weight: ["100", "400", "500", "600", "700"],
});
