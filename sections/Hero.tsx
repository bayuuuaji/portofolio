"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { publicAsset } from "@/lib/assetPath";

const stats = [
  { value: 95, suffix: "%", label: "Overtime Reduced" },
  { value: 97.6, prefix: "+", suffix: "%", label: "Instagram Growth" },
  { value: 22, suffix: "", label: "Videos Above 100K Views" },
  { value: 6, suffix: "", label: "TikTok Videos Above 1M Views" },
  { value: 121.8, prefix: "+", suffix: "%", label: "YouTube Growth" },
];

const highlight =
  "portfolio-highlight";

const portraitSrc = publicAsset("/images/1.png?v=20260721");

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-grad-sky pt-14 pb-20 sm:pt-16 sm:pb-24"
    >
      <div
        className="blueprint-grid pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        aria-hidden="true"
      />

      <div className="section-container relative grid grid-cols-1 gap-16 lg:grid-cols-[7fr,3fr] lg:items-stretch lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
            About Me
          </h1>

          <div className="mt-3 max-w-3xl space-y-3 text-justify text-sm leading-6 text-navy-soft/85 sm:text-base sm:leading-7">
            <p>
              Hai,perkenalkan saya adalah Bayu Aji Santoso. Seorang yang
              memiliki pengalaman <span className={highlight}>± 6 tahun</span>{" "}
              di bidang <span className={highlight}>Videografi</span> dan{" "}
              <span className={highlight}>± 2 tahun</span> menjadi{" "}
              <span className={highlight}>Leader Creative Department.</span>
            </p>
            <h3 className="!mt-8 font-display text-lg font-bold leading-tight text-navy sm:!mt-7 sm:text-xl">
              Video Editor - The Early Beginning
            </h3>
            <p>
              Perjalanan karir saya dimulai saat saya memasuki bangku <span className={highlight}>SMK pada tahun 2018</span>
              . Saya mengerjakan beberapa project video baik itu dari
              teman saya ataupun dari orang di luar circle pertemanan saya. Saya
              terbiasa mengerjakan berbagai project video seperti <span className={highlight}>(Video Company
              Profile, Iklan, Sosial Media, Motion Graphic, dll)</span>{" "}
            </p>
            <h3 className="!mt-8 font-display text-lg font-bold leading-tight text-navy sm:!mt-7 sm:text-xl">
              Leader Sosial Media - Leadership Journey Begin
            </h3>
            <p>
              Setelah berkarir ±6 tahun di sebagai Video Editor, saya mendapat
              kepercayaan untuk menjadi{" "}
              <span className={highlight}>Leader Sosial Media Division</span> di
              Mr.BOB Kampung Inggris. Tantangan utama yang saya hadapi adalah{" "}
              <span className={highlight}>
                performa akun yang menurun &amp; workflow tim yang belum
                tertata dengan rapi.
              </span>
            </p>
            <p>
              Selama bekerja sebagai{" "}
              Leader Sosial Media Division
              saya berhasil <span className={highlight}>menurunkan angka lembur hingga 95%</span> dari periode
              sebelumnya. Selain itu saya juga menghasilkan{" "}
              <span className={highlight}>
                growth instagram sebesar +97,6%
              </span>,
              <span className={highlight}>&gt;22 konten Tiktok overperforming denga views 100k</span>, dan{" "}
              <span className={highlight}> menghasilkan
              growth Youtube channel sebesar+121,8%</span>.
            </p>
            <h3 className="!mt-8 font-display text-lg font-bold leading-tight text-navy sm:!mt-7 sm:text-xl">
              SPV Creative Marketing - A New Challenge Started
            </h3>
            <p>
              Setelah 1 tahun sebagai seorang Leader, saya dipercaya kembali
              untuk promosi menjadi seorang{" "}
              <span className={highlight}>SPV Creative Marketing</span>. Selama 2
              bulan ke belakang saya berhasil{" "}
              <span className={highlight}>
                mengidentifikasi dan menyelesaikan total 12 masalah
              </span>{" "}
              di divisi saya.
            </p>
            <p>
              Saya juga berhasil <span className={highlight}>membuat 5 sistem baru</span> berbasis web dan
              aplikasi (notion) yang membantu {" "}
              <span className={highlight}>menaikkan KPI kinerja team hingga +13,1%</span> dibanding periode
              sebelumnya.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:h-full lg:max-w-none"
        >
          <div className="relative h-full min-h-[420px] overflow-visible bg-transparent lg:min-h-full">
            <Image
              src={portraitSrc}
              alt="Professional portrait of Bayu Aji Santoso"
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-contain object-bottom lg:origin-bottom lg:scale-[1.18]"
            />
            <div className="absolute bottom-0 left-[45%] w-[90%] -translate-x-1/2 rounded-2xl border border-line bg-white/85 px-5 py-3 text-center shadow-soft backdrop-blur-md dark:bg-[#0d1627]/85">
              <p className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl lg:text-3xl">
                Bayu Aji Santoso
              </p>
              <div className="mx-auto my-2.5 h-px w-84 bg-line/20" />
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-navy-soft/60">
                Supervisor Creative Marketing
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-navy-soft/60">
                Senior Video Editor
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-container relative mt-12 border-y border-line py-8 pb-24 sm:mt-14 sm:py-10 sm:pb-24">
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-10 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.08 }}
            >
              <p className="font-display text-2xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.2}
                />
              </p>
              <p className="mt-2 text-xs leading-snug text-navy-soft/70 sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
