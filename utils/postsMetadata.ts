import fs from "fs";
import { join } from "path";

export interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  lang?: "es" | "en" | string;
  socialImage?: string;
  thumbnail?: string;
  [key: string]: any;
}

const blogDirectory = join(process.cwd(), "pages/blog");

// @ts-expect-error webpack typings not be
const context = require.context("../pages/blog", false, /\.mdx$/);

export function getPostsMetadata() {
  const results: PostMetadata[] = [];

  fs.readdirSync(blogDirectory).forEach(function (file: string) {
    if (!file || !file.endsWith(".mdx")) return;

    const { metadata } = context("./" + file);
    const slug = file.replace(/\.mdx$/, "");

    results.push({ ...metadata, slug });
  });

  results.sort((a, b) => (a.date < b.date ? 1 : -1));

  return results;
}
