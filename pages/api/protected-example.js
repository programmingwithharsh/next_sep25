import { dbConnect } from '../../src/lib/db.js';
import { authenticateToken, requireRole } from '../../src/lib/auth.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    try {
        await dbConnect();

        // Apply authentication middleware
        await new Promise((resolve, reject) => {
            authenticateToken(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Apply role-based authorization (both user and admin can access)
        await new Promise((resolve, reject) => {
            requireRole(['user', 'admin'])(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // This is a protected route that requires authentication
        res.status(200).json({
            success: true,
            message: 'This is a protected route!',
            data: {
                user: req.user,
                timestamp: new Date().toISOString(),
                message: `Hello ${req.user.username}, you have successfully accessed a protected resource!`
            }
        });

    } catch (error) {
        if (error.message === 'Invalid or expired token' || error.message === 'Access token required') {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        if (error.message.includes('Access denied')) {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        console.error('Protected route error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
