import fs from 'fs';
import path from 'path';

/**
 * Script to generate a basic sitemap.xml for EH TAXI 6106
 */

const BASE_URL = 'https://6106.bg';
const pages = [
  { url: '/', lastmod: new Date().toISOString().split('T')[0], priority: '1.0', changefreq: 'daily' },
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  
  try {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully in /public/sitemap.xml');

    const robots = `User-agent: *
Allow: /
Disallow: /editor

Sitemap: ${BASE_URL}/sitemap.xml`;

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log('✅ robots.txt generated successfully in /public/robots.txt');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

generateSitemap();
