import React, { useEffect, useState } from 'react'
import supabase from '../../../api/supabase/supabaseApi'

export default function Modal({itemId,setModal}) {
    const [DetailData, setDetailData] =useState()
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
        }
        fetchDate()
    },[itemId])    


    useEffect(()=>{
        console.log(itemId,'modalpage')
        console.log(DetailData)
        
    },[itemId])
  return (
<div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50'
onClick={() => setModal(false)} 
>
   
    <div className='relative bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white rounded-lg shadow-2xl p-6 md:p-10 max-w-3xl w-full h-[600px] flex flex-col justify-between overflow-hidden mx-4'
        onClick={(e) => e.stopPropagation()}
 >
        {DetailData ? ( 
            <>
                <h2 className='text-4xl md:text-5xl font-bold mb-4 text-center font-space-mono'>{DetailData.makeName}</h2>
                <p className='text-base md:text-lg mb-6 text-center flex-grow font-space-mono'>{DetailData.makeBody}</p>
            </>
        ) : (
            <p className='text-base md:text-lg text-center flex-grow font-space-mono'>데이터를 불러오는 중...</p> 
        )}
        <button 
            onClick={() => setModal(false)} 
            className='mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl'
        >
            닫기
        </button>
    </div>
</div>
  )
}
