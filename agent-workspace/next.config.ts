import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/consultation-center',
        destination: '/prompt-uretimi',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
