import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret')
        console.log(decoded)
        next()
    }
    catch (error) {
        return res.status(404).send('Invalid token');
    }
}

export default auth;