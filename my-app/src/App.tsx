import * as React from "react"
import { Routes, Route} from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Profile from "./pages/profile"
import Header from "./components/headerNav"
import { useLocation } from "react-router-dom";
import SearchRequest from "./pages/searchRequest"


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
  
  let location = useLocation();
  
  return (
    <main>
        {[ "/register" , "/login"].indexOf(location.pathname) > -1  ? null : <Header />}

        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile/:id" element={<Profile />}></Route>
            <Route path="/search" element={<SearchRequest />}></Route>
        </Routes>
    </main>
  )
}

export default App