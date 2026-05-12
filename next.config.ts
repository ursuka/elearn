import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Controll-Allow-Origin",
            value: "*"
          },
          {
            key: "Access-Controll-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS"
          },
          {
            key: "Access-Controll-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes : 0-9/*"
          }
        ]
      }
    ]
  }
};

export default nextConfig;
