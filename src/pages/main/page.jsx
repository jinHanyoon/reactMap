import React from 'react'
import supabase from '../../api/supabase/supabaseApi.js'
import { useEffect, useState } from 'react'
import MainMap from '../../component/ui/user/mainMap/page.jsx'
import useSession from '../../api/auth/session.js'
import FirstModal from '../../component/ui/firstModal/page.jsx'
import { useModalStore } from '../../zustand/positoinStore.js'
export default function Main() {
  const historyNumber = useModalStore((state) => state.historyNumber)
  
  const [MapList, setMapList] = useState([])
  const {userUUID} = useSession()  // 

  // RLS 잠금 참고 할 것

//   useEffect(()=>{
//   const supabase_data =async() =>{
//   const { data, error } = await supabase.from('post').select('*')
//   setList(data)
//   if(error){
//   }
// }
// supabase_data()
// },[])


useEffect(() => {
  // 초기 데이터 로드
  const loadUsers = async () => {
    if (!userUUID) {
      setMapList([])
      return; 
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('username, id')
      .eq('id', userUUID,)
      .or(`id.eq.${userUUID},isLogin.eq.true`)
    
    if (error) {
      console.log('불러오기 오류',error)
      return
    }
    setMapList(data)
  }

  loadUsers()

},[userUUID])




return (
  <div className='w-screen relative h-screen overflow-y-hidden overflow-x-hidden overflow-hidden'>
    {historyNumber < 4 &&(
    <FirstModal/>
  )}

    <MainMap MapList={MapList} userUUID={userUUID} />
  
 
  </div>
)
}