import React from 'react'

export default function Navbar() {
  return (
    <nav className="relative container mx-auto p-6">
      {/* <h1>Hello</h1> */}
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <img width="100px" src="https://th.bing.com/th/id/OIP.pdF-2mPzO_Fm-T5jhEgPDwHaFZ?pid=ImgDet&rs=1" alt="" />
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="" className='hover:text-red-700'>Home</a>
          <a href="" className='hover:text-red-700'>About us</a>
          <a href="" className='hover:text-red-700'>what we do</a>
          <a href="" className='hover:text-red-700'>who we are</a>
        </div>
        <a href="" className=' hidden md:block p-3 px-4 pt-2 text-white bg-black rounded-full'>Sign Up</a>
      </div>

    </nav>
  )
}
