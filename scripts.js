const rootElement = document.documentElement;
const themeToggleButton = document.getElementById('themeToggle');
const chatForm = document.getElementById('chatForm');
const chatWindow = document.getElementById('chatWindow');
const yearElement = document.getElementById('year');

const THEME_KEY = 'erkanyilmaz-theme';

const setTheme = theme => {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
};

const initTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
        setTheme(storedTheme);
        return;
    }
    setTheme('dark');
};

const toggleTheme = () => {
    const current = rootElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
};

themeToggleButton?.addEventListener('click', toggleTheme);

const knowledgeBase = [
    {
        id: 'profil-ozet',
        category: 'kisisel',
        keywords: ['kim', 'kendini tanıt', 'profil', 'hakkında', 'kaç yaşındasın'],
        response:
            'Ben Erkan Çalışkan; Gaziantep doğumlu, Selçuk Üniversitesi Bilgisayar Programcılığı mezunu bir uygulama geliştiricisiyim. Yapay zekâ, MVVM ve ürün stratejisini bir araya getirerek ölçeklenebilir mobil ve web deneyimleri tasarlıyorum.'
    },
    {
        id: 'deneyim-timeline',
        category: 'kisisel',
        keywords: ['deneyim', 'geçmiş', 'iş', 'kariyer', 'timeline'],
        response:
            '2024’ten bu yana bağımsız yazılım geliştirici olarak TheBlueRed ve TheSellerRed gibi yapay zekâ odaklı ürünler geliştiriyorum. Öncesinde Birgad Software’de yazılım geliştirici olarak fintech ve eğitim projelerine Kotlin tabanlı modüller kazandırdım; şirketin sibernetik topluluğunda teknik liderlik yaptım.'
    },
    {
        id: 'teknoloji-stack',
        category: 'teknik',
        keywords: ['hangi teknolojiler', 'stack', 'kullandığın teknolojiler', 'teknoloji'],
        response:
            'Güncel tech stack’im React Native, TypeScript, Tailwind CSS, MVVM ve Clean Architecture üzerine kurulu. Yapay zekâ tarafında Gemini API, üretken yapay zekâ servisleri ve özel AI entegrasyonlarıyla çalışıyorum.'
    },
    {
        id: 'ai-yaklasimi',
        category: 'yapay-zeka',
        keywords: ['yapay zeka', 'ai', 'gemini', 'entegrasyon'],
        response:
            'Gemini API, özel yapay zekâ servisleri ve on-device optimizasyonlar ile gerçek zamanlı NLP, görüntü işleme ve öngörü sistemleri tasarlıyorum. Prompt mühendisliği, veri akışı ve gizlilik dengesi benim için kritik.'
    },
    {
        id: 'metrikler',
        category: 'kisisel',
        keywords: ['kaç yıl', 'metrik', 'istatistik', 'rakam'],
        response:
            'Üç yılı aşkın süredir yapay zekâ odaklı ürün geliştiriyor, MVP’den lansmana kadar tüm süreci yönetiyorum. TheSellerRed ürününde 120M+ kullanıcı etkileşimine ulaşan yapay zekâ destekli deneyimler tasarladım; toplamda üç yapay zekâ destekli uygulamayı yayına aldım.'
    },
    {
        id: 'thebluered',
        category: 'proje',
        keywords: ['thebluered', 'uygulama', 'proje anlat'],
        response:
            'TheBlueRed, girişimcilere özel hazırladığım yapay zekâ destekli asistan projesi. Kullanıcıların içerik üretimi, görev planlama ve karar destek ihtiyaçlarına odaklanıyor; React Native arayüzü ve Gemini tabanlı sohbet motoru birlikte çalışıyor.'
    },
    {
        id: 'thesellerred',
        category: 'proje',
        keywords: ['thesellerred', 'satıcı', 'proje detayı'],
        response:
            'TheSellerRed, pazaryeri satıcılarının satış verilerini gerçek zamanlı analiz eden, öneri motoru barındıran yapay zekâ uygulamam. 120M+ etkileşime ulaşan ürün; TypeScript, Tailwind CSS ve özel AI servisleri kullanılarak geliştirildi.'
    },
    {
        id: 'liderlik-mentor',
        category: 'liderlik',
        keywords: ['liderlik', 'mentorluk', 'ekip', 'girişimcilik'],
        response:
            'Girişimcilik kültürünü teknik liderlikle buluşturuyorum. Sprint ritüelleri, OKR yönetimi ve kullanıcı araştırmasını aynı çerçevede ele alarak ekiplerin hızlı MVP doğrulaması yapmasına yardımcı oluyorum. Genç geliştiricilere yapay zekâ ve girişimcilik eğitimleri veriyorum.'
    },
    {
        id: 'asistan',
        category: 'yapay-zeka',
        keywords: ['teknik asistan', 'sohbet botu', 'yardımcı', 'asistan'],
        response:
            'Site üzerindeki teknik asistanım Gemini API üzerinde çalışıyor. Yazılım geliştirme, yapay zekâ entegrasyonu ve kişisel bilgilerimle ilgili sorulara gerçek zamanlı yanıt veriyor.'
    },
    {
        id: 'hizmet-modeli',
        category: 'hizmet',
        keywords: ['nasıl çalışıyorsun', 'hizmet', 'ücret', 'çalışma modeli'],
        response:
            'Ürün danışmanlığı, proje bazlı geliştirme ve teknik mentorluk modelleriyle çalışıyorum. Yapay zekâ odaklı MVP’ler, React Native uygulamalar ve AI entegrasyonu gerektiren projelerde destek sunuyorum.'
    },
    {
        id: 'iletisim',
        category: 'iletisim',
        keywords: ['iletişim', 'mail', 'linkedin', 'github'],
        response:
            'Bana erkan@theblue.red adresinden ulaşabilir, LinkedIn’de linkedin.com/in/erkancaliskan profilimden bağlantı kurabilir veya GitHub üzerinde erkan011 hesabımdaki paylaşımları inceleyebilirsin.'
    },
    {
        id: 'vizyon',
        category: 'yapay-zeka',
        keywords: ['vizyon', 'gelecek', 'strateji'],
        response:
            'Yapay zekâyı ürün farklılaştırma aracı olarak konumlandırıyorum. Edge AI, üretken yapay zekâ ve girişimcilik pratiklerini birleştirerek fikirleri pazara hazır çözümlere dönüştürmeyi hedefliyorum.'
    }
];

