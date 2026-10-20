export default function robots() {
  const baseUrl = "https://codebymonir.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"], // Add internal-only paths here
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/*.webp$", "/*.png$", "/*.jpg$", "/*.jpeg$"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
