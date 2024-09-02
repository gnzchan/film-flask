/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    unoptimized: true,
    domains: ["m.media-amazon.com", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
