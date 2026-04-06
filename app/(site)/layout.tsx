import Header from "@/components/modules/site/header/page";
import Footer from "@/components/modules/site/footer/page";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
