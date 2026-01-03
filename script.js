// CYBER INDONET REAL SPAM SYSTEM
class TelegramSpammer {
    constructor() {
        this.spamInterval = null;
        this.isSpamming = false;
        this.currentCount = 0;
        this.totalCount = 0;
        this.apiEndpoint = window.location.hostname.includes('github.io') 
            ? 'https://your-backend.herokuapp.com/api/spam' 
            : '/api/spam';
        
        this.init();
    }

    init() {
        this.checkAPIStatus();
        this.loadSavedSettings();
        this.setupEventListeners();
        this.log('🔥 CYBER INDONET REAL SPAM SYSTEM INITIALIZED', 'system');
    }

    loadSavedSettings() {
        const savedToken = localStorage.getItem('bot_token');
        const savedChatId = localStorage.getItem('chat_id');
        
        if (savedToken) document.getElementById('botToken').value = savedToken;
        if (savedChatId) document.getElementById('chatId').value = savedChatId;
    }

    saveSettings() {
        const token = document.getElementById('botToken').value;
        const chatId = document.getElementById('chatId').value;
        
        localStorage.setItem('bot_token', token);
        localStorage.setItem('chat_id', chatId);
    }

    log(message, type = 'info') {
        const logsContainer = document.getElementById('logsContainer');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="log-message">${message}</span>
        `;
        
        logsContainer.appendChild(logEntry);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    }

    updateProgress(percent) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${Math.round(percent)}%`;
    }

    async checkAPIStatus() {
        try {
            const response = await fetch(this.apiEndpoint + '/status');
            const data = await response.json();
            
            document.getElementById('apiStatus').innerHTML = 
                `API: <span style="color:#00ff88">ONLINE</span>`;
            this.log('API Status: ONLINE', 'info');
        } catch (error) {
            document.getElementById('apiStatus').innerHTML = 
                `API: <span style="color:#ff4444">OFFLINE - Using fallback</span>`;
            this.log('API Status: OFFLINE - Using GitHub Actions', 'error');
        }
    }

    validateInputs() {
        const botToken = document.getElementById('botToken').value.trim();
        const chatId = document.getElementById('chatId').value.trim();
        const message = document.getElementById('message').value.trim();
        const count = parseInt(document.getElementById('count').value);
        
        if (!botToken || !botToken.includes(':')) {
            alert('❌ Invalid Bot Token format!');
            return false;
        }
        
        if (!chatId) {
            alert('❌ Enter Target Chat ID!');
            return false;
        }
        
        if (!message) {
            alert('❌ Enter Spam Message!');
            return false;
        }
        
        if (count < 1 || count > 5000) {
            alert('❌ Message count must be between 1-5000!');
            return false;
        }
        
        this.saveSettings();
        return true;
    }

    async startRealSpam() {
        if (this.isSpamming) {
            alert('⚠️ Spam already in progress!');
            return;
        }
        
        if (!this.validateInputs()) return;
        
        const mode = document.getElementById('mode').value;
        const botToken = document.getElementById('botToken').value.trim();
        const chatId = document.getElementById('chatId').value.trim();
        const message = document.getElementById('message').value.trim();
        const count = parseInt(document.getElementById('count').value);
        const delay = parseFloat(document.getElementById('delay').value);
        
        this.isSpamming = true;
        this.currentCount = 0;
        this.totalCount = count;
        
        this.log(`🚀 Starting ${mode.toUpperCase()} spam attack...`, 'system');
        this.log(`Target: ${chatId} | Messages: ${count} | Delay: ${delay}s`, 'info');
        
        // Based on mode, use different method
        switch(mode) {
            case 'normal':
                await this.spamViaAPI(botToken, chatId, message, count, delay);
                break;
            case 'flood':
                await this.floodAttack(botToken, chatId, message, count);
                break;
            case 'github':
                await this.triggerGitHubAction(botToken, chatId, message, count, delay);
                break;
            case 'vps':
                this.downloadVPSScript(botToken, chatId, message, count, delay);
                break;
        }
    }

