import React, { useState, useEffect, useRef } from 'react'
import supabase from '../../../api/supabase/supabaseApi'
import useSession from '../../../api/auth/session.js'
import { usePositionStore } from '../../../zustand/positoinStore'


export default function Insert({insertClose}) {
    const [mapName, setMapName] = useState()
    const [mapBody, setMapBody] =useState()
    const {userUUID} = useSession()  // 
    
   // zustand 위차값 전역변수 사용
   const position = usePositionStore(state => state.position)
   const objectPosition = {
    x:position.x,
    y:position.y
}
   useEffect(()=>{
    console.log(position.x, position.y, "insert position")
},[position])

    const addMap = async (e) => {
        e.preventDefault();

      const { error } = await supabase.from('mainMake').insert({
        userUUId:userUUID,
        makeName:mapName,
        makeBody:mapBody,
        objectstyle:objectPosition,

      })
      if(error){
        console.log(error)
      }else{
        alert('생성이 완료 되었습니다.')
        setMapBody('')
        setMapName('')
        insertClose(false)
      }


    }

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm p-4 z-50">
    <div className="w-full max-w-3xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700/50 transform transition-all hover:scale-[1.01]">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        새로운 맵 생성
      </h2>
      
      <form onSubmit={addMap} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 text-sm">맵 이름</label>
            <input 
              onChange={(e)=>{setMapName(e.target.value)}}
              className="w-full px-6 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white placeholder-slate-400 text-lg"
              placeholder="맵의 이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2 text-sm">맵 설명</label>
            <textarea 
              onChange={(e)=>{setMapBody(e.target.value)}}
              className="w-full px-6 py-3 bg-slate-700/50 rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-white placeholder-slate-400 text-lg min-h-[120px] resize-y"
              placeholder="맵에 대한 설명을 입력하세요"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={() => insertClose(false)}
            className="px-6 py-3 rounded-lg text-slate-300 hover:text-white transition-colors text-lg"
          >
            취소
          </button>
          <button 
            type="submit" 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity text-lg"
          >
            생성하기
          </button>
        </div>
      </form>
    </div>
  </div>
)
}