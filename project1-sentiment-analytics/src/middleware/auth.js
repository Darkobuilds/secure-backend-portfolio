const jwt = require('jsonwebtoken');

// OWASP Aligned Session Validation & Authentication Middleware
module.exports = function (req, res, next) {
    // Extract token from standard Authorization header
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' });
    }

    try {
        // Verify token against secure environment variables
        const verified = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'], // Enforce strong cryptographic algorithms explicitly
            issuer: 'YouROK-Portfolio-Auth'
        });
        
        // Bind verified user payload to the request object
        req.user = verified;
        next();
    } catch (error) {
        // Provide standard generic error messaging to avoid user enumeration or system profiling
        res.status(400).json({ message: 'Invalid session or security token.' });
    }
};
