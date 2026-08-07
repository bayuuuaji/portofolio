import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Badge from "@/components/ui/Badge";
import { experience } from "@/data/experience";
import { CheckCircle2 } from "lucide-react";

const achievementHighlight =
  "portfolio-highlight";

const importantAchievementParts = [
  "12 masalah",
  "5 sistem kerja baru",
  "3 website sistem operasional",
  "13,1%",
  "menaikkan awareness digital",
  "menaikkan engagement social media",
  "+97,6%",
  "22 konten TikTok",
  "over-performing",
  ">100k views",
  "+121,8%",
  "seluruh akun sosial media",
  "konten branding",
  "6 konten video TikTok",
  ">1 juta views",
  "segala jenis video",
  "company profile, iklan, short movie, dan sosmed",
];

function HighlightedAchievement({ text }: { text: string }) {
  const pattern = new RegExp(
    `(${importantAchievementParts
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "gi"
  );

  return (
    <>
      {text.split(pattern).map((part, index) => {
        const isImportant = importantAchievementParts.some(
          (item) => item.toLowerCase() === part.toLowerCase()
        );

        return isImportant ? (
          <span key={`${part}-${index}`} className={achievementHighlight}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="EXPERIENCE"
          title="Pengalaman Kerja"
          description="Perjalanan dari video production, social media leadership, sampai membangun sistem kerja untuk creative marketing."
        />

        <div className="relative mt-16">
          <div
            className="absolute left-[11px] top-2 bottom-2 hidden w-px bg-line sm:block"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {experience.map((item, index) => (
              <li key={item.id} className="relative sm:pl-12">
                <RevealOnScroll delay={index * 0.05}>
                  <span
                    className="absolute left-0 top-1 hidden h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-electric bg-white sm:flex"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-electric" />
                  </span>

                  <div className="rounded-xl3 border border-line bg-base-off p-6 transition-shadow duration-300 hover:shadow-soft sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs text-navy-soft/60">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-electric">
                      {item.company}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-navy-soft/80 sm:text-base">
                      {item.summary}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-electric"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-navy-soft/80">
                            <HighlightedAchievement text={achievement} />
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
