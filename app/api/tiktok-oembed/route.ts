import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing TikTok URL" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to fetch TikTok data" }, { status: 502 });
    }

    const data = await response.json();

    return NextResponse.json({
      thumbnailUrl: data.thumbnail_url,
      title: data.title,
      authorName: data.author_name,
    });
  } catch {
    return NextResponse.json({ error: "Unable to fetch TikTok data" }, { status: 502 });
  }
}
