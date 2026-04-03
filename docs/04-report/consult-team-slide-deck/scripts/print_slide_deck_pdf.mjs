import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(deckRoot, 'index.html');
const pdfPath = path.join(deckRoot, 'consult-team-slides.pdf');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
  });

  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete)
  );
  await page.emulateMedia({ media: 'screen' });
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    width: '13.333in',
    height: '7.5in',
    margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
  });

  await browser.close();
  console.log(`Saved PDF to ${pdfPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
