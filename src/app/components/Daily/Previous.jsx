import { DailyContext } from '@/app/context/context';
import React, { useContext } from 'react'

export const Previous = () => {
  const {toDoArr,dispatch}=useContext(DailyContext);
  return (
    <div className='shadow p-3 my-3'>
      <h1>Previous</h1>
      <ol>
        {
          toDoArr.previous.map((ele,i) => {
            const date = new Date();
            if (ele.year < date.getFullYear()) {
              return (
                <li>
                  <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                </li>
              )
            } else {
              if (ele.month < date.getMonth()) {
                return (
                  <li>
                    <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                  </li>
                )
              } else {
                if (ele.day < date.getDate()) {
                  return (
                    <li className='my-1'>
                    <div>
                      <input type='checkbox' />
                      <p>{ele.title} {ele.day}/{ele.month + 1}/{ele.year}</p>
                      <button className='btn btn-danger' onClick={()=>{
                        dispatch({
                          type:"DELETE",
                          payload:{
                            index:i,
                            comingFrom:"previous"
                          }
                        })
                      }}>Delete</button>
                      <button className='btn btn-info ms-2' onClick={()=>{
                        dispatch({
                          type:"MOVE_TO_TODAY",
                          payload:{
                            index:i,
                            comingFrom:"previous"
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
