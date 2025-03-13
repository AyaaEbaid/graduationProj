import React from 'react'
import "./Footer.module.css"
import logo from './../../assets/logo2.png'
import { NavLink } from 'react-router-dom'
export default function Footer() {
  return (
    <>
    <div>

      

    <footer className="bg-stone-100 bottom-0 left-0 right-0 mt-20 dark:bg-gray-900">
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
       
         <NavLink to="" className="flex  md:mt-8  text-teal-600 w-64  hover:text-white flex-wrap items-center rtl:space-x-reverse">
            <img src={logo} className="h-12 w-20 pt-1" alt="Hanshtabhalk Logo" /> 
               <span className="self-center  text-2xl font-extrabold whitespace-nowrap dark:text-black">Hanshtabhalk</span>
           </NavLink>
        
      </div>
      <div className="grid grid-cols-2 gap-14 sm:gap-6 sm:grid-cols-3">
        <div >
          <h2 className="mb-6 font-semibold text-gray-900 uppercase text-xl dark:text-white">
            Contact Us
          </h2>
          <ul className="text-gray-900 hover:text-teal-500 font-medium">
            <li className="mb-4">
              <NavLink href="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                Phone:
              </NavLink>
            </li>
            <li>
              <NavLink href="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                Email:
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-xl tracking-wider font-semibold text-gray-900 uppercase dark:text-white">
            Follow Us
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <NavLink href="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                Facebook
              </NavLink>
            </li>
            <li>
              <NavLink href="#" className="text-lg tracking-widest hover:text-gray-900 text-teal-500 hover:underline">
                Twitter
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 text-xl font-semibold text-gray-900 uppercase dark:text-white">
            Terms & Policies
          </h2>
          <ul className="text-gray-900 hover:text-teal-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <NavLink href="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink href="#" className="text-lg hover:text-gray-900 text-teal-500 hover:underline">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-800 sm:text-center dark:text-gray-400">
        © 2025 <a href="#" className="hover:underline text-teal-500 hover:text-gray-800">Hanashbotalak</a>.
        All rights reserved.
      </span>
      <div className="flex mt-4 sm:justify-center sm:mt-0">
        <NavLink href="#" className="text-gray-900 hover:text-teal-500 dark:hover:text-white">
          <span className="sr-only">Facebook page</span>
        </NavLink>
        <NavLink href="#" className="text-gray-900 hover:text-teal-500 dark:hover:text-white ms-5">
          <span className="sr-only">Twitter page</span>
        </NavLink>
      </div>
    </div>
  </div>
</footer>




      </div></>
  )
}
