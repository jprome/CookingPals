interface IArticle {
    id: number
    user:  mongoose.Types.ObjectId
    title: string
    description: string
}

interface IUser {
  id: mongoose.Types.ObjectId,
  name: string,
  password: string
}

type ArticleState = {
    user: IUser,
    articles: IArticle[]
}
  
type ArticleAction = {
  type: string
  article?: IArticle
  articles?: IArticle[]
}


  