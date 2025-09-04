import mongoose from "mongoose"

const schema = {
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}

const Comment = mongoose.model('Comment', new mongoose.Schema(schema));

export default Comment;