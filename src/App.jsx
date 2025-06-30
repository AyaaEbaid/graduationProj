import './App.css'
import './axiosGlobal'
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import { BrowserRouter,RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Services from './components/Services/Services'
import Servicedetails from './components/Servicedetails/Servicedetails'
import Serviceworker from './components/Serviceworker/Serviceworker'
import Serviceworker2 from './components/Serviceworker2/Serviceworker2'
import Serviceworker3 from './components/Serviceworker3/Serviceworker3'
import Serviceworker4 from './components/Serviceworker4/Serviceworker4'
import Serviceworker5 from './components/Serviceworker5/Serviceworker5'
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

import Booking from './components/Booking/Booking';
import BookingUser from './components/BookingUser/BookingUser';
// import BookingUser from './components/bookingUser/bookingUser';

import CraftsmanProfile from './components/CrafrsmanProfile/CraftsmanProfile';
import BookingCraftsman from './components/BookingCraftsman/BookingCraftsman';
import BookingSupervisor from './components/BookingSupervisor/BookingSupervisor';
import ProfileSupervisor from './components/ProfileSupervisor/ProfileSupervisor';
import VerifyOTP from './components/VerifyOTP/VerifyOTP';


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
    {path:"verfiy",element:<VerifyOTP/>},
    {path:"book",element:<PortectedRoutes><BookingUser/></PortectedRoutes>},

    {path:"profile",element:<PortectedRoutes><Profile/></PortectedRoutes>},
    {path:"services",element:<PortectedRoutes><Servicedetails/></PortectedRoutes>},
    {path:"rate",element:<PortectedRoutes><Rate/></PortectedRoutes>},


    
 {path:"forgetpassword",element:<Forgetpassword/>},
    
 {path:"reset-password",element:<Resetpassword/>},
    {path:"serviceworker",element:<PortectedRoutes><Serviceworker/></PortectedRoutes>},
    {path:"serviceworker2",element:<PortectedRoutes><Serviceworker2/></PortectedRoutes>},
    {path:"serviceworker3",element:<PortectedRoutes><Serviceworker3/></PortectedRoutes>},
    {path:"serviceworker4",element:<PortectedRoutes><Serviceworker4/></PortectedRoutes>},
    {path:"serviceworker5",element:<PortectedRoutes><Serviceworker5/></PortectedRoutes>},
    {path:"book",element:<PortectedRoutes><BookingUser/></PortectedRoutes>},
    // {path:"book",element:<PortectedRoutes><bookingUser/></PortectedRoutes>},

    {path:"bookcraft",element:<PortectedRoutes><BookingCraftsman/></PortectedRoutes>},
    {path:"booksuper",element:<PortectedRoutes><BookingSupervisor/></PortectedRoutes>},
    {path:"superprofile",element:<PortectedRoutes><ProfileSupervisor/></PortectedRoutes>},

   
  
    
   

    {path:"worker",element:<PortectedRoutes><Serviceworker/></PortectedRoutes>},
    {path:"crafProfile",element:<CraftsmanProfile/>},
    {path:"workerportfolio/:id",element:<PortectedRoutes><WorkerPortfolio/></PortectedRoutes>},
    {path:"booking/:id",element:<PortectedRoutes><Booking/></PortectedRoutes>},
    
    {path:"*",element:<Notfound/>}
  ]
 }])

  return (
    <>
  <RouterProvider router={routers}>
<ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
/>
  </RouterProvider>
  
 

    </>
  )
}

export default App
