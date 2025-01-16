import React, { useEffect, useState,useRef } from 'react'
import supabase from '../../../api/supabase/supabaseApi'
import InsertButton from '../button/insertbtn'
import Modal from '../modal/page'
import { Canvas } from '@react-three/fiber'

import  Scene  from './Scene.jsx'

export default function MainMake() {
  

    // 실시간 리스트 갱신 예정
    const [objectList, setobjectList] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)
    const [ItemNumber, setItemNumber]= useState()
    const [isModal, setModal]= useState(false)


    useEffect(()=>{
        const loadList = async() =>{
            const {data, error} = await supabase.from('mainMake').select('objectstyle,id,makeName')
            const parsedData = data.map(item => ({
                ...item,
                objectstyle: JSON.parse(item.objectstyle)
            }))
            setobjectList(parsedData)
            setIsLoading(false)     
            if(error){
              <p>불러오기오류</p>
            }
        
          }
        loadList()
        console.log(objectList)
    },[])



    useEffect(() => {
      if (ItemNumber) {
          console.log("선택된 아이템 ID:", ItemNumber); // itemId가 변경될 때마다 실행
          console.log(isModal)
        }
  }, [ItemNumber,isModal]); // itemId가 변경될 때마다 실행

    // 우주선이 오브젝트에 도착했을경우 
    // 우주선 좌표값 + 오브젝트 좌표값 필요
    // 오브젝트 좌표값 확보/우주선 좌표값 퐉보/
    // 하나로 뭉쳐야 함 
    // 우주선이 오브젝트에 도착하게 되면 해당 오브젝트에 관련 글 


 
  return (
    <div className='w-full h-screen bg-black relative overflow-hidden overflow-x-hidden'>
    <div className='w-full h-screen'>
        <Canvas camera={{ position: [0, 0, 30] }} className="z-0">
            <Scene objectList={objectList} setItemNumber={setItemNumber} setModal={setModal} />
        </Canvas>
        <div className='absolute bottom-16 right-5'>
            <InsertButton />
        </div>
    </div>
    {isModal && (
        <Modal itemId={ItemNumber} setModal={setModal} />
    )}
</div>
)
}
