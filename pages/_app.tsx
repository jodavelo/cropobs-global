import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { appWithTranslation } from "next-i18next";
import { LayoutProvider } from '../context/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';

function App({ Component, pageProps }: AppProps) {
  return (
    <ProSidebarProvider>
      <LayoutProvider>
        <Component {...pageProps} />
      </LayoutProvider>
    </ProSidebarProvider>
  )
}

export default appWithTranslation( App );
