import { NextResponse } from "next/server";

export const revalidate = 86400;

const allowedHosts = [
  "p16-common-sign.tiktokcdn.com",
  "p16-sign.tiktokcdn-us.com",
  "p16-sign-va.tiktokcdn.com",
  "p16-sign-sg.tiktokcdn.com",
  "scontent.cdninstagram.com",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");

  if (!src) {
    return NextResponse.json({ error: "Missing thumbnail source" }, { status: 400 });
  }

  let thumbnailUrl: URL;

  try {
    thumbnailUrl = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid thumbnail source" }, { status: 400 });
  }

  if (!allowedHosts.includes(thumbnailUrl.hostname)) {
    return NextResponse.json({ error: "Thumbnail host is not allowed" }, { status: 400 });
  }

  const response = await fetch(thumbnailUrl, {
    next: { revalidate },
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to load thumbnail image" },
      { status: response.status }
    );
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
