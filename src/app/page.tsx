import { Suspense } from 'react';
import Simulator from '@/components/Simulator';

export default function Home() {
  return (
    <main className="max-w-3xl w-full px-4 py-12 mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm text-slate-400 mb-2">※入力データはブラウザ上でのみ計算され、外部に保存・送信されることはありません</p>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent leading-tight py-2">
          メルマガ配信コスト<br className="md:hidden" />削減シミュレーター
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          毎月のメルマガ配信ツールに無駄なコストを払っていませんか？<br className="hidden md:block" />
          このツールで「今の無駄な出費」を可視化し、格安システムへの乗り換え効果を診断しましょう。
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-2">ツールの使い方</h2>
        <p className="text-slate-300">
          現在ご利用中のメール配信システムの月額費用と、配信しているおおよその顧客リスト数（アドレス数）を入力し、「今すぐ診断する」ボタンをクリックしてください。
        </p>
      </section>

      <Suspense fallback={<div className="text-center py-10 text-slate-400">Loading Simulator...</div>}>
        <Simulator />
      </Suspense>

      <section className="mb-12 mt-16">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-2">【事例】高額ツールから乗り換えたB社の場合</h2>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
          <p className="text-slate-300 leading-relaxed">
            【事例】月額15,000円のツールを使っていたB社の場合、める配くんに乗り換えたことで<strong className="text-blue-400 font-bold mx-1">年間約15万6千円</strong>のコスト削減に成功しました。
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-2">よくある質問</h2>
        <div className="space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-white mb-2">Q. なんでこんなに安くなるの？</h3>
            <p className="text-slate-300 text-sm leading-relaxed">A. 「める配くん」は必要な機能に絞り込み、大規模な広告費をかけずに運営しているため、業界最安クラスの価格を実現しています。</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-2">著者・運営情報</h2>
        <div className="flex items-center space-x-4 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0">
            L
          </div>
          <div>
            <p className="font-bold text-white mb-1">著者：Len</p>
            <p className="text-sm text-slate-300 mb-2">ITコスト削減コンサルタント。中小企業のSaaS導入・見直しを支援。</p>
            <p className="text-xs text-slate-500">最終更新日：{new Date().toLocaleDateString('ja-JP')}</p>
          </div>
        </div>
      </section>

      <section className="mb-12 text-sm text-slate-400">
        <h2 className="text-xl font-bold mb-4 text-slate-300">免責と開示</h2>
        <p className="leading-relaxed">
          本ページにはアフィリエイトリンクが含まれています。当サイトを経由してサービスを契約された場合、運営者に報酬が支払われることがあります。シミュレーション結果は目安であり、実際の利用状況やプランによって削減金額は変動する可能性があります。
        </p>
      </section>
    </main>
  );
}
