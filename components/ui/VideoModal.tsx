"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

function getTikTokIdFromUrl(url?: string) {
  return url?.match(/\/video\/(\d+)/)?.[1];
}

function getDriveIdFromUrl(url?: string) {
  return url?.match(/\/file\/d\/([^/]+)/)?.[1] ?? url?.match(/[?&]id=([^&]+)/)?.[1];
}

function getInstagramEmbedUrl(url?: string) {
  if (!url) return undefined;

  const cleanUrl = url.split("?")[0].replace(/\/$/, "");
  return `${cleanUrl}/embed`;
}

export default function VideoModal({
  youtubeId,
  tiktokUrl,
  instagramUrl,
  driveUrl,
  title,
  onClose,
}: {
  youtubeId?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  driveUrl?: string;
  title: string;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tiktokId = getTikTokIdFromUrl(tiktokUrl);
  const instagramEmbedUrl = getInstagramEmbedUrl(instagramUrl);
  const driveId = getDriveIdFromUrl(driveUrl);
  const isTikTok = Boolean(tiktokId);
  const isInstagram = Boolean(instagramEmbedUrl);
  const isDrive = Boolean(driveId);
  const isVerticalEmbed = isTikTok || isInstagram;

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative z-10 w-full ${isVerticalEmbed ? "max-w-sm" : "max-w-4xl"}`}>
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div
          className={`overflow-hidden rounded-xl3 bg-black shadow-lift ${
            isVerticalEmbed ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          <iframe
            className="h-full w-full"
            src={
              isTikTok
                ? `https://www.tiktok.com/embed/v2/${tiktokId}`
                : isInstagram
                  ? instagramEmbedUrl
                : isDrive
                  ? `https://drive.google.com/file/d/${driveId}/preview`
                : `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
            }
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
