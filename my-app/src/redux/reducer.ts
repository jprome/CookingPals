import * as actionTypes from "./actionTypes"


const initialState: ArticleState = {
  user: {
    id:"61f0cb711b4817db2be3036e",
    name:"Jose Romero",
    password:"This is my password"
  },
  articles: [
    {
      user:"61f0cb711b4817db2be3036e",
      id: 1,
      title: "post 1",
      description:
        "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
    },
    {
      user:"61f0cb711b4817db2be3036e",
      id: 2,
      title: "post 2",
      description:
        "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
    },
  ],
}

const reducer = (state: ArticleState = initialState, action: ArticleAction): ArticleState => {
    switch (action.type) {
      case actionTypes.ADD_ARTICLE:
        const newArticle: IArticle = {
          id: Math.random(), // not really unique
          user: state.user.id,
          title: action.article!.title,
          description: action.article!.description,
        }

        return {
          ...state,
          articles: state.articles.concat(newArticle),
        }
      case actionTypes.REMOVE_ARTICLE:
        const updatedArticles: IArticle[] = state.articles.filter(
          article => article.id !== action.article!.id
        )
        return {
          ...state,
          articles: updatedArticles,
        }
      case actionTypes.GET_ARTICLES:
        if (action.articles){
          return {
            ...state,
            articles: action.articles
          }
        }
    }
    return state
  }


  export default reducer;
