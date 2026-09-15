import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MIRU Casino Review — UI Practice',
  description: '日本語カジノ比較サイトのローカルUI練習プロジェクト',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
