import React, { useState } from 'react'

const Navbar = ({ inputval, setinputval, onSearch }) => {

  
    const handleclick = () => {
        onSearch(inputval);

    }

    const handlechange = (e) => {
        setinputval(e.target.value);
    }

    return (
        <>
            <div className='w-full bg-slate-500 p-3 flex justify-between sticky top-0'>
                <h1 className='font-bold text-2xl ml-6 font-mono'>My Recipe</h1>
                <div className='mr-32'>
                    <input 
                        onChange={handlechange} 
                        value={inputval} 
                        type="text" 
                        className='p-1 w-64 rounded pr-3' 
                        placeholder='Search the recipe' 
                    />
                    <button 
                        className='w-20 ml-3 p-1 rounded bg-red-400 hover:text-lime-200'
                        onClick={handleclick}
                    >
                        Search
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar