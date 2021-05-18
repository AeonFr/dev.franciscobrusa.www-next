import Head from "next/head";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/react";
import Layout from "./Layout";
import Container from "./Container";
import CodeBlock from "./CodeBlock";
import blogPostStyles from "../styles/BlogPostLayout.module.css";

export const components = {
  abbr: ({ children }) => <abbr>{children}</abbr>,
  pre: (props) => {
    if (!props.children.props.className) {
      // don't load codeblock for "anonymous" blocks
      return <pre>{props.children.props.children}</pre>;
    }

    return (
      <CodeBlock
        {...props}
        fallback={<pre>{props.children.props.children}</pre>}
      />
    );
  },
  a: (props) => <a {...props} target="_blank" rel="noopen noreferer" />,
};

export default function BlogPostLayout({ title, language, children }) {
  return (
    <Layout>
      <Helmet>
        <html lang={language || "en"} />
      </Helmet>
      <Head>
        <title>{title}</title>
      </Head>

      <Container>
        <MDXProvider components={components}>
          <article className={blogPostStyles["Post-article"]}>
            {children}
          </article>
        </MDXProvider>
      </Container>
    </Layout>
  );
}
