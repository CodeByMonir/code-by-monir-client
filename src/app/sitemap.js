export default async function sitemap() {
  const baseUrl = "https://codebymonir.vercel.app";

  // 1. Static routes with direct image associations
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/MonirHossen.webp`,
        `${baseUrl}/og-image.webp`,
      ],
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${baseUrl}/MonirHossen.webp`],
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. (Optional) Dynamic project routes if fetched from MongoDB / API
  // Replace this block with your actual project data fetching if you have dedicated project pages
  /*
  const projects = await fetch('https://api.yourdomain.com/projects').then((res) => res.json());
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.7,
    images: project.thumbnail ? [`${baseUrl}${project.thumbnail}`] : [],
  }));
  return [...routes, ...projectRoutes];
  */

  return routes;
}
