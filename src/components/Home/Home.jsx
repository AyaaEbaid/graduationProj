import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Background from '../Background/Background';
import Aboutus from '../Aboutus/Aboutus';
import Mainslider from '../Mainslider/Mainslider';
import Services from '../Services/Services';
import Achievements from '../Achievements/Achievements';
import Footer from '../Footer/Footer';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Background />
      <Mainslider />
      <div id="about-us">
        <Aboutus />
      </div>
      <Services />
      <Achievements />
      <div id="contact-us">
        <Footer />
      </div>
    </>
  );
}