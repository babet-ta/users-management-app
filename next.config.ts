import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = nextConfig
