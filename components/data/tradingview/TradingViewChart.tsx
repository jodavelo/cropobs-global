import React, { useEffect } from 'react';

export const TradingViewChart: React.FC = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://s3.tradingview.com/tv.js';
    document.body.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.innerHTML = `
        new TradingView.widget({
          "width": "100%",
          "height": "100%",
          "symbol": "CBOT:ZR1!",
          "timezone": "America/Bogota",
          "theme": "light",
          "style": "1",
          "locale": "es",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "range": "12M",
          "details": true,
          "container_id": "tradingview_2a2d3"
        });
      `;

      document.body.appendChild(script2);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_2a2d3"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://es.tradingview.com/symbols/CBOT-ZR1!/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">ZR1! Gráfico</span>
        </a> por TradingView
      </div>
    </div>
  );
  
};

export default TradingViewChart;
