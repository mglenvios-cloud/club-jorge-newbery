/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@club-digital-pro/shared'],
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    return [
      {
        source: '/admin/contabilidad',
        destination: '/dashboard/finance',
      },
      {
        source: '/admin/contabilidad/:path*',
        destination: '/dashboard/finance/:path*',
      },
      {
        source: '/api/:path*',
        destination: `${backendUrl.replace(/\/$/, '')}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

