export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: ` https://findid.ir/sitemap.xml`,
  };
}
