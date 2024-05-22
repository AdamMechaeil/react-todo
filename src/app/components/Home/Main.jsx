import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { MonthlyContext } from '@/app/context/monthlyContext';
const Main = () => {
    const router = useRouter();
    const { Planning } = useContext(MonthlyContext);
    let date = new Date();
    return (
        <div className='container p-3'>
            <div className='p-2 d-flex justify-content-center align-items-center' style={{ height: "100%" }}>
                <button className='btn btn-primary me-5' onClick={() => {
                    router.push('planner/Daily')
                }}>Daily ToDO</button>
                <button className='btn btn-primary' onClick={() => {
                    router.push("planner/Monthly")
                }}>Monthly Planner</button>
            </div>
                <div className='p-4 my-2 bg-light' style={{ height: "300px",width:"300px",overflowY:"scroll" }}>
                <h4>Upcoming Events</h4>
                    <ul>
                        {
                            Planning[date.getMonth() + 1]?.map((plan, i) => {
                                return (
                                    <li className='p-3'>{plan.title} &nbsp; &nbsp; {plan.date}/{plan.month}/{plan.year}
                                        &nbsp; &nbsp;
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
        </div>
    )
}

export default Main;