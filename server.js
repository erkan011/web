import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const GEMINI_ENDPOINT =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const geminiApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
    const { message, history = [] } = req.body ?? {};

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Geçerli bir mesaj gerekli.' });
    }

    if (!geminiApiKey) {
        return res.status(500).json({
            error: 'Sunucu yapılandırması eksik: GOOGLE_API_KEY değeri .env dosyasında tanımlanmalı.'
        });
    }

    const mapHistoryToContent = entry => {
        const text = String(entry?.content ?? '').trim();
        if (!text) return null;
        return {
            role: entry?.role === 'assistant' ? 'model' : 'user',
            parts: [{ text }]
        };
    };

    const contents = [
        ...history.map(mapHistoryToContent).filter(Boolean),
        { role: 'user', parts: [{ text: message }] }
    ];

        const payload = {
            systemInstruction: {
                parts: [
                    {
                        text: `Sen Erkan Çalışkan'ın kişisel web sitesindeki profesyonel teknik asistansın. Görevin ziyaretçilere Erkan'ın deneyimleri, projeleri ve uzmanlık alanları hakkında detaylı, profesyonel ve akıcı bilgiler vermek.

ERKAN ÇALIŞKAN HAKKINDA:
- Gaziantep doğumlu, Selçuk Üniversitesi Bilgisayar Programcılığı mezunu
- 3+ yıl yapay zeka odaklı ürün geliştirme ve teknik liderlik deneyimi
- The Seller Red, The Stocktakin Red, The Broker Red gibi yapay zeka destekli uygulamalar geliştirdi
- Frontend geliştirme, test yazımı ve kalite güvencesi konularında uzman
- Firmalara yapay zeka ve teknoloji konularında eğitimler veriyor
- React, TypeScript, Tailwind CSS, Kotlin, MVVM, Gemini API gibi teknolojilerde deneyimli
- 120M+ kullanıcı etkileşimine ulaşan projeler geliştirdi

YANIT TARZI:
- Doğrudan, samimi ve akıcı bir dil kullan
- "Seve seve", "Elbette", "Memnuniyetle" gibi formal ifadeler KULLANMA
- Soruya direkt cevap ver, gereksiz giriş cümleleri ekleme
- Teknik detayları anlaşılır ve doğal şekilde açıkla
- Örnekler ve somut bilgiler kullan
- Yanıtların 2-4 paragraf arası olsun, çok kısa veya çok uzun olmasın
- Konuşmayı devam ettirmek için ilgili sorular sor ama zorunlu değil

ÖRNEK YAKLAŞIMLAR:
- Kullanıcı bir teknoloji sorduğunda: Direkt teknolojinin ne olduğunu ve Erkan'ın bu teknolojiyle nasıl çalıştığını anlat. İlgili projelerden örnekler ver. Gerekirse "Başka bir şey merak ediyor musun?" diye sorabilirsin ama zorunlu değil.
- Kullanıcı bir proje sorduğunda: Direkt projenin detaylarını anlat, Erkan'ın rolünü açıkla, kullanılan teknolojileri listele. Gerekirse "Daha fazla bilgi almak ister misin?" diye sorabilirsin ama zorunlu değil.
- Genel sorularda: Kapsamlı yanıt ver, ilgili konulara değin. Gerekirse "Başka hangi konularda yardımcı olabilirim?" diye sorabilirsin ama zorunlu değil.

HER ZAMAN:
- Türkçe yanıt ver
- Samimi ama profesyonel bir ton kullan
- Gereksiz formal ifadeler kullanma
- Direkt soruya odaklan, gereksiz giriş yapma
- Erkan'ın deneyimlerini ve başarılarını doğal şekilde vurgula
- Yanıtına "Seve seve", "Elbette", "Memnuniyetle" gibi ifadelerle başlama`
                    }
                ]
            },
            contents,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
                topP: 0.9,
                topK: 40
            }
        };

    try {
        const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(geminiApiKey)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage =
                data?.error?.message || 'Yapay zekâ servisi geçerli bir yanıt döndüremedi.';
            return res.status(response.status).json({ error: errorMessage });
        }

        const replyParts = data?.candidates?.[0]?.content?.parts ?? [];
        const replyText = replyParts
            .map(part => part?.text?.trim())
            .filter(Boolean)
            .join('\n')
            .trim();

        if (!replyText) {
            return res.status(502).json({ error: 'Asistan boş yanıt döndürdü.' });
        }

        return res.json({ reply: replyText });
    } catch (error) {
        console.error('AI request failed', error);
        const messageOutput = error?.message || 'Yapay zekâ servisine erişilirken bir hata oluştu.';
        return res.status(500).json({ error: messageOutput });
    }
});

app.listen(port, () => {
    console.log(`AI proxy server running on http://localhost:${port}`);
});

