const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const {
  CAPTURE_TARGETS,
  DEFAULT_BASE_URL,
  UNMOUNTED_PAGE_FILES,
} = require('./admin_screen_manifest.cjs');

const DEFAULT_OUT_DIR = path.resolve(__dirname, '../docs/assets/admin-screen-index');
const DEFAULT_HTML_PATH = path.resolve(__dirname, '../docs/04-report/admin-screen-index.html');
const DEFAULT_JSON_PATH = path.join(DEFAULT_OUT_DIR, 'manifest.json');

function parseArgs(argv) {
  const args = {
    baseUrl: DEFAULT_BASE_URL,
    outDir: DEFAULT_OUT_DIR,
    htmlPath: DEFAULT_HTML_PATH,
    jsonPath: DEFAULT_JSON_PATH,
    skipCapture: false,
    viewportWidth: 1600,
    viewportHeight: 1200,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === '--base-url' && next) {
      args.baseUrl = next;
      index += 1;
    } else if (current === '--out-dir' && next) {
      args.outDir = path.resolve(next);
      if (args.jsonPath === DEFAULT_JSON_PATH) {
        args.jsonPath = path.join(args.outDir, 'manifest.json');
      }
      index += 1;
    } else if (current === '--html-path' && next) {
      args.htmlPath = path.resolve(next);
      index += 1;
    } else if (current === '--json-path' && next) {
      args.jsonPath = path.resolve(next);
      index += 1;
    } else if (current === '--viewport-width' && next) {
      args.viewportWidth = Number(next);
      index += 1;
    } else if (current === '--viewport-height' && next) {
      args.viewportHeight = Number(next);
      index += 1;
    } else if (current === '--skip-capture') {
      args.skipCapture = true;
    }
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function buildUrl(baseUrl, target) {
  const url = new URL(baseUrl);
  url.searchParams.set('role', target.role);
  url.searchParams.set('tab', target.tab);

  if (target.requestId) {
    url.searchParams.set('requestId', target.requestId);
  }

  if (target.section) {
    url.searchParams.set('section', target.section);
  }

  return url.toString();
}

async function waitForScreen(page, title) {
  await page.locator('main').first().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.getByText('화면 불러오는 중...').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});

  if (title) {
    await page.getByText(title, { exact: false }).first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  await page.waitForTimeout(1200);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const groupName = item[key];
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(item);
    return groups;
  }, {});
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderHtml({ generatedAt, summary, results, htmlPath, outDir }) {
  const groups = groupBy(results, 'group');
  const imageBasePath = path.dirname(htmlPath);

  const navLinks = Object.keys(groups)
    .map((group) => `<a href="#group-${escapeHtml(group)}">${escapeHtml(group)}</a>`)
    .join('');

  const groupSections = Object.entries(groups)
    .map(([groupName, groupItems]) => {
      const cards = groupItems
        .map((item) => {
          const relativeImagePath = item.imagePath
            ? toPosixPath(path.relative(imageBasePath, path.join(outDir, item.imagePath)))
            : '';

          const metaBits = [
            `tab=${item.tab}`,
            `role=${item.role}`,
            item.requestId ? `requestId=${item.requestId}` : null,
            item.section ? `section=${item.section}` : null,
          ].filter(Boolean);

          const visual = item.status === 'captured'
            ? `<a class="thumb" href="${escapeHtml(relativeImagePath)}" target="_blank" rel="noreferrer">
                <img src="${escapeHtml(relativeImagePath)}" alt="${escapeHtml(item.title)}" loading="lazy" />
              </a>`
            : `<div class="thumb thumb-error"><div>캡처 실패</div><pre>${escapeHtml(item.error || '알 수 없는 오류')}</pre></div>`;

          return `
            <article class="card">
              ${visual}
              <div class="card-body">
                <div class="card-top">
                  <h3>${escapeHtml(item.title)}</h3>
                  <span class="status ${item.status === 'captured' ? 'ok' : 'error'}">${escapeHtml(item.status)}</span>
                </div>
                <p class="note">${escapeHtml(item.note || '')}</p>
                <p class="meta">${escapeHtml(metaBits.join(' | '))}</p>
                <p class="meta"><a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.url)}</a></p>
              </div>
            </article>
          `;
        })
        .join('');

      return `
        <section class="group" id="group-${escapeHtml(groupName)}">
          <div class="group-header">
            <h2>${escapeHtml(groupName)}</h2>
            <span>${groupItems.length} screens</span>
          </div>
          <div class="grid">
            ${cards}
          </div>
        </section>
      `;
    })
    .join('');

  const unmountedList = UNMOUNTED_PAGE_FILES
    .map((filePath) => `<li>${escapeHtml(filePath)}</li>`)
    .join('');

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Screen Index</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f3f4f6;
        --surface: #ffffff;
        --surface-alt: #f8fafc;
        --border: #dbe2ea;
        --text: #0f172a;
        --muted: #64748b;
        --accent: #0f766e;
        --danger: #b91c1c;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #eef2f7 0%, #f8fafc 100%);
        color: var(--text);
      }
      a { color: inherit; }
      .page {
        max-width: 1600px;
        margin: 0 auto;
        padding: 32px 24px 80px;
      }
      .hero {
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
      }
      .hero h1 {
        margin: 0;
        font-size: 32px;
        line-height: 1.15;
      }
      .hero p {
        margin: 10px 0 0;
        color: var(--muted);
        line-height: 1.6;
      }
      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 18px;
      }
      .pill {
        background: var(--surface-alt);
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 13px;
        color: var(--muted);
      }
      .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 20px;
      }
      .nav a {
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 999px;
        background: #e6fffb;
        color: var(--accent);
        border: 1px solid rgba(15, 118, 110, 0.18);
        font-size: 13px;
        font-weight: 600;
      }
      .group {
        margin-top: 32px;
      }
      .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .group-header h2 {
        margin: 0;
        font-size: 22px;
      }
      .group-header span {
        color: var(--muted);
        font-size: 13px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 18px;
      }
      .card {
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid var(--border);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.06);
      }
      .thumb {
        display: block;
        aspect-ratio: 4 / 3;
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
        overflow: hidden;
      }
      .thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .thumb-error {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 18px;
        color: var(--danger);
      }
      .thumb-error pre {
        margin: 0;
        white-space: pre-wrap;
        font-size: 12px;
        color: var(--danger);
      }
      .card-body {
        padding: 18px;
      }
      .card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .card-top h3 {
        margin: 0;
        font-size: 17px;
        line-height: 1.4;
      }
      .status {
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
      }
      .status.ok {
        background: #dcfce7;
        color: #166534;
      }
      .status.error {
        background: #fee2e2;
        color: #991b1b;
      }
      .note {
        margin: 12px 0 0;
        color: var(--text);
        font-size: 14px;
        line-height: 1.5;
      }
      .meta {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 12px;
        line-height: 1.6;
        word-break: break-all;
      }
      .footer {
        margin-top: 36px;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--border);
        border-radius: 22px;
        padding: 24px;
      }
      .footer h2 {
        margin: 0 0 12px;
        font-size: 20px;
      }
      .footer p,
      .footer li {
        color: var(--muted);
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <h1>Admin Screen Capture Index</h1>
        <p>현재 앱에서 URL 쿼리로 직접 진입 가능한 주요 화면을 일괄 캡처한 인덱스입니다. 디자인 검토, Pencil/Figma 재구성, 프론트 수정 범위 산정의 출발점으로 사용할 수 있습니다.</p>
        <div class="summary">
          <span class="pill">Generated at: ${escapeHtml(generatedAt)}</span>
          <span class="pill">Captured: ${summary.captured} / ${summary.total}</span>
          <span class="pill">Failed: ${summary.failed}</span>
          <span class="pill">HTML: ${escapeHtml(path.relative(process.cwd(), htmlPath))}</span>
        </div>
        <nav class="nav">${navLinks}</nav>
      </section>

      ${groupSections}

      <section class="footer">
        <h2>현재 App에 직접 마운트되지 않은 페이지 파일</h2>
        <p>아래 파일들은 저장소에는 있지만 현재 <code>App.tsx</code>의 탭 전환 경로에는 연결되지 않아 이번 인덱스에서 자동 캡처하지 않았습니다.</p>
        <ul>${unmountedList}</ul>
      </section>
    </main>
  </body>
</html>`;
}

async function captureTargets(args) {
  ensureDir(args.outDir);
  ensureDir(path.dirname(args.htmlPath));
  ensureDir(path.dirname(args.jsonPath));

  if (args.skipCapture) {
    return CAPTURE_TARGETS.map((target, index) => ({
      ...target,
      index: index + 1,
      url: buildUrl(args.baseUrl, target),
      imagePath: `${String(index + 1).padStart(2, '0')}-${target.slug}.png`,
      status: fs.existsSync(path.join(args.outDir, `${String(index + 1).padStart(2, '0')}-${target.slug}.png`))
        ? 'captured'
        : 'missing',
    }));
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: {
      width: args.viewportWidth,
      height: args.viewportHeight,
    },
  });

  const results = [];

  for (let index = 0; index < CAPTURE_TARGETS.length; index += 1) {
    const target = CAPTURE_TARGETS[index];
    const fileName = `${String(index + 1).padStart(2, '0')}-${target.slug}.png`;
    const outputPath = path.join(args.outDir, fileName);
    const url = buildUrl(args.baseUrl, target);

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
      await waitForScreen(page, target.title);
      const size = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
      }));
      await page.screenshot({ path: outputPath, fullPage: true });

      results.push({
        ...target,
        index: index + 1,
        imagePath: fileName,
        status: 'captured',
        url,
        size,
      });

      process.stdout.write(`captured ${fileName}\n`);
    } catch (error) {
      results.push({
        ...target,
        index: index + 1,
        imagePath: fileName,
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
        url,
      });

      process.stderr.write(`failed ${fileName}: ${error instanceof Error ? error.message : String(error)}\n`);
    }
  }

  await browser.close();
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const generatedAt = new Date().toISOString();
  const results = await captureTargets(args);
  const summary = {
    total: results.length,
    captured: results.filter((item) => item.status === 'captured').length,
    failed: results.filter((item) => item.status !== 'captured').length,
  };

  const html = renderHtml({
    generatedAt,
    summary,
    results,
    htmlPath: args.htmlPath,
    outDir: args.outDir,
  });

  fs.writeFileSync(args.htmlPath, html, 'utf8');
  fs.writeFileSync(
    args.jsonPath,
    JSON.stringify(
      {
        generatedAt,
        summary,
        baseUrl: args.baseUrl,
        results,
      },
      null,
      2
    ),
    'utf8'
  );

  process.stdout.write(
    `wrote ${path.relative(process.cwd(), args.htmlPath)} and ${path.relative(process.cwd(), args.jsonPath)}\n`
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack || error.message : String(error)}\n`);
  process.exit(1);
});
