const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseURL = "https://franciscobrusa.dev";

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  future: {
    webpack5: true,
  },
  env: {
    baseURL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    });
    config.plugins.push(
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin({
        // without these Next.js will look for the generated stylesheets from the wrong place
        filename: "static/chunks/[chunkhash].css",
        chunkFilename: "static/chunks/[chunkhash].css",
      })
    );
    return config;
  },
});
