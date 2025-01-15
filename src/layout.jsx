import React from 'react'



export default function Layout({children}) {
  return (
    <div className='w-screen h-screen relative overflow-hidden overflow-x-hidden'>
    <main>{children}</main>
    </div>
  )
}
