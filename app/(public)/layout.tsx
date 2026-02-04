import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { VideoPreloader } from "@/components/VideoPreloader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VideoPreloader />
      <Header />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
