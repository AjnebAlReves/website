import { defineConfig } from 'astro/config'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'

import robotsTxt from "astro-robots-txt"

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [robotsTxt()],
  site: 'https://byalreves.lat/',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },

    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    },
    // Asegúrate de que esto esté habilitado
    syntaxHighlight: 'shiki',
  }
})
