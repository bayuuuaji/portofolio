import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const impactStats = [
  { value: 97.6, prefix: "+", suffix: "%", label: "Instagram Growth" },
  { value: 121.8, prefix: "+", suffix: "%", label: "YouTube Growth" },
  { value: 22, suffix: "", label: "TikTok Videos Above 100K Views" },
  { value: 16, suffix: "", label: "Workflow Problems Addressed" },
];

export default function Impact() {
  return (
    <section className="border-y border-line bg-white py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.08}>
              <p className="font-display text-3xl font-bold tracking-tight text-electric sm:text-4xl lg:text-5xl">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm leading-snug text-navy-soft/70 sm:text-base">
                {stat.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
