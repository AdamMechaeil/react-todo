import React, { useContext, useEffect, useState } from 'react'
import { Form } from './Form'
import { Previous } from './Previous'
import { Today } from './Today'
import { Tomorrow } from './Tomorrow'
import { DailyContext } from '@/app/context/context'

const Main = () => {
  return (
    <div className='container'>
      <div className="my-2">
        <Form />
      </div>
      <div className="d-flex justify-content-around">
        <Previous />
        <Today />
        <Tomorrow />

      </div>
    </div>
  )
}
export default Main