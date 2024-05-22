import { MonthlyContext } from '@/app/context/monthlyContext'
import React, { useState, useRef, useContext } from 'react'

export const Form = () => {
    const ref = useRef("")
    const { dispatch } = useContext(MonthlyContext)
    const [formData, setFormData] = useState({ title: "", date: "", month: "", year: "" })

    function handleSubmit() {
        try {

            dispatch({
                type: "ADD_PLAN",
                payload: formData
            })
            ref.current.reset()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='my-3 p-3'>
                <form ref={ref}>
                    <label htmlFor="title">Title: </label> &nbsp;
                    <input type="text" name='title' onChange={(e) => {
                        setFormData(prev => { return { ...prev, title: e.target.value } })
                    }} />
                    <br />
                    <br />
                    <label htmlFor="setDate">Set Date: </label> &nbsp;
                    <input type="date" min={new Date().toJSON().slice(0, 10)} name="setDate" id="" onChange={(e) => {
                        const aux = e.target.value.split("-");
                        setFormData(prev => { return { ...prev, year: aux[0], month: aux[1], date: aux[2] } })
                    }} />
                </form>
                <br />
                <br />
                <button className='btn btn-success my-2' onClick={() => {
                    handleSubmit();
                }}>+Add</button>
            </div>
        </div>
    )
}
