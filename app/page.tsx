'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowRight, BadgeCheck, Bitcoin, BookOpen, ChevronDown, ChevronRight,
  Cat, CircleDollarSign, Clock3, CloudRain, Coins, Crown, Dices, Gamepad2, Gift,
  Headphones, Menu, Newspaper, Search, ShieldCheck, Sparkles, Star, Trophy,
  WalletCards, X, Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Casino = {
  rank: number; name: string; kana: string; score: number; bonus: string;
  wager: string; kyc: string; payout: string; tags: string[]; glyph: string;
  color: string; accent: string; payments: string[]; logoNote: string;
  brandKey: 'trustdice' | 'stake' | 'yuugado' | 'stealth' | 'rainbet' | 'verajohn';
};

const casinos: Casino[] = [
  { rank: 1, brandKey: 'trustdice', name: 'TRUSTDICE', kana: 'トラストダイス', score: 4.9, bonus: 'デモ 100% + 50FS', wager: '20倍', kyc: '条件付き', payout: 'デモ 即時', tags: ['編集部イチオシ', '仮想通貨', '出金が速い'], glyph: 'TD', color: '#096c82', accent: '#37e4b5', payments: ['BTC','USDT','ETH','TRX','LTC','XRP'], logoNote: 'CRYPTO CASINO' },
  { rank: 2, brandKey: 'stake', name: 'STAKE', kana: 'ステークカジノ', score: 4.6, bonus: '登録ボーナス $14', wager: 'なし', kyc: '必要', payout: '即時', tags: ['仮想通貨', '出金が速い', 'スポーツ'], glyph: 'S', color: '#111c24', accent: '#19e29b', payments: ['BTC','USDT','ETH','XRP','LTC'], logoNote: 'STAKE CASINO' },
  { rank: 3, brandKey: 'yuugado', name: 'YUUGADO', kana: '遊雅堂', score: 4.5, bonus: '登録ボーナス ¥6,000', wager: '20倍', kyc: '必要', payout: '24時間以内', tags: ['初心者向け', '日本語', '仮想通貨'], glyph: '遊', color: '#482b17', accent: '#d9a522', payments: ['JPY','BTC','USDT','ETH'], logoNote: '遊びを、もっと雅に。' },
  { rank: 4, brandKey: 'stealth', name: 'STEALTH BET', kana: 'ステルスベット', score: 4.5, bonus: '登録ボーナス 30 USDT', wager: '30倍', kyc: '必要', payout: '24時間', tags: ['入金不要', '仮想通貨', 'スポーツ'], glyph: 'SB', color: '#071427', accent: '#00d9ff', payments: ['BTC','XRP','USDT','TRX','ETH','LTC'], logoNote: 'STEALTH MODE ON' },
  { rank: 5, brandKey: 'rainbet', name: 'RAINBET', kana: 'レインベット', score: 4.2, bonus: '最大 $1,750', wager: '40倍', kyc: '不要', payout: '即時', tags: ['仮想通貨', '出金が速い', 'キャッシュバック'], glyph: 'R', color: '#0b224b', accent: '#4e8cff', payments: ['BTC','USDT','ETH','TRX','LTC'], logoNote: 'PLAY IN THE RAIN' },
  { rank: 6, brandKey: 'verajohn', name: 'VERA&JOHN', kana: 'ベラジョンカジノ', score: 4.2, bonus: 'フリースピン 100回', wager: '20倍', kyc: '必要', payout: '24時間以内', tags: ['初心者向け', '日本語', 'ゲーム豊富'], glyph: 'VJ', color: '#a41f68', accent: '#ffdf5d', payments: ['JPY','BTC','USDT','ETH'], logoNote: 'ワクワクを、もっと。' },
];

