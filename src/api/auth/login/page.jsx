import React from 'react'
import { useState, useEffect } from 'react'
import { emailLogin } from './loginAction'
import useSession from '../session.js'
import { useNavigate } from 'react-router-dom' 
export default function Login() {
    const navigate = useNavigate();  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const logout = useSession.getState().logout;
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await emailLogin(email,password);
            alert("로그인에 성공하셨습니다.")
            navigate('/');
        }catch(error){
            alert("로그인에 실패하였습니다..")

        }

    }
    
    return (
    <div>       
        <form onSubmit={handleSubmit}>
            <input id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="admin@123.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
            <input id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
            <button type='submit'>로그인</button>
            
        </form>
        <div onClick={logout}>로그아웃</div>

    </div>
  )
}
