/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // images: {
    //   domains: ['dribbble.com'],
    // },
    // experimental: {
    //   scrollRestoration: true
    // },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
