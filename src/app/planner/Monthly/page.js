"use client"
import dynamic from 'next/dynamic'
import React from 'react'
const NoSSR=dynamic(()=>import("@/app/components/Monthly/Main"),{ssr:false})

const page = () => {
  return (
    <div><NoSSR/></div>
  )
}

export default page