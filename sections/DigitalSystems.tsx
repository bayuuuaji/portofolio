import Image from "next/image";
import { TrendingUp } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Button from "@/components/ui/Button";
import BrowserMockup from "@/components/ui/BrowserMockup";
import { digitalSystems } from "@/data/projects";

export default function DigitalSystems() {
  return (
    <section id="digital-systems" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="DIGITAL SYSTEMS"
          title="Sistem Kerja Digital yang Saya Bangun"
          description="Membangung sistem kerja digital yang efisien dan user-friendly untuk menangani masalah-masalah yang dihadapi oleh team kreatif."
        />

        <div className="mt-16 space-y-20">
          {digitalSystems.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <RevealOnScroll key={project.slug}>
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <BrowserMockup url={project.caseStudyUrl} href={project.caseStudyUrl}>
                    <Image
                      src={project.desktopScreenshot}
                      alt={`Desktop screenshot of ${project.title}`}
                      width={1200}
                      height={750}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                  </BrowserMockup>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-navy-soft/80">
                      {project.summary}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="eyebrow mb-1.5">Problem</p>
                        <p className="text-sm leading-relaxed text-navy-soft/80">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <p className="eyebrow mb-1.5">Solution</p>
                        <p className="text-sm leading-relaxed text-navy-soft/80">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-start gap-2.5 rounded-xl2 border border-line bg-base-off p-4">
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                      <p className="text-sm font-medium text-navy">{project.impact}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        href={project.caseStudyUrl}
                        variant="primary"
                        external={project.caseStudyUrl.startsWith("http")}
                        showArrow
                      >
                        View Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
