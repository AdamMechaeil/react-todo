import { DailyContext } from '@/app/context/context';
import React, { useContext, useEffect } from 'react'
export const Tomorrow = ({ toDOs, deleteHandler,moveToToday }) => {
  const {toDoArr,dispatch}= useContext(DailyContext)
  return (
    <div className='card shadow p-3 my-3'>
      <h1>Tomorrow</h1>
      <ol>
        {
          toDoArr.tomorrow.map((ele,i) => {
            const date = new Date();
            if (ele.year > date.getFullYear()) {
              return (
                <li>
                  <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                </li>
              )
            } else {
              if (ele.month > date.getMonth()) {
                return (
                  <li>
                    <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                  </li>
                )
              } else {
                if (ele.day > date.getDate()) {
                  return (
                    <li>
                    <div>
                      <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                      <button className='btn btn-danger' onClick={()=>{
                         dispatch({
                          type:"DELETE",
                          payload:{
                            index:i,
                            comingFrom:"tomorrow"
                          }
                        })
                      }}>Delete</button>
                          <button className='btn btn-info ms-2' onClick={()=>{
                        // moveToToday(i,"tomorrow")
                        dispatch({
                          type:"MOVE_TO_TODAY",
                          payload:{
                            index:i,
                            comingFrom:"tomorrow"
                          }
                        })
                      }}>Move to Today</button>
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
  )
}
