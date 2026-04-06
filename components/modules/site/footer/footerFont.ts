import { Noto_Serif } from "next/font/google";

export const footerFont = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-footer",
  display: "swap",
  weight: ["100", "400", "500", "600", "700"],
});
