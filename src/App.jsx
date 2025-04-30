import './App.css'
import { ToastContainer } from "react-toastify";
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import { BrowserRouter,RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Services from './components/Services/Services'
import Servicedetails from './components/Servicedetails/Servicedetails'
import Serviceworker from './components/Serviceworker/Serviceworker'
import Resetpassword from './components/Resetpassword/Resetpassword'
import Rate from './components/Rate/Rate'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import SupervisorDashboard from './components/SupervisorDashboard/SupervisorDashboard'
import Profile from './components/Profile/Profile'
import DashboardCraftsman from './components/DashboardCraftsman/DashboardCraftsman'
import Forgetpassword from './components/Forgetpasword/Forgetpassword'
import PortectedRoutes from './components/ProtectedRoutes/PortectedRoutes';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth';
import WorkerPortfolio from './components/WorkerPortfolio/WorkerPortfolio';


function App() {
  
  // const {i18n}=useTranslation()
  // useEffect(() => {
  //   document.documentElement.lang = i18n.language;
  //   document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  // }, [i18n.language]);
 let routers=createBrowserRouter([{
  path:"",element:<Layout/>,children:[

    {index:true,element:<Home/>},
    
    
    {path:"login",element:<ProtectedAuth><Login/></ProtectedAuth>},
    {path:"register",element:<ProtectedAuth><Register/></ProtectedAuth>},
    {path:"profile",element:<PortectedRoutes><Profile/></PortectedRoutes>},
    {path:"services",element:<PortectedRoutes><Servicedetails/></PortectedRoutes>},
    {path:"rate",element:<PortectedRoutes><Rate/></PortectedRoutes>},
    {path:"/*",element:<PortectedRoutes><AdminDashboard/></PortectedRoutes>},
    {path:"/supervisor/*",element:<PortectedRoutes><SupervisorDashboard/></PortectedRoutes>},
    {path:"/dashboardcraftsman/*",element:<PortectedRoutes><DashboardCraftsman/></PortectedRoutes>},
    
 {path:"forgetpassword",element:<Forgetpassword/>},
    
 {path:"reset-password",element:<Resetpassword/>},
    {path:"serviceworker",element:<PortectedRoutes><Serviceworker/></PortectedRoutes>},

    {path:"worker",element:<PortectedRoutes><Serviceworker/></PortectedRoutes>},
    {path:"workerportfolio",element:<WorkerPortfolio/>},

    
    ,

    {path:"*",element:<Notfound/>}
  ]
 }])

  return (
    <>
  <RouterProvider router={routers}>

  </RouterProvider>
  <div className=''>
  <ToastContainer position='top-center' className="pt-20" />
  </div>
 

    </>
  )
}

export default App
