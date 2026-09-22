import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Load production environment variables
const env = loadEnv('production', __dirname, '');
Object.assign(process.env, env);

const { getSeoForUrl, buildMetaTagsHtml } = await import('./src/data/seoData.js');

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
const { render } = await import('./dist-ssr/entry-server.js');

const routesToPrerender = [
  { url: '/', file: 'dist/index.html' },
  { url: '/about-us', file: 'dist/about-us/index.html' },
  { url: '/careers', file: 'dist/careers/index.html' },
  { url: '/industries', file: 'dist/industries/index.html' },
  { url: '/process', file: 'dist/process/index.html' },
  { url: '/contact-us', file: 'dist/contact-us/index.html' },
  { url: '/request-a-proposal', file: 'dist/request-a-proposal/index.html' },
  { url: '/admin', file: 'dist/admin/index.html' },
];

for (const route of routesToPrerender) {
  const appHtml = render(route.url);
  const seo = getSeoForUrl(route.url);
  const metaTagsHtml = buildMetaTagsHtml(seo);

  let html = template;
  if (html.includes('<!-- ROOT_CONTENT_START -->')) {
    html = html.replace(
      /<!-- ROOT_CONTENT_START -->[\s\S]*?<!-- ROOT_CONTENT_END -->/,
      `<!-- ROOT_CONTENT_START -->${appHtml}<!-- ROOT_CONTENT_END -->`
    );
  } else {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/div>\s*(?=<script)/,
      `<div id="root"><!-- ROOT_CONTENT_START -->${appHtml}<!-- ROOT_CONTENT_END --></div>`
    );
  }
  html = html.replace(
    /<!-- SEO_META_START -->[\s\S]*?<!-- SEO_META_END -->/,
    `<!-- SEO_META_START -->\n${metaTagsHtml}\n    <!-- SEO_META_END -->`
  );

  const filePath = toAbsolute(route.file);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log('Pre-rendered: ' + route.url + ' -> ' + route.file + ' (' + (html.length / 1024).toFixed(1) + ' KB)');
}

fs.rmSync(toAbsolute('dist-ssr'), { recursive: true, force: true });
console.log('Prerendering completed successfully!');
