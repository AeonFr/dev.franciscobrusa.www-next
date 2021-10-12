import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Block from "../components/Block";
import * as styles from "./index.css";

export function getStaticProps() {
  const { getPostsMetadata } = require("../utils/postsMetadata");

  return { props: { posts: getPostsMetadata() } };
}

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog about frontend engineering - Francisco Brusa</title>
        <link rel="canonical" href="https://franciscobrusa.dev" />
        <meta property="og:url" content="https://franciscobrusa.dev" />
        <meta
          property="og:site_name"
          content="Blog about frontend engineering - Francisco Brusa"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:site"
          content="Blog about frontend engineering - Francisco Brusa"
        />
      </Head>

      <Block>
        <ul className={styles.listContainer}>
          {posts
            .filter(({ isDraft }) => !isDraft)
            .map((post) => (
              <li
                key={post.slug}
                className={styles.listItem}
                lang={post.lang !== "en" ? post.lang : undefined}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        className={styles.thumbnail}
                        alt=""
                        draggable="false"
                      />
                    )}
                    <a className={styles.link}>{post.title}</a>
                    {post.lang == "es" ? (
                      <span
                        className={styles.label}
                        style={{ marginLeft: "0.5em" }}
                      >
                        Español
                      </span>
                    ) : (
                      ""
                    )}
                    <p className={styles.excerpt}>{post.description}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </Block>
    </Layout>
  );
}
