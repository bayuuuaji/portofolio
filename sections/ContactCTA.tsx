import Image from "next/image";
import { Download, Instagram, Linkedin, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { contactConfig, whatsappLink } from "@/config/contact";
import { publicAsset } from "@/lib/assetPath";

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-white py-24 sm:py-32">
      <Container>
        <RevealOnScroll>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="CONTACT"
                title="Let's build work that moves."
                description="Open for creative marketing, video production, workflow systems, and collaborative projects that need both creative direction and practical execution."
              />

              <div className="mt-8 grid grid-cols-4 gap-3">
                <Button
                  href={whatsappLink}
                  variant="primary"
                  external
                  showArrow
                  className="col-span-3 w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Me
                </Button>
                <div className="col-span-1 grid grid-cols-2 gap-3">
                  <Button
                    href={contactConfig.linkedin}
                    variant="secondary"
                    external
                    className="w-full !px-0"
                    ariaLabel="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    href={contactConfig.instagram}
                    variant="secondary"
                    external
                    className="w-full !px-0"
                    ariaLabel="Instagram"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <Button
                href={publicAsset(siteConfig.resumeUrl)}
                variant="secondary"
                download="CV - Bayu Aji Santoso.pdf"
                className="mt-3 w-full"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </Button>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl3 border border-line bg-white shadow-soft lg:ml-auto">
                <Image
                  src={publicAsset("/images/2.png")}
                  alt="Portrait of Bayu Aji Santoso"
                  fill
                  sizes="(min-width: 1024px) 36vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
