import { NextResponse } from "next/server";

export const revalidate = 86400;

const proxiedThumbnail = (thumbnailUrl?: string) =>
  thumbnailUrl
    ? `/api/thumbnail-proxy?src=${encodeURIComponent(thumbnailUrl)}`
    : undefined;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return NextResponse.json({ error: "Missing TikTok URL" }, { status: 400 });
  }

  const response = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`,
    {
      next: { revalidate },
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to load TikTok metadata" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    title: data.title,
    authorName: data.author_name,
    thumbnailUrl: proxiedThumbnail(data.thumbnail_url),
  });
}
