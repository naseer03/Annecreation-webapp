/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('http://89.116.32.45:5999/**')],
  }
};

export default nextConfig;
