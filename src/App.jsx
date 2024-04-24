import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import RootLayout from "./layout/Rootlayout"
import HomePage from "./pages/Home/HomePage"
import ListPage from "./pages/List/ListPage"
import SinglePostPage from "./pages/singlePost/SinglePostPage"

function App() {

  const router=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout></RootLayout>}>
    <Route path="/" element={<HomePage></HomePage>}></Route>
    <Route path="/list" element={<ListPage></ListPage>}></Route>
    <Route path="/list/:id" element={<SinglePostPage></SinglePostPage>}></Route>
  </Route>))

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App