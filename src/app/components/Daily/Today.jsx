import { DailyContext } from '@/app/context/context';
import React, { useContext, useEffect } from 'react'

export const Today = () => {
  const {toDoArr,dispatch}=useContext(DailyContext);
  console.log(toDoArr);
  return (
    <>
      <div className='card shadow p-3 my-3'>
      <h1>Today</h1>
      <br />
      <ol>
        {
          toDoArr.today.map((ele,i) => {
            const date = new Date();
            if (ele.year === date.getFullYear()) {
              if (ele.month === date.getMonth()) {
                if (ele.day === date.getDate()) {
                  return (
                    <li>
                      <div>
                        <input type='checkbox' checked={ele.completed===true?true:false} onChange={()=>{
                          dispatch({
                            type:"TASK_COMPLETED",
                            payload:{
                              index:i
                            }
                          })
                        }} />
                        <p style={{textDecoration:ele.completed==true?"line-through":"normal"}}>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                        <button className='btn btn-danger' onClick={()=>{
                          dispatch({
                            type:"DELETE",
                            payload:{
                              index:i,
                              comingFrom:"today"
                            }
                          })
                        }}>Delete</button>
                      </div>
                    </li>
                  )
                }
              }
            }
          })
        }
      </ol>
    </div>
    </>
  )
}
