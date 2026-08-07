import Image from "next/image";
import { Target, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { campaigns } from "@/data/campaigns";

function CampaignProgress({
  participants,
  targetParticipants,
}: {
  participants: number;
  targetParticipants: number;
}) {
  const progress = Math.min(Math.round((participants / targetParticipants) * 100), 100);

  return (
    <div className="mt-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-bold text-navy">
            {participants.toLocaleString("id-ID")}
            <span className="text-base text-navy-soft/60">
              {" "}
              / {targetParticipants.toLocaleString("id-ID")}
            </span>
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-navy-soft/60">
            Total peserta dari target
          </p>
        </div>
        <span className="rounded-full bg-electric-50 px-3 py-1 text-xs font-bold text-electric">
          {progress}%
        </span>
      </div>
      <div className="mt-3 h-5 overflow-hidden rounded-full border border-line bg-white p-1 shadow-softer">
        <div
          className="h-full rounded-full bg-grad-electric shadow-lift transition-[width] duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function Campaigns() {
  return (
    <section id="campaigns" className="bg-base-off py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="CAMPAIGNS"
          title="Campaign yang Pernah Saya Susun"
          description="Beberapa campaign yang saya rancang dari sisi konsep, pesan utama, materi promosi, sampai target peserta yang ingin dicapai."
        />

        <div className="mt-16 space-y-20">
          {campaigns.map((campaign, index) => (
            <RevealOnScroll key={campaign.id} delay={index * 0.08}>
              <article
                className={`grid grid-cols-1 items-center gap-10 lg:gap-16 ${
                  index % 2 === 1
                    ? "lg:grid-cols-[3fr,1fr] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[1fr,3fr]"
                }`}
              >
                <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-xl3 border border-line bg-base-off shadow-soft lg:max-w-none">
                  <Image
                    src={campaign.poster}
                    alt={`Poster campaign ${campaign.title}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow mb-2">{campaign.period}</p>
                      <h3 className="font-display text-2xl font-bold leading-tight text-navy sm:text-3xl">
                        {campaign.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-line bg-base-off px-3 py-1 text-xs font-semibold text-navy-soft/70">
                      {campaign.role}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-navy-soft/80">
                    {campaign.summary}
                  </p>

                  <div className="mt-6 flex items-center gap-2 rounded-xl2 border border-line bg-white p-4 text-sm font-medium text-navy">
                    <Target className="h-4 w-4 shrink-0 text-electric" aria-hidden="true" />
                    Target peserta campaign
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-soft/60">
                    <Users className="h-3.5 w-3.5 text-electric" aria-hidden="true" />
                    Participant Progress
                  </div>
                  <CampaignProgress
                    participants={campaign.participants}
                    targetParticipants={campaign.targetParticipants}
                  />
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
