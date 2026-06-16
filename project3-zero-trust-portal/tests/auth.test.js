const authMiddleware = require('../src/middleware/auth');
const httpMocks = require('node-mocks-http');

describe('Security Framework - Automated Unit Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    test('Should return 401 response code if Authorization header is missing', () => {
        authMiddleware(req, res, next);
        
        expect(res.statusCode).toBe(401);
        expect(JSON.parse(res._getData())).toEqual({
            message: 'Access Denied: No token provided.'
        });
        expect(next).not.toHaveBeenCalled();
    });
});
