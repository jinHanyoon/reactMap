import React from 'react'
import Main from './pages/main/page'

export default function Layout({children}) {
  return (
    <div className='w-screen h-screen relative overflow-hidden overflow-x-hidden'>
    <Main>{children}</Main>
    </div>
  )
}
