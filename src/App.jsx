import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import { BrowserRouter,RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
function App() {
 let routers=createBrowserRouter([{
  path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"*",element:<Notfound/>}
  ]
 }])

  return (
    <>
  <RouterProvider router={routers}>

  </RouterProvider>
  
    </>
  )
}

export default App
