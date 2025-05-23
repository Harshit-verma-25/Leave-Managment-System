import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "firebaseapp.com",
      "firebasestorage.googleapis.com",
      "images.pexels.com",
      "res.cloudinary.com",
    ],
  },
  /* config options here */
};

export default nextConfig;
