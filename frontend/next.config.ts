import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,

  async redirects() {
    return [
      // Страница проекта переехала с /project/… на /projects/….
      // permanent: true даёт код 308 — поисковики переносят старую ссылку
      // на новую, а ссылки, уже разосланные в Telegram, продолжают работать.
      {
        source: '/project/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
