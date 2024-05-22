import { DailyContext } from '@/app/context/context';
import React, { useContext, useRef, useState } from 'react'

export const Form = () => {
    const { dispatch } = useContext(DailyContext)
    const [formData, setFormData] = useState({ title: "", day: "", month: "", year: "", completed:false });
    const ref = useRef("");
    function handleSubmit(time) {
        let data = formData;
        let date = new Date();
        if (time === "today") {
            dispatch({
                type: "ADD_TASK_TODAY",
                payload: {
                    ...data,
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    completed:false
                }
            })
        } else {

            date.setDate(date.getDate() + 1);

            dispatch({
                type:"ADD_TASK_TOMORROW",
                payload:{
                    ...data,
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    completed:false
                }
            })
        }
        ref.current.value = ""
    }

    return (
        <div className='my-3 p-3'>
            <label htmlFor="title">Title: </label> &nbsp;
            <input type="text" ref={ref} name='title' onChange={(e) => {
                setFormData(prev => { return { ...prev, title: e.target.value } })
            }} />
            <br />
            <br />
            <button className='btn btn-success my-2' onClick={() => {
                handleSubmit("today");
            }}>+Add</button>
            <button className='btn btn-success my-2 mx-3' onClick={() => {
                handleSubmit("tomorrow");
            }}>Kal Ke liye</button>
        </div>
    )
}
