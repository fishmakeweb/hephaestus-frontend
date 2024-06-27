/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  images: {
    domains: [
      'ap-south-1.linodeobjects.com', // Add your domain here
    ],
  },
    output: "standalone",
};

export default nextConfig;
