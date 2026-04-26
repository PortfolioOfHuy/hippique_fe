import type { Metadata } from "next";
import OpnieuwVerkopenPage from "@/components/modules/site/opnieuw-verkopen/OpnieuwVerkopenPage";

export const metadata: Metadata = {
  title: "Opnieuw verkopen | Hippique Auctions",
  description:
    "Meld uw paard opnieuw aan voor verkoop via Hippique Auctions. Dien eenvoudig gegevens, documenten en gewenste verkoopinformatie in.",
};

export default function Page() {
  return <OpnieuwVerkopenPage />;
}