import { MonthlyContext } from '@/app/context/monthlyContext'
import React, { useContext } from 'react'

export const Cards = () => {
  const { Planning, months,dispatch } = useContext(MonthlyContext);
  function deleteHandler(monthInd,taskInd){
    try {
      dispatch({
        type:"DELETE_PLAN",
        payload:{
          monthInd,taskInd
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='row'>
      {
        months.map((month, i) => {
          if (Planning[i + 1] !== undefined)
            return (
              <div className='col-lg-3 col-sm-12'>
                <div className="card p-3 shadow my-3">
                  <h2>{month}</h2>
                  <ol>
                    {
                      Planning[i + 1]?.map((plan,ind) => {
                        return (
                          <li className='p-3'>{plan.title} &nbsp; &nbsp; {plan.date}/{i + 1}/{plan.year}
                            &nbsp; &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16"
                              onClick={()=>{
                                deleteHandler(i+1,ind)
                              }}
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </li>
                        )

                      })
                    }
                  </ol>
                </div>
              </div>
            )
        })
      }
    </div>
  )
}
