import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import RootLayout from "./layout/Rootlayout"
import RequireAuth from "./layout/RequireAuth/RequireAuth"
import { useContext } from "react"
import { UserAuthContext } from "./Context/UserAuth"
import Socket from "./Context/Socket"
import { AddPostPage,About,HomePage,ListPage,LoginPage,ProfilePage,RegisterPage,SinglePostPage,UpdateProfilePage, ErrorPage } from "./pages"

function App() {

  const {userAuth}=useContext(UserAuthContext)
  const router=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout></RootLayout>}>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/about" element={<About></About>}></Route>
    <Route path="/list" element={<ListPage></ListPage>}></Route>
    <Route path="/list/:id" element={<SinglePostPage></SinglePostPage>}></Route>
    <Route path="/profile" element={<RequireAuth><ProfilePage></ProfilePage></RequireAuth>}></Route>
    <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    <Route path="/update/profile" element={<RequireAuth><UpdateProfilePage></UpdateProfilePage></RequireAuth>}></Route>
    <Route path="/add/post" element={<RequireAuth><AddPostPage></AddPostPage></RequireAuth>}></Route>
    <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
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