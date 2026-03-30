'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ImageTemplateProps {
  productName: string;
  hook: string;
  productImage?: string | null;
}

export default function ImageTemplate({ productName, hook, productImage }: ImageTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // دالة متقدمة لكتابة النص متعدد الأسطر مع تنسيق احترافي
  const drawWrappedText = (
    ctx: CanvasRenderingContext2D, 
    text: string, 
    x: number, 
    y: number, 
    maxWidth: number, 
    lineHeight: number,
    isBold: boolean = false
  ) => {
    if (!text || text.length === 0) return y;
    
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // دالة رسم خلفية متدرجة مع تأثيرات
  const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // خلفية متدرجة رئيسية
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0c1a');
    gradient.addColorStop(0.3, '#121826');
    gradient.addColorStop(0.7, '#1a1f2f');
    gradient.addColorStop(1, '#0f1119');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // أنماط هندسية احترافية
    ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
    ctx.lineWidth = 1;
    
    // خطوط مائلة
    for (let i = -height; i < width + height; i += 80) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
    
    // دوائر ضبابية
    ctx.fillStyle = 'rgba(79, 70, 229, 0.03)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(width * 0.2 + i * 300, height * 0.3, 200, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(width * 0.8 - i * 200, height * 0.7, 250, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // دالة رسم تأثيرات الإضاءة
  const drawLightEffects = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // تأثير spotlight من الأعلى
    const spotlight = ctx.createLinearGradient(0, 0, 0, height);
    spotlight.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
    spotlight.addColorStop(0.5, 'rgba(79, 70, 229, 0.05)');
    spotlight.addColorStop(1, 'transparent');
    ctx.fillStyle = spotlight;
    ctx.fillRect(0, 0, width, height);
    
    // تأثير glow في الزوايا
    ctx.fillStyle = 'rgba(139, 92, 246, 0.05)';
    ctx.beginPath();
    ctx.rect(0, 0, width * 0.3, height * 0.3);
    ctx.fill();
    
    ctx.beginPath();
    ctx.rect(width - width * 0.3, height - height * 0.3, width * 0.3, height * 0.3);
    ctx.fill();
  };

  // دالة رسم إطار الصورة الاحترافي
  const drawProductImage = (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    width: number, 
    height: number
  ) => {
    const imageSize = width * 0.38;
    const imageX = (width - imageSize) / 2;
    const imageY = height * 0.12;
    
    // ظل للصورة
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    // إطار دائري مع clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, imageY + imageSize / 2, imageSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // رسم الصورة بتأثير zoom خفيف
    const scale = 1.05;
    ctx.drawImage(
      img, 
      imageX - (imageSize * (scale - 1)) / 2, 
      imageY - (imageSize * (scale - 1)) / 2, 
      imageSize * scale, 
      imageSize * scale
    );
    ctx.restore();
    
    // إطار خارجي ذهبي مع توهج
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width / 2, imageY + imageSize / 2, imageSize / 2 + 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // إطار داخلي
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, imageY + imageSize / 2, imageSize / 2 + 5, 0, Math.PI * 2);
    ctx.stroke();
    
    // إضافة "خاتم" زخرفي
    ctx.beginPath();
    ctx.arc(width / 2, imageY + imageSize / 2, imageSize / 2 + 12, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(79, 70, 229, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // دالة رسم العناصر النصية
  const drawTextElements = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.textAlign = 'center';
    
    // === شعار العلامة التجارية ===
    ctx.font = '400 22px "Inter", "Cairo", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillText('MarketAI Studio', width / 2, 60);
    
    // === عنوان Hook الرئيسي ===
    ctx.font = '800 72px "Inter", "Cairo", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    
    const hookText = hook || 'أطلق العنان لإبداعك';
    const hookY = productImage ? height * 0.65 : height * 0.55;
    drawWrappedText(ctx, hookText, width / 2, hookY, width - 120, 85, true);
    
    // === اسم المنتج مع خلفية مميزة ===
    ctx.shadowBlur = 0;
    const productText = productName || 'منتجك المميز';
    ctx.font = '700 44px "Inter", "Cairo", sans-serif';
    
    // خلفية للاسم
    const textWidth = ctx.measureText(productText).width;
    const pillWidth = textWidth + 80;
    const pillHeight = 70;
    const pillX = (width - pillWidth) / 2;
    const pillY = height - 130;
    
    ctx.fillStyle = 'rgba(79, 70, 229, 0.9)';
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 40);
    ctx.fill();
    
    // إضافة توهج للخلفية
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(79, 70, 229, 0.5)';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(productText, width / 2, pillY + 48);
    
    // === عناصر إضافية احترافية ===
    ctx.shadowBlur = 0;
    ctx.font = '500 18px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('✨ محتوى جاهز للنشر • ✨ تصميم احترافي', width / 2, height - 55);
  };

  // دالة رسم عناصر زخرفية نهائية
  const drawFinalDecorations = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // إطار خارجي رفيع
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, width - 30, height - 30);
    
    ctx.strokeStyle = 'rgba(79, 70, 229, 0.2)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    
    // نقاط زخرفية في الزوايا
    const drawCornerDot = (x: number, y: number) => {
      ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    };
    
    drawCornerDot(35, 35);
    drawCornerDot(width - 35, 35);
    drawCornerDot(35, height - 35);
    drawCornerDot(width - 35, height - 35);
  };

  // دالة رسم QR code أو عنصر تفاعلي (اختياري)
  const drawInteractiveElement = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.font = '400 14px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.textAlign = 'left';
    ctx.fillText('مسح للتصفح', 45, height - 45);
    
    // مربع صغير يحاكي QR
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(45, height - 70, 40, 40);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(50, height - 65, 30, 30);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    
    // إضافة دالة roundRect إلى Canvas
    if (!ctx.roundRect) {
      ctx.roundRect = function(x: number, y: number, w: number, h: number, r: number) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
      };
    }
    
    // رسم التصميم الرئيسي
    drawBackground(ctx, size, size);
    drawLightEffects(ctx, size, size);
    
    if (productImage) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = productImage;
      
      img.onload = () => {
        drawProductImage(ctx, img, size, size);
        drawTextElements(ctx, size, size);
        drawFinalDecorations(ctx, size, size);
        drawInteractiveElement(ctx, size, size);
      };
      
      img.onerror = () => {
        drawTextElements(ctx, size, size);
        drawFinalDecorations(ctx, size, size);
        drawInteractiveElement(ctx, size, size);
      };
    } else {
      drawTextElements(ctx, size, size);
      drawFinalDecorations(ctx, size, size);
      drawInteractiveElement(ctx, size, size);
    }
  }, [productName, hook, productImage]);

  // دالة تحميل الصورة
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `marketai-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="relative group">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20">
        <canvas 
          ref={canvasRef} 
          width={1080} 
          height={1080} 
          className="w-full h-auto rounded-2xl"
        />
        
        {/* Overlay للتفاعل */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <button
            onClick={downloadImage}
            className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            تحميل الصورة (1080x1080)
          </button>
        </div>
      </div>
      
      {/* مؤشرات الجودة */}
      <div className="absolute -top-3 -right-3 flex gap-2">
        <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg shadow-lg">
          4K Ready
        </span>
        <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg shadow-lg">
          Premium
        </span>
      </div>
    </div>
  );
}