const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const withVanillaExtract = require("vanilla-extract-plugin-nextjs");

const baseURL = "https://franciscobrusa.dev";

module.exports = withMDX(
  withVanillaExtract({
    pageExtensions: ["js", "jsx", "mdx"],
    env: {
      baseURL,
    },
  })
);
