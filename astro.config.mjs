// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL и BASE_PATH подставляет GitHub Actions при публикации (см. .github/workflows/deploy.yml).
// Локально сайт работает от корня "/".
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
