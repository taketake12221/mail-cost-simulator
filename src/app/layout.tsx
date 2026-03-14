import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "メルマガ配信コスト削減シミュレーター｜高額ツールからの乗り換え効果を診断",
  description: "現在のメール配信システムの月額費用を入力するだけで、業界最安クラスの「める配くん」に乗り換えた場合の年間節約額を即時計算します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}
