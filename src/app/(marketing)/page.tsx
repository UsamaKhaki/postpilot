import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { OutputGallery } from "@/components/sections/output-gallery";
import { Process } from "@/components/sections/process";
import { Features } from "@/components/sections/features";
import { WhatsappFlow } from "@/components/sections/whatsapp-flow";
import { Avatars } from "@/components/sections/avatars";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <OutputGallery />
      <Process />
      <Features />
      <WhatsappFlow />
      <Avatars />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
