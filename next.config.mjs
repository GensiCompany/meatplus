/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', "www.google.com", "https://firebasestorage.googleapis.com", 'firebasestorage.googleapis.com', 'media.istockphoto.com', 'api.synck.io.vn'],
        unoptimized: true,
        minimumCacheTTL: 60 * 60 * 24, // Cache for 1 day
    },
    output: 'standalone', // Ensures compatibility with Firebase Functions
    devIndicators: {
        appIsrStatus: false,
    },
    headers: () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        if (config.cache && !dev) {
            config.cache = Object.freeze({
                type: 'memory',
            })
        }
        // Important: return the modified config
        return config
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    swcMinify: true, // Enables SWC minifier
};

export default nextConfig;
