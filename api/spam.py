from flask import Flask, request, jsonify
import requests
import threading
import time
from queue import Queue
import json

app = Flask(__name__)

# Store active spam jobs
active_jobs = {}
job_counter = 0

class SpamJob:
    def __init__(self, bot_token, chat_id, message, count, delay):
        self.bot_token = bot_token
        self.chat_id = chat_id
        self.message = message
        self.count = count
        self.delay = delay
        self.is_running = True
        self.sent_count = 0
        
    def start(self):
        def spam_task():
            url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"
            
            for i in range(1, self.count + 1):
                if not self.is_running:
                    break
                    
                payload = {
                    'chat_id': self.chat_id,
                    'text': f"{self.message} [{i}/{self.count}]"
                }
                
                try:
                    response = requests.post(url, data=payload, timeout=10)
                    if response.status_code == 200:
                        self.sent_count += 1
                        print(f"[Job] Sent {i}/{self.count}")
                    else:
                        print(f"[Job] Failed {i}: {response.text}")
                except Exception as e:
                    print(f"[Job] Error {i}: {e}")
                
                if i < self.count:
                    time.sleep(self.delay)
            
            print(f"[Job] Completed: {self.sent_count}/{self.count} messages sent")
            
        thread = threading.Thread(target=spam_task)
        thread.daemon = True
        thread.start()

@app.route('/api/spam', methods=['POST'])
def start_spam():
    global job_counter
    
    try:
        data = request.json
        
        # Validate required fields
        required = ['bot_token', 'chat_id', 'message', 'count', 'delay']
        for field in required:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400
        
        # Create new job
        job_id = job_counter
        job_counter += 1
        
        job = SpamJob(
            bot_token=data['bot_token'],
            chat_id=data['chat_id'],
            message=data['message'],
            count=int(data['count']),
            delay=float(data['delay'])
        )
        
        active_jobs[job_id] = job
        job.start()
        
        return jsonify({
            'success': True,
            'job_id': job_id,
            'message': f'Spam job started. Target: {data["count"]} messages'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/spam/<int:job_id>/stop', methods=['POST'])
def stop_spam(job_id):
    if job_id in active_jobs:
        active_jobs[job_id].is_running = False
        return jsonify({'success': True, 'message': 'Job stopped'})
    return jsonify({'error': 'Job not found'}), 404

@app.route('/api/spam/<int:job_id>/status', methods=['GET'])
def job_status(job_id):
    if job_id in active_jobs:
        job = active_jobs[job_id]
        return jsonify({
            'running': job.is_running,
            'sent': job.sent_count,
            'total': job.count,
            'progress': (job.sent_count / job.count) * 100 if job.count > 0 else 0
        })
    return jsonify({'error': 'Job not found'}), 404

@app.route('/api/status', methods=['GET'])
def api_status():
    return jsonify({
        'status': 'online',
        'active_jobs': len(active_jobs),
        'system': 'CYBER INDONET REAL SPAM API'
    })

@app.route('/api/test-telegram', methods=['POST'])
def test_telegram():
    data = request.json
    
    if 'bot_token' not in data:
        return jsonify({'error': 'Missing bot_token'}), 400
    
    try:
        url = f"https://api.telegram.org/bot{data['bot_token']}/getMe"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            bot_data = response.json()
            return jsonify({
                'success': True,
                'bot': {
                    'id': bot_data['result']['id'],
                    'username': bot_data['result']['username'],
                    'first_name': bot_data['result']['first_name']
                }
            })
        else:
            return jsonify({'error': 'Invalid bot token'}), 400
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
