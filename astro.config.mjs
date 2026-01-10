import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import path from 'path'

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), robotsTxt()],
  site: 'https://porfolio.dev/',

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }
})