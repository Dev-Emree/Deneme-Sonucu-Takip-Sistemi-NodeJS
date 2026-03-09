const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const examRouter = require('../../routes/exam.router');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: false }));
app.use('/set', examRouter);

describe('DoS via missing properties', () => {
    it('should not crash without optional chaining on passport.user', async () => {
        const res = await request(app).post('/set/new-tyt').send({});
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ saved: false });
    });
});
