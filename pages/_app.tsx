import "react-notion-x/src/styles.css"; // react-notion-x core styles
import "prismjs/themes/prism-tomorrow.css"; // prism code syntax highlighting
import "katex/dist/katex.min.css"; // react-notion-x equations
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
