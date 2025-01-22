import React from 'react'
import UserComponent from '../mainKey/page'
import MainMake from '../../mainMake/page'
import Insertbtn from '../../button/insertbtn.jsx'

const MainMap = React.memo(function MainMap({ MapList, userUUID }) {
 
 
    return (
    <div className=' w-full h-screen overflow-hidden relative'> 
      {userUUID &&(
     
     <div className='absolute z-30 bottom-10 right-10'>
            <Insertbtn />
            </div>
          )}

      <MainMake/>

          {MapList.map((item) => (
        <UserComponent 
          key={item.id}
          userName={item.username}
          userID={item.id}
          userUUID={userUUID}
        />
      ))}</div>
  )
})
export default MainMap;