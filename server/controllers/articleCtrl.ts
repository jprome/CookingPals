import { Request, Response } from 'express'
import Article from '../models/articleModel'
import { IReqAuth } from '../config/interface'
import mongoose from 'mongoose'


const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
}

const blogCtrl = {
  createArticle: async (req: Request, res: Response) => {
    if(!req.body.user) return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const { title, description} = req.body.article

      const newArticle = new Article({
        user: req.body.user,
        title: title.toLowerCase(), 
        description: description, 

      })
      console.log(req.body)
      await newArticle.save()
      res.json({newArticle})

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  },
  
  
  getArticlesByUser: async (req: Request, res: Response) => {
    const { limit, skip } = Pagination(req)

    try {
        // Pagination
      const articles = await Article.find({ user: req.params.id }, 'title description').exec();

      res.json({ articles })

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
    },
    getArticle: async (req: Request, res: Response) => {
        try {
          const blog = await Article.findOne({_id: req.params.id})
          .populate("user", "-password")
    
          if(!blog) return res.status(400).json({ msg: "Blog does not exist." })
    
          return res.json(blog)
        } catch (err: any) {
          return res.status(500).json({ msg: err.message })
        }
      },
  updateArticle: async (req: Request, res: Response) => {
    // if(!req.user) return res.status(400).json({msg: "Invalid Authentication."})

    try {
      const blog = await Article.findOneAndUpdate({
        _id: req.params.id,
      }, req.body)

      if(!blog) return res.status(400).json({msg: "Invalid Authentication."})

      res.json({ msg: 'Update Success!', blog })

    } catch (err: any) {
      return res.status(500).json({msg: err.message})
    }
  }
}


export default blogCtrl;