import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import RootLayout from "./layout/Rootlayout"
import HomePage from "./pages/Home/HomePage"
import ListPage from "./pages/List/ListPage"
import SinglePostPage from "./pages/singlePost/SinglePostPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import RegisterPage from "./pages/Register/RegisterPage"
import LoginPage from "./pages/Login/LoginPage"
import RequireAuth from "./layout/RequireAuth/RequireAuth"
import UpdateProfilePage from "./pages/UpdateProfile/UpdateProfilePage"
import AddPostPage from "./pages/AddPost/AddPostPage"
import About from "./pages/About/About"
import { useContext } from "react"
import { UserAuthContext } from "./Context/UserAuth"
import Socket from "./Context/Socket"
import Contact from "./pages/Contact/Contact"

function App() {

  const {userAuth}=useContext(UserAuthContext)
  const router=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout></RootLayout>}>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/about" element={<About></About>}></Route>
    <Route path="/contact" element={<Contact></Contact>}></Route>
    <Route path="/list" element={<ListPage></ListPage>}></Route>
    <Route path="/list/:id" element={<SinglePostPage></SinglePostPage>}></Route>
    <Route path="/profile" element={<RequireAuth><ProfilePage></ProfilePage></RequireAuth>}></Route>
    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    <Route path="/update/profile" element={<RequireAuth><UpdateProfilePage></UpdateProfilePage></RequireAuth>}></Route>
    <Route path="/add/post" element={<RequireAuth><AddPostPage></AddPostPage></RequireAuth>}></Route>
  </Route>))

  return (
    <>
    {userAuth ?
     <Socket> 
       <RouterProvider router={router}>
       </RouterProvider>
    </Socket>
    :
    <RouterProvider router={router}></RouterProvider>
    }
    </>
  )
}

export default App