// File: config.js
// Konfigurasi API endpoint

window.API_CONFIG = {
    // Ganti dengan URL backend lu yang udah deploy
    BASE_URL: 'https://jujut1.github.io/spamming-telegram/',
    
    // Atau pilih salah satu:
    // 'https://cyber-indonet-api.up.railway.app'
    // 'https://username.pythonanywhere.com'
    
    ENDPOINTS: {
        SPAM: '/api/spam',
        STATUS: '/api/status',
        STOP: '/api/stop',
        STATS: '/api/stats',
        TEST: '/api/test'
    }
};

// Override fetch URL di frontend
(function() {
    const originalFetch = window.fetch;
    
    window.fetch = function(url, options) {
        // Jika URL local (/api/...), ganti dengan backend URL
        if (typeof url === 'string' && url.startsWith('/api/')) {
            const newUrl = window.API_CONFIG.BASE_URL + url;
            console.log(`🔥 Redirecting API call: ${url} → ${newUrl}`);
            arguments[0] = newUrl;
        }
        
        // Tambah CORS headers
        if (options) {
            options.mode = 'cors';
            options.credentials = 'omit';
            if (!options.headers) options.headers = {};
            options.headers['Content-Type'] = 'application/json';
        }
        
        return originalFetch.apply(this, arguments);
    };
    
    console.log('✅ CYBER INDONET API CONFIG LOADED');
})();
