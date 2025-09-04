import Comment from '../models/Comment.mjs';

export const getCommentsByArticle = async (req, res) => {
    try {
        const comments = await Comment.find({ articleId: req.params.articleId }).populate('userId', 'name');
        res.status(200).json(comments);
    }
    catch (err)
    {
        res.status(500).send(err.message)
    }
}

export const addComment = async (req, res) => {
    try {
        if (!req.body.content) {
            return res.status(400).send('Content for comment is required');
        }
        const comment = new Comment({
            articleId: req.params.articleId,
            userId: req.user._id,
            content: req.body.content
        });
        await comment.save();
        res.status(201).json(comment);
    }
    catch (err) 
    {
        res.status(500).send(err.message)
    }
}