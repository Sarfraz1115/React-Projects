import React from 'react'
import "./card.css"
const Card = (
    {
        image,
        title,
        dish,
        vidolink,
        onrecipeclick,
    }
) => {
    return (
        
        <div className='card-container w-64 border-2 border-black flex flex-col bg-gray-400  h-fit'>
            <img src={image} alt="" className='card-img w-52 block m-auto p-2 rounded-xl' />
            <h1 className='title font-bold text-2xl text-center'>{title}</h1>
            <h3 className='font-medium text-xl text-center'>{dish} Dish</h3>
            <div className='flex justify-around p-5 gap-2'>
                <a className='btn
                 bg-slate-300 p-1
                   w-24 text-center border-2 rounded border-black
                    hover:bg-zinc-500 hover:text-white '
                    target='_blank'
                    href={vidolink}>Video</a>
                    
                <button className='btn bg-slate-300
                 p-1 w-20 text-center border-2 border-black
                  rounded hover:bg-zinc-500 hover:text-white'
                  onClick={onrecipeclick}
                >Recipe</button>

            </div>

        </div>

    )
}

export default Card