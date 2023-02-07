import React from 'react'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 container mx-auto">
      <img width="100px" src="https://th.bing.com/th/id/OIP.pdF-2mPzO_Fm-T5jhEgPDwHaFZ?pid=ImgDet&rs=1" alt="" />
      <div id="navbar" className="text-lg text-gray-600 lg-flex">
        <a href="" className="block hover:text-red-800 p-2  mt-4 text-black bg-slate-50 lg:inline-block lg:mt-0 mr-10">Home</a>
        <a href="" className="block hover:text-red-800 p-2  mt-4 text-black bg-slate-50 lg:inline-block lg:mt-0 mr-10">About us</a>
        <a href="" className="block hover:text-red-800 p-2  mt-4 text-black bg-slate-50 lg:inline-block lg:mt-0 mr-10">Change your role</a>
        <a href="" className="block hover:text-red-800 p-2 mt-4 text-black bg-slate-50 lg:inline-block lg:mt-0 mr-10">Who we are</a>
        <a href=""> <button className='text-white  bg-black p-2 '> Login</button></a>
        <a href=""> <button className=' text-white  bg-black p-2 '> Sign up</button></a>
      </div>

    </nav>
  )

}