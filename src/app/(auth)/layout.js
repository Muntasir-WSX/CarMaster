
import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function AuthLayout({ children }) {
  return (
    <div className='auth-container bg-white min-h-screen'>
        {children}
        <Toaster position="top-center" /> 
    </div>
  )
}