from flask import Flask, jsonify
import socket
import psutil
import subprocess
import time

app = Flask(__name__)

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def get_running_processes():
    result = subprocess.run(['ps', '-ax'], capture_output=True, text=True, check=True)
    return result.stdout

def get_disk_space():
    result = subprocess.run('df', capture_output=True, text=True, check=True)
    return result.stdout

def get_uptime():
    return time.time() - psutil.boot_time()

@app.route('/info')
def get_info():
    return jsonify({
        'ip_address': get_ip_address(),
        'running_processes': get_running_processes(),
        'disk_space': get_disk_space(),
        'uptime': get_uptime()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)