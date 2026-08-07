import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="SKILLS"
          title="What I bring to a creative team."
          description="Grouped by how the work actually gets used, not a percentage bar in sight."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <RevealOnScroll key={group.title} delay={i * 0.06}>
              <div className="h-full rounded-xl3 border border-line bg-white p-6 shadow-softer transition-shadow duration-300 hover:shadow-soft">
                <p className="font-display text-lg font-bold text-navy">
                  {group.title}
                </p>
                <p className="mt-1.5 text-sm text-navy-soft/70">
                  {group.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                      <span className="text-sm text-navy-soft/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
