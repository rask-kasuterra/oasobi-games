/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_PROJECT_B_URL: process.env.NEXT_PUBLIC_PROJECT_B_URL,
    },
};

export default nextConfig;