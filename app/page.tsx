import Link from "next/link";
import Block from "../components/Block";
import * as styles from "./index.css";
import { getPostsMetadata } from "../utils/postsMetadata";

export const metadata = {
  title: 'Blog - Francisco Brusa',
  /** TODO: 
      <Head>
        <title></title>
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
  */
}

export default function Home() {
  const posts = getPostsMetadata();

  return (
    <>
      <Block>
        <nav>
          <ul className={styles.listContainer}>
            {posts
              .filter(({ isDraft }) => !isDraft)
              .map((post) => (
                <li
                  key={post.slug}
                  className={styles.listItem}
                  lang={post.lang !== "en" ? post.lang : undefined}
                >
                  <Link href={`/blog/${post.slug}`} legacyBehavior>
                    <div className={styles.linkWrapper}>
                      <a className={styles.link}>{post.title}</a>
                      <p className={styles.excerpt}>
                        {post.lang == "es" ? (
                          <span className={styles.label}>Español</span>
                        ) : (
                          ""
                        )}
                        {post.description}
                      </p>
                      {post.thumbnail && (
                        <img
                          src={post.thumbnail}
                          className={styles.thumbnail}
                          alt=""
                          draggable="false"
                        />
                      )}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </Block>
    </>
  );
}
