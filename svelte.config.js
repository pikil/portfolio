import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $ui: 'src/lib/ui',
      $utils: 'src/lib/utils'
    }
  }
}

export default config
