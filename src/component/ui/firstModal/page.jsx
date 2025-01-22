import React from 'react'
import { useState,useEffect,useRef } from 'react'
import { useModalStore } from '../../../zustand/positoinStore';

export default function FirstModal() {

    const historyNumber = useModalStore((state) => state.historyNumber)
    const setHistoryNumber = useModalStore((state) => state.setHistoryNumber)

// 1. if문 사용
const skipHandler = () => {
    setHistoryNumber(historyNumber + 1)
}



  
  return (
<div className={`w-full h-full absolute top-0 left-0 z-40 transition-all  backdrop-filter duration-1000 ease-in-out
      ${historyNumber === 0 ? 'backdrop-blur-[1.5px]' : 
      historyNumber === 1 ? 'backdrop-blur-[1px]' : 
      historyNumber === 2 ? 'backdrop-blur-[0.5px]' : 
      'backdrop-blur-[0px]'}`}
    onClick={skipHandler}>
    <div className='w-96  h-96 relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <ul className='bg-transparent w-96 h-96 rounded-2xl'
    onClick={(e) => e.stopPropagation()}>
    <li 
        className={`absolute cursor-pointer top-0 left-0 w-full h-full transition-all duration-300 flex flex-col items-center justify-center text-white px-12 rounded-2xl border border-white/80
            ${historyNumber === 0 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`} 
        onClick={skipHandler}
    >
        <div className="h-40 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 whitespace-nowrap">Welcome to Archive</h2>
            <p className="text-lg text-center text-white/90 leading-relaxed">
                3D 공간에서 만나는 특별한<br/>
                아카이브 컬렉션에 오신 것을 환영합니다
            </p>
        </div>
    </li>
    <li 
        className={`absolute cursor-pointer top-0 left-0 w-full h-full transition-all duration-300 flex flex-col items-center justify-center text-white px-12 rounded-2xl border border-white/60
            ${historyNumber === 1 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        onClick={skipHandler}
    >
        <div className="h-40 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 whitespace-nowrap">Explore Freely</h2>
            <p className="text-lg text-center text-white/90 leading-relaxed">
                마우스 드래그로 자유롭게 둘러보고<br/>
                스크롤로 확대/축소하며 탐험해보세요
            </p>
        </div>
    </li>
    <li 
        className={`absolute cursor-pointer top-0 left-0 w-full h-full transition-all duration-300 flex flex-col items-center justify-center text-white px-12 rounded-2xl border border-white/40
            ${historyNumber === 2 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        onClick={skipHandler}
    >
        <div className="h-40 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6 whitespace-nowrap">Interactive Journey</h2>
            <p className="text-lg text-center text-white/90 leading-relaxed">
                각 아카이브를 클릭하면<br/>
                상세 설명과 함께 안내해드립니다
            </p>
        </div>
    </li>
    <li 
        className={`absolute cursor-pointer top-0 left-0 w-full h-full transition-all duration-300 flex flex-col items-center justify-center text-white px-12 rounded-2xl
            ${historyNumber === 3 ? 'z-20 opacity-100' : 'z-10 opacity-0'}`}
        onClick={skipHandler}
    >
        <div className="h-40 flex flex-col items-center justify-center pt-20">
            <h2 className="text-3xl font-bold mb-6 whitespace-nowrap">Ready for Adventure</h2>
            <p className="text-lg text-center text-white/90 leading-relaxed">
                이제 여러분만의<br/>
                특별한 여행을 시작해보세요
            </p>
        </div>
        <span className="text-base text-white/70 pt-16">클릭하여 시작하기</span>
    </li>
</ul>
<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30"
     onClick={(e) => e.stopPropagation()}>
    {[0, 1, 2, 3].map((index) => (
        <button
            key={index}
            onClick={() => setHistoryNumber(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer 
                ${historyNumber === index 
                    ? 'bg-white shadow-lg shadow-white/50 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'}`}
        />
    ))}
</div>
                </div>
    </div>
  )
}
