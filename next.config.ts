// next.config.ts
import type { NextConfig } from 'next';

/**
 * Настройки Next.js для проксирования API-запросов на backend-сервер
 * во время разработки (локально).
 */
const nextConfig: NextConfig = {
  // Дозволяє проксувати /api/... до бекенда під час розробки
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3003/api/:path*',
          },
        ]
      : [];
  },
  // (Опціонально) Вказати режим strictMode, підтримку image domains і т.д.
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
