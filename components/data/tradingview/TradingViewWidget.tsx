import React, { useEffect } from 'react';

export const TradingViewWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "light",
      "dateRange": "12M",
      "showChart": true,
      "locale": "es",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
      "isTransparent": false,
      "showSymbolLogo": true,
      "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
      "plotLineColorFalling": "rgba(33, 150, 243, 1)",
      "gridLineColor": "rgba(240, 243, 250, 1)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
      "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
      "symbolActiveColor": "rgba(33, 150, 243, 0.12)",
      "tabs": [
        {
          "title": "Commodities",
          "symbols": [
            { "s": "CBOT:ZR1!", "d": "Futuros de arroz paddy" },
            { "s": "CBOT:TRF1!", "d": "Tailandia grano largo (PLATS)" },
            { "s": "CBOT:ZC1!", "d": "Futuros de maíz" },
            { "s": "CBOT:ZS1!", "d": "Futuros de soya" },
            { "s": "CBOT:ZW1!", "d": "Futuros de trigo" }
          ],
          "originalTitle": "Commodities"
        },
        {
          "title": "Tasa de cambio",
          "symbols": [
            { "s": "FX_IDC:USDARS", "d": "Pesos argentinos" },
            { "s": "FX_IDC:USDBOB", "d": "Bolivianos" },
            { "s": "FX_IDC:USDBRL", "d": "Reales brasileños" },
            { "s": "FX_IDC:USDCLP", "d": "Pesos chilenos" },
            { "s": "FX_IDC:USDCOP", "d": "Pesos colombianos" },
            { "s": "FX_IDC:USDCRC", "d": "Colones" },
            { "s": "FX_IDC:USDGYD", "d": "Dólar guyanense" },
            { "s": "FX_IDC:USDHNL", "d": "Lempiras" },
            { "s": "FX:USDMXN", "d": "Pesos mexicanos" },
            { "s": "FX_IDC:NIOUSD", "d": "Córdobas" },
            { "s": "FX_IDC:USDPYG", "d": "Guaraní" },
            { "s": "FX_IDC:USDPEN", "d": "Soles" },
            { "s": "FX_IDC:USDDOP", "d": "Pesos dominicanos" },
            { "s": "FX_IDC:USDUYU", "d": "Pesos uruguayos" }
          ],
          "originalTitle": "Forex"
        }
      ]
      
      
    });
    document.querySelector('.tradingview-widget-container__widget')?.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://es.tradingview.com/markets/futures/" rel="noopener noreferrer" target="_blank">
          <span className="blue-text">Commodities</span>
        </a><></>
        <span className="blue-text">y</span>
        <a href="https://es.tradingview.com/markets/currencies/" rel="noopener noreferrer" target="_blank">
          <span className="blue-text">Tasa de cambio</span>
        </a> por TradingView
      </div>
    </div>
  );
  
};

export default TradingViewWidget;
