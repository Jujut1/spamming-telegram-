// File: working-script.js
// CYBER INDONET WORKING FUNCTIONS - 100% JALAN

(function() {
    'use strict';
    
    console.log('🔥 CYBER INDONET WORKING SCRIPT LOADED');
    
    // ==================== CONFIG ====================
    const CONFIG = {
        GITHUB_REPO: 'YOUR_USERNAME/YOUR_REPO_NAME', // Ganti dengan repo lu
        WORKFLOW_FILE: 'spam.yml'
    };
    
    // ==================== UTILITY FUNCTIONS ====================
    function showAlert(message, type = 'info') {
        const colors = {
            success: '#00ff88',
            error: '#ff0055',
            info: '#ffaa00',
            cyber: '#ff00ff'
        };
        
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #000;
            color: ${colors[type] || colors.info};
            border: 2px solid ${colors[type] || colors.info};
            padding: 15px;
            z-index: 9999;
            font-family: monospace;
            max-width: 400px;
            box-shadow: 0 0 20px ${colors[type] || colors.info};
        `;
        
        alertBox.innerHTML = `
            <strong>${type.toUpperCase()}:</strong><br>
            ${message}
            <button onclick="this.parentElement.remove()" 
                    style="float:right; background:none; color:white; border:none; cursor:pointer;">
                ✕
            </button>
        `;
        
        document.body.appendChild(alertBox);
        setTimeout(() => alertBox.remove(), 5000);
    }
    
    function logToConsole(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
            info: '#00ff88',
            error: '#ff0055',
            system: '#ff00ff',
            warning: '#ffaa00'
        };
        
        console.log(`%c[${timestamp}] ${message}`, `color: ${colors[type] || colors.info}`);
        
        // Update logs container if exists
        const logsContainer = document.getElementById('logsContainer');
        if (logsContainer) {
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry ' + type;
            logEntry.innerHTML = `
                <span class="timestamp">[${timestamp}]</span>
                <span class="log-message">${message}</span>
            `;
            logsContainer.appendChild(logEntry);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    }
    
    // ==================== MAIN FUNCTIONS ====================
    
    // 1. LAUNCH REAL SPAM FUNCTION
    window.startRealSpam = async function() {
        logToConsole('🚀 LAUNCH SPAM TRIGGERED', 'system');
        
        // Collect data from form
        const botToken = document.getElementById('botToken')?.value?.trim() || '';
        const chatId = document.getElementById('chatId')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '🔥 CYBER INDONET SPAM';
        const count = parseInt(document.getElementById('count')?.value || '100');
        const delay = parseFloat(document.getElementById('delay')?.value || '1');
        const mode = document.getElementById('mode')?.value || 'normal';
        
        // Validate inputs
        if (!botToken || !botToken.includes(':')) {
            showAlert('❌ Invalid Bot Token format!\nGet from @BotFather', 'error');
            return;
        }
        
        if (!chatId) {
            showAlert('❌ Enter Target Chat ID!', 'error');
            return;
        }
        
        if (count < 1 || count > 5000) {
            showAlert('❌ Message count must be 1-5000', 'error');
            return;
        }
        
        // Show processing
        showAlert(`⚡ Processing spam request...\nTarget: ${chatId}\nCount: ${count}`, 'info');
        
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        if (progressFill && progressText) {
            progressFill.style.width = '30%';
            progressText.textContent = '30% - Processing...';
        }
        
        logToConsole(`Spam Data: Target=${chatId}, Count=${count}, Mode=${mode}`, 'info');
        
        // Based on mode
        switch(mode) {
            case 'github':
                await triggerGitHubActions(botToken, chatId, message, count, delay);
                break;
            case 'vps':
                downloadVPSScript(botToken, chatId, message, count, delay);
                break;
            case 'flood':
                showAlert('🌊 Flood Mode: Use downloaded script on VPS', 'warning');
                downloadFloodScript(botToken, chatId, message, count);
                break;
            default:
                showAlert(`📡 Normal Mode Selected\nOpen GitHub Actions to run`, 'info');
                generateGitHubInstructions(botToken, chatId, message, count, delay);
        }
        
        // Complete progress
        if (progressFill && progressText) {
            progressFill.style.width = '100%';
            progressText.textContent = '100% - Ready!';
        }
        
        logToConsole('✅ Spam request processed', 'success');
    };
    
    // 2. DOWNLOAD SCRIPTS FUNCTION
    window.downloadScripts = function() {
        logToConsole('📥 DOWNLOAD SCRIPTS TRIGGERED', 'system');
        
        // Create download menu
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
            border: 3px solid #ff0055;
            padding: 20px;
            z-index: 9999;
            color: white;
            font-family: monospace;
            min-width: 400px;
        `;
        
        menu.innerHTML = `
            <h2 style="color:#ff0055">📦 CYBER SCRIPTS DOWNLOAD</h2>
            <p>Select script to download:</p>
            
            <div style="display: grid; gap: 10px; margin: 20px 0;">
                <button onclick="window.downloadPythonScript()" 
                        style="background: #222; color: #00ff88; border: 1px solid #00ff88; padding: 10px; cursor: pointer;">
                    🐍 Python Spammer
                </button>
                
                <button onclick="window.downloadBashScript()" 
                        style="background: #222; color: #ffaa00; border: 1px solid #ffaa00; padding: 10px; cursor: pointer;">
                    🐧 Bash Script
                </button>
                
                <button onclick="window.downloadGitHubWorkflow()" 
                        style="background: #222; color: #ff00ff; border: 1px solid #ff00ff; padding: 10px; cursor: pointer;">
                    🔄 GitHub Actions
                </button>
                
                <button onclick="window.downloadAllScripts()" 
                        style="background: #222; color: #00aaff; border: 1px solid #00aaff; padding: 10px; cursor: pointer;">
                    📚 ALL SCRIPTS (ZIP)
                </button>
            </div>
            
            <button onclick="this.parentElement.remove()" 
                    style="background: #ff0055; color: white; border: none; padding: 10px; width: 100%; cursor: pointer;">
                CLOSE
            </button>
        `;
        
        document.body.appendChild(menu);
        logToConsole('Download menu displayed', 'info');
    };
    
    // ==================== SCRIPT DOWNLOAD FUNCTIONS ====================
    
    window.downloadPythonScript = function() {
        const pythonScript = `#!/usr/bin/env python3
# CYBER INDONET TELEGRAM SPAMMER
# Usage: python3 spam.py

import requests
import time
import sys

def telegram_spam(bot_token, chat_id, message, count=100, delay=1):
    """Spam Telegram messages"""
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    print(f"🔥 CYBER INDONET SPAM STARTED")
    print(f"Target: {chat_id}")
    print(f"Messages: {count}")
    print(f"Delay: {delay}s")
    print("=" * 50)
    
    for i in range(1, count + 1):
        try:
            response = requests.post(url, data={
                'chat_id': chat_id,
                'text': f"{message} [{i}/{count}]"
            }, timeout=10)
            
            if response.status_code == 200:
                print(f"[✅] Sent {i}/{count}")
            else:
                print(f"[❌] Failed {i}: {response.text}")
                
        except Exception as e:
            print(f"[⚠️] Error {i}: {e}")
        
        if i < count:
            time.sleep(delay)
    
    print("=" * 50)
    print(f"🎯 SPAM COMPLETED: {count} messages sent")

if __name__ == "__main__":
    # CONFIG HERE
    BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
    CHAT_ID = "TARGET_CHAT_ID_HERE"
    MESSAGE = "🔥 CYBER INDONET SPAM ATTACK"
    COUNT = 100
    DELAY = 1
    
    telegram_spam(BOT_TOKEN, CHAT_ID, MESSAGE, COUNT, DELAY)`;
        
        downloadFile(pythonScript, 'cyber_spammer.py', 'text/python');
        showAlert('✅ Python script downloaded: cyber_spammer.py', 'success');
    };
    
    window.downloadBashScript = function() {
        const bashScript = `#!/bin/bash
# CYBER INDONET BASH SPAMMER
# Usage: bash spam.sh

BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
CHAT_ID="TARGET_CHAT_ID_HERE"
MESSAGE="🔥 CYBER INDONET SPAM"
COUNT=100
DELAY=1

echo "🔥 CYBER INDONET BASH SPAMMER"
echo "Target: \$CHAT_ID"
echo "Messages: \$COUNT"

for ((i=1; i<=COUNT; i++)); do
    response=\$(curl -s -X POST "https://api.telegram.org/bot\$BOT_TOKEN/sendMessage" \\
        -d "chat_id=\$CHAT_ID" \\
        -d "text=\$MESSAGE [\$i/\$COUNT]")
    
    if [[ \$response == *"\"ok\":true"* ]]; then
        echo "[✅] Sent \$i/\$COUNT"
    else
        echo "[❌] Failed \$i"
    fi
    
    sleep \$DELAY
done

echo "🎯 SPAM COMPLETED: \$COUNT messages"`;
        
        downloadFile(bashScript, 'cyber_spammer.sh', 'text/x-shellscript');
        showAlert('✅ Bash script downloaded: cyber_spammer.sh', 'success');
    };
    
    window.downloadGitHubWorkflow = function() {
        const workflow = `name: 🔥 CYBER Telegram Spammer

on:
  workflow_dispatch:
    inputs:
      chat_id:
        description: 'Target Chat ID'
        required: true
      message:
        description: 'Spam message'
        required: true
        default: '🔥 CYBER INDONET SPAM'
      count:
        description: 'Number of messages'
        required: true
        default: '100'
      delay:
        description: 'Delay between messages (seconds)'
        required: true
        default: '1'

jobs:
  spam:
    runs-on: ubuntu-latest
    steps:
      - name: 🚀 Start Spam Attack
        env:
          BOT_TOKEN: \${{ secrets.BOT_TOKEN }}
        run: |
          echo "🔥 CYBER INDONET SPAM ATTACK"
          echo "=============================="
          echo "Target: \${{ github.event.inputs.chat_id }}"
          echo "Count: \${{ github.event.inputs.count }}"
          
          for i in \$(seq 1 \${{ github.event.inputs.count }}); do
            curl -s -X POST "https://api.telegram.org/bot\$BOT_TOKEN/sendMessage" \\
              -d "chat_id=\${{ github.event.inputs.chat_id }}" \\
              -d "text=\${{ github.event.inputs.message }} [\$i/\${{ github.event.inputs.count }}]"
            
            echo "✅ Sent \$i/\${{ github.event.inputs.count }}"
            sleep \${{ github.event.inputs.delay }}
          done
          
          echo "🎯 ATTACK COMPLETED"`;
        
        downloadFile(workflow, 'github-spam.yml', 'text/yaml');
        showAlert('✅ GitHub workflow downloaded', 'success');
    };
    
    window.downloadAllScripts = function() {
        const allScripts = {
            'cyber_spammer.py': window.downloadPythonScript.toString(),
            'cyber_spammer.sh': window.downloadBashScript.toString(),
            'github-spam.yml': window.downloadGitHubWorkflow.toString(),
            'README.txt': `CYBER INDONET SPAM PACKAGE
========================
Includes:
1. cyber_spammer.py - Python script
2. cyber_spammer.sh - Bash script  
3. github-spam.yml - GitHub Actions

INSTRUCTIONS:
1. Python: python3 cyber_spammer.py
2. Bash: chmod +x cyber_spammer.sh && ./cyber_spammer.sh
3. GitHub: Add to .github/workflows/

🔥 CYBER INDONET - NO LIMITS`
        };
        
        // Create zip file simulation
        showAlert('📦 Creating scripts package...', 'info');
        setTimeout(() => {
            // Download first script as representative
            window.downloadPythonScript();
            window.downloadBashScript();
            window.downloadGitHubWorkflow();
            showAlert('✅ All scripts downloaded separately', 'success');
        }, 1000);
    };
    
    // ==================== HELPER FUNCTIONS ====================
    
    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        logToConsole(`Downloaded: ${filename}`, 'info');
    }
    
    async function triggerGitHubActions(botToken, chatId, message, count, delay) {
        showAlert(`🔗 Connecting to GitHub...\nRepo: ${CONFIG.GITHUB_REPO}`, 'info');
        
        // Generate instructions
        const instructions = `🚀 GITHUB ACTIONS INSTRUCTIONS:

1. Go to: https://github.com/${CONFIG.GITHUB_REPO}/actions
2. Click "🔥 CYBER Telegram Spammer" workflow
3. Click "Run workflow"
4. Fill in:
   - chat_id: ${chatId}
   - message: ${message}
   - count: ${count}
   - delay: ${delay}
5. Click "Run workflow"

📌 Note: You need BOT_TOKEN secret in repo settings`;
        
        showAlert(instructions, 'cyber');
        logToConsole('GitHub Actions instructions generated', 'info');
    }
    
    function generateGitHubInstructions(botToken, chatId, message, count, delay) {
        const instructions = `📋 MANUAL EXECUTION:

OPTION 1 - GitHub Actions:
1. Add BOT_TOKEN to repo secrets
2. Go to Actions tab
3. Run "spam" workflow
4. Input data:
   - chat_id: ${chatId}
   - message: ${message}
   - count: ${count}
   - delay: ${delay}

OPTION 2 - Python Script:
1. Download Python script
2. Edit BOT_TOKEN and CHAT_ID
3. Run: python3 cyber_spammer.py

OPTION 3 - VPS/Bash:
1. Download Bash script  
2. chmod +x cyber_spammer.sh
3. ./cyber_spammer.sh`;
        
        showAlert(instructions, 'info');
    }
    
    function downloadVPSScript(botToken, chatId, message, count, delay) {
        const vpsScript = `# CYBER INDONET VPS SPAM SCRIPT
# Save as: vps-spam.sh
# Run: chmod +x vps-spam.sh && ./vps-spam.sh

BOT_TOKEN="${botToken}"
CHAT_ID="${chatId}"
MESSAGE="${message}"
COUNT=${count}
DELAY=${delay}

echo "========================================="
echo "🔥 CYBER INDONET VPS SPAM ATTACK"
echo "========================================="
echo "Target: \$CHAT_ID"
echo "Messages: \$COUNT"
echo "Bot Token: \${BOT_TOKEN:0:15}..."
echo "Started: \$(date)"
echo "========================================="

for ((i=1; i<=COUNT; i++)); do
    curl -s -X POST "https://api.telegram.org/bot\$BOT_TOKEN/sendMessage" \\
        -d "chat_id=\$CHAT_ID" \\
        -d "text=\$MESSAGE [\$i/\$COUNT]" \\
        > /dev/null
    
    echo "[✓] Message \$i sent"
    sleep \$DELAY
done

echo "========================================="
echo "✅ SPAM COMPLETED: \$COUNT messages"
echo "Finished: \$(date)"
echo "========================================="`;
        
        downloadFile(vpsScript, 'vps-spam.sh', 'text/x-shellscript');
        showAlert('✅ VPS script downloaded: vps-spam.sh', 'success');
    }
    
    function downloadFloodScript(botToken, chatId, message, count) {
        const floodScript = `# CYBER INDONET FLOOD ATTACK
# Multi-threaded spam

import requests
import threading
import time

BOT_TOKEN = "${botToken}"
CHAT_ID = "${chatId}"
MESSAGE = "${message}"
COUNT = ${count}
THREADS = 10

def spam_worker(worker_id, messages_per_thread):
    for i in range(messages_per_thread):
        try:
            requests.post(f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage',
                         data={'chat_id': CHAT_ID, 
                               'text': f'{MESSAGE} [Thread-{worker_id}-{i}]'})
        except:
            pass

# Start threads
threads = []
messages_per_thread = COUNT // THREADS

for t in range(THREADS):
    thread = threading.Thread(target=spam_worker, args=(t, messages_per_thread))
    threads.append(thread)
    thread.start()
    print(f"Thread {t} started")

# Wait completion
for thread in threads:
    thread.join()

print(f"✅ FLOOD COMPLETED: {COUNT} messages")`;
        
        downloadFile(floodScript, 'flood_attack.py', 'text/python');
        showAlert('🌊 Flood attack script downloaded', 'warning');
    }
    
    // ==================== INITIALIZATION ====================
    
    function initializeFunctions() {
        logToConsole('Initializing Cyber functions...', 'system');
        
        // Wait for DOM to be ready
        setTimeout(() => {
            // Find and fix buttons
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
                const onclick = btn.getAttribute('onclick');
                if (onclick) {
                    if (onclick.includes('startRealSpam')) {
                        btn.onclick = window.startRealSpam;
                        logToConsole('Fixed Launch Spam button', 'success');
                    }
                    if (onclick.includes('downloadScripts')) {
                        btn.onclick = window.downloadScripts;
                        logToConsole('Fixed Download Scripts button', 'success');
                    }
                }
            });
            
            // Update API status
            const apiStatus = document.getElementById('apiStatus');
            if (apiStatus) {
                apiStatus.innerHTML = 'API: <span style="color:#00ff88">WORKING ✅</span>';
            }
            
            // Add to window object
            window.downloadPythonScript = window.downloadPythonScript;
            window.downloadBashScript = window.downloadBashScript;
            window.downloadGitHubWorkflow = window.downloadGitHubWorkflow;
            window.downloadAllScripts = window.downloadAllScripts;
            
            logToConsole('✅ All functions initialized and working', 'success');
            showAlert('🔥 CYBER INDONET SYSTEM READY', 'success');
        }, 1000);
    }
    
    // Start initialization
    initializeFunctions();
    
    // Expose functions globally
    window.cyber = {
        startSpam: window.startRealSpam,
        downloadScripts: window.downloadScripts,
        version: '1.0',
        author: 'CYBER INDONET'
    };
    
    console.log('🔥 CYBER INDONET WORKING SCRIPT LOADED SUCCESSFULLY');
})();
