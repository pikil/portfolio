import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    appDir: 'app',
    paths: {
      base: '/portfolio'
    },
    adapter: adapter({
      fallback: 'index.html'
    }),
    alias: {
      $ui: 'src/lib/ui',
      $utils: 'src/lib/utils'
    }
  }
}

export default config
