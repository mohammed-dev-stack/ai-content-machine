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
  faUsers  // ✅ تمت إضافة هذا الاستيراد
} from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const LoadingSpinner = () => (
  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-lg" />
);

const HookCard = ({ hook, onCopy, copied }: { hook: string; onCopy: () => void; copied: boolean }) => (
  <div className="group bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 p-6 hover:border-indigo-500/40 transition-all duration-300">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <FontAwesomeIcon icon={faHeading} className="text-white text-sm" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">عنوان جذاب</span>
      </div>
      <button
        onClick={onCopy}
        className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-indigo-400 text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
      </button>
    </div>
    <p className="text-white text-lg font-semibold leading-relaxed">{hook || "..."}</p>
  </div>
);

const CaptionCard = ({ caption, onCopy, copied }: { caption: string; onCopy: () => void; copied: boolean }) => (
  <div className="group bg-white/[0.03] rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <FontAwesomeIcon icon={faParagraph} className="text-white text-sm" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">وصف المنشور</span>
      </div>
      <button
        onClick={onCopy}
        className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-emerald-400 text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
      </button>
    </div>
    <p className="text-white/90 leading-relaxed text-sm whitespace-pre-wrap">{caption || "جاري التحميل..."}</p>
  </div>
);

const HashtagBlock = ({ hashtags, onCopy, copied }: { hashtags: string[]; onCopy: () => void; copied: boolean }) => (
  <div className="group bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <FontAwesomeIcon icon={faHashtag} className="text-white text-sm" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">الهاشتاغات</span>
        <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">{hashtags.length}</span>
      </div>
      <button
        onClick={onCopy}
        className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="text-amber-400 text-xs" />
        <span>{copied ? 'تم النسخ' : 'نسخ الكل'}</span>
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {hashtags.length > 0 ? (
        hashtags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 text-xs font-medium hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-200 cursor-pointer border border-white/5"
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
      alert('فشل النسخ');
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
    } catch (err) {
      setError('فشل في توليد المحتوى. تأكد من تشغيل الخادم.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
              <FontAwesomeIcon icon={faRobot} className="text-indigo-400 text-xs animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">AI Powered Content Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
              أنشئ محتوى{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                يباع
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              منصة ذكية لتوليد محتوى إنستغرام احترافي مع هاشتاغات مدروسة
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel - Input Form */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faStar} className="text-indigo-400 text-xs mr-2" />
                    المنتج أو الخدمة
                  </label>
                  <input
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-600"
                    placeholder="مثال: قهوة مختصة عضوية"
                    value={form.productName}
                    onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faUsers} className="text-indigo-400 text-xs mr-2" />
                    الجمهور المستهدف
                  </label>
                  <input
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500 transition-all duration-200 placeholder:text-slate-600"
                    placeholder="مثال: شباب 20-35 سنة، رواد أعمال"
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    <FontAwesomeIcon icon={faBolt} className="text-indigo-400 text-xs mr-2" />
                    نغمة المحتوى
                  </label>
                  <select
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-indigo-500 transition-all duration-200 cursor-pointer"
                    value={form.tone}
                    onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  >
                    <option value="professional">✨ احترافي</option>
                    <option value="energetic">⚡ حماسي</option>
                    <option value="friendly">😊 ودود</option>
                    <option value="engineering">🤖 هندسي / تقني</option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm flex items-center gap-3">
                    <FontAwesomeIcon icon={faSpinner} className="text-red-400" />
                    {error}
                  </div>
                )}

                <button
                  onClick={generateContent}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-indigo-500/20"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      <span>جاري التوليد...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faMagic} className="text-lg group-hover:scale-110 transition-transform duration-200" />
                      <span>توليد المحتوى</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-5 duration-500">
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
                    alert('تم نسخ المحتوى بالكامل');
                  }}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <FontAwesomeIcon icon={faCopy} className="text-indigo-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>نسخ المحتوى بالكامل</span>
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faPalette} className="text-slate-500 text-4xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white/30 mb-2">ابدأ رحلتك التسويقية</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  أدخل تفاصيل منتجك أو خدمتك، اختر الجمهور المستهدف، وسيقوم الذكاء الاصطناعي بتوليد محتوى احترافي
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}