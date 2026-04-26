import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  // Production optimizationss
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
