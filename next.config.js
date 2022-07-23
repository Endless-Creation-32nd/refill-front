/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
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
