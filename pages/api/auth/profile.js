import { dbConnect } from '../../../src/lib/db.js';
import { User } from '../../../src/models/User.js';
import { authenticateToken } from '../../../src/lib/auth.js';

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

        // Get user profile
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: user.toJSON()
            }
        });

    } catch (error) {
        if (error.message === 'Invalid or expired token' || error.message === 'Access token required') {
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }

        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
