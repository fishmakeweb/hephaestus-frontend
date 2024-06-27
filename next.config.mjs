import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'ap-south-1.linodeobjects.com', // Ensure this is your intended domain
        ],
    },
    output: "standalone",
    flags: {
      DEV_SSR: false,
    },
    webpack: (config, { isServer }) => {
        // Alias configuration
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');

        // Return the updated configuration
        return config;
    },
};

export default nextConfig;
