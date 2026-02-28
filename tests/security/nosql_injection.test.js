const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport'); // Require passport for usage

// Mock Passport
const mockAuthenticate = jest.fn((strategy, callback) => (req, res, next) => {
    callback(null, { username: 'testuser' });
});

// We are mocking 'passport' module itself.
jest.mock('passport', () => ({
    authenticate: jest.fn((strategy, cb) => (req, res, next) => {
        mockAuthenticate(strategy, cb)(req, res, next);
    }),
    initialize: () => (req, res, next) => next(),
    session: () => (req, res, next) => next(),
    use: jest.fn(),
    serializeUser: jest.fn(),
    deserializeUser: jest.fn()
}));

// Mock User Model
const mockFindOne = jest.fn();
const mockSave = jest.fn();
const mockSetPassword = jest.fn();

const MockUser = jest.fn().mockImplementation(() => ({
    save: mockSave,
    setPassword: mockSetPassword
}));
// Attach static method
MockUser.findOne = mockFindOne;

// Mock relative paths correctly from test file location
jest.mock('../../models/User', () => MockUser);

jest.mock('../../controllers/loginHandler', () => ({
    checkLoggedOut: (req, res, next) => next(),
    LogOut: (req, res, next) => res.send('logged out')
}));

jest.mock('../../controllers/processExam', () => ({
    processExam: jest.fn(),
    processYDT: jest.fn()
}));

jest.mock('../../config/config', () => ({
    cookieOptions: {}
}));

// Import Router
const userRouter = require('../../routes/user.router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.isProduction = false;
app.use((req, res, next) => {
    req.login = (user, cb) => cb(null);
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', userRouter);

describe('Security: NoSQL Injection & DoS Protection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should BLOCK NoSQL Injection in /register (email)', async () => {
        mockFindOne.mockResolvedValue(null);
        mockSave.mockResolvedValue({});

        const payload = {
            usr: 'validUser',
            email: { "$ne": null }, // Malicious payload
            pass: 'validPass'
        };

        const res = await request(app).post('/register').send(payload);

        // Expectation: Request blocked
        // Based on implementation logic:
        // if (typeof req.body.email != 'string') return res.send({ usr: 1, pass: 1, email: 0 });
        expect(res.body).toEqual({ usr: 1, pass: 1, email: 0 });

        // CRITICAL: User.findOne should NOT be called
        expect(mockFindOne).not.toHaveBeenCalled();
    });

    test('Should BLOCK NoSQL Injection in /register (password)', async () => {
        const payload = {
            usr: 'validUser',
            email: 'valid@email.com',
            pass: { "$ne": null } // Malicious payload
        };

        const res = await request(app).post('/register').send(payload);

        // Expectation: Request blocked
        // Based on implementation logic:
        // if (typeof req.body.pass != 'string') return res.send({ usr: 1, pass: 0, email: 1 });
        expect(res.body).toEqual({ usr: 1, pass: 0, email: 1 });

        // CRITICAL: User.findOne should NOT be called
        expect(mockFindOne).not.toHaveBeenCalled();
    });

    test('Should BLOCK DoS/Injection in /login (password)', async () => {
        const payload = {
            username: 'testuser',
            password: { "$ne": null } // Malicious payload
        };

        const res = await request(app).post('/login').send(payload);

        // Expectation: Request blocked
        expect(res.body).toEqual({ usr: 0, pass: 0 });

        // CRITICAL: Passport authenticate should NOT be called
        expect(mockAuthenticate).not.toHaveBeenCalled();
    });
});
