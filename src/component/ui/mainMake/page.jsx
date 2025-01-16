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
  //   const [cameraPosition, setCameraPosition] = useState([0, 0, 30]);

  //   const handleCameraChange = () => {
  //     setCameraPosition([10, 10, 30]); // 원하는 새로운 위치
  //     console.log('click')
  // };
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
        }
  }, [ItemNumber,isModal]); 



 
  return (
    <div className='w-full h-screen bg-black relative overflow-hidden overflow-x-hidden'>
    <div className='w-full h-screen fixed'>
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
