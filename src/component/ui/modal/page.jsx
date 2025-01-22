import React, { useEffect, useState } from 'react'
import supabase from '../../../api/supabase/supabaseApi'
import Mypage from './mypage'

export default function Modal({itemId,setModal}) {
    const [DetailData, setDetailData] =useState()
    const [startAnimation, setStartAnimation] = useState(false)
    useEffect(()=>{
        const fetchDate = async() =>{
            if(!itemId)return
        const {data,error} = await supabase.from('mainMake')
        .select('*')
        .eq('id',itemId)
        .single()
            if(error){
                console.log('불러오기오류')
                return
            }
            setDetailData(data)
            setTimeout(() => setStartAnimation(true), 100)
        }
        fetchDate()
    },[itemId])    


    useEffect(()=>{
        
    },[itemId])
  return (
    
    <>
    {itemId === 94 ? (
  <Mypage startAnimation={startAnimation} setModal={setModal} DetailData={DetailData} />
    ) : (
        <div className='fixed h-full inset-0 flex items-center justify-center backdrop-blur-sm z-50'
        onClick={() => setModal(false)}>
            <div className='relative text-white rounded-lg shadow-2xl p-6 md:p-10 max-w-3xl w-full h-full flex flex-col justify-between overflow-hidden mx-4'
                onClick={(e) => e.stopPropagation()}>
                {DetailData ? ( 
                    <div className='h-full text-center pt-24 md:pt-12'>
                        <h2 className={`text-4xl md:text-5xl font-bold mb-16 md:mb-32 font-space-mono transform transition-all duration-1000 ease delay-100 ${
                            startAnimation ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'
                        }`}>
                            {DetailData.makeName}
                        </h2>
                        <p className={`text-base md:text-lg leading-loose md:leading-loose font-space-mono whitespace-pre-wrap mb-20 transform transition-all duration-1000 ease delay-200
                            ${startAnimation ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
                            {DetailData.makeBody}
                        </p>
                        <a 
                            href={DetailData.mapLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`md:text-lg mb-6 flex-grow font-space-mono text-blue-400 hover:text-blue-300 underline inline-block transform transition-all duration-1000 ease delay-300
                                ${startAnimation ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}
                        >
                            {DetailData.mapLink}
                        </a>
                    </div>
                ) : (
                    <p className={`text-base md:text-lg flex-grow font-space-mono text-center transition-all duration-1000
                        ${startAnimation ? 'opacity-0' : 'opacity-100'}`}>
                        데이터를 불러오는 중...
                    </p> 
                )}
                <button 
                    onClick={() => setModal(false)} 
                    className='mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl'
                >
                    닫기
                </button>
            </div>
        </div>
    )}
        </>
  )
}
