import React, { useState, useEffect, useRef } from 'react'
import Insert from '../mainMake/insert';

export default function Insertbtn() {
    const [insertItem, setInsertItem] = useState(false) 

    
    const handleitem =() => {
        setInsertItem(true)

    }
  return (
    <div>     
    {!insertItem ? (
        <div 
            onClick={handleitem} 
            className='group w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/50'
        >
            <div className='relative flex items-center justify-center'>
                <span className='absolute w-8 h-8 rounded-full bg-purple-400/20 animate-ping'></span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-white group-hover:rotate-90 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 4v16m8-8H4" 
                    />
                </svg>
            </div>
        </div>
    ) : (
        <Insert insertClose={setInsertItem}/>
    )}
</div>
  )
}
