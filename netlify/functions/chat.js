// Netlify Serverless Function for Gemini AI Chat
export const handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { message, history = [] } = body;

        if (!message || typeof message !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Geçerli bir mesaj gerekli.' })
            };
        }

        // Get API key from environment variables
        const geminiApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'Sunucu yapılandırması eksik: GOOGLE_API_KEY değeri Netlify environment variables\'da tanımlanmalı.'
                })
            };
        }

        const GEMINI_ENDPOINT =
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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
                        text: "Sen Erkan Çalışkan'ın kişisel web sitesindeki yardımcı asistansın. Ziyaretçilere Erkan'ın CV'si, projeleri, Kotlin/Android bilgisi ve yapay zeka entegrasyonları hakkında destek ver. Yanıtların Türkçe, samimi, yalın ve kısa olsun."
                    }
                ]
            },
            contents,
            generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 500
            }
        };

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
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: errorMessage })
            };
        }

        const replyParts = data?.candidates?.[0]?.content?.parts ?? [];
        const replyText = replyParts
            .map(part => part?.text?.trim())
            .filter(Boolean)
            .join('\n')
            .trim();

        if (!replyText) {
            return {
                statusCode: 502,
                headers,
                body: JSON.stringify({ error: 'Asistan boş yanıt döndürdü.' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ reply: replyText })
        };
    } catch (error) {
        console.error('AI request failed', error);
        const messageOutput = error?.message || 'Yapay zekâ servisine erişilirken bir hata oluştu.';
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: messageOutput })
        };
    }
};