const defaultAnswer = message =>
    `Sorun için teşekkürler! ${
        message
            ? 'Konuyu biraz daha açarsan deneyimime uygun bir örnek paylaşabilirim.'
            : 'Yapay zekâ, React Native, MVVM veya girişimcilik konularında merak ettiklerini sorabilirsin.'
    }`;

const sanitize = text => {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
};

const stripMarkup = text =>
    text
        .replace(/\[cite[^\]]*\]/gi, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__([^_]+)__/, '$1')
        .replace(/\s+/g, ' ')
        .trim();

const applyTone = (text, type) => {
    const base = stripMarkup(text);
    if (type !== 'bot') return base;

    const friendlyPrefixes = [
        'Elbette, ',
        'Memnuniyetle, ',
        'Seve seve, ',
        'Şöyle anlatayım: ',
        'Kısaca paylaşayım: '
    ];

    const hasSentence = /[.!?]$/.test(base);
    const prefix = friendlyPrefixes[Math.floor(Math.random() * friendlyPrefixes.length)];
    const message = base.charAt(0).toLowerCase() === base.charAt(0) ? base : base;
    return `${prefix}${message}${hasSentence ? '' : '.'}`;
};

const createBubble = (message, type) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    const content = applyTone(message, type);
    bubble.innerText = content;
    chatWindow?.appendChild(bubble);
    chatWindow?.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
    return bubble;
};

const findBestMatch = message => {
    const lower = message.toLowerCase();
    let bestMatch = null;

    for (const item of knowledgeBase) {
        const score = item.keywords.reduce((acc, keyword) => (lower.includes(keyword) ? acc + keyword.length : acc), 0);
        if (score === 0) continue;
        if (!bestMatch || score > bestMatch.score) {
            bestMatch = { ...item, score };
        }
    }

    return bestMatch;
};

const updateBubble = (bubble, text, type = 'bot') => {
    if (!bubble) return;
    bubble.className = `chat-bubble ${type}`;
    bubble.innerText = applyTone(text, type);
};

const conversationHistory = [];

const callAssistant = async message => {
    const payload = {
        message,
        history: conversationHistory.slice(-6)
    };

    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Asistan şu anda yanıt veremiyor.');
    }

    const data = await response.json();
    if (!data?.reply) {
        throw new Error('Asistan boş bir yanıt döndürdü.');
    }

    return data.reply;
};

chatForm?.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(chatForm);
    const message = String(formData.get('message') || '').trim();
    if (!message) return;

    conversationHistory.push({ role: 'user', content: message });
    createBubble(message, 'user');
    chatForm.reset();

    const waitingBubble = createBubble('Bir saniye, yanıt düşünüyorum...', 'bot');

    try {
        const reply = await callAssistant(message);
        updateBubble(waitingBubble, reply, 'bot');
        conversationHistory.push({ role: 'assistant', content: reply });
    } catch (error) {
        console.error('Chat error:', error);
        const match = findBestMatch(message);
        if (match) {
            updateBubble(waitingBubble, match.response, 'bot');
            conversationHistory.push({ role: 'assistant', content: match.response });
            if (match.followUps?.length) {
                const followUpsText = match.followUps
                    .map((text, index) => `${index + 1}. ${text}`)
                    .join(' • ');
                createBubble(`Bu konu ilgini çektiyse devamı için önerilerim: ${followUpsText}`, 'bot');
            }
        } else {
            updateBubble(waitingBubble, defaultAnswer(message), 'bot');
        }
    }
});

const initYear = () => {
    const currentYear = new Date().getFullYear();
    if (yearElement) {
        yearElement.textContent = String(currentYear);
    }
};

const greetMessage = () => {
    if (!chatWindow) return;
    createBubble(
        'Merhaba! Ben Erkan\'ın Teknik Asistanı. Kotlin, MVVM, yapay zeka projeleri ve girişimcilik deneyimlerim hakkında sohbet etmek için buradayım. Ne merak ediyorsan sorabilirsin.',
        'bot'
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initYear();
    greetMessage();
});

