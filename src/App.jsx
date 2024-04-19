import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import RootLayout from "./layout/Rootlayout"
import HomePage from "./pages/Home/HomePage"

function App() {

  const router=createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout></RootLayout>}>
    <Route path="/" element={<HomePage></HomePage>}></Route>
  </Route>))

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App