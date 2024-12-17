import React, { useState, useEffect, useRef } from 'react'

export default function UserComponent({userName, userUUID, userID, }) {

    const xPos = useRef(0);
    const yPos = useRef(0);
    const elementRef = useRef(0);  // div 요소 참조용
  
    useEffect(() => {
     if(userID === userUUID){
      const handleKey = (e) => {
        if (e.key === 'ArrowUp') yPos.current -= 10;
        if (e.key === 'ArrowDown') yPos.current += 10;
        if (e.key === 'ArrowLeft') xPos.current -= 10;
        if (e.key === 'ArrowRight') xPos.current += 10;
        
        // ref로 직접 style 업데이트
        elementRef.current.style.left = `${xPos.current}px`;
        elementRef.current.style.top = `${yPos.current}px`;
      };
  
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
    }, [userID, userUUID]);
        useEffect(()=>{
    console.log(userID,userUUID, "com")
})


  return (
    <div 
    ref={elementRef}
    className='border-2 border-black w-10 h-10 rounded-full bg-white'
    style={{ position: 'absolute' }}
  >
      <div>{userName}</div>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="grid grid-cols-3 gap-2 w-[150px]">
            <div></div>
            <button 
              className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            >↑</button>
            <div></div>
            <button 
              className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            >←</button>
            <div></div>
            <button 
              className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            >→</button>
            <div></div>
            <button 
              className="bg-gray-200 p-2 rounded hover:bg-gray-300"
            >↓</button>
            <div></div>
          </div>
        </div>
    </div>
  );
}