function AnimeBrandLogo({ casino }: { casino: Casino }) {
  const mark = casino.brandKey === 'trustdice' ? <Dices />
    : casino.brandKey === 'stake' ? <Zap />
    : casino.brandKey === 'stealth' ? <Cat />
    : casino.brandKey === 'rainbet' ? <CloudRain />
    : casino.brandKey === 'verajohn' ? <Crown />
    : <span>遊</span>;

  return <div className={`anime-logo anime-logo-${casino.brandKey}`}>
    <div className="anime-mark" aria-hidden="true"><i /><span>{mark}</span><b>✦</b></div>
    <div className="anime-wordmark">
      {casino.brandKey === 'yuugado' ? <strong className="jp-wordmark">遊 雅 堂</strong>
        : casino.brandKey === 'verajohn' ? <strong>Vera<span>&amp;</span>John</strong>
        : casino.brandKey === 'stealth' ? <strong>Stealth<span>Bet</span></strong>
        : casino.brandKey === 'trustdice' ? <strong>Trust<span>Dice</span></strong>
        : <strong>{casino.name[0]}<span>{casino.name.slice(1).toLowerCase()}</span></strong>}
      <small>{casino.logoNote}</small>
      {casino.brandKey === 'yuugado' && <em>YUUGADO</em>}
    </div>
    <div className="anime-origin">UNOFFICIAL ANIME UI EDIT</div>
  </div>;
}

const filters = ['すべて', '出金が速い', '仮想通貨', '入金不要', '初心者向け'];
const paymentColors: Record<string, string> = {
  BTC: '#f7931a', USDT: '#16a886', ETH: '#202431', TRX: '#ef173f',
  LTC: '#345d9d', XRP: '#111111', JPY: '#e84f75',
};

