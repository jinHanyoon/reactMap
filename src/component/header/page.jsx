import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useSession from '../../api/auth/session.js'

export default function Header() {
    const {userName,session,isLogin} = useSession()
    const logout = useSession.getState().logout;  
 
    useEffect(() => {
      // 세션 체크가 완료된 후 상태가 업데이트되도록 확인
      console.log('User Name:', userName);
      console.log('Is Logged In:', isLogin);
  }, [userName, isLogin,session]);
  return (
    <div className='w-full bg-transparent fixed z-50 text-white'>
    <div className=' flex justify-around'>
    <div className=' flex gap-6'>
    <Link to="/"> main</Link>
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
  
   </div>
  )
}
