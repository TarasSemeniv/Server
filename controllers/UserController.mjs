import User from "../models/User.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const user = new User(req.body);
    user.role = 'user';
    await user.save();
    res.send(user);
}

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
        return res.status(404).send('User not found');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(404).send('Invalid password');
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });
    res.send({ user, token });
}

export const getAuthUser = async (req, res) => {
    const user =  await User.findById(req._id)
    res.send(user)
}

export const updateUser = async (req,res) => {
    const user = await User.findById(req.params.id);
    if (!user) 
        return res.status(404).send('User not found');
    if (req.body.password) 
        user.password = req.body.password;
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();
    res.send(user);
}