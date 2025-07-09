/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com', 'readdy.ai'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
};

export default nextConfig;
