'use client';

import { useState } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagic,
  faCopy,
  faCheck,
  faSpinner,
  faHashtag,
  faHeading,
  faParagraph,
  faArrowRight,
  faRobot,
  faBolt,
  faStar,
  faPalette,
  faRocket,
  faUsers,
  faEye,
  faChartLine,
  faHeadphones,
  faClock,
  faArrowTrendUp,
  faPenFancy,
  faBullhorn,
  faTags,
  faLayerGroup,
  faCloudArrowUp,
  faGear,
  faShieldHeart
} from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2">
    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-indigo-400 text-base" />
    <span className="text-slate-300 text-sm">جاري معالجة طلبك...</span>
  </div>
);

const HookCard = ({ hook, onCopy, copied }: { hook: string; onCopy: () => void; copied: boolean }) => (
  <div className="bg-white/[0.02] rounded-xl border border-white/10 p-5 hover:bg-white/[0.04] transition-all duration-300">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHeading} className="text-indigo-400 text-sm" />
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-400">العنوان التسويقي</span>
      </div>
      <button
        onClick={onCopy}
        className="text-slate-400 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
      </button>
    </div>
    <p className="text-white text-base leading-relaxed">{hook || "..."}</p>
  </div>
);

const CaptionCard = ({ caption, onCopy, copied }: { caption: string; onCopy: () => void; copied: boolean }) => (
  <div className="bg-white/[0.02] rounded-xl border border-white/10 p-5 hover:bg-white/[0.04] transition-all duration-300">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faPenFancy} className="text-emerald-400 text-sm" />
        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">وصف المنشور</span>
      </div>
      <button
        onClick={onCopy}
        className="text-slate-400 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
      </button>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed">{caption || "جاري التحميل..."}</p>
  </div>
);

const HashtagBlock = ({ hashtags, onCopy, copied }: { hashtags: string[]; onCopy: () => void; copied: boolean }) => (
  <div className="bg-white/[0.02] rounded-xl border border-white/10 p-5 hover:bg-white/[0.04] transition-all duration-300">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faTags} className="text-amber-400 text-sm" />
        <span className="text-xs font-medium uppercase tracking-wider text-amber-400">الهاشتاغات المقترحة</span>
        <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{hashtags.length}</span>
      </div>
      <button
        onClick={onCopy}
        className="text-slate-400 hover:text-white transition-colors duration-200 text-xs flex items-center gap-1"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ الكل'}</span>
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {hashtags.length > 0 ? (
        hashtags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs hover:bg-white/10 transition-all duration-200"
          >
            {tag}
          </span>
        ))
      ) : (
        <span className="text-xs text-slate-500">جاري التحميل...</span>
      )}
    </div>
  </div>
);

