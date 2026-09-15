import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const previewUrl = process.env.KAJIMIRU_PREVIEW_URL || 'http://localhost:3000';
const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, 'exports', 'KAJIMIRU-offline-preview');
const assetsDir = path.join(outputDir, 'assets');

const [htmlResponse, cssResponse] = await Promise.all([
  fetch(`${previewUrl}/`),
  fetch(`${previewUrl}/app/globals.css?direct`),
]);

if (!htmlResponse.ok || !cssResponse.ok) {
  throw new Error(`Preview export failed: HTML ${htmlResponse.status}, CSS ${cssResponse.status}`);
}

let html = await htmlResponse.text();
const css = await cssResponse.text();

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<link\b[^>]*(?:rel="(?:stylesheet|modulepreload|preload)"|as="image")[^>]*>/gi, '')
  .replace(/src="\/_next\/image\?url=%2Fmiru-editor\.png[^\"]*"/gi, 'src="assets/miru-editor.png"')
  .replace(/\s+srcSet="[^"]*"/gi, '')
  .replace('<title>MIRU Casino Review — UI Practice</title>', '<title>KAJIMIRU — Offline Preview</title>');

const offlineCss = `
  .filter-tabs button.offline-active{background:#152b50!important;color:#fff!important;border-color:#152b50!important}
  .offline-hidden{display:none!important}
  .offline-note{position:fixed;right:18px;bottom:18px;z-index:90;padding:8px 12px;border-radius:999px;background:#101d36;color:#fff;font:700 11px Arial;box-shadow:0 6px 20px rgba(0,0,0,.2)}
`;

const offlineScript = `
<script>
(() => {
  const cards = [...document.querySelectorAll('.rank-card.large')];
  const input = document.querySelector('#hero-search');
  const filterButtons = [...document.querySelectorAll('.filter-tabs button')];
  const brandTags = {
    TRUSTDICE: ['出金が速い','仮想通貨'],
    STAKE: ['出金が速い','仮想通貨'],
    YUUGADO: ['仮想通貨','初心者向け'],
    'STEALTH BET': ['仮想通貨','入金不要'],
    RAINBET: ['出金が速い','仮想通貨'],
    'VERA&JOHN': ['初心者向け']
  };
  let activeFilter = 'すべて';

  function applyFilters() {
    const query = (input?.value || '').trim().toLowerCase();
    cards.forEach((card) => {
      const brand = card.querySelector('.rank-card-title small')?.textContent?.trim() || '';
      const matchesText = !query || card.textContent.toLowerCase().includes(query);
      const matchesFilter = activeFilter === 'すべて' || (brandTags[brand] || []).includes(activeFilter);
      card.classList.toggle('offline-hidden', !(matchesText && matchesFilter));
    });
  }

  input?.addEventListener('input', applyFilters);
  filterButtons.forEach((button, index) => {
    if (index === 0) button.classList.add('offline-active');
    button.addEventListener('click', () => {
      activeFilter = button.textContent.trim();
      filterButtons.forEach((item) => item.classList.remove('offline-active'));
      button.classList.add('offline-active');
      applyFilters();
    });
  });

  document.querySelectorAll('.popular-terms button').forEach((button) => {
    button.addEventListener('click', () => {
      if (input) input.value = button.textContent.trim();
      applyFilters();
      document.querySelector('#ranking')?.scrollIntoView({behavior:'smooth'});
    });
  });

  document.querySelector('.nav-search')?.addEventListener('click', () => input?.focus());
  document.querySelector('.hero-search button')?.addEventListener('click', () => {
    applyFilters();
    document.querySelector('#ranking')?.scrollIntoView({behavior:'smooth'});
  });

  const note = document.createElement('div');
  note.className = 'offline-note';
  note.textContent = 'OFFLINE UI DEMO';
  document.body.appendChild(note);
})();
</script>`;

html = html
  .replace('</head>', `<style>${css}\n${offlineCss}</style></head>`)
  .replace('</body>', `${offlineScript}</body>`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(assetsDir, { recursive: true });
await copyFile(path.join(projectRoot, 'public', 'miru-editor.png'), path.join(assetsDir, 'miru-editor.png'));
await writeFile(path.join(outputDir, 'index.html'), html, 'utf8');

const readme = await readFile(path.join(projectRoot, 'README_SHARE.md'), 'utf8');
await writeFile(
  path.join(outputDir, 'README.txt'),
  `KAJIMIRU 免安装预览\n\n解压后直接双击 index.html 即可。\n无需安装 VS Code、Node.js 或 pnpm。\n推荐使用 Chrome、Edge 或 Safari。\n\nこれはインストール不要のローカルUIデモです。\nZIPを解凍して index.html をダブルクリックしてください。\n\n--- 项目说明 / プロジェクト説明 ---\n\n${readme}`,
  'utf8',
);

console.log(`Offline preview created at ${outputDir}`);
