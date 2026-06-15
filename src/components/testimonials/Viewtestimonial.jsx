import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function ViewTestimonials() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let [testimonial, settestimonial] = useState([])


    let navigate = useNavigate()
    let getData = (e) => {
        axios.get(
            `${apiUrl}/get-testimonial`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                settestimonial(finalRes.data)

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
                `${apiUrl}/delete-testimonial/${Id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getData()
                })
        }

    }


    return (
        <div className="min-h-screen bg-slate-100 sm:p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white sm:rounded-3xl sm:mt-0 mt-4 shadow-lg p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-900">
                            Testimonials
                        </h1>

                        <p className="text-slate-500 mt-3">
                            View customer reviews and feedback
                        </p>

                    </div>

                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-medium transition">
                        <Link to={'/add-testimonial'}> + Add Testimonial </Link>
                    </button>

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">

                    {/* Card 1 */}


                    {
                        testimonial.length > 0 ?
                            testimonial.map((obj) => {
                                const { feedback, name, program, rating, testimonialImg } = obj

                                return (
                                    <div className="bg-white sm:rounded-3xl shadow-lg ">

                                        {/* Top */}
                                        <div className=" p-3 text-white flex flex-col items-center text-center justify-center gap-1">
                                            <div className="w-60 h-60 border-3 border-[cyan] rounded-full">
                                                <img
                                                    src={testimonialImg}
                                                    alt="testimonial"
                                                    className="w-full h-full object-cover object-top  rounded-full"
                                                />
                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-bold">
                                                    Deepak Kushwaha
                                                </h2>

                                                <p className="text-slate-300">
                                                    Muscle Gain Program
                                                </p>

                                                <p className="text-yellow-400 mt-1">
                                                    {rating === "1" && (
                                                        '⭐'
                                                    )}
                                                    {rating === "2" && (
                                                        '⭐⭐'
                                                    )}
                                                    {rating === "3" && (
                                                        '⭐⭐⭐'
                                                    )}
                                                    {rating === "4" && (
                                                        '⭐⭐⭐⭐'
                                                    )}
                                                    {rating === "5" && (
                                                        '⭐⭐⭐⭐⭐'
                                                    )}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Message */}
                                        <div className="p-6">

                                            <p className="text-slate-700 leading-8">
                                                {feedback}
                                            </p>

                                        </div>

                                        {/* Buttons */}
                                        <div className="border-t border-slate-200 p-6 flex flex-wrap gap-3">



                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                <Link to={`/edit-testimonial/${obj._id}`} state={obj}> Edit</Link>
                                            </button>

                                            <button onClick={getId} value={obj._id} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            })
                            :
                            <div className='text-red-700 text-2xl'>No Data Founds</div>
                    }



                </div>

            </div>

        </div>
    )
}
