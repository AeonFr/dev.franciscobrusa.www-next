import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Container from "../components/Container";
import * as styles from "./index.css";

export function getStaticProps() {
  const { getPostsMetadata } = require("../utils/postsMetadata");

  return { props: { posts: getPostsMetadata() } };
}

export default function Home({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Francisco Brusa's Blog</title>
        <link rel="canonical" href="https://franciscobrusa.dev" />
        <meta property="og:url" content="https://franciscobrusa.dev" />
        <meta property="og:site_name" content="Francisco Brusa's Blog" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="Francisco Brusa's Blog" />
      </Head>

      <Container>
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
                  <a className={styles.link}>{post.title}</a>
                </Link>
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
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
}
