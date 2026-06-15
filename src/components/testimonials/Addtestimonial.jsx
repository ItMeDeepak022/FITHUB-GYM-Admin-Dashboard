import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export default function AddTestimonials() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let { id } = useParams()
    let navigate = useNavigate()
    let summitData = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        axios.post(
            `${apiUrl}/add-testimonial`, formData)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    e.target.reset()
                    console.log(finalRes);
                    alert(finalRes.message)
                    setTimeout(() => {
                        navigate('/view-testimonial')
                    }, 800);
                }
            })
    }

    // ..................................................

    let { state } = useLocation()

    let [oldImg, setoldImg] = useState(null)
    let [testdata, settestdata] = useState(
        {
            name: "",
            program: "",
            rating: "",
            feedback: "",
            status: "",
            testimonialImg: null,
        }
    )


    useEffect(() => {
        if (state) {
            settestdata(
                {
                    name: state.name,
                    program: state.program,
                    rating: state.rating,
                    feedback: state.feedback,
                    status: state.status,
                    testimonialImg: state.testimonialImg,
                }
            )
            const fileName = decodeURIComponent(state.testimonialImg.split("/").pop());
            setoldImg(fileName)
        }
    }, [state])

    let updateData = (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append("name", testdata.name);
        formData.append("program", testdata.program);
        formData.append("rating", testdata.rating);
        formData.append("feedback", testdata.feedback);
        formData.append("status", testdata.status);
        formData.append("testimonialImg", testdata.testimonialImg);

        axios.put(
            `${apiUrl}/edit-testimonial/${id}`, formData)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    e.target.reset()
                    console.log(finalRes);
                    alert(finalRes.message)
                    setTimeout(() => {
                        navigate('/view-testimonial')
                    }, 500);
                }
            })
    }



    return (
        <div className="min-h-screen bg-slate-100 sm:p-6">

            <div className="max-w-4xl mx-auto bg-white sm:rounded-3xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-white sm:mt-0 mt-4">

                    <h1 className="text-4xl font-bold">
                        {id ? 'Edit Testimonial' : 'Add Testimonial'}
                    </h1>

                    <p className="text-slate-300 mt-3">
                        Add customer reviews and feedback
                    </p>

                </div>

                {/* Form */}
                <form className="p-8 space-y-6" onSubmit={id ? updateData : summitData}>

                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Customer Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={testdata.name}
                            onChange={(e) => settestdata(
                                {
                                    ...testdata, name: e.target.value
                                }
                            )}
                            placeholder="Enter customer name"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {/* Program */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Program Name
                        </label>

                        <select
                            name="program"
                            value={testdata.program}
                            onChange={(e) => settestdata(
                                {
                                    ...testdata, program: e.target.value
                                }
                            )}
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">Select Program</option>
                            <option value="Ideal Body Weight">Ideal Body Weight</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                        </select>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Rating
                        </label>

                        <select
                            name="rating"
                            value={testdata.rating}
                            onChange={(e) => settestdata(
                                {
                                    ...testdata, rating: e.target.value
                                }
                            )}
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            <option value="">Select Rating</option>
                            <option value="1">⭐ 1 Star</option>
                            <option value="2">⭐ 2 Stars</option>
                            <option value="3">⭐ 3 Stars</option>
                            <option value="4">⭐ 4 Stars</option>
                            <option value="5">⭐ 5 Stars</option>
                        </select>
                    </div>

                    {/* Customer Image */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Upload Customer Image
                        </label>

                        <input
                            type="file"

                            onChange={(e) => settestdata(
                                {
                                    ...testdata, testimonialImg: e.target.files[0]
                                }
                            )}
                            required={!id}
                            name="testimonialImg"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 bg-white"
                        />

                        {id ? <p className='text-red-700 mt-2'>Old Img:{oldImg}</p> : ''}
                    </div>

                    {/* Feedback */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Testimonial Message
                        </label>

                        <textarea
                            rows="3"
                            value={testdata.feedback}
                            onChange={(e) => settestdata(
                                {
                                    ...testdata, feedback: e.target.value
                                }
                            )}
                            name="feedback"
                            placeholder="Write customer feedback..."
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-medium transition"
                        >
                            {id ? 'Update' : ' Save'}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}