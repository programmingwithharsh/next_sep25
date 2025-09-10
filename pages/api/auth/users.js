import { dbConnect } from '../../../src/lib/db.js';
import { User } from '../../../src/models/User.js';
import { authenticateToken, requireAdmin } from '../../../src/lib/auth.js';

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

        // Apply admin authorization
        await new Promise((resolve, reject) => {
            requireAdmin(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Get all users (admin only)
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                users,
                count: users.length
            }
        });

    } catch (error) {
        if (error.message === 'Invalid or expired token' || error.message === 'Access token required') {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        if (error.message === 'Admin access required') {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        console.error('Users list error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
