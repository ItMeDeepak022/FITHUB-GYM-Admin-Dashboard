import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router';
export default function Viewprogram() {
  

    let [programs, setprogram] = useState([])

    let getProgram = () => {
        axios.get('http://localhost:1000/admin-dashboard/get-program')
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setprogram(finalRes.data)
                 
            })
    }

    useEffect(() => {
        getProgram()
    }, [])



    let getId = (e) => {
        let delId = (e.target.value)

        let Isdelete = confirm("Are you sure to delete...")

        if (Isdelete) {
            axios.delete(`http://localhost:1000/admin-dashboard/delete-program/${delId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    getProgram()
                })
        }


    }
    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className='w-full'>
                        <div className='flex sm:justify-between sm:flex-row flex-col gap-3'>
                            <h1 className="text-3xl font-semibold text-slate-900">Program Overview</h1>
                            <Link to={'/add-program'} className='sm:w-[10%] bg-black py-2 rounded-3xl '>
                                <IoMdAdd className='text-3xl text-white font-bold w-full text-center' />
                            </Link>


                        </div>
                        <p className="mt-2 text-sm text-slate-500">View and manage training plans for gym members.</p>
                    </div>

                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {
                        programs.length > 0 ?
                            programs.map((program) => (
                                <div key={program.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-900">{program.programName}</h2>
                                            <p className="mt-2 text-sm leading-6 text-slate-500">{program.description
                                            }</p>
                                        </div>

                                    </div>

                                    <div className="mt-5 grid gap-2 sm:grid-cols-2">

                                        <div className="rounded-2xl bg-slate-50 ">
                                            <img src={program.programImg} className='h-70 object-cover' alt="" />
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 flex justify-center flex-col items-center ">
                                            <p className="text-xs uppercase tracking-wide text-slate-500">Duration</p>
                                            <p className="mt-1 text-lg font-medium text-slate-900">{program.duration}</p>
                                        </div>

                                    </div>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <span className="text-sm text-slate-600"> ₹ {program.price}  price available</span>
                                        <div className="flex flex-wrap gap-2">
                                            <button className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50">
                                                 <Link to={`/edit-program/${program._id}`} state={program}> Edit</Link>
                                            </button>
                                            <button onClick={getId} value={program._id} className="inline-flex items-center rounded-2xl border border-slate-200  bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50">
                                                Delete
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='text-2xl font-bold'>No Data is Available..</div>
                    }
                </div>
            </div>
        </div>
    )
}

