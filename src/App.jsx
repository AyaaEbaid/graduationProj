import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import { BrowserRouter,RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Services from './components/Services/Services'
import Servicedetails from './components/Servicedetails/Servicedetails'
import Resetpassword from './components/Resetpassword/Resetpassword'
import Rate from './components/Rate/Rate'
import Dashboard from './components/Dashboard/Dashboard'
function App() {
 let routers=createBrowserRouter([{
  path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"services",element:<Servicedetails/>},
    {path:"rate",element:<Rate/>},
    {path:"dashboard",element:<Dashboard/>},
    {path:"reset-password",element:<Resetpassword/>},

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
