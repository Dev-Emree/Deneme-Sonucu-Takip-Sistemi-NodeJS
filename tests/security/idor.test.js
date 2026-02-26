const { setPublic } = require('../../controllers/examPublic');
const { TYT } = require('../../models/TYT');
const { AYT } = require('../../models/AYT');
const { YDT } = require('../../models/YDT');
const User = require('../../models/User');

jest.mock('../../models/TYT', () => ({
    TYT: {
        findById: jest.fn()
    }
}));
jest.mock('../../models/AYT', () => ({
    AYT: {
        findById: jest.fn()
    }
}));
jest.mock('../../models/YDT', () => ({
    YDT: {
        findById: jest.fn()
    }
}));
jest.mock('../../models/User');

describe('IDOR Vulnerability in setPublic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should NOT allow a user to toggle visibility of an exam they do not own', async () => {
        // Setup
        const examId = 'exam123';
        const attackerId = 'userAttacker';

        // Mock Exam owned by someone else
        const mockExam = {
            _id: examId,
            public: false,
            username: 'ownerUsername',
            save: jest.fn().mockResolvedValue(true)
        };

        // Mock Attacker User
        const mockAttacker = {
            _id: attackerId,
            username: 'attackerUsername'
        };

        // Setup Mocks
        TYT.findById.mockResolvedValue(mockExam);
        User.findById.mockResolvedValue(mockAttacker);

        // Act
        // We pass attackerId as the 3rd argument (which we will implement)
        // Current implementation ignores it.
        const result = await setPublic(examId, 'ty', attackerId);

        // Assert
        // Current implementation returns true (toggled value) -> VULNERABLE
        // Expected implementation returns "Unauthorized" -> SECURE
        expect(result).toBe('Unauthorized');

        // Ensure save was NOT called (in fixed version)
        // In vulnerable version, it IS called.
        // expect(mockExam.save).not.toHaveBeenCalled();
    });

    it('should allow a user to toggle visibility of their own exam', async () => {
        // Setup
        const examId = 'examOwned';
        const ownerId = 'userOwner';

        // Mock Exam owned by user
        const mockExam = {
            _id: examId,
            public: false,
            username: 'ownerUsername',
            save: jest.fn().mockResolvedValue(true)
        };

        // Mock Owner User
        const mockOwner = {
            _id: ownerId,
            username: 'ownerUsername'
        };

        // Setup Mocks
        TYT.findById.mockResolvedValue(mockExam);
        User.findById.mockResolvedValue(mockOwner);

        // Act
        const result = await setPublic(examId, 'ty', ownerId);

        // Assert
        // Should return true (toggled value)
        // Current implementation works for this (returns true)
        // Fixed implementation should also work
        if (result === 'Unauthorized') {
             throw new Error('Authorized user was blocked');
        }
        expect(result).toBe(true);
        expect(mockExam.public).toBe(true);
    });
});
