// src/app/(auth)/layout.js
import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <div className='auth-container bg-white min-h-screen'>
        {children} {/* এখানে NavBar বা Footer নেই */}
    </div>
  )
}