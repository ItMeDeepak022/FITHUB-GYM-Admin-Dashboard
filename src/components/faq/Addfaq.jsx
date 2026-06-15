import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export default function AddFaq() {
    const apiUrl = import.meta.env.VITE_AdminUrl;

    let navigate = useNavigate()

    // Add data
    let submitform = (e) => {

        e.preventDefault()
        let obj = {
            question: e.target.question.value,
            answer: e.target.answer.value,
        }

        axios.post(
            `${apiUrl}/add-faq`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    e.target.reset()
                    console.log(finalRes);
                    alert(finalRes.message)
                    navigate('/view-faq')
                }
            })
    }


    // update data

    let { state } = useLocation()
    let { id } = useParams()

    // console.log(id, 'id value ahi');

    let [faqdata, setfaqdata] = useState(
        {
            question: '',
            answer: ''
        }
    )

    useEffect(() => {
        if (state) {
            setfaqdata(
                {
                    question: state.question,
                    answer: state.answer
                }
            )
        }
    }, [state])

    let updateform = (e) => {

        e.preventDefault()


        axios.put(
            `${apiUrl}/edit-faq/${id}`, faqdata)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    e.target.reset()
                    console.log(finalRes);
                    alert(finalRes.message)
                    navigate('/view-faq')
                }
            })
    }

    return (
        <div className="min-h-screen bg-slate-100 sm:p-6 sm:mt-0 mt-4">

            <div className="max-w-4xl mx-auto bg-white sm:rounded-3xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-white">

                    <h1 className="text-4xl font-bold">
                        {id ? 'Edit FAQ' : ' Add FAQ'}
                    </h1>

                    <p className="text-slate-300 mt-3">
                        Add frequently asked questions and answers
                    </p>

                </div>

                {/* Form */}
                <form className="p-8 space-y-6" onSubmit={id ? updateform : submitform}>

                    {/* Question */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            FAQ Question
                        </label>

                        <input
                            type="text"
                            name='question'
                            required
                            value={faqdata.question}
                            onChange={(e) => setfaqdata(
                                {
                                    ...faqdata, question: e.target.value
                                }
                            )}

                            placeholder="Enter question"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />

                    </div>

                    {/* Answer */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            FAQ Answer
                        </label>

                        <textarea
                            rows="6"
                            required
                            name='answer'
                            value={faqdata.answer}
                            onChange={(e) => setfaqdata(
                                {
                                    ...faqdata, answer: e.target.value
                                }
                            )}
                            placeholder="Write answer here..."
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        ></textarea>

                    </div>



                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">

                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-medium transition">
                            {id ? 'Update FAQ' : ' Save FAQ'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}