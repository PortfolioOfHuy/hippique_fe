import { connection } from "next/server";
import AdvertentiePlaatsenPage from "@/components/modules/site/advertentie-plaatsen/AdvertentiePlaatsenPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  await connection();

  return <AdvertentiePlaatsenPage />;
}