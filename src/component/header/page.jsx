import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import useSession from '../../api/auth/session.js'
import { useModalStore } from '../../zustand/positoinStore.js';

export default function Header() {
    const {userName,session,isLogin} = useSession()
    const logout = useSession.getState().logout;  
    const setHistoryNumber = useModalStore((state) => state.setHistoryNumber)
    const handleQuestionClick = () => {
        setHistoryNumber(0)  // 모달을 처음 상태로 설정
    }

    useEffect(() => {
      // 세션 체크가 완료된 후 상태가 업데이트되도록 확인

  }, [userName, isLogin,session]);
  return (
    <div className='w-full fixed z-50'>
    <div className='px-6 py-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
            <div className='flex items-center gap-6'>
                <Link to="/" className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">
                    Dev JinHan
                </Link>
            </div>
            <div className='flex items-center gap-6'>
                <button 
                    onClick={handleQuestionClick}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 border border-blue-400/30 hover:border-purple-500/50 transition-all duration-300"
                >
                    <span className="text-lg">?</span>
                </button>
                {userName && (
                    <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity">{userName}</p>
                )}
                {!isLogin ? (
                    <Link to="/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
                        로그인
                    </Link>
                ) : (
                    <button onClick={logout} className="px-6 py-2 rounded-lg text-slate-300 hover:text-white transition-colors">
                        로그아웃
                    </button>
                )}
            </div>
        </div>
    </div>
</div>
  )
}
