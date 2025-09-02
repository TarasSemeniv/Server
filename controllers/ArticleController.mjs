import Article from "../models/Articel.mjs";

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article)
            return res.status(404).send("Article not found")
        res.send(article)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export const createArticle = async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send('Title and content are required');
        }
        const article = new Article(req.body)
        await article.save();
        res.send(article)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

export const updateArticle = async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(article);
}

export const deleteArticle = async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).send();
}