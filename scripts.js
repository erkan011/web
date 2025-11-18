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
    
    // Remove common prefixes that make it sound too formal
    let cleaned = base.trim();
    
    // Remove common formal prefixes if they exist
    const formalPrefixes = [
        /^Elbette,?\s*/i,
        /^Memnuniyetle,?\s*/i,
        /^Seve seve,?\s*/i,
        /^Şöyle anlatayım:?\s*/i,
        /^Kısaca paylaşayım:?\s*/i,
        /^Tabii ki,?\s*/i,
        /^Kesinlikle,?\s*/i
    ];
    
    formalPrefixes.forEach(prefix => {
        cleaned = cleaned.replace(prefix, '');
    });
    
    return cleaned.trim();
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

    // Try local server first, then fallback to Netlify function
    const apiEndpoint = '/api/chat';
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).catch(() => {
        // Fallback to Netlify function if local server fails
        return fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
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

    // Hide greeting bubble when user starts chatting
    const robotGreeting = document.getElementById('robotGreeting');
    if (robotGreeting) {
        robotGreeting.style.display = 'none';
    }

    conversationHistory.push({ role: 'user', content: message });
    createBubble(message, 'user');
    chatForm.reset();

    // Animate robot thinking
    animateRobot('thinking');
    const waitingBubble = createBubble('Bir saniye, yanıt düşünüyorum...', 'bot');

    try {
        const reply = await callAssistant(message);
        // Animate robot talking
        animateRobot('talking');
        updateBubble(waitingBubble, reply, 'bot');
        conversationHistory.push({ role: 'assistant', content: reply });
        
        // Return to idle after talking
        setTimeout(() => {
            animateRobot('idle');
        }, 1500);
    } catch (error) {
        console.error('Chat error:', error);
        animateRobot('idle');
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

// Robot animation functions
const animateRobot = (type = 'idle') => {
    const robotCharacter = document.getElementById('robotCharacter');
    if (!robotCharacter) return;

    // Remove previous animation classes
    robotCharacter.classList.remove('robot-thinking', 'robot-talking', 'robot-excited');

    switch (type) {
        case 'thinking':
            robotCharacter.classList.add('robot-thinking');
            break;
        case 'talking':
            robotCharacter.classList.add('robot-talking');
            break;
        case 'excited':
            robotCharacter.classList.add('robot-excited');
            break;
        default:
            // idle animation is default
            break;
    }
};

const greetMessage = () => {
    // Greeting is already shown in HTML, just animate robot
    animateRobot('excited');
    setTimeout(() => {
        animateRobot('idle');
    }, 2000);
};

// Project data
const projectData = {
    'seller-red': {
        title: 'The Seller Red',
        tag: 'Yapay Zeka Uygulaması',
        description: 'Pazaryeri satıcıları için geliştirilmiş kapsamlı yapay zeka destekli analiz ve öneri platformu. Bu projede frontend geliştirme ve test süreçlerinde aktif rol aldım.',
        overview: 'The Seller Red, e-ticaret satıcılarının satış performanslarını analiz eden, yapay zeka destekli öneriler sunan ve iş kararlarını optimize eden bir platformdur. 120M+ kullanıcı etkileşimine ulaşan bu proje, modern web teknolojileri ve yapay zeka entegrasyonları ile geliştirilmiştir.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Node.js', 'Jest', 'Cypress'],
        features: [
            'Gerçek zamanlı satış analizi ve raporlama',
            'Yapay zeka destekli ürün önerileri',
            'Pazaryeri performans takibi',
            'Otomatik fiyatlandırma önerileri',
            'Rekabet analizi ve strateji önerileri'
        ],
        stats: [
            { label: 'Kullanıcı Etkileşimi', value: '120M+' },
            { label: 'Geliştirme Süresi', value: '6 Ay' },
            { label: 'Test Kapsamı', value: '%95+' }
        ],
        role: 'Frontend geliştirme, test yazımı ve kalite güvencesi süreçlerinde aktif rol aldım. Kullanıcı arayüzü tasarımı, performans optimizasyonu ve yapay zeka entegrasyonlarının frontend tarafında çalıştım.'
    },
    'stocktakin-red': {
        title: 'The Stocktakin Red',
        tag: 'Yapay Zeka Uygulaması',
        description: 'Stok yönetimi ve analiz için geliştirilmiş yapay zeka destekli çözüm. Frontend geliştirme ve test süreçlerinde yer aldım.',
        overview: 'The Stocktakin Red, işletmelerin stok yönetimini optimize eden, yapay zeka destekli tahmin ve analiz yapan bir platformdur. Gerçek zamanlı veri işleme ve akıllı stok önerileri sunar.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'TensorFlow.js', 'Node.js', 'Jest', 'React Testing Library'],
        features: [
            'Yapay zeka tabanlı stok tahmini',
            'Gerçek zamanlı stok takibi',
            'Otomatik sipariş önerileri',
            'Tedarik zinciri optimizasyonu',
            'Raporlama ve analitik dashboard'
        ],
        stats: [
            { label: 'Geliştirme Süresi', value: '4 Ay' },
            { label: 'Test Kapsamı', value: '%90+' },
            { label: 'Performans', value: '99.9%' }
        ],
        role: 'Frontend geliştirme ve test süreçlerinde aktif çalıştım. Dashboard tasarımı, veri görselleştirme ve kullanıcı deneyimi optimizasyonu üzerinde çalıştım.'
    },
    'broker-red': {
        title: 'The Broker Red',
        tag: 'Yapay Zeka Uygulaması',
        description: 'Finansal danışmanlık ve yatırım önerileri için yapay zeka destekli platform. Frontend geliştirme, test ve firmalara eğitim süreçlerinde çalıştım.',
        overview: 'The Broker Red, finansal danışmanlar ve yatırımcılar için yapay zeka destekli analiz ve öneri platformudur. Piyasa analizi, portföy optimizasyonu ve risk yönetimi konularında destek sunar.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Chart.js', 'Node.js', 'Jest', 'Playwright'],
        features: [
            'Yapay zeka destekli portföy önerileri',
            'Gerçek zamanlı piyasa analizi',
            'Risk yönetimi araçları',
            'Otomatik raporlama',
            'Müşteri eğitim modülleri'
        ],
        stats: [
            { label: 'Geliştirme Süresi', value: '5 Ay' },
            { label: 'Eğitim Verilen Firma', value: '15+' },
            { label: 'Test Kapsamı', value: '%92+' }
        ],
        role: 'Frontend geliştirme, test yazımı ve kalite güvencesi süreçlerinde çalıştım. Ayrıca firmalara platform kullanımı ve yapay zeka özellikleri konusunda eğitimler verdim.'
    },
    'voice-calculator': {
        title: 'Sesli Hesap Makinesi',
        tag: 'Ürün Lansmanı',
        description: 'Android\'in Konuşma Tanıma API\'si ve TensorFlow Lite kullanarak sesli matematik işlemleri gerçekleştiren uygulama. 120K+ kullanıcı, %4 altında crash rate.',
        overview: 'Sesli Hesap Makinesi, kullanıcıların sesli komutlarla matematik işlemleri yapmasını sağlayan Android uygulamasıdır. Android\'in Konuşma Tanıma API\'si ile sesli giriş, TensorFlow Lite ile edge cihazlarda model optimizasyonu ve Gemini API ile doğal dil işleme özellikleri içerir.',
        technologies: ['Kotlin', 'Android', 'MVVM', 'Jetpack Compose', 'TensorFlow Lite', 'Speech Recognition API', 'Gemini API', 'Firebase'],
        features: [
            'Sesli matematik işlemleri',
            'MVVM + Compose hibrit mimari',
            'Gemini API ile doğal dil desteği',
            'Edge cihazlarda model optimizasyonu',
            'Offline çalışma desteği',
            'Gerçek zamanlı ses işleme'
        ],
        stats: [
            { label: 'Aktif Kullanıcı', value: '120K+' },
            { label: 'Crash Rate', value: '%4 altında' },
            { label: 'Platform', value: 'Android' }
        ],
        role: 'Uygulamanın tamamında aktif rol aldım. MVVM mimarisi, Compose ekranları, ses işleme entegrasyonu ve yapay zeka model optimizasyonu konularında çalıştım.'
    },
    'finance-coach': {
        title: 'Kişisel Finans Koçu',
        tag: 'MVP Doğrulaması',
        description: 'Kotlin Flow ile gerçek zamanlı veri akışı, Gemini tabanlı öneri sistemi ve Firebase Crashlytics entegrasyonu sayesinde 6 haftada MVP.',
        overview: 'Kişisel Finans Koçu, kullanıcıların finansal hedeflerine ulaşmasına yardımcı olan yapay zeka destekli mobil uygulamadır. Kotlin Flow ile gerçek zamanlı veri akışı, Gemini API ile kişiselleştirilmiş finans önerileri ve Firebase entegrasyonları içerir.',
        technologies: ['Kotlin', 'Android', 'Jetpack Compose', 'Kotlin Flow', 'Gemini API', 'Firebase', 'Crashlytics', 'Remote Config'],
        features: [
            'Composable tasarım sistemi',
            'Gerçek zamanlı veri akışı (Kotlin Flow)',
            'Yapay zeka destekli finans önerileri',
            'Remote config & feature flag yönetimi',
            'Performans ölçümü (Startup trace)',
            'Firebase Crashlytics entegrasyonu'
        ],
        stats: [
            { label: 'Geliştirme Süresi', value: '6 Hafta' },
            { label: 'MVP Durumu', value: 'Tamamlandı' },
            { label: 'Mimari', value: 'MVVM + Compose' }
        ],
        role: 'MVP geliştirme sürecinde baştan sona aktif rol aldım. Kotlin Flow ile veri akışı, Compose UI tasarımı, Gemini API entegrasyonu ve Firebase servislerinin kurulumunda çalıştım.'
    },
    'mentorship-platform': {
        title: 'Mentorluk Platformu',
        tag: 'Topluluk Çalışması',
        description: 'Üniversite topluluğuyla geliştirilen eğitim uygulaması. Kotlin DSL ile çoklu modül yapısı, ML Kit tabanlı görsel sınıflandırma prototipi.',
        overview: 'Mentorluk Platformu, üniversite öğrencilerine mentorluk hizmeti sunan ve eğitim içerikleri sağlayan topluluk tabanlı bir Android uygulamasıdır. Kotlin DSL ile modüler yapı, ML Kit ile görsel sınıflandırma ve CI/CD pipeline kurulumu içerir.',
        technologies: ['Kotlin', 'Android', 'Kotlin DSL', 'ML Kit', 'Firebase', 'CI/CD', 'GitHub Actions', 'Gradle'],
        features: [
            'Kotlin DSL ile çoklu modül yapısı',
            'ML Kit tabanlı görsel sınıflandırma',
            'CI/CD pipeline kurulumu',
            'Takım içi kod inceleme standartları',
            '6 kişilik ekip için mentorluk süreçleri',
            'Eğitim içerik yönetim sistemi'
        ],
        stats: [
            { label: 'Ekip Boyutu', value: '6 Kişi' },
            { label: 'Modül Sayısı', value: '5+' },
            { label: 'Proje Tipi', value: 'Topluluk' }
        ],
        role: 'Projenin teknik liderliğini üstlendim. Kotlin DSL ile modüler yapı tasarımı, ML Kit entegrasyonu, CI/CD pipeline kurulumu ve 6 kişilik ekibe mentorluk yaptım.'
    }
};

// Modal functionality
const projectModal = document.getElementById('projectModal');
const projectModalContent = document.getElementById('projectModalContent');
const projectModalClose = document.querySelector('.project-modal-close');

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    projectModalContent.innerHTML = `
        <div class="project-modal-header">
            <span class="project-modal-tag">${project.tag}</span>
            <h2>${project.title}</h2>
        </div>
        <div class="project-modal-body">
            <div class="project-modal-section">
                <h3>Proje Özeti</h3>
                <p>${project.overview}</p>
            </div>
            <div class="project-modal-section">
                <h3>Rolüm</h3>
                <p>${project.role}</p>
            </div>
            <div class="project-modal-section">
                <h3>Özellikler</h3>
                <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.6rem; color: var(--color-text-muted);">
                    ${project.features.map(feature => `<li>• ${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="project-modal-section">
                <h3>Kullanılan Teknolojiler</h3>
                <div class="project-modal-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
            <div class="project-modal-stats">
                ${project.stats.map(stat => `
                    <div class="project-modal-stat">
                        <h4>${stat.value}</h4>
                        <p>${stat.label}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('[data-project]');
    const inspectButtons = document.querySelectorAll('.case-inspect-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('case-inspect-btn')) {
                e.stopPropagation();
                const projectId = card.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    inspectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('[data-project]');
            if (card) {
                const projectId = card.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    projectModalClose?.addEventListener('click', closeProjectModal);
    projectModal?.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal?.classList.contains('active')) {
            closeProjectModal();
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.bio-card, .expertise-card, .timeline-item, .case-grid article, .assistant-info');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initYear();
    greetMessage();
});