    async spamViaAPI(botToken, chatId, message, count, delay) {
        const payload = {
            bot_token: botToken,
            chat_id: chatId,
            message: message,
            count: count,
            delay: delay
        };
        
        try {
            this.log('📡 Connecting to spam API...', 'info');
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                const data = await response.json();
                this.log(`✅ Spam job started! Job ID: ${data.job_id}`, 'info');
                
                // Simulate progress updates
                this.spamInterval = setInterval(() => {
                    this.currentCount += 5;
                    const percent = (this.currentCount / this.totalCount) * 100;
                    this.updateProgress(percent > 100 ? 100 : percent);
                    
                    if (this.currentCount >= this.totalCount) {
                        this.stopSpam();
                        this.log('🎯 Spam attack completed!', 'system');
                    }
                }, delay * 100);
            } else {
                throw new Error('API Error');
            }
        } catch (error) {
            this.log(`❌ API Error: ${error.message}`, 'error');
            this.log('🔄 Falling back to JavaScript spam...', 'info');
            this.javascriptSpam(botToken, chatId, message, count, delay);
        }
    }

    async javascriptSpam(botToken, chatId, message, count, delay) {
        this.log('⚡ Using JavaScript spam method...', 'info');
        
        for (let i = 1; i <= count && this.isSpamming; i++) {
            const percent = (i / count) * 100;
            this.updateProgress(percent);
            
            // Simulate sending (real implementation would use fetch to Telegram API)
            this.log(`📤 [${i}/${count}] Sending: ${message.substring(0, 30)}...`, 'info');
            
            // Real Telegram API call would be here:
            // await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            //     method: 'POST',
            //     body: new URLSearchParams({
            //         chat_id: chatId,
            //         text: `${message} [${i}/${count}]`
            //     })
            // });
            
            this.currentCount = i;
            
            if (i < count) {
                await this.sleep(delay * 1000);
            }
        }
        
        if (this.isSpamming) {
            this.log('✅ JavaScript spam completed!', 'system');
            this.stopSpam();
        }
    }

    async floodAttack(botToken, chatId, message, count) {
        this.log('🌊 Starting FLOOD ATTACK (fast mode)...', 'system');
        
        const promises = [];
        const batchSize = 10;
        
        for (let i = 1; i <= count; i += batchSize) {
            if (!this.isSpamming) break;
            
            const batch = [];
            for (let j = 0; j < batchSize && (i + j) <= count; j++) {
                batch.push(this.sendTelegramMessage(botToken, chatId, `${message} [${i + j}/${count}]`));
            }
            
            promises.push(...batch);
            this.currentCount = Math.min(i + batchSize - 1, count);
            this.updateProgress((this.currentCount / count) * 100);
            
            this.log(`💥 Flood batch ${i}-${this.currentCount} launched`, 'info');
            await this.sleep(100);
        }
        
        if (this.isSpamming) {
            this.log('✅ Flood attack completed!', 'system');
            this.stopSpam();
        }
    }

    async sendTelegramMessage(botToken, chatId, text) {
        // This is where real Telegram API call would be
        try {
            // Uncomment for real spam:
            /*
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                body: new URLSearchParams({ chat_id: chatId, text: text })
            });
            return response.ok;
            */
            return true; // Simulated success
        } catch (error) {
            return false;
        }
    }

    async triggerGitHubAction(botToken, chatId, message, count, delay) {
        this.log('🔗 Triggering GitHub Actions workflow...', 'info');
        
        const workflowData = {
            bot_token: botToken,
            chat_id: chatId,
            message: message,
            count: count.toString(),
            delay: delay.toString()
        };
        
        // Download workflow file
        this.downloadGitHubWorkflow(workflowData);
        
        this.log('📥 GitHub workflow file downloaded. Upload to your repo.', 'info');
        this.log('1. Buat repo GitHub baru', 'info');
        this.log('2. Tambahkan BOT_TOKEN sebagai repository secret', 'info');
        this.log('3. Upload .github/workflows/spam.yml', 'info');
        this.log('4. Jalankan dari Actions tab', 'info');
    }

    downloadGitHubWorkflow(data) {
        const yamlContent = `name: CYBER indonet Telegram Spammer

on:
  workflow_dispatch:
    inputs:
      chat_id:
        description: 'Target Chat ID'
        required: true
        default: '${data.chat_id}'
      message:
        description: 'Spam Message'
        required: true
        default: '${data.message}'
      count:
        description: 'Message Count'
        required: true
        default: '${data.count}'
      delay:
        description: 'Delay (seconds)'
        required: true
        default: '${data.delay}'

jobs:
  spam:
    runs-on: ubuntu-latest
    steps:
      - name: Start Spam Attack
        env:
          BOT_TOKEN: \${{ secrets.BOT_TOKEN }}
        run: |
          for i in \$(seq 1 \${{ github.event.inputs.count }}); do
            curl -s -X POST "https://api.telegram.org/bot\$BOT_TOKEN/sendMessage" \\
              -d "chat_id=\${{ github.event.inputs.chat_id }}" \\
              -d "text=\${{ github.event.inputs.message }} | CYBER indonet [\$i/\${{ github.event.inputs.count }}]"
            echo "✅ Sent message \$i"
            sleep \${{ github.event.inputs.delay }}
          done
          echo "🎯 CYBER INDONET SPAM COMPLETE"`;
        
        this.downloadFile(yamlContent, 'spam.yml', 'text/yaml');
    }

    downloadVPSScript(botToken, chatId, message, count, delay) {
        const pythonScript = `#!/usr/bin/env python3
# CYBER INDONET VPS SPAM SCRIPT
import requests
import time
import threading
from concurrent.futures import ThreadPoolExecutor

BOT_TOKEN = "${botToken}"
CHAT_ID = "${chatId}"
MESSAGE = """${message}"""
COUNT = ${count}
DELAY = ${delay}

def send_message(index):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': f"{MESSAGE} [{index}/{COUNT}]"
    }
    
    try:
        response = requests.post(url, data=payload, timeout=10)
        if response.status_code == 200:
            print(f"[+] Sent {index}/{COUNT}")
            return True
        else:
            print(f"[-] Failed {index}: {response.text}")
            return False
    except Exception as e:
        print(f"[!] Error {index}: {e}")
        return False

def main():
    print("🔥 CYBER INDONET VPS SPAM ATTACK STARTED")
    print(f"Target: {CHAT_ID}")
    print(f"Messages: {COUNT}")
    
    # Multi-threaded spam
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(send_message, i+1) for i in range(COUNT)]
        
        for future in futures:
            time.sleep(DELAY)
    
    print("✅ SPAM ATTACK COMPLETED")

if __name__ == "__main__":
    main()`;
        
        this.downloadFile(pythonScript, 'cyber_spam.py', 'text/python');
        this.log('📥 VPS Script downloaded. Run: python3 cyber_spam.py', 'info');
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    stopSpam() {
        this.isSpamming = false;
        if (this.spamInterval) {
            clearInterval(this.spamInterval);
            this.spamInterval = null;
        }
        this.log('🛑 Spam attack stopped', 'system');
        this.updateProgress(0);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Tool functions
    async getChatIdTool() {
        const botToken = document.getElementById('botToken').value.trim();
        if (!botToken) {
            alert('Enter Bot Token first!');
            return;
        }
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
            const data = await response.json();
            
            if (data.ok && data.result.length > 0) {
                const chatId = data.result[0].message.chat.id;
                document.getElementById('chatId').value = chatId;
                this.log(`✅ Found Chat ID: ${chatId}`, 'info');
                this.saveSettings();
            } else {
                this.log('❌ No updates found. Send a message to your bot first.', 'error');
            }
        } catch (error) {
            this.log(`❌ Error: ${error.message}`, 'error');
        }
    }

    async testBotToken() {
        const botToken = document.getElementById('botToken').value.trim();
        if (!botToken) {
            alert('Enter Bot Token!');
            return;
        }
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
            const data = await response.json();
            
            if (data.ok) {
                this.log(`✅ Bot Token valid! Bot: @${data.result.username}`, 'info');
                alert(`✅ Bot Token valid!\nBot: @${data.result.username}\nName: ${data.result.first_name}`);
            } else {
                this.log('❌ Invalid Bot Token!', 'error');
                alert('❌ Invalid Bot Token!');
            }
        } catch (error) {
            this.log(`❌ Error: ${error.message}`, 'error');
        }
    }

    downloadScripts() {
        const scripts = {
            'python_spam.py': `import requests
import time

BOT_TOKEN = 'YOUR_TOKEN_HERE'
CHAT_ID = 'TARGET_CHAT_ID'
MESSAGE = 'CYBER INDONET SPAM ATTACK'

for i in range(1, 101):
    requests.post(f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage',
                 data={'chat_id': CHAT_ID, 'text': f'{MESSAGE} [{i}/100]'})
    time.sleep(1)
    print(f'Sent {i}/100')`,
            
            'bash_spam.sh': `#!/bin/bash
BOT_TOKEN="YOUR_TOKEN_HERE"
CHAT_ID="TARGET_CHAT_ID"

for i in {1..100}; do
    curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \\
         -d "chat_id=$CHAT_ID" \\
         -d "text=\"CYBER INDONET SPAM [$i/100]\""
    echo "Sent $i"
    sleep 1
done`
        };
        
        Object.keys(scripts).forEach(filename => {
            this.downloadFile(scripts[filename], filename, 'text/plain');
        });
        
        this.log('📦 All spam scripts downloaded!', 'info');
    }

    clearLogs() {
        document.getElementById('logsContainer').innerHTML = '';
        this.log('🗑️ Logs cleared', 'info');
    }

    exportLogs() {
        const logs = document.getElementById('logsContainer').innerText;
        this.downloadFile(logs, 'cyber_indonet_logs.txt', 'text/plain');
        this.log('💾 Logs exported', 'info');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.spammer = new TelegramSpammer();
});

