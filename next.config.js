const path = require('path')

// @ts-check

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wuruph.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, 'src'),
      data: path.resolve(__dirname, 'data'),
      schemas: path.resolve(__dirname, 'schemas'),
      utils: path.resolve(__dirname, 'utils'),
    }
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = config
