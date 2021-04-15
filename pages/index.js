import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import indexStyles from "../styles/Index.module.css";

const posts = [
  {
    slug: "service-workers-cache",
    title: "The Service Workers Cache API and the Fetch Event",
    excerpt:
      "A Service Worker is a script that runs in a different environment than the browser, running only once per domain instead of once per tab...",
  },
  {
    slug: "on-writing-documentation",
    title: "On writing documentation",
    excerpt:
      "Writing documentation is relatively easy, but writing maintainable and useful documentation not so much.",
  },
  {
    slug: "setting-up-visual-studio-code-to-work-with-php",
    title: "Setting up Visual Studio Code to work with PHP",
  },
  {
    slug: "history-of-react",
    title: "History of React and Modern JS Frameworks",
    excerpt:
      "A lot of the apps that we use everyday already existed back in 2008, but they didn’t look like they do today.",
  },
  {
    slug: "arquitectura-de-la-informacion-en-el-desarrollo-web",
    title: "Arquitectura de la Información en el Desarrollo Web",
    excerpt:
      "La Arquitectura de la Información (IA, por sus siglas en inglés) es una actividad encargada de diseñar cómo las cosas que nos rodean se convierten en información.",
  },
  {
    slug: "design-thinking",
    title: "Dos métodos del Design Thinking",
    excerpt:
      "El Design Thinking se puede entender como una filosofía de diseño o un framework (estructura), que agrupa métodos de diseño y herramientas de investigación en diseño.",
  },
];

export default function Home() {
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

      <ul className={indexStyles["Home"]}>
        {posts.map((post) => (
          <li key={post.slug} className={indexStyles["Home-post-block"]}>
            <Link href={`/blog/${post.slug}`}>
              <a className={indexStyles["Home-link"]}>{post.title}</a>
            </Link>
            <p className={indexStyles["Home-excerpt"]}>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
