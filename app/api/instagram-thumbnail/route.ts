import { NextResponse } from "next/server";

export const revalidate = 86400;

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const proxiedThumbnail = (thumbnailUrl: string) =>
  `/api/thumbnail-proxy?src=${encodeURIComponent(thumbnailUrl)}`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const instagramUrl = searchParams.get("url");

  if (!instagramUrl) {
    return NextResponse.json({ error: "Missing Instagram URL" }, { status: 400 });
  }

  const response = await fetch(instagramUrl, {
    next: { revalidate },
    headers: {
      Accept: "text/html",
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to load Instagram page" },
      { status: response.status }
    );
  }

  const html = await response.text();
  const metaTags = html.match(/<meta[^>]+>/gi) ?? [];
  const ogImageTag = metaTags.find((tag) => /property=["']og:image["']/i.test(tag));
  const match = ogImageTag?.match(/content=["']([^"']+)["']/i);

  if (!match?.[1]) {
    return NextResponse.json(
      { error: "Unable to find Instagram thumbnail" },
      { status: 404 }
    );
  }

  return NextResponse.json({ thumbnailUrl: proxiedThumbnail(decodeHtml(match[1])) });
}
