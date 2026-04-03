import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckRoot = path.resolve(__dirname, '..');
const outputDir = path.join(deckRoot, 'assets', 'screens');
const baseUrl = process.env.CAPTURE_BASE_URL || 'http://127.0.0.1:4175';

const screens = [
  {
    file: '01-dashboard.png',
    label: '대시보드',
    url: '?role=call_lead&tab=dashboard',
    waitText: '플랫폼 인사이트',
  },
  {
    file: '02-requests.png',
    label: '처리 현황',
    url: '?role=call_member&tab=requests',
    waitText: '전체 접수건의 진행 단계 및 타임라인 조회',
  },
  {
    file: '03-leads.png',
    label: 'DB 분류/배정',
    url: '?role=call_lead&tab=leads',
    waitText: '신청(DB) 유입 관리',
  },
  {
    file: '04-consultation-list.png',
    label: '상담/TM 목록',
    url: '?role=call_member&tab=consultation',
    waitText: '상담 리스트 (전체)',
  },
  {
    file: '05-consultation-detail-input.png',
    label: '상담 상세 입력',
    url: '?role=call_member&tab=consultation&requestId=R-TBDH17720260313',
    waitText: '상담 결과 입력',
  },
  {
    file: '06-consultation-detail-script.png',
    label: '상담 상세 스크립트',
    url: '?role=call_member&tab=consultation&requestId=R-TBDH17720260313',
    waitText: '상담 결과 입력',
    action: async (page) => {
      await page.getByRole('button', { name: '스크립트' }).click();
      await page.waitForTimeout(600);
    },
  },
  {
    file: '07-case-detail.png',
    label: '케이스 상세',
    url: '?role=call_lead&tab=case-detail&requestId=R-2026-009&section=call',
    waitText: '[콜팀] 접수/상담/TM',
  },
  {
    file: '08-case-detail-handoff-modal.png',
    label: '인계 확인 팝업',
    url: '?role=call_lead&tab=case-detail&requestId=R-2026-009&section=call',
    waitText: '[콜팀] 접수/상담/TM',
    action: async (page) => {
      const handoffButton = page.getByRole('button', { name: /영업팀에 인계하기/ });
      await handoffButton.scrollIntoViewIfNeeded();
      await handoffButton.click();
      await page.getByText('콜팀 → 영업팀 인계').waitFor({ state: 'visible' });
      await page.waitForTimeout(600);
    },
  },
  {
    file: '09-daily-report.png',
    label: '일일 보고서',
    url: '?role=call_lead&tab=daily-report',
    waitText: '일일 마감 보고',
  },
];

async function waitForApp(page, text) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
  await page.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout: 30000 });
  await page.waitForTimeout(700);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const screen of screens) {
    const targetUrl = `${baseUrl}/${screen.url}`;
    console.log(`Capturing: ${screen.label} -> ${screen.file}`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    await waitForApp(page, screen.waitText);
    if (screen.action) {
      await screen.action(page);
    }
    await page.screenshot({
      path: path.join(outputDir, screen.file),
      fullPage: false,
    });
  }

  await browser.close();
  console.log(`Saved screenshots to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
