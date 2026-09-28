import { Capabilities } from "@/components/home/Capabilities";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { Certifications } from "@/components/home/Certifications";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Markets } from "@/components/home/Markets";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

// Home page, in the order and background rhythm set by the design system (section 8):
// hero, categories (off-white), why (white), capabilities (sand + navy stats),
// flow (off-white), certifications (white), markets (sand), final CTA (navy).
export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <WhyChooseUs />
      <Capabilities />
      <ProcessFlow />
      <Certifications />
      <Markets />
      <FinalCta />
    </>
  );
}
