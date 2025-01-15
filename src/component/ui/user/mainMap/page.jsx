import React from 'react'
import UserComponent from '../mainKey/page'
import MainMake from '../../mainMake/page'

export default function MainMap({MapList, userUUID}) {
 
 
    return (
    <div className=' w-full h-screen overflow-hidden'> 
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
}
