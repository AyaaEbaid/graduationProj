import React from "react";
import style from './Aboutus.module.css'
 import photo1 from './../../assets/photo1.png'
 import photo2 from './../../assets/pic 2.png'
 import photo3 from './../../assets/photo2.png'
export default function About() {
  return (
  <>
<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-12 text-center font-changa">
      About Us
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      
      <div className="flex flex-col items-center">
        <div className="w-72 h-72">
          <img
            src={photo3}
            alt="icon1"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 text-gray-700 text-lg leading-loose text-center font-medium">
          "Hanshatobhalak" is an online platform that connects apartment owners 
          looking for finishing and decoration services with craftsmen and 
          specialized stores providing the necessary materials and supplies, 
          making the finishing process comprehensive and direct.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-72 h-72">
          <img
            src={photo2}
            alt="icon2"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-6 text-gray-700 text-lg leading-loose text-center font-medium">
          Account registration for apartment owners, craftsmen, and store owners. 
          Smart search by specialty and location.  
          Mutual rating systems to ensure quality.  
          Booking and scheduling management.  
          Secure and diverse payment options.  
          Notifications and appointment reminders.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-72 mt-11">
          <img
            src={photo1}
            alt="icon3"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-14 text-gray-700 text-lg leading-loose text-center font-medium">
          Your ultimate destination for finishing projects, where apartment owners  
          and store owners connect with the best workers to complete their projects 
          efficiently and professionally.  
          Explore services, choose your team, and start your project today!
        </p>
      </div>
      
    </div>
  </div>
</section>

 
  </>
  );
}

  
  