const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

const baseURL = "https://franciscobrusa.dev";

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  future: {
    webpack5: true,
  },
  env: {
    baseURL,
  },
});
