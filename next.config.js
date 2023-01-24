const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const {
  getGlobalCssLoader,
} = require("next/dist/build/webpack/config/blocks/css/loaders");

const baseURL = "https://franciscobrusa.dev";

const nextConfig = {
  swcMinify: true,
  pageExtensions: ["js", "jsx", "mdx"],
  env: {
    baseURL,
  },
  images: {
    domains: ["pbs.twimg.com"],
    loader: 'akamai',
    path: '',
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    const cssRules = config.module.rules.find(
      (rule) =>
        Array.isArray(rule.oneOf) &&
        rule.oneOf.some(
          ({ test }) =>
            typeof test === "object" &&
            typeof test.test === "function" &&
            test.test("filename.css")
        )
    ).oneOf;

    cssRules.unshift({
      test: /(?<!\.vanilla)\.css$/,
      sideEffects: true,
      use: getGlobalCssLoader(
        {
          assetPrefix: options.config.assetPrefix,
          isClient: !isServer,
          isServer,
          isDevelopment: dev,
          future: {},
          experimental: {},
        },
        [],
        []
      ),
    });

    return config;
  },
};

module.exports = withMDX(withVanillaExtract(nextConfig));
