"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoProject } from "@/types";
import { publicAsset } from "@/lib/assetPath";

const youtubeThumbnail = (video: VideoProject) =>
  video.thumbnail
    ? publicAsset(video.thumbnail)
    : video.youtubeId
    ? `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : publicAsset("/images/videos/placeholder-16x9-03.svg");

function getDriveIdFromUrl(url?: string) {
  return url?.match(/\/file\/d\/([^/]+)/)?.[1] ?? url?.match(/[?&]id=([^&]+)/)?.[1];
}

const driveThumbnail = (video: VideoProject) => {
  const driveId = getDriveIdFromUrl(video.driveUrl);

  return driveId
    ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1000`
    : publicAsset("/images/videos/placeholder-16x9-03.svg");
};

function SocialThumbnail({
  video,
  endpoint,
}: {
  video: VideoProject;
  endpoint: "instagram-thumbnail" | "tiktok-oembed";
}) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const socialUrl = endpoint === "instagram-thumbnail" ? video.instagramUrl : video.tiktokUrl;

  useEffect(() => {
    if (!socialUrl || video.thumbnail) return;

    let isMounted = true;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

    fetch(`${basePath}/api/${endpoint}?url=${encodeURIComponent(socialUrl)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (isMounted && data?.thumbnailUrl) {
          setThumbnail(data.thumbnailUrl);
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [endpoint, socialUrl, video.thumbnail]);

  return (
    <img
      src={thumbnail ?? youtubeThumbnail(video)}
      alt={`Thumbnail for ${video.title}`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  );
}

export default function VideoCard({
  video,
  onPlay,
}: {
  video: VideoProject;
  onPlay: (video: VideoProject) => void;
}) {
  const isPortrait = video.orientation === "portrait";
  const usesTikTokThumbnail = Boolean(video.tiktokUrl && !video.thumbnail);
  const usesInstagramThumbnail = Boolean(video.instagramUrl && !video.thumbnail);
  const usesDriveThumbnail = Boolean(video.driveUrl && !video.thumbnail);
  const thumbnailSrc = usesDriveThumbnail
      ? driveThumbnail(video)
      : youtubeThumbnail(video);

  return (
    <button
      onClick={() => onPlay(video)}
      className="group block w-full overflow-hidden rounded-xl3 border border-line bg-white text-left shadow-softer transition-shadow duration-300 hover:shadow-soft"
      aria-label={`Play video: ${video.title}`}
    >
      <div
        className={`relative overflow-hidden bg-base-off ${
          isPortrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {usesTikTokThumbnail ? (
          <SocialThumbnail video={video} endpoint="tiktok-oembed" />
        ) : usesInstagramThumbnail ? (
          <SocialThumbnail video={video} endpoint="instagram-thumbnail" />
        ) : (
          <Image
            src={thumbnailSrc}
            alt={`Thumbnail for ${video.title}`}
            fill
            loading="lazy"
            sizes={
              isPortrait
                ? "(min-width: 1024px) 220px, (min-width: 640px) 32vw, 45vw"
                : "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            }
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20">
          <span
            className={`flex items-center justify-center rounded-full bg-white/95 shadow-lift transition-transform duration-300 group-hover:scale-110 ${
              isPortrait ? "h-11 w-11" : "h-14 w-14"
            }`}
          >
            <Play
              className={`translate-x-0.5 text-electric ${isPortrait ? "h-4 w-4" : "h-5 w-5"}`}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>

      <div className={isPortrait ? "p-4" : "p-5"}>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-display font-bold text-navy ${
              isPortrait ? "text-sm leading-snug" : "text-base"
            }`}
          >
            {video.title}
          </p>
          <span className="shrink-0 font-mono text-xs text-navy-soft/50">
            {video.year}
          </span>
        </div>
        <p className={`text-navy-soft/70 ${isPortrait ? "mt-1 text-xs" : "mt-1 text-sm"}`}>
          {video.role} · {video.platform}
        </p>
        {video.metric && (
          <p className="mt-2 inline-flex items-center rounded-full bg-electric-50 px-3 py-1 text-xs font-semibold text-electric">
            {video.metric}
          </p>
        )}
      </div>
    </button>
  );
}
