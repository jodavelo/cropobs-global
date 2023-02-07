import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { appWithTranslation } from "next-i18next";
import { LayoutProvider } from '../context/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiY2lhdGttIiwiYSI6ImNraGdmbDZjejAxNTMycXBwNXppeHIyYjkifQ.Ucfm2G0KapInAojq6f9BZw'
// 'pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg';

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
