import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Badge from "@/components/ui/Badge";

const careerPath = [
  "Social Media Officer",
  "Social Media Leader",
  "Supervisor Creative Marketing",
  "Branch Manager",
];

const expertiseTags = [
  "Creative Strategy",
  "Campaign Development",
  "Social Media",
  "Video Direction",
  "Content Operations",
  "Workflow Design",
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll>
            <SectionHeading
              eyebrow="ABOUT"
              title="More than creating content. I build how creative work gets done."
            />

            <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs text-navy-soft/60">
              {careerPath.map((role, i) => (
                <span key={role} className="flex items-center gap-2">
                  <span
                    className={i === careerPath.length - 1 ? "text-electric" : ""}
                  >
                    {role}
                  </span>
                  {i < careerPath.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-soft/80">
              What started as shooting and editing short-form videos turned
              into leading creative teams, then into designing the systems
              those teams use every day. Each step added a layer: first the
              craft, then the strategy, then the structure that makes both
              repeatable.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {expertiseTags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="relative mx-auto max-w-md overflow-hidden rounded-xl3 border border-line bg-white shadow-soft lg:max-w-none">
              <Image
                src="/images/1.png"
                alt="Bayu working with the creative team on set"
                width={900}
                height={1100}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
