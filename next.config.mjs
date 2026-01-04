/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabling strict mode prevents double-invoking effects in dev
  // which can sometimes mess up the Razorpay popup state
  reactStrictMode: false,
};

export default nextConfig;
