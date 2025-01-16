import React, { useEffect } from 'react'
import {Routes, Route } from 'react-router-dom' 
import { Link } from 'react-router-dom';
import Main from '../../pages/main/page.jsx'
import Login from '../../api/auth/login/page.jsx'
import useSession from '../../api/auth/session.js'

export default function Header() {
    const {userName,session,isLogin} = useSession()
    const logout = useSession.getState().logout;  
 
  useEffect(()=>{
    console.log(userName)

  },[userName])
  
  useEffect(() => {
    console.log(session)
}, [session])
  return (
    <div className='w-full'>
    <div className=' flex border-b-2 border-r-emerald-200 justify-around'>
    <div className=' flex gap-6'>
    <Link to="/main"> main</Link>
    </div>
<div className='flex gap-6'>
    <p>{userName}</p>
    {!isLogin ?(
    <Link to="/login"> login</Link>
  ):
    <div onClick={logout}>로그아웃</div>
  }
    </div>
    </div>
    <Routes>
     <Route path="/main" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
   </Routes> 
   </div>
  )
}
