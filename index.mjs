import express from 'express';
import dbConnection from './db/db.mjs';
import { getArticles, getArticle, createArticle, updateArticle, deleteArticle } from './controllers/ArticleController.mjs';
import { getAuthUser, login, register, updateUser } from './controllers/UserController.mjs';
import auth from './middleware/auth.mjs';
import requireRole from "./middleware/requireRole.mjs"
import cors from 'cors';
import { addComment, getCommentsByArticle } from './controllers/CommentContoller.mjs';


const app = express()
const port = 5000

dbConnection.on('connected', () => {
    console.log('Connected to MongoDB');
})

dbConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Worlhhd!')
})

app.get('/articles', getArticles);
app.get('/articles/:id', getArticle);
app.post('/articles', auth, requireRole('admin'), createArticle);
app.put('/articles/:id', auth, requireRole('admin'), updateArticle);
app.delete('/articles/:id', auth, requireRole('admin'), deleteArticle);

app.post('/register', register)
app.post('/login', login)
app.post('/authUser', auth, getAuthUser)

app.put('/users/:id', auth, updateUser)

app.get('/comments/:articleId', getCommentsByArticle);
app.post('/comments/:articleId', auth, addComment);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



// ozjCegyC1DkGOl11