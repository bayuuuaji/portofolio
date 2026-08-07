export function publicAsset(src: string) {
  if (/^(https?:|data:|blob:)/.test(src)) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return src.startsWith("/") ? `${basePath}${src}` : src;
}
