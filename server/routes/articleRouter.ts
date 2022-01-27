import express from 'express'
import ArticleCtrl from '../controllers/articleCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/article', ArticleCtrl.createArticle)
router.get('/article/user/:id', ArticleCtrl.getArticlesByUser)
router.route('/article/:id').get(ArticleCtrl.getArticle).put(ArticleCtrl.updateArticle)


export default router;