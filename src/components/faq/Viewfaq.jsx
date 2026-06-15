import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function ViewFaq() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let [faq, setfaq] = useState([])

    let getData = (e) => {
        axios.get(
            `${apiUrl}/get-faq`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setfaq(finalRes.data)
            })
    }

    useEffect(() => {
        getData()
    }, [])


    let getId = (e) => {
        let Id = e.target.value

        let isConfirm = confirm('Are you sure to delete')

        if (isConfirm) {
            axios.delete(
                `${apiUrl}/delete-faq/${Id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getData()
                })
        }

    }
    
    return (
        <div className="min-h-screen bg-slate-100 sm:p-6 ">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white sm:rounded-3xl shadow-lg p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-900">
                            FAQ List
                        </h1>

                        <p className="text-slate-500 mt-3">
                            View and manage frequently asked questions
                        </p>

                    </div>

                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-medium transition">
                        <Link to={'/add-faq'}> + Add FAQ</Link>
                    </button>

                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:p-0 p-5">

                    {/* FAQ Card 1 */}

                    {
                        faq.length > 0 ?
                            faq.map((obj) => {
                                let { question, answer, status } = obj
                                return (
                                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                                        {/* Top */}
                                        <div className="bg-slate-900 p-6 text-white">

                                            <div className="flex items-center justify-between gap-4">

                                                <h2 className="text-2xl font-bold">
                                                    Faq Cards
                                                </h2>

                                                <span className="bg-white px-4 py-2 rounded-full text-sm">
                                                    {status ? <span className='text-[green] font-bold'> Active</span> : <span className='text-[red]'> Deactive</span>}
                                                </span>

                                            </div>

                                        </div>

                                        {/* Content */}
                                        <div className="p-6 space-y-5">

                                            <div>

                                                <p className="text-sm text-slate-500 mb-2">
                                                    Question
                                                </p>

                                                <h3 className="text-xl font-semibold text-slate-900">
                                                    {question}
                                                </h3>

                                            </div>

                                            <div>

                                                <p className="text-sm text-slate-500 mb-2">
                                                    Answer
                                                </p>

                                                <p className="text-slate-700 leading-7">
                                                    {answer}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Buttons */}
                                        <div className="border-t border-slate-200 p-6 flex flex-wrap gap-3">



                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                <Link to={`/edit-faq/${obj._id}`} state={obj}> Edit</Link>
                                            </button>

                                            <button onClick={getId} value={obj._id} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            })
                            :

                            <div className='text-2xl text-[red]'>No Data founds</div>
                    }


                </div>

            </div>

        </div>
    )
}