/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 GitHub Pages 정적 배포를 위한 설정
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // 🖼️ 이미지 최적화 설정 (정적 배포용)
  images: {
    unoptimized: true,
    // 외부 이미지 도메인 허용
    domains: ["placeholder.svg", "via.placeholder.com", "images.unsplash.com"],
    // 리모트 패턴 설정
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // 🔧 개발 편의성 설정
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // 🌐 GitHub Pages 기본 경로 설정 (저장소 이름: portfolio)
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
}

module.exports = nextConfig