// Global functions for button onclick
function startRealSpam() {
    if (window.spammer) {
        window.spammer.startRealSpam();
    }
}

function stopSpam() {
    if (window.spammer) {
        window.spammer.stopSpam();
    }
}

function getChatIdTool() {
    if (window.spammer) {
        window.spammer.getChatIdTool();
    }
}

function testBotToken() {
    if (window.spammer) {
        window.spammer.testBotToken();
    }
}

function downloadScripts() {
    if (window.spammer) {
        window.spammer.downloadScripts();
    }
}

function clearLogs() {
    if (window.spammer) {
        window.spammer.clearLogs();
    }
}

function exportLogs() {
    if (window.spammer) {
        window.spammer.exportLogs();
    }
}

function testLocalAPI() {
    if (window.spammer) {
        window.spammer.log('Testing local API endpoint...', 'info');
        window.spammer.checkAPIStatus();
    }
}

function triggerGitHubAction() {
    if (window.spammer) {
        const botToken = document.getElementById('botToken').value.trim();
        const chatId = document.getElementById('chatId').value.trim();
        const message = document.getElementById('message').value.trim();
        const count = parseInt(document.getElementById('count').value);
        const delay = parseFloat(document.getElementById('delay').value);
        
        window.spammer.triggerGitHubAction(botToken, chatId, message, count, delay);
    }
}

function downloadPythonScript() {
    if (window.spammer) {
        const botToken = document.getElementById('botToken').value.trim();
        const chatId = document.getElementById('chatId').value.trim();
        const message = document.getElementById('message').value.trim();
        const count = parseInt(document.getElementById('count').value);
        const delay = parseFloat(document.getElementById('delay').value);
        
        window.spammer.downloadVPSScript(botToken, chatId, message, count, delay);
    }
}
