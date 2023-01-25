/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config'); 

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ['oeactest.ciat.cgiar.org', 'cassavalighthousetest.ciat.cgiar.org', 'commonbeanobservatorytst.ciat.cgiar.org', 'musaobservatorytst.ciat.cgiar.org']
  }
}

module.exports = nextConfig
