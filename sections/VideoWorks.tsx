"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import VideoModal from "@/components/ui/VideoModal";
import VideoCard from "@/components/ui/VideoCard";
import { videos, videoCategories } from "@/data/videos";
import type { VideoProject } from "@/types";

const categorySlug = (category: string) =>
  `video-works-${category.toLowerCase().replace(/\s+/g, "-")}`;

// Group every video by category, in the order defined in videoCategories,
// and skip any category that currently has no videos.
const groupedVideos = videoCategories
  .filter((category) => category !== "All")
  .map((category) => ({
    category,
    items: videos.filter((video) => video.category === category),
  }))
  .filter((group) => group.items.length > 0);

export default function VideoWorks() {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);

  return (
    <section id="video-works" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="VIDEO WORKS"
          title="Portfolio Project Video"
          description="Beberapa project video yang telah saya kerjakan mulai dari konten sosial media, video panjang, video AI, hingga video company profile."
        />

        <div className="mt-14">
          {groupedVideos.map((group, index) => {
            const landscapeItems = group.items.filter(
              (video) => video.orientation !== "portrait"
            );
            const portraitItems = group.items.filter(
              (video) => video.orientation === "portrait"
            );
            const isLast = index === groupedVideos.length - 1;

            return (
              <div
                key={group.category}
                id={categorySlug(group.category)}
                className={isLast ? "" : "mb-5 border-b border-line/20 pb-14"}
              >
                <RevealOnScroll>
                  <h3 className="inline-flex items-center rounded-full border border-line px-4 py-2 font-display text-lg font-bold text-navy sm:text-xl">
                    {group.category}
                  </h3>
                </RevealOnScroll>

                {landscapeItems.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {landscapeItems.map((video, i) => (
                      <RevealOnScroll key={video.id} delay={(i % 3) * 0.06}>
                        <VideoCard video={video} onPlay={setActiveVideo} />
                      </RevealOnScroll>
                    ))}
                  </div>
                )}

                {portraitItems.length > 0 && (
                  <div className="mt-8">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {portraitItems.map((video, i) => (
                        <RevealOnScroll key={video.id} delay={(i % 4) * 0.06}>
                          <VideoCard video={video} onPlay={setActiveVideo} />
                        </RevealOnScroll>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>

      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.youtubeId}
          tiktokUrl={activeVideo.tiktokUrl}
          instagramUrl={activeVideo.instagramUrl}
          driveUrl={activeVideo.driveUrl}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
