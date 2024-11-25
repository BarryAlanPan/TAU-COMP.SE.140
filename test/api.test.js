const axios = require('axios');
const { expect } = require('chai');

const BASE_URL = 'http://localhost:8198';
const BASE_URL_NEO = 'http://localhost:8197';
const AUTH = {
    username: 'admin',
    password: 'admin'
};

describe('Nginx API Gateway Tests', () => {
    describe('GET /', () => {
        it('should return the index.html page', async () => {
            const response = await axios.get(BASE_URL + '/', {
                auth: AUTH
            });
            expect(response.status).to.equal(200);
            expect(response.headers['content-type']).to.include('text/html');
        });

        it('should fail without authentication', async () => {
            try {
                await axios.get(BASE_URL + '/');
                throw new Error('Should have failed without auth');
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });
    });

    describe('GET /data', () => {
        it('should proxy to service1 backend', async () => {
            const response = await axios.get(BASE_URL + '/data', {
                auth: AUTH
            });
            expect(response.status).to.equal(200);
        });

        it('should load balance between service1 instances', async () => {
            const responses = await Promise.all([
                axios.get(BASE_URL + '/data', { auth: AUTH }),
                axios.get(BASE_URL + '/data', { auth: AUTH }),
                axios.get(BASE_URL + '/data', { auth: AUTH })
            ]);
            
            responses.forEach(response => {
                expect(response.status).to.equal(200);
            });
        });
    });

    describe('GET /stop', () => {
        it('should return appropriate response', async () => {
            const response = await axios.get(BASE_URL + '/stop', {
                auth: AUTH
            });
            expect(response.status).to.equal(200);
        });
    });
});

describe('New API Gateway State Tests', () => {
    describe('PUT /state', () => {
        it('should change state to PAUSED', async () => {
            const response = await axios.put(`${BASE_URL_NEO}/state`, 'PAUSED', {
                auth: AUTH,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'text/plain'
                }
            });
            expect(response.status).to.equal(200);
            
            const stateResponse = await axios.get(`${BASE_URL_NEO}/state`, {
                auth: AUTH,
                headers: {
                    'Accept': 'text/plain'
                }
            });
            expect(stateResponse.data).to.contain('PAUSED');
        });
    });

    describe('GET /request', () => {
        it('should return system information when RUNNING', async () => {
            await axios.put(`${BASE_URL_NEO}/state`, 'RUNNING', {
                auth: AUTH,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'text/plain'
                }
            });

            const response = await axios.get(`${BASE_URL_NEO}/request`, {
                auth: AUTH,
                headers: {
                    'Accept': 'text/plain'
                }
            });
            expect(response.status).to.equal(200);
        });

        it('should fail when system is PAUSED', async () => {
            await axios.put(`${BASE_URL_NEO}/state`, 'PAUSED', {
                auth: AUTH,
                headers: {
                    'Content-Type': 'text/plain',
                    'Accept': 'text/plain'
                }
            });

            try {
                await axios.get(`${BASE_URL_NEO}/request`, {
                    auth: AUTH,
                    headers: {
                        'Accept': 'text/plain'
                    }
                });
                throw new Error('Should have failed in PAUSED state');
            } catch (error) {
                expect(error.response.status).to.not.equal(200);
            }
        });
    });

    describe('GET /run-log', () => {
        it('should return state change history', async () => {
            const response = await axios.get(`${BASE_URL_NEO}/run-log`, {
                auth: AUTH,
                headers: {
                    'Accept': 'text/plain'
                }
            });
            expect(response.status).to.equal(200);
            expect(response.data).to.be.a('string');
            expect(response.data).to.include('->');
        });
    });
});
