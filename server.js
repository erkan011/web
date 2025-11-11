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
                    text: 'Sen Erkan Çalışkan’ın kişisel web sitesindeki yardımcı asistansın. Ziyaretçilere Erkan’ın CV’si, projeleri, Kotlin/Android bilgisi ve yapay zeka entegrasyonları hakkında destek ver. Yanıtların Türkçe, samimi, yalın ve kısa olsun.'
                }
            ]
        },
        contents,
        generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 500
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

