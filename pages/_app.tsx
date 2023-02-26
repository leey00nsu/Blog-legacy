import "react-notion-x/src/styles.css"; // react-notion-x core styles
import "katex/dist/katex.min.css"; // react-notion-x equations
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
