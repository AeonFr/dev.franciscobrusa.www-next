import "../styles/globals.css";
import * as styles from "../styles/layout.css";
import Link from "next/link";
// import ColorSchemePicker from "../components/layout/ColorSchemePicker";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Blog - Francisco Brusa',
  description: 'Welcome to my blog',
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180' }
    ]
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};


export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <header className={styles.block}>
          {/*
          <ColorSchemePicker
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              fontSize: "1.5rem",
            }}
          />
          */}
          <Link href="/" className={styles.logo}>
            Francisco Brusa
          </Link>
        </header>

        <main>{children}</main>

        <footer className={styles.block}>
          <a
            href="https://twitter.com/francanobr"
            target="_blank"
            rel="noreferrer"
            className={styles.headerLink}
          >
            Twitter
          </a>
          <a
            href="https://github.com/aeonfr"
            target="_blank"
            rel="noreferrer"
            className={styles.headerLink}
          >
            Github
          </a>
        </footer>
      </body>
    </html>
  );
}