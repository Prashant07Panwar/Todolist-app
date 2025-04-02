import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-indigo-900 justify-around py-2 text-white'>
     <div className='logo'>
      <span className='font-bold mx-8 text-xl'>iTodo</span>
      </div>
     <div>
        <ul className='flex gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold  transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold  transition-all'>Your Tasks</li>
        </ul>
        </div>      
    </nav>
  )
}

export default Navbar
