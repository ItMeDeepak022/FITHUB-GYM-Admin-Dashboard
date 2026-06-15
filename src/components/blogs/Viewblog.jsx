import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

export default function Viewblog() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let [blog, setblog] = useState([])


    let getblog = () => {
        axios.get(`${apiUrl}/get-blog`)
            .then((res) => res.data)
            .then((finalRes) => {

                setblog(finalRes.data)

            })
    }

    useEffect(() => {
        getblog()
    }, [])


    let getId = (e) => {
        let delId = (e.target.value)
        let Isdelete = confirm("Are you sure to delete...")

        if (Isdelete) {
            
            axios.delete(`${apiUrl}/delete-blog/${delId}`)
                .then((res) => res.data)
                .then((finalRes) => {

                    getblog()
                })
        }


    }


    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">
                            Blogs List
                        </h1>

                        <p className="text-slate-500 mt-2">
                            View and manage all blog posts
                        </p>
                    </div>

                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-medium transition">
                        <Link to={'/add-blog'}> + Add Blog</Link>
                    </button>

                </div>

                {/* Blogs Cards */}
                <div className="grid gap-6">

                    {
                        blog.length > 0 ?

                            blog.map((item, index) => {

                                let {
                                    _id,
                                    blogTitle,
                                    category,
                                    blogImg,
                                    blogContent,
                                    authorName,
                                    createdAt,
                                    updatedAt
                                } = item



                                return (
                                    // Cards
                                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200">

                                        <div className="grid lg:grid-cols-[40%_auto]">

                                            {/* Image */}
                                            <div className='w-full h-full'>
                                                <img
                                                    src={blogImg}
                                                    alt="Blog"
                                                    className="w-full sm:h-[450px] h-[250px] "
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="sm:p-10 p-5 flex flex-col justify-between">

                                                <div>

                                                    <div className="flex items-center justify-between gap-4 flex-wrap">

                                                        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                                                            Nutrition
                                                        </span>

                                                        <p className="text-sm text-slate-500">
                                                            April 2026
                                                        </p>

                                                    </div>

                                                    <h2 className="text-2xl font-bold text-slate-900 mt-5">
                                                        Best Nutrition Plans for Muscle Growth
                                                    </h2>

                                                    <p className="text-slate-600 leading-7 mt-4">
                                                        Discover balanced meal plans, protein intake, and recovery nutrition strategies for muscle building and strength gain.
                                                    </p>

                                                    <p className='font-bold text-2xl text-blue-600 mt-5'>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </p>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex flex-col justify-start gap-4 sm:mt-0 mt-5">

                                                    <div className="flex items-center gap-3">


                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">
                                                                {authorName}
                                                            </h3>

                                                            <p className="text-sm text-slate-500">
                                                                Nutrition Expert
                                                            </p>
                                                        </div>

                                                    </div>

                                                    {/* Buttons */}
                                                    <div className="flex flex-wrap gap-3">

                                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                                                            View
                                                        </button>

                                                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                                                            <Link to={`/edit-blog/${_id}`} state={item}> Edit</Link>
                                                        </button>

                                                        <button onClick={getId} value={_id} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition">
                                                            Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                )
                            })

                            :

                            <h1>No Blog Found</h1>
                    }



                </div>

            </div>

        </div>
    )
}

