'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Simulator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [cost, setCost] = useState<string>('');
  const [listSize, setListSize] = useState<string>('');
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{ monthly: number; annual: number; isNegative: boolean } | null>(null);

  // Initialize from URL parameters
  useEffect(() => {
    const urlCost = searchParams.get('cost');
    const urlList = searchParams.get('list');
    
    if (urlCost) {
      setCost(urlCost);
    }
    if (urlList) {
      setListSize(urlList);
    }
  }, [searchParams]);

  const handleCalculate = (c: string, l: string) => {
    const costNum = parseInt(c.replace(/[^0-9]/g, ''), 10);
    if (isNaN(costNum)) return;
    
    setIsCalculating(true);
    setResult(null);
    
    setTimeout(() => {
      const difference = costNum - 1980;
      const isNegative = difference <= 0;
      
      setResult({
        monthly: difference,
        annual: difference * 12,
        isNegative
      });
      setIsCalculating(false);
      
      // Update URL parameters for sharing
      const newParams = new URLSearchParams(window.location.search);
      newParams.set('cost', costNum.toString());
      if (l) newParams.set('list', l);
      
      // Push without scrolling
      router.push(`?${newParams.toString()}`, { scroll: false });
    }, 500);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cost) return;
    handleCalculate(cost, listSize);
  };

  // Generate X share URL
  const getShareUrl = () => {
    const shareText = result?.isNegative
      ? `私の現在のメルマガ配信コスト（月額${cost}円）は、業界最安クラスのめる配くん（1,980円）より安く運用できていました！\n`
      : `める配くんに乗り換えると、年間【${result?.annual.toLocaleString()}円】のコスト削減ができることが分かりました！\n（現在の月額：${cost}円）\n`;
      
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const intentUrl = new URL('https://twitter.com/intent/tweet');
    intentUrl.searchParams.set('text', shareText);
    intentUrl.searchParams.set('url', url);
    return intentUrl.toString();
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl mb-12">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-slate-300 mb-2">
            現在使っているメール配信ツールの月額費用（円） <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="cost"
              required
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="例: 15000"
              className="block w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">円</span>
          </div>
        </div>

        <div>
          <label htmlFor="list" className="block text-sm font-medium text-slate-300 mb-2">
            現在の顧客リスト数（アドレス数）
          </label>
          <div className="relative">
            <input
              type="text"
              id="list"
              value={listSize}
              onChange={(e) => setListSize(e.target.value)}
              placeholder="例: 3000"
              className="block w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">件</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isCalculating || !cost}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              計算中...
            </>
          ) : (
            '今すぐ診断する'
          )}
        </button>
      </form>

      {/* RESULT SECTION */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-6 text-white text-center pb-2">計算結果（削減できる年間コスト）</h2>
          
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 text-center shadow-inner mb-8">
            {result.isNegative ? (
              <div className="py-6">
                <p className="text-xl text-emerald-400 font-bold mb-2">現在のツールの方が安価に運用できています</p>
                <p className="text-slate-400">（コスト削減効果はありません）</p>
                <p className="mt-4 text-sm text-slate-500">※める配くんのベース料金（1,980円）を下回っています。</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 mb-1">毎月の節約額</p>
                  <p className="text-4xl font-extrabold text-blue-400">
                    {result.monthly.toLocaleString()}<span className="text-xl text-slate-400 ml-1 font-normal">円</span>
                  </p>
                </div>
                <div className="h-px bg-slate-800 w-2/3 mx-auto"></div>
                <div>
                  <p className="text-slate-400 mb-1">年間の節約額</p>
                  <p className="text-5xl font-extrabold text-pink-400 drop-shadow-sm">
                    {result.annual.toLocaleString()}<span className="text-2xl text-slate-400 ml-1 font-normal">円</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {!result.isNegative && (
            <div className="mb-8">
              {/* Affiliate CTA */}
              <div 
                className="affiliate-cta hover:scale-[1.02] transition-transform duration-200" 
                style={{
                  marginTop: '20px', 
                  padding: '20px', 
                  border: '2px solid #10B981', 
                  borderRadius: '12px', 
                  textAlign: 'center', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div style={{color: '#34D399', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.2rem'}}>
                  業界最安クラスのメール配信システムでコスト削減
                </div>
                <div style={{color: '#a7f3d0', marginBottom: '20px'}}>
                  ※初期費用無料・月額1,980円〜
                </div>
                <a 
                  href="https://px.a8.net/svt/ejp?a8mat=4AZE01+FEAKZ6+IZW+62MDE" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{
                    display: 'inline-block', 
                    backgroundColor: '#10B981', 
                    color: 'white', 
                    fontWeight: 'bold', 
                    padding: '14px 28px', 
                    borderRadius: '8px', 
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
                  }}
                >
                  める配くんの詳細を見る
                </a>
              </div>
            </div>
          )}

          {/* Social Share Button */}
          <div className="text-center">
            <a
              href={getShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-transparent border border-slate-600 hover:border-slate-400 hover:bg-slate-800 text-slate-300 font-medium py-3 px-6 rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              この結果をX(Twitter)でシェアする
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
