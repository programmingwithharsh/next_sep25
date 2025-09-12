/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites - Map one URL to another (user sees original URL)
  async rewrites() {
    return [
      {
        source: '/old-page',
        destination: '/geo-demo'
      }
    ]
  },

  // Redirects - Send user to different URL (URL changes in browser)
  async redirects() {
    return [
      {
        source: '/redirect-demo',
        destination: '/home',
        permanent: false // 307 redirect (temporary)
      }
    ]
  },

  // Headers - Add custom headers to responses
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Custom-Header',
            value: 'Hello from Next.js Config!'
          }
        ]
      }
    ]
  }
};

export default nextConfig;