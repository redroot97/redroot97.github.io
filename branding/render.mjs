import { chromium } from 'playwright';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svg = await readFile(resolve(__dirname, 'linkedin-banner.svg'), 'utf8');

const html = `<!DOCTYPE html><html><head><style>
  body { margin: 0; padding: 0; background: #0a0a0a; }
  svg { display: block; }
</style></head><body>${svg}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
const svgEl = await page.$('svg');
const buf = await svgEl.screenshot({ omitBackground: false });
await writeFile(resolve(__dirname, 'linkedin-banner.png'), buf);
console.log('linkedin-banner.png written (3168x792, 2x DPI)');
await browser.close();
