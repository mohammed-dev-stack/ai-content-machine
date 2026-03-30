const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// بناء prompt احترافي مع Hook، Caption، فوائد قابلة للقياس، وهاشتاغات دقيقة
const buildPrompt = (productName, audience, tone) => {
    const toneInstructions = {
        professional: 'احترافي رسمي، يركز على المصداقية والجودة والتحليل الواقعي للسوق والتسويق الفعّال',
        energetic: 'حماسي محفز، يركز على النتائج والسرعة وتحليل الاتجاهات الحالية والتسويق العملي',
        friendly: 'ودود وبسيط، كأنك تتحدث مع صديق مطور، مع تبسيط التسويق الرقمي والمحتوى',
        engineering: 'تقني دقيق، يركز على الحلول والأنظمة العملية وتحليل فعالية المنتج مقارنة بالسوق'
    };

    const emojiInstructions = {
        professional: '✨ ⭐ 🎯',
        energetic: '🔥 ⚡ 🚀',
        friendly: '😊 👋 💙',
        engineering: '🤖 ⚙️ 💻'
    };

    return `
أنت خبير تسويق عربي متخصص في محتوى إنستغرام عالي التحويل للمطورين وفرق DevOps، مع تحليل السوق الحالي واختيار أفضل استراتيجيات التسويق.

المنتج: ${productName}
الجمهور المستهدف: ${audience}
نغمة الكتابة: ${toneInstructions[tone] || toneInstructions.professional}
الإيموجيات المسموحة: ${emojiInstructions[tone] || emojiInstructions.professional}

⚡ تعليمات إنتاج محتوى احترافي:

1. HOOK:
- ≤12 كلمة
- ألم محدد أو فرصة واضحة
- إيموجي واحد مرتبط بالمشكلة أو الفائدة
- يحفز القارئ على الاستمرار
- مثال: "تضيع 10 دقائق يوميًا في انتظار استجابة أجهزتك؟ ⚠️"

2. CAPTION:
- طول 60-120 كلمة
- التسلسل:
   1. وصف مشكلة دقيقة مع مثال واقعي
   2. شرح التأثير على الأداء والإنتاجية
   3. تقديم المنتج كحل محدد وواقعي (مرة أو مرتين فقط)
   4. ذكر 2-3 فوائد قابلة للقياس
   5. CTA مزدوج: مباشر ومحفز ("جرب النسخة التجريبية الآن" و"اكتشف التحسن فورًا")
- استخدام 2-3 إيموجي بشكل طبيعي
- تجنب التكرار والفضفاضة

3. HASHTAGS:
- 7 إلى 10 هاشتاغ واقعي، شائع، مرتبط بالمنتج والجمهور
- مثال: #HomeAssistant #Zigbee #SmartHome #IoT #HomeAutomation #DevOps #OpenSource

4. اللغة والأسلوب:
- عربية فصحى واضحة، مختصرة، قابلة للتصديق
- أسلوب متسق مع نغمة المنتج والجمهور
- إخراج JSON صالح فقط، بدون نص خارجي

{
  "hook": "ضع هنا النص الجذاب",
  "caption": "ضع هنا النص الكامل للشرح والفوائد والـ CTA",
  "hashtags": ["#هاشتاغ1", "#هاشتاغ2", "#هاشتاغ3", "... حتى 10 هاشتاغ"]
}
`;
};

router.post('/generate', async(req, res) => {
    try {
        const { productName, audience, tone } = req.body;

        if (!productName || !audience) {
            return res.status(400).json({
                success: false,
                error: 'productName and audience are required'
            });
        }

        const prompt = buildPrompt(productName, audience, tone || 'professional');

        const completion = await groq.chat.completions.create({
            messages: [{
                    role: 'system',
                    content: 'أنت API متخصص في التسويق التقني. ترد فقط بـ JSON صالح بدون أي نص إضافي.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.7,
            max_tokens: 2000
        });

        const aiResponse = completion.choices[0].message.content || '';
        let parsed;
        try {
            parsed = JSON.parse(aiResponse);
        } catch (error) {
            console.error('JSON Parse Error:', aiResponse);
            return res.status(500).json({
                success: false,
                error: 'AI returned invalid JSON format'
            });
        }

        if (!parsed.hook || !parsed.caption || !parsed.hashtags) {
            return res.status(500).json({
                success: false,
                error: 'Incomplete AI response'
            });
        }

        if (!Array.isArray(parsed.hashtags)) {
            parsed.hashtags = [];
        }

        return res.json({
            success: true,
            hook: parsed.hook,
            caption: parsed.caption,
            hashtags: parsed.hashtags.slice(0, 10)
        });

    } catch (error) {
        console.error('Generation Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to generate content. Please try again.'
        });
    }
});

router.get('/test', (req, res) => {
    res.json({
        status: 'ok',
        message: 'AI route is working'
    });
});

module.exports = router;