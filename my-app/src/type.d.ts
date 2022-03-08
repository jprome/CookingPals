interface IArticle {
    id: number
    user:  mongoose.Types.ObjectId
    title: string
    description: string
}
