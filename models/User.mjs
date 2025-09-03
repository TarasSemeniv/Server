import mongoose from "mongoose";
import bcrypt from "bcrypt"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

schema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
    
})

const User = mongoose.model('User', schema);

export default User;