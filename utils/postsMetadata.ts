import fs from "fs";

const normalizedPath = require("path").join("./", "./pages/blog/");

interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  [key: string]: any;
}

export function getPostsMetadata() {
  const results: PostMetadata[] = [];

  // @ts-expect-error webpack typings not be
  const context = require.context("../pages/blog", false, /\.mdx$/);

  fs.readdirSync(normalizedPath).forEach(function (file: string) {
    if (!file || !file.endsWith(".mdx")) return;

    const { metadata } = context("./" + file);
    const slug = file.replace(/\.mdx$/, "");

    results.push({ ...metadata, slug });
  });

  results.sort((a, b) => (a.date < b.date ? 1 : -1));

  return results;
}