function PaymentMarks({ methods }: { methods: string[] }) {
  return <div className="payment-marks" aria-label={`支払い方法: ${methods.join(', ')}`}>
    {methods.map((method) => <span key={method} style={{ '--coin': paymentColors[method] } as React.CSSProperties} title={method}>
      <b>{method === 'BTC' ? '₿' : method === 'ETH' ? '◆' : method === 'LTC' ? 'Ł' : method === 'JPY' ? '¥' : method === 'XRP' ? 'X' : method === 'TRX' ? '△' : '₮'}</b>
      <small>{method}</small>
    </span>)}
  </div>;
}
const gameCategories = [
  { icon: Sparkles, title: 'スロット', subtitle: 'SLOT', count: 428 },
  { icon: Dices, title: 'テーブル', subtitle: 'TABLE', count: 86 },
  { icon: Gamepad2, title: 'ライブ', subtitle: 'LIVE', count: 114 },
  { icon: Trophy, title: 'スポーツ', subtitle: 'SPORTS', count: 32 },
  { icon: Coins, title: 'CRASH', subtitle: 'INSTANT', count: 54 },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('すべて');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return casinos.filter((casino) => {
      const filterMatch = filter === 'すべて' || casino.tags.includes(filter);
      const searchMatch = !q || [casino.name, casino.kana, casino.bonus, ...casino.tags].join(' ').toLowerCase().includes(q);
      return filterMatch && searchMatch;
    });
  }, [filter, query]);

  function demo(label: string) {
    setNotice(`${label} はデモ表示です。次のページ制作で接続できます。`);
    window.setTimeout(() => setNotice(''), 3000);
  }

  return (
    <main className="site-shell">
      <div className="legal-bar"><b>LOCAL UI DEMO</b><span>掲載ブランド・数値・キャンペーンはすべて架空です</span><a href="#method">評価方法を見る</a></div>

      <header className="main-header">
        <a className="logo" href="#top" aria-label="カジミル トップ"><span><Dices /></span><strong>カジ<span>ミル</span><small>CASINO GUIDE</small></strong></a>
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav open' : 'primary-nav'} aria-label="メインメニュー">
          <a href="#ranking" onClick={() => setMenuOpen(false)}>ランキング</a><a href="#bonus" onClick={() => setMenuOpen(false)}>ボーナス</a><a href="#promo" onClick={() => setMenuOpen(false)}>最新プロモ</a>
          <a href="#games" onClick={() => setMenuOpen(false)}>ゲーム</a><a href="#pedia" onClick={() => setMenuOpen(false)}>カジノ百科</a><a href="#directory" onClick={() => setMenuOpen(false)}>カジノ一覧</a>
        </nav>
        <button className="nav-search" aria-label="サイト内検索" onClick={() => document.querySelector<HTMLInputElement>('#hero-search')?.focus()}><Search /></button>
        <button className="menu-toggle" aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <div className="page-wrap" id="top">
        <section className="hero-banner">
          <div className="hero-pattern" />
          <div className="hero-copy">
            <div className="hero-chips"><span>2026年9月版</span><span><BadgeCheck /> 編集部が検証</span></div>
            <p className="hero-kicker">はじめてでも、迷わない。</p>
            <h1>日本語カジノを<br /><em>まるごと比較！</em></h1>
            <p className="hero-desc">ボーナス・出金・ゲーム・日本語サポート。<br />気になる条件を一画面でサクッと比較できます。</p>
            <form className="hero-search" role="search" onSubmit={(event) => { event.preventDefault(); document.querySelector('#ranking')?.scrollIntoView({ behavior: 'smooth' }); }}>
              <Search /><Input id="hero-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="カジノ名や特徴で検索" />
              <label className="sr-only" htmlFor="hero-search">カジノ名や特徴で検索</label><Button type="submit">検索 <ArrowRight /></Button>
            </form>
            <div className="popular-terms"><b>人気ワード</b><button type="button" onClick={() => setQuery('入金不要')}>入金不要</button><button type="button" onClick={() => setQuery('仮想通貨')}>仮想通貨</button><button type="button" onClick={() => setQuery('日本語')}>日本語対応</button></div>
          </div>
          <div className="hero-visual">
            <div className="speech-bubble"><b>今月の注目は<br />出金スピード！</b><span>編集部 ミル</span></div>
            <Image src="/miru-editor.png" alt="比較ポイントを紹介する編集部キャラクター、ミル" width={1024} height={1536} priority />
            <div className="mini-rank"><span>今月の総合 1位</span><b>TRUSTDICE</b><strong><Star fill="currentColor" />4.9</strong></div>
          </div>
        </section>

        <section className="quick-points" aria-label="サイトの特徴">
          {[
            [ShieldCheck, '安全性', '運営情報を確認'], [Clock3, '出金速度', '申請から着金まで'],
            [Bitcoin, '仮想通貨', '主要コイン対応'], [Headphones, '日本語窓口', '対応時間も掲載'],
          ].map(([Icon, title, text], i) => {
            const PointIcon = Icon as typeof ShieldCheck;
            return <article key={title as string}><span>0{i + 1}</span><PointIcon /><div><b>{title as string}</b><small>{text as string}</small></div></article>;
          })}
        </section>

        <div className="content-layout">
          <div className="main-column">
            <section className="section-block ranking-block" id="ranking">
              <div className="section-title"><span className="title-icon"><Trophy /></span><div><small>POPULAR CASINO RANKING</small><h2>おすすめランキング TOP5</h2></div><p>総合評価・出金速度・ボーナス条件を横並びで比較</p></div>
              <div className="filter-tabs">
                {filters.map((item) => <Button key={item} type="button" aria-pressed={filter === item} variant={filter === item ? 'default' : 'outline'} onClick={() => setFilter(item)}>{item}</Button>)}
              </div>
              <div className="ranking-cards">
                {results.map((casino) => (
                  <article className="rank-card large" key={casino.name} style={{ '--brand-color': casino.color, '--brand-accent': casino.accent } as React.CSSProperties}>
                    <header className="rank-card-head">
                      <div className={`rank-badge rank-${casino.rank}`}><Trophy /><small>RANK</small><b>{casino.rank}</b></div>
                      <div className="rank-card-title"><span>{casino.glyph}</span><div><b>{casino.kana}</b><small>{casino.name}</small></div></div>
                      {casino.rank === 1 && <em>カジミル編集部 PICK UP!</em>}
                    </header>
                    <div className="rank-card-body">
                      <div className="brand-visual">
                        <div className="visual-spark spark-a">✦</div><div className="visual-spark spark-b">✧</div>
                        <AnimeBrandLogo casino={casino} />
                        <div className="brand-ribbon">{casino.tags[0]}</div>
                      </div>
                      <div className="brand-details">
                        <div className="payment-line"><b>支払い方法</b><PaymentMarks methods={casino.payments} /></div>
                        <div className="brand-links"><button onClick={() => demo(`${casino.kana}レビュー`)}>{casino.kana}レビュー</button><button onClick={() => demo('詳細情報')}>詳細情報 <ChevronDown /></button></div>
                      </div>
                      <div className="rank-facts">
                        <div className="score-wide"><div>{[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" />)}</div><b>5点中{casino.score}点</b></div>
                        <div className="fact-top">
                          <div><span>登録ボーナス</span><strong>{casino.bonus}</strong></div>
                          <div><span>限定ボーナスコード</span><strong>{casino.rank === 1 ? 'DEMO-TD' : '不要'}</strong></div>
                        </div>
                        <div className="fact-grid"><div><span>賭け条件</span><b>{casino.wager}</b></div><div><span>本人確認</span><b>{casino.kyc}</b></div><div><span>出金速度</span><b>{casino.payout}</b></div></div>
                        <Button className="wide-action" onClick={() => demo(casino.kana)}><span className="action-logo">{casino.glyph}</span><b>デモの詳細ページを見る</b><ChevronRight /></Button>
                      </div>
                    </div>
                  </article>
                ))}
                {results.length === 0 && <div className="no-result" role="status"><Search /><b>一致するデモデータがありません</b><button type="button" onClick={() => { setQuery(''); setFilter('すべて'); }}>条件をリセット</button></div>}
              </div>
            </section>

            <section className="section-block module-block" id="bonus">
              <div className="section-title compact"><span className="title-icon coral"><Gift /></span><div><small>BONUS PICKUP</small><h2>オンラインカジノボーナス</h2></div><button onClick={() => demo('ボーナス一覧')}>一覧を見る <ArrowRight /></button></div>
              <div className="bonus-grid">
                <article className="bonus-main"><span className="ribbon">編集部 PICK UP</span><small>NO DEPOSIT BONUS</small><h3>入金不要で<br /><em>20 FREE SPINS</em></h3><p>金額だけでなく、賭け条件と出金上限を確認しよう。</p><Button onClick={() => demo('入金不要ボーナス')}>条件をくわしく見る</Button></article>
                <div className="bonus-mini-list">
                  {[
                    [CircleDollarSign, '初回入金ボーナス', '最大100%'], [WalletCards, 'キャッシュバック', '毎週10%'],
                    [Sparkles, 'フリースピン', '最大100回'],
                  ].map(([Icon, title, value], i) => {
                    const ItemIcon = Icon as typeof Gift;
                    return <button key={title as string} onClick={() => demo(title as string)}><b>0{i + 1}</b><ItemIcon /><span><small>{title as string}</small><strong>{value as string}</strong></span><ChevronRight /></button>;
                  })}
                </div>
              </div>
            </section>

            <section className="section-block" id="promo">
              <div className="section-title compact"><span className="title-icon purple"><Newspaper /></span><div><small>LIMITED PROMOTION</small><h2>最新プロモ・キャンペーン</h2></div><button onClick={() => demo('プロモ一覧')}>すべて見る <ArrowRight /></button></div>
              <div className="promo-row">
                {[['週末スロット大会', '賞金総額 ¥500,000', '9/12まで', '#ff5a52'], ['月曜キャッシュバック', '対象ゲーム 15% 還元', '毎週開催', '#6d5ce8'], ['秋のログイン祭', '7日間のデイリー特典', '9/30まで', '#0ba8bb']].map(([title, text, date, color]) => (
                  <button key={title} onClick={() => demo(title)} style={{ '--promo': color } as React.CSSProperties}><span>{date}</span><b>{title}</b><p>{text}</p><small>詳細を見る <ChevronRight /></small></button>
                ))}
              </div>
            </section>

            <section className="section-block" id="games">
              <div className="section-title compact"><span className="title-icon blue"><Gamepad2 /></span><div><small>GAME CATEGORY</small><h2>ゲームから探す</h2></div><button onClick={() => demo('ゲーム一覧')}>ゲーム一覧 <ArrowRight /></button></div>
              <div className="game-grid">
                {gameCategories.map(({ icon: Icon, title, subtitle, count }) => <button key={title} onClick={() => demo(title)}><span><Icon /></span><small>{subtitle}</small><b>{title}</b><em>{count} games</em></button>)}
              </div>
            </section>
          </div>

          <aside className="sidebar">
            <section className="side-panel editor-panel"><div className="side-heading"><span>EDITOR&apos;S NOTE</span><b>はじめての方へ</b></div><div className="editor-row"><Image src="/miru-editor.png" alt="" width={110} height={165} /><p>まずは「出金条件」と「本人確認」の2点をチェック。高いボーナスだけで決めないのがポイントです。</p></div><button onClick={() => demo('初心者ガイド')}>3分でわかる選び方 <ArrowRight /></button></section>
            <section className="side-panel"><div className="side-heading"><span>HOT BONUS</span><b>人気ボーナス</b></div>{['デモ 100% + 50FS', '登録ボーナス 30 USDT', 'フリースピン 100回'].map((x, i) => <button className="side-rank" key={x} onClick={() => demo(x)}><strong>0{i+1}</strong><span>{x}<small>{i === 0 ? 'TRUSTDICE' : i === 1 ? 'STEALTH BET' : 'VERA&JOHN'}</small></span><ChevronRight /></button>)}</section>
            <section className="side-panel sticky-panel"><div className="side-heading"><span>POPULAR GUIDE</span><b>人気のガイド記事</b></div>{['賭け条件とは？図で解説', 'KYCで必要な書類', '仮想通貨入金の基本', '出金できない時の確認項目'].map((x, i) => <button className="article-link" key={x} onClick={() => demo(x)}><b>{String(i+1).padStart(2,'0')}</b><span>{x}<small>5〜8分で読めます</small></span></button>)}</section>
          </aside>
        </div>

        <section className="pedia-section" id="pedia">
          <div className="section-title wide"><span className="title-icon yellow"><BookOpen /></span><div><small>CASINO PEDIA</small><h2>カジノ百科・初心者ガイド</h2></div><p>登録前に知っておきたい基礎知識を、図解でやさしく。</p></div>
          <div className="pedia-grid">
            {[['START GUIDE','はじめてのオンラインカジノ比較','選び方の順番を6ステップで解説。','#ff5a52'],['PAYMENT','入出金方法をくらべる','手数料・反映時間・対応通貨の違い。','#0ba8bb'],['SECURITY','安全性を見極めるチェックリスト','ライセンスと利用規約の読み方。','#6d5ce8']].map(([tag,title,text,color],i) => <button key={title} onClick={() => demo(title)} style={{'--pedia':color} as React.CSSProperties}><span>{tag}</span><b>0{i+1}</b><h3>{title}</h3><p>{text}</p><em>記事を読む <ArrowRight /></em></button>)}
          </div>
        </section>

        <section className="directory-section" id="directory">
          <div className="directory-copy"><small>CASINO DIRECTORY</small><h2>カジノ一覧から探す</h2><p>名前が決まっている方は、頭文字からすぐに検索できます。</p></div>
          <div className="alphabet">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => <button key={letter} onClick={() => demo(`${letter} のブランド`)}>{letter}</button>)}</div>
          <Button onClick={() => demo('カジノブランド一覧')}>全ブランドを見る <ArrowRight /></Button>
        </section>

        <section className="method-strip" id="method"><ShieldCheck /><div><b>カジミルの評価方法</b><p>安全性30%・出金25%・ボーナス20%・使いやすさ15%・サポート10%の想定配分でスコアを構成しています。</p></div><button onClick={() => demo('評価ポリシー')}>評価ポリシー <ChevronRight /></button></section>
      </div>

      <footer><div className="logo footer-logo"><span><Dices /></span><strong>カジ<span>ミル</span><small>CASINO GUIDE</small></strong></div><p>学習目的のローカルUIプロトタイプです。実在サービスへのリンクはなく、掲載内容はすべて架空です。</p><small>© 2026 KAJIMIRU UI PRACTICE</small></footer>
      {notice && <output className="toast" aria-live="polite"><BadgeCheck />{notice}</output>}
    </main>
  );
}
