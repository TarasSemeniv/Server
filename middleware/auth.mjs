import jwt from 'jsonwebtoken'
import User from '../models/User.mjs';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secret');
        req._id = decoded.id;
        const user = await User.findById(req._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).send('Invalid token');
    }
}

export default auth;