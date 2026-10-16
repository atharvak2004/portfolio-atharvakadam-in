/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static HTML into the `out/` folder for AWS S3 + CloudFront
  output: "export",

  // Folder-style URLs (/about/ -> about/index.html) work best on S3
  trailingSlash: true,

  // Static export has no image optimizer, so serve images as they are.
  // Compress your PNGs to WebP yourself.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;