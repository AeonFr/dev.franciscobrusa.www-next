const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const withVanillaExtract = require("./utils/withVanillaExtract");

const baseURL = "https://franciscobrusa.dev";

module.exports = withMDX(
  withVanillaExtract({
    pageExtensions: ["js", "jsx", "mdx"],
    future: {
      webpack5: true,
    },
    env: {
      baseURL,
    },
  })
);
