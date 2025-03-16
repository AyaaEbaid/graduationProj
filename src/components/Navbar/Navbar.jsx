import React from 'react'
import { NavLink } from 'react-router-dom'
import LanguageSwitcher from '../../LanguageSwitcher'
import logo from "./../../assets/logo.png"
export default function Navbar() {
  function Hello(){
    console.log("hi");
    
  }
 
  return (
    <>
    

<nav className="bg-teal-600  border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <NavLink to="" className="flex text-white  hover:text-white flex-wrap items-center rtl:space-x-reverse">
   <img src={logo} className="h-9 w-14 pt-1" alt="Hanshtabhalk Logo" /> 
      <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-white">Hanshtabhalk</span>
  </NavLink>

  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button onClick={()=>{Hello()}} type="button" data-popover-target="popover-default" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
      </button>
      {/* hover */}
      <div data-popover id="popover-default" role="tooltip" className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
    <div className="px-3 py-2 text-center bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Porifile</h3>
    </div>
    
    <div data-popper-arrow></div>
</div>
     <LanguageSwitcher/>
      <div className="items-center pr-3 justify-between hidden w-full md:flex md:w-auto md:order-1">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 ml-3 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NavLink to="login" className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent  px-3 py-0.5 rounded-3xl shadow-lg ring ring-white">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="register" className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent px-3 py-0.5 rounded-3xl shadow-lg ring ring-white">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>

      
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4    md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <NavLink to="" className="block py-2 px-3 text-white hover:bg-gray-100 md:hover:bg-white md:hover:rounded-lg rounded-sm md:bg-teal-600 md:text-white md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
      </li>
      <li>
        <NavLink to="" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-white md:hover:rounded-lg  md:hover:text-teal-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About </NavLink>
      </li>
      <li>
        <NavLink to="services" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-white md:hover:rounded-lg  md:hover:text-teal-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services </NavLink>
      </li>
      <li>
        <NavLink to="rate" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-white md:hover:rounded-lg  md:hover:text-teal-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Rate us </NavLink>
      </li>
      <li>
        <NavLink to="" className="block py-2 px-3 text-white rounded-sm hover:bg-gray-100 md:hover:bg-white md:hover:rounded-lg  md:hover:text-teal-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact us </NavLink>
      </li>
     
      
      
    </ul>
  </div>
  </div>
</nav>

    
    </>
  )
}
