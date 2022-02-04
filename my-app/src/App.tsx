import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./styles.css"
import { Dispatch } from "redux"
import { Link , BrowserRouter as Router, Routes, Route} from "react-router-dom"
import RegisterForm from "./components/registerFrom"
import Login from "./pages/login"
import Register from "./pages/register"
import { IUser } from "./utils/Typescript"

const App: React.FC = () => {

  /* // Left for now as an example
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  )
  const user:  IUser = useSelector(
    (state: ArticleState) => state.user,
    shallowEqual
  )
  
  const dispatch: Dispatch<any> = useDispatch()

  //const saveArticle = React.useCallback(
  //  (article: IArticle) => dispatch(addArticle(article,user.id)),
  //  [dispatch]
  //)
  
  //React.useEffect(() => {
  //  dispatch(getArticles(user))
  //},[dispatch])

  */
  return (
    <main>
      
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>

      
    </main>
  )
}

export default App


/*


   
<h1>My Articles</h1>
      
<AddArticle saveArticle={saveArticle} />
{articles.map((article: IArticle) => (
  <Article
    key={article.id}
    article={article}
    removeArticle={removeArticle}
  />
))}

*/