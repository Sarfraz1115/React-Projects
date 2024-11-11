import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-300 flex justify-around text-black py-2'>
        <h2 className='text-2xl font-bold'>MyTasks</h2>
        <ul className='flex gap-20 text-base'>
            <li className='font-medium text-base cursor-pointer'>Home</li>
            <li className='font-medium text-base cursor-pointer'>Tasks</li>
            <li className='font-medium text-base cursor-pointer'>
                contact us
            </li>
        </ul>
    </nav>
  )
}

export default Navbar