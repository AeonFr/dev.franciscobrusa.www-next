const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const baseURL = "https://franciscobrusa.dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  pageExtensions: ["js", "jsx", "mdx", "tsx"],
  env: {
    baseURL,
  },
  images: {
    domains: ["pbs.twimg.com"],
    loader: 'akamai',
    path: '',
  },
};

module.exports = withMDX(withVanillaExtract(nextConfig));
