// utils/imageUrl.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""; 
export function getBlogImageUrl(imgUrl: string | null): string {
  if (!imgUrl) return "/assets/engineering-services-4.jpg";
  if (imgUrl.startsWith("http")) return imgUrl;
  const encoded = imgUrl.split("/").map(encodeURIComponent).join("/");
  return `${BASE_URL}/static/blogs/${encoded}`;
}


export function truncate(str: string, words = 5) {
  const w = str.trim().split(/\s+/);
  return w.length <= words ? str : w.slice(0, words).join(" ") + "...";
}