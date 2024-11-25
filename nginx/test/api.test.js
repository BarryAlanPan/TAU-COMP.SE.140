const axios = require('axios');
const { expect } = require('chai');

const BASE_URL = 'http://localhost:8197';
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