const ExampleCard = () => (
  <div className="mt-6 p-4 bg-white/[0.02] rounded-xl border border-white/10">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
        <FontAwesomeIcon icon={faEye} className="text-indigo-400 text-base" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-400">مثال توضيحي</span>
          <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">نسبة تحويل مرتفعة</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-xs w-12">قبل:</span>
            <span className="text-white/60">سماعة بلوتوث</span>
          </div>
          <div className="flex items-start gap-2 text-slate-500">
            <span className="text-xs w-12">بعد:</span>
            <span className="text-white/90 text-sm leading-relaxed">🎧 استمتع بصوت نقي وقوي مع سماعة بلوتوث بتقنية عزل الضوضاء، مثالية للرياضة والعمل والتنقل. بطارية تدوم حتى 12 ساعة!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [form, setForm] = useState({ productName: '', audience: '', tone: 'professional' });
  const [result, setResult] = useState<{ hook: string; caption: string; hashtags: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Silent fail
    }
  };

  const generateContent = async () => {
    if (!form.productName.trim() || !form.audience.trim()) {
      alert('الرجاء تعبئة جميع الحقول');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('خطأ في الخادم');

      const data = await res.json();

      if (!data.success) throw new Error(data.error || 'فشل التوليد');

      setResult(data);
    } catch {
      setError('فشل في توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <FontAwesomeIcon icon={faRobot} className="text-indigo-400 text-xs" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">AI Content Generation Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
              أنشئ وصف منتجات احترافي
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mt-2">
                يزيد مبيعاتك خلال ثوانٍ
              </span>
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              منصة احترافية تعمل بالذكاء الاصطناعي لتوليد محتوى تسويقي جاهز للنشر على إنستغرام، مع هاشتاغات مدروسة وتحليلات فورية
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Input Form */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.02] rounded-xl border border-white/10 p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faStar} className="text-indigo-400 text-xs mr-2" />
                    اسم المنتج أو الخدمة
                  </label>
                  <input
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500/50 transition-all duration-200 placeholder:text-slate-600 text-sm"
                    placeholder="أدخل اسم المنتج أو الخدمة"
                    value={form.productName}
                    onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faUsers} className="text-indigo-400 text-xs mr-2" />
                    الجمهور المستهدف
                  </label>
                  <input
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500/50 transition-all duration-200 placeholder:text-slate-600 text-sm"
                    placeholder="مثال: شباب 20-35 سنة، رواد أعمال"
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faBolt} className="text-indigo-400 text-xs mr-2" />
                    نغمة المحتوى
                  </label>
                  <select
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500/50 transition-all duration-200 cursor-pointer text-sm"
                    value={form.tone}
                    onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  >
                    <option value="professional">احترافي ورسمي</option>
                    <option value="energetic">حماسي ومحفز</option>
                    <option value="friendly">ودود وقريب</option>
                    <option value="engineering">هندسي / تقني</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={generateContent}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCloudArrowUp} className="text-base" />
                      <span>إنشاء المحتوى</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </>
                  )}
                </button>

                <ExampleCard />
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                <FontAwesomeIcon icon={faClock} className="text-indigo-400 text-sm mb-1" />
                <div className="text-white font-semibold text-sm">3 ثوانٍ</div>
                <div className="text-[10px] text-slate-500">وقت التوليد</div>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                <FontAwesomeIcon icon={faLayerGroup} className="text-indigo-400 text-sm mb-1" />
                <div className="text-white font-semibold text-sm">4 عناصر</div>
                <div className="text-[10px] text-slate-500">محتوى متكامل</div>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3 text-center border border-white/5">
                <FontAwesomeIcon icon={faShieldHeart} className="text-indigo-400 text-sm mb-1" />
                <div className="text-white font-semibold text-sm">مجاني</div>
                <div className="text-[10px] text-slate-500">النسخة التجريبية</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="space-y-4">
                <div className="bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/10 bg-white/[0.01]">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMagic} className="text-indigo-400 text-sm" />
                      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">المحتوى المُنتَج</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FontAwesomeIcon icon={faPalette} className="text-slate-600 text-4xl mb-2" />
                        <p className="text-slate-500 text-xs">معاينة الصورة</p>
                        <p className="text-slate-600 text-[10px] mt-1">يتم إنشاء الصورة تلقائياً</p>
                      </div>
                    </div>
                  </div>
                </div>

                <HookCard
                  hook={result.hook}
                  onCopy={() => copyToClipboard(result.hook, 'hook')}
                  copied={copiedField === 'hook'}
                />

                <CaptionCard
                  caption={result.caption}
                  onCopy={() => copyToClipboard(result.caption, 'caption')}
                  copied={copiedField === 'caption'}
                />

                <HashtagBlock
                  hashtags={result.hashtags}
                  onCopy={() => copyToClipboard(result.hashtags.join(' '), 'tags')}
                  copied={copiedField === 'tags'}
                />

                <button
                  onClick={() => {
                    const full = `${result.hook}\n\n${result.caption}\n\n${result.hashtags.join(' ')}`;
                    navigator.clipboard.writeText(full);
                  }}
                  className="w-full py-3 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faCopy} className="text-sm" />
                  <span>نسخ المحتوى بالكامل</span>
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-white/[0.02] rounded-xl border border-white/10 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faPenFancy} className="text-slate-500 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-white/40 mb-2">لا يوجد محتوى بعد</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  أدخل تفاصيل منتجك واضغط على "إنشاء المحتوى" لتحصل على نصوص تسويقية احترافية وصورة جاهزة للنشر
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-xs">
            AI Content Machine © 2026 | منصة احترافية لتوليد المحتوى التسويقي بالذكاء الاصطناعي
          </p>
        </div>
      </footer>
    </main>
  );
}