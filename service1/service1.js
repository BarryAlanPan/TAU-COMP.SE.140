const express = require('express');
const os = require('os');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();
const port = 8199;

function getIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '0.0.0.0';
}

function getRunningProcesses() {
    return new Promise((resolve, reject) => {
        exec('ps -ax', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

function getDiskSpace() {
    return new Promise((resolve, reject) => {
        exec('df', (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

function getUptime() {
    return os.uptime();
}

async function getService2Data() {
    try {
        const response = await axios.get('http://service2:8081/info');
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Service2:', error.message);
        return null;
    }
}

app.get('/', async (req, res) => {
    try {
        const [processes, diskSpace, service2Data] = await Promise.all([
            getRunningProcesses(),
            getDiskSpace(),
            getService2Data()
        ]);

        const service1Data = {
            ip_address: getIPAddress(),
            running_processes: processes,
            disk_space: diskSpace,
            uptime: getUptime()
        };

        res.json({
            service1: service1Data,
            service2: service2Data
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Service1 listening at http://localhost:${port}`);
});