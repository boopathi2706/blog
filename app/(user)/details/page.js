"use client"
import BlogDetails from '@/Component/BlogDetails'
import React, { Suspense } from 'react'

const Detail = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogDetails />
      </Suspense>
    </div>
  )
}

export default Detail;