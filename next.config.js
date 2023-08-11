/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config'); 
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: [
      'commonbeanobservatorytst.ciat.cgiar.org', 
      'www.fao.org', 
      'oeactest.ciat.cgiar.org',
      'www.worldbank.org',
      'fpma.fao.org',
      'www.fao.org',
      'comtradeplus.un.org',
      'www.magyp.gob.ar',
      'www.mercadocentral.gob.ar',
      'sisdep.conab.gov.br',
      'observatorioagro.gob.bo',
      'www.odepa.gob.cl',
      'fedearroz.s3.amazonaws.com',
      'www.dane.gov.co',
      'fpma.review.fao.org',
      'www.ministeriodegobierno.gob.ec',
      'www.mag.gob.sv',
      'precios.maga.gob.gt',
      'www.bch.hn',
      'th.bing.com',
      'www.inide.gob.ni',
      'www.oneplanetnetwork.org',
      'www.mag.gob.sv',
      'www.mioa.org',
      'www.thaitapiocastarch.org',
    ]
  },
  webpack(config, { isServer }) {
    if (process.env.ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
      }));
    }
    return config;
  }
}

module.exports = nextConfig
