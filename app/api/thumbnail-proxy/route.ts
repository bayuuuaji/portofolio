export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing image URL", { status: 400 });
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
      return new Response("Unable to fetch image", { status: 502 });
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg";

    return new Response(response.body, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("Unable to fetch image", { status: 502 });
  }
}
