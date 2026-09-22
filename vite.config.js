import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-ssr-prerender',
      transformIndexHtml: {
        order: 'post',
        async handler(html, ctx) {
          if (ctx.server) {
            try {
              const url = ctx.originalUrl || ctx.path || '/';
              const { render } = await ctx.server.ssrLoadModule('/src/entry-server.jsx');
              const { getSeoForUrl, buildMetaTagsHtml } = await ctx.server.ssrLoadModule('/src/data/seoData.js');

              const appHtml = render(url);
              const seo = getSeoForUrl(url);
              const metaTagsHtml = buildMetaTagsHtml(seo);

              let modifiedHtml = html;
              if (modifiedHtml.includes('<!-- ROOT_CONTENT_START -->')) {
                modifiedHtml = modifiedHtml.replace(
                  /<!-- ROOT_CONTENT_START -->[\s\S]*?<!-- ROOT_CONTENT_END -->/,
                  `<!-- ROOT_CONTENT_START -->${appHtml}<!-- ROOT_CONTENT_END -->`
                );
              } else {
                modifiedHtml = modifiedHtml.replace(
                  /<div id="root">[\s\S]*?<\/div>\s*(?=<script)/,
                  `<div id="root"><!-- ROOT_CONTENT_START -->${appHtml}<!-- ROOT_CONTENT_END --></div>`
                );
              }
              modifiedHtml = modifiedHtml.replace(
                /<!-- SEO_META_START -->[\s\S]*?<!-- SEO_META_END -->/,
                `<!-- SEO_META_START -->\n${metaTagsHtml}\n    <!-- SEO_META_END -->`
              );

              return modifiedHtml;
            } catch (err) {
              console.error('SSR Prerender error:', err);
              return html;
            }
          }
          return html;
        },
      },
    },
  ],
  server: {
    port: 3001,
    open: false,
    proxy: {
      '/creatah-api': {
        target: 'http://localhost',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost/creatah-api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
