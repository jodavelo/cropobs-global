/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config'); 

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['commonbeanobservatorytst.ciat.cgiar.org', 'www.fao.org', 'oeactest.ciat.cgiar.org']
  } 
}

module.exports = nextConfig
