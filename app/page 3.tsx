'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight, BadgeCheck, Bitcoin, BookOpen, ChevronRight, CircleDollarSign,
  Dices, Headphones, Menu, Search, ShieldCheck, Sparkles, Star,
  TimerReset, WalletCards, X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Casino = {
  rank: number; name: string; kana: string; score: number; bonus: string;
  payout: string; tags: string[]; mark: string; tone: string;
};

const casinos: Casino[] = [
  { rank: 1, name: 'KITSUNE', kana: 'キツネ・カジノ', score: 4.8, bonus: '初回入金 100% + 50FS', payout: '平均 12分', tags: ['仮想通貨', '出金が速い', '日本語'], mark: '狐', tone: 'coral' },
  { rank: 2, name: 'TSUKI', kana: 'ツキ・プレイ', score: 4.6, bonus: '入金不要 20FS', payout: '平均 25分', tags: ['入金不要', '日本語', '初心者向け'], mark: '月', tone: 'ink' },
  { rank: 3, name: 'NAMI', kana: 'ナミ・ゲームズ', score: 4.5, bonus: '最大 ¥80,000', payout: '平均 40分', tags: ['ゲーム数豊富', '仮想通貨', 'ライブ'], mark: '波', tone: 'blue' },
];

const categories = ['すべて', '出金が速い', '仮想通貨', '入金不要', '初心者向け'];
const guides = [
  { number: '01', category: 'はじめて', title: 'オンラインカジノを比較するときの5つの視点', time: '6 min' },
  { number: '02', category: 'ボーナス', title: '賭け条件と出金上限を、やさしく読み解く', time: '8 min' },
  { number: '03', category: '安全性', title: 'ライセンス・運営会社・利用規約の確認方法', time: '10 min' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('すべて');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const filteredCasinos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return casinos.filter((casino) => {
      const categoryMatch = category === 'すべて' || casino.tags.includes(category);
      const searchMatch = !normalized || [casino.name, casino.kana, casino.bonus, ...casino.tags]
        .join(' ').toLowerCase().includes(normalized);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  function showDemoNotice(name: string) {
    setNotice(`${name} のページは次の練習ステップで作成します。`);
    window.setTimeout(() => setNotice(''), 3200);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="demo-strip">
        <span>LOCAL UI PRACTICE</span>
        <p>これは学習用の架空サイトです。実在サービスへのリンクはありません。</p>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="MIRU CASINO トップへ">
          <span className="brand-mark"><Dices size={22} strokeWidth={1.8} /></span>
          <span><b>MIRU</b><small>CASINO REVIEW</small></span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="メインナビゲーション">
          <a href="#ranking">ランキング</a><a href="#bonus">ボーナス</a>
          <a href="#guides">ガイド</a><a href="#about">評価基準</a>
        </nav>
        <Button className="menu-button" variant="outline" size="icon"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <Badge className="eyebrow" variant="outline">2026 EDITOR&apos;S SELECTION</Badge>
          <h1>比べて、知って、<br /><em>自分で選ぶ。</em></h1>
          <p className="hero-lead">
            ボーナスの大きさだけでなく、出金条件やサポートまで。<br className="desktop-break" />
            編集部の基準で、気になるポイントを見やすく整理します。
          </p>
          <div className="search-panel" role="search">
            <Search aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)}
              placeholder="カジノ名・ボーナス・特徴から検索" aria-label="カジノを検索" />
            <Button onClick={() => document.querySelector('#ranking')?.scrollIntoView({ behavior: 'smooth' })}>
              検索する <ArrowRight />
            </Button>
          </div>
          <p className="search-hint"><span>人気の検索：</span> 出金が速い / 入金不要 / 仮想通貨</p>
        </div>

        <div className="hero-score" aria-label="評価基準の紹介">
          <div className="score-orbit orbit-one" /><div className="score-orbit orbit-two" />
          <div className="score-card">
            <span className="score-label">MIRU SCORE</span><strong>4.8</strong>
            <div className="stars" aria-label="5つ星中4.8">
              {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={16} fill="currentColor" />)}
            </div>
            <p>安全性・使いやすさ・<br />出金・サポートを総合評価</p>
          </div>
          <span className="stamp stamp-top">独自<br />調査</span>
          <span className="stamp stamp-bottom">毎月<br />更新</span>
        </div>
      </section>

      <section className="trust-grid" aria-label="サイトの特徴">
        {[
          { icon: ShieldCheck, title: '安全性を確認', text: '運営情報と利用条件' },
          { icon: TimerReset, title: '出金速度を比較', text: '申請から着金まで' },
          { icon: Bitcoin, title: '仮想通貨対応', text: '主要通貨をチェック' },
          { icon: Headphones, title: '日本語サポート', text: '対応時間と品質' },
        ].map(({ icon: Icon, title, text }, index) => (
          <article key={title}><span className="trust-number">0{index + 1}</span><Icon aria-hidden="true" />
            <div><h2>{title}</h2><p>{text}</p></div></article>
        ))}
      </section>

      <section className="ranking-section" id="ranking">
        <div className="section-heading">
          <div><span className="kicker">POPULAR RANKING</span><h2>人気カジノランキング</h2></div>
          <p>独自の評価軸で比較した、今月の注目ブランド。<br />すべて架空のデモデータです。</p>
        </div>
        <div className="filter-row" aria-label="ランキングを絞り込む">
          {categories.map((item) => (
            <Button key={item} variant={category === item ? 'default' : 'outline'}
              onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</Button>
          ))}
        </div>
        <div className="ranking-list">
          {filteredCasinos.map((casino) => (
            <article className="casino-card" key={casino.name}>
              <div className="rank-column"><span>RANK</span><strong>{String(casino.rank).padStart(2, '0')}</strong></div>
              <div className={`casino-logo ${casino.tone}`}><span>{casino.mark}</span></div>
              <div className="casino-name"><h3>{casino.name}</h3><p>{casino.kana}</p>
                <div className="mobile-tags">{casino.tags.slice(0, 2).map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
              </div>
              <div className="metric score-metric"><span>総合評価</span><strong>{casino.score}</strong><Star size={15} fill="currentColor" /></div>
              <div className="metric"><span>ボーナス</span><strong>{casino.bonus}</strong></div>
              <div className="metric payout-metric"><span>出金目安</span><strong>{casino.payout}</strong></div>
              <Button className="review-button" onClick={() => showDemoNotice(casino.name)}>詳細を見る <ChevronRight /></Button>
            </article>
          ))}
          {filteredCasinos.length === 0 && (
            <div className="empty-state"><Search /><h3>該当するデモカジノがありません</h3><p>検索語や絞り込み条件を変えてみてください。</p></div>
          )}
        </div>
      </section>

      <section className="bonus-section" id="bonus">
        <div className="bonus-intro">
          <span className="kicker light">BONUS GUIDE</span><h2>数字の大きさに<br />惑わされない。</h2>
          <p>ボーナスは金額だけでなく、賭け条件・対象ゲーム・出金上限までセットで比較するのが基本です。</p>
          <Button variant="outline" onClick={() => showDemoNotice('ボーナスガイド')}>基礎から学ぶ <ArrowRight /></Button>
        </div>
        <div className="bonus-feature">
          <span className="feature-label"><Sparkles size={16} /> 今月のデモ特集</span>
          <p>NO DEPOSIT BONUS</p><strong>入金不要<br /><em>20</em> FREE SPINS</strong>
          <div className="bonus-notes"><span>対象ゲーム限定</span><span>賭け条件 30x</span><span>出金上限あり</span></div>
        </div>
        <div className="bonus-list">
          <h3>人気のボーナス</h3>
          {[
            { icon: CircleDollarSign, label: '初回入金', value: '100% MATCH' },
            { icon: WalletCards, label: 'キャッシュバック', value: 'WEEKLY 10%' },
            { icon: BadgeCheck, label: 'VIP リワード', value: '5 LEVELS' },
          ].map(({ icon: Icon, label, value }, index) => (
            <button key={label} onClick={() => showDemoNotice(label)}><span>0{index + 1}</span><Icon />
              <div><small>{label}</small><b>{value}</b></div><ChevronRight /></button>
          ))}
        </div>
      </section>

      <section className="guide-section" id="guides">
        <div className="section-heading">
          <div><span className="kicker">CASINO PEDIA</span><h2>知っておきたい基礎知識</h2></div>
          <Button variant="ghost" onClick={() => showDemoNotice('記事一覧')}>記事をすべて見る <ArrowRight /></Button>
        </div>
        <div className="guide-grid">
          {guides.map((guide) => (
            <button className="guide-card" key={guide.number} onClick={() => showDemoNotice(guide.title)}>
              <div className="guide-top"><span>{guide.number}</span><BookOpen /></div>
              <div><small>{guide.category}</small><h3>{guide.title}</h3></div>
              <footer><span>{guide.time} read</span><span>読む <ArrowRight /></span></footer>
            </button>
          ))}
        </div>
      </section>

      <section className="method-section" id="about">
        <div><span className="kicker">OUR METHOD</span><h2>透明な評価を、<br />選ぶための道具に。</h2></div>
        <div className="method-copy">
          <p>評価は「安全性 30%」「出金 25%」「ボーナス 20%」「使いやすさ 15%」「サポート 10%」の5項目から算出する、という想定のUIです。</p>
          <div className="method-bars" aria-label="評価項目の比率">
            {[['安全性', 30], ['出金', 25], ['ボーナス', 20], ['使いやすさ', 15], ['サポート', 10]].map(([label, value]) => (
              <div key={label as string}><span>{label}</span><i style={{ width: `${Number(value) * 2.5}%` }} /><b>{value}%</b></div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark"><Dices size={22} /></span><span><b>MIRU</b><small>CASINO REVIEW</small></span></div>
        <p>学習目的で制作されたローカルUIプロトタイプです。掲載内容・ブランド・数値はすべて架空です。</p>
        <span>© 2026 UI PRACTICE</span>
      </footer>
      {notice && <output className="toast" aria-live="polite"><BadgeCheck />{notice}</output>}
    </main>
  );
}
