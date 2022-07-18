/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.kpipa.or.kr'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://49.50.165.7:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
