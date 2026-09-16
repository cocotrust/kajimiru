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
  const cardsContainer = document.querySelector('.ranking-cards');
  const input = document.querySelector('#hero-search');
  const filterButtons = [...document.querySelectorAll('.filter-tabs button')];
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const brandTags = {
    TRUSTDICE: ['出金が速い','仮想通貨'],
    STAKE: ['出金が速い','仮想通貨'],
    YUUGADO: ['仮想通貨','初心者向け'],
    'STEALTH BET': ['仮想通貨','入金不要'],
    RAINBET: ['出金が速い','仮想通貨'],
    'VERA&JOHN': ['初心者向け']
  };
  let activeFilter = 'すべて';

  const emptyState = document.createElement('div');
  emptyState.className = 'no-result';
  emptyState.setAttribute('role', 'status');
  emptyState.hidden = true;
  emptyState.innerHTML = '<b>一致するデモデータがありません</b><button type="button">条件をリセット</button>';
  cardsContainer?.appendChild(emptyState);

  function showNotice(label) {
    document.querySelector('.offline-toast')?.remove();
    const notice = document.createElement('output');
    notice.className = 'toast offline-toast';
    notice.setAttribute('aria-live', 'polite');
    notice.textContent = label + ' はデモ表示です。次のページ制作で接続できます。';
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 3000);
  }

  function applyFilters() {
    const query = (input?.value || '').trim().toLowerCase();
    let visibleCount = 0;
    cards.forEach((card) => {
      const brand = card.querySelector('.rank-card-title small')?.textContent?.trim() || '';
      const matchesText = !query || card.textContent.toLowerCase().includes(query);
      const matchesFilter = activeFilter === 'すべて' || (brandTags[brand] || []).includes(activeFilter);
      card.classList.toggle('offline-hidden', !(matchesText && matchesFilter));
      if (matchesText && matchesFilter) visibleCount += 1;
    });
    emptyState.hidden = visibleCount !== 0;
  }

  input?.addEventListener('input', applyFilters);
  filterButtons.forEach((button, index) => {
    if (index === 0) button.classList.add('offline-active');
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      activeFilter = button.textContent.trim();
      filterButtons.forEach((item) => item.classList.remove('offline-active'));
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.classList.add('offline-active');
      button.setAttribute('aria-pressed', 'true');
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
  document.querySelector('.hero-search')?.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
    document.querySelector('#ranking')?.scrollIntoView({behavior:'smooth'});
  });

  emptyState.querySelector('button')?.addEventListener('click', () => {
    if (input) input.value = '';
    activeFilter = 'すべて';
    filterButtons.forEach((button, index) => {
      button.classList.toggle('offline-active', index === 0);
      button.setAttribute('aria-pressed', String(index === 0));
    });
    applyFilters();
    input?.focus();
  });

  function closeMenu() {
    navigation?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'メニューを開く');
  }
  menuToggle?.addEventListener('click', () => {
    const isOpen = navigation?.classList.toggle('open') || false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  document.querySelectorAll('button').forEach((button) => {
    if (button.closest('.filter-tabs, .popular-terms, .hero-search, .no-result') || button.matches('.nav-search, .menu-toggle')) return;
    button.addEventListener('click', () => showNotice(button.textContent.trim().replace(/詳細を見る|一覧を見る|ゲーム一覧|評価ポリシー/g, '').trim() || 'この項目'));
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
