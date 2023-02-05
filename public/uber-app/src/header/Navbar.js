import React from 'react'
import "./Navbar.css"
import { FiGlobe, FiGrid } from "react-icons/fi";
export default function Navbar() {
  return (
    <>
    <div className='main-nav'>
      <div className="logo">
      <h1><span>u</span>ber</h1>
      </div>
      
      <div className="menu-links">
      <ul>
        <li><a href='/'>Company</a></li>
        <li><a href='/'>Safety</a></li>
        <li><a href='/'>Help</a></li>
       
      </ul>
  
      </div>
      <div className="social-links">
      <ul>
        <li><i className='G'><FiGlobe/></i><a href='/'>EN</a></li>
        <li><i className='G'><FiGrid/></i><a href='/'>Products</a></li>
        <li><a href='/'>Login</a></li>
        <li><a href='/'>Sign up</a></li>
       
      </ul>
     </div>



    
    </div>
      

    </>
  )
}
