import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { appWithTranslation } from "next-i18next";
import { LayoutProvider } from '../context/layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProvider } from '../context/map';
import { LeftSideMenuProvider } from '../context/map/leftsidemenu';
import { TourProvider } from '@reactour/tour';
 
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY!;
// 'pk.eyJ1Ijoic2tvcm5vdXMiLCJhIjoiY2s4dDBkNjY1MG13ZTNzcWEyZDYycGkzMyJ9.tjfwvJ8G_VDmXoClOyxufg';

function App({ Component, pageProps }: AppProps) {
  return (
    <TourProvider
      styles={{
        //@ts-ignore: Can't solve this typescript error
        popover: (base) => ({...base, '--reactour-accent': '#b0b0b0'})
      }}
      steps={[]}
    >
      <ProSidebarProvider>
        <LayoutProvider>
          <MapProvider>
            <LeftSideMenuProvider>  
              <Component {...pageProps} />
            </LeftSideMenuProvider>
          </MapProvider>
        </LayoutProvider>
      </ProSidebarProvider>
    </TourProvider>
  )
}

export default appWithTranslation( App );
