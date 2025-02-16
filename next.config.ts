import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['files.catbox.moe','i.pinimg.com','cdn-icons-png.flaticon.com'],
    
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
