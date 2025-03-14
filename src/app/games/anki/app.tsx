import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DecksProvider } from './deck';

function DeckMyApp({ Component, pageProps }: AppProps) {
  return (
    <DecksProvider>
      <Component {...pageProps} />
    </DecksProvider>
  );
}

export default DeckMyApp;