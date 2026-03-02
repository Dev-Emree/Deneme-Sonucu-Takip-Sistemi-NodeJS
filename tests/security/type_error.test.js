const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mock controllers
jest.mock('../../controllers/processExam', () => ({
    processExam: jest.fn().mockResolvedValue(true),
    processYDT: jest.fn().mockResolvedValue(true)
}));
jest.mock('../../controllers/examPublic', () => ({
    setPublic: jest.fn()
}));

const examRouter = require('../../routes/exam.router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mock session
app.use((req, res, next) => {
    req.session = {
        passport: {
            user: 'mock_user_id'
        }
    };
    next();
});

app.use('/set', examRouter);

describe('TypeError / DoS Vulnerability in exam.router.js', () => {
    test('Should not crash when examName is missing or not a string', async () => {
        // We will send a request with examName as null, causing .length to crash
        const payload = {
            examName: null
        };
        const res = await request(app).post('/set/new-tyt').send(payload);

        // Ensure server responds gracefully and does not crash with TypeError
        expect(res.status).not.toBe(500);
        expect(res.body).toEqual({ saved: false });
    });
});
