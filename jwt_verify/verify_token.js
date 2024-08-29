import jwt from 'jsonwebtoken';

const jwtSecret = "yogesh123";
const tokenset = new Set();

const verfytoken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.replace('Bearer ', ''); // Handle Bearer token

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    if (tokenset.has(token)) {
        return res.status(401).json({ message: 'Token has been invalidated' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err); // Log error details
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        tokenset.add(token);
        next();
    });
}

export default verfytoken;
