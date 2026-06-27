/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ 
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      }, 
      // {
      //   protocol: "http",
      //   hostname: "44.255.116.87",
      //   port: "8000",
      //   pathname: "/**",
      // },
    ],
  },
};

module.exports = nextConfig;