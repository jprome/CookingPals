import * as React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";import Login from "./pages/login"
import Register from "./pages/register"
import Profile from "./pages/profile"
import Header from "./components/headerNav"
import { useLocation } from "react-router-dom";
import SearchRequest from "./pages/searchRequest"
import Reference from "./pages/reference"
import HomePage from "./pages/homePage"
import SendFriendRequest from "./pages/sendFriendRequest"
import CookbookPage from "./pages/cookbookPage"
import Messenger from "./pages/Messenger/Messenger";
import { useSelector } from "react-redux"


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
  const user = useSelector(state=> state)
  console.log(user)
  
  return (
    <main>
        {[ "/register" , "/login", "/messenger"].indexOf(location.pathname) > -1  ? null : <Header />}

        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/profile/:id" element={<Profile />}/>
            <Route path="/messenger" element={<Messenger />}/>                 
            <Route path="/search" element={<SearchRequest />}/>
            <Route path="/profile/:id/reference" element={<Reference />}/>
            <Route path="/profile/:id/sendFriendRequest" element={<SendFriendRequest />}/>
            <Route path="/profile/:id/cookbook/:id" element={<CookbookPage />}/>
        </Routes>
    </main>
  )
}

export default App