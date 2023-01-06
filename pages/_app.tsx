import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { appWithTranslation } from "next-i18next";
import { LayoutProvider } from '../context/layout';

function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  )
}

export default appWithTranslation( App );
