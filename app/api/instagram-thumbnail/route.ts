import { NextResponse } from "next/server";

function extractMetaContent(html: string, property: string) {
  const metaTags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  const tag = metaTags.find((item) => {
    const propertyPattern = new RegExp(
      `(property|name)=["']${property.replace(":", "\\:")}["']`,
      "i",
    );

    return propertyPattern.test(item);
  });

  return tag?.match(/content=["']([^"']+)["']/i)?.[1];
}

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing Instagram URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to fetch Instagram page" }, { status: 502 });
    }

    const html = await response.text();
    const thumbnailUrl = extractMetaContent(html, "og:image");

    if (!thumbnailUrl) {
      return NextResponse.json({ error: "Thumbnail not found" }, { status: 404 });
    }

    return NextResponse.json({ thumbnailUrl });
  } catch {
    return NextResponse.json({ error: "Unable to fetch Instagram page" }, { status: 502 });
  }
}
