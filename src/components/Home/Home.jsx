import React from 'react'
import Background from '../Background/Background'
import Aboutus from '../Aboutus/Aboutus'
import Mainslider from '../Mainslider/Mainslider'
import Services from '../Services/Services'
import Achievements from '../Achievements/Achievements'
import Footer from '../Footer/Footer'
import GovernratesApi from '../GovernratesApi/GovernratesApi'


export default function Home() {
  return (
    <>
    <Background/>
    <Mainslider/>
    <GovernratesApi/>
    
    <Aboutus />
    
    
    <Services/>
    <Achievements/>
    
    <Footer/>
   
    
    </>
  )
}
