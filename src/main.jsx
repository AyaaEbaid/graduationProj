import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./i18n"
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx';
import { ImageCraftsmanProvider } from './Context/ImageCraftsmanContext.jsx';
import { LocationProvider } from './Context/LocationContext.jsx';
import { SpecializationProvider } from './Context/SpecailizationContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';





createRoot(document.getElementById('root')).render(

 <LocationProvider>
 <AuthProvider>
 <SpecializationProvider>
 <ImageCraftsmanProvider>
 <TokenContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </TokenContextProvider>
  </ImageCraftsmanProvider>
  </SpecializationProvider>
 </AuthProvider>
  </LocationProvider>
 

  
  ,
)
