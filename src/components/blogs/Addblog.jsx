import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'

export default function Addblog() {
    // UPDATE PROGRAM
    const apiUrl = import.meta.env.VITE_AdminUrl;
   
    let navigate = useNavigate()
    let { id } = useParams()
    let { state } = useLocation()

    { id ? console.log(state) : null }


    let [oldImg, setoldImg] = useState('')

    let [blogform, setblogform] = useState(
        {
            authorName: '',
            blogContent: '',
            blogImg: null,
            blogTitle: '',
            category: ''
        })


    let updateData = (e) => {

        e.preventDefault()

        let formData = new FormData()
        formData.append("authorName", blogform.authorName)

        formData.append("blogContent", blogform.blogContent)

        formData.append("blogTitle", blogform.blogTitle)

        formData.append("category", blogform.category)

        formData.append("blogImg", blogform.blogImg)
        axios.put(
             `${apiUrl}/edit-blog/${id}`, formData)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {

                    alert(finalRes.message)
                    navigate('/view-blog')


                }
            })





    }

    // old data set
    useEffect(() => {

        if (state) {

            setblogform({
                authorName: state.authorName,
                blogContent: state.blogContent,
                blogImg: state.blogImg,
                blogTitle: state.blogTitle,
                category: state.category
            })
            const fileName = decodeURIComponent(state.blogImg.split("/").pop());
            setoldImg(fileName)
        }

    }, [state])


    // ADD PROGRAM
    let submitData = (e) => {

        e.preventDefault()

        let data = new FormData(e.target)

        axios.post(
            `${apiUrl}/add-blog`, data)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    alert(finalRes.message)
                    navigate('/view-blog')
                }
            })

    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">

                {/* Heading */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-900">
                        {id ? 'Edit Blog' : "Add Blog"}
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Create a new blog post for gym members
                    </p>

                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={id ? updateData : submitData}>

                    {/* Blog Title */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Blog Title
                        </label>

                        <input
                            type="text"
                            value={blogform.blogTitle}
                            onChange={(e) => setblogform({
                                ...blogform, blogTitle: e.target.value
                            })}
                            name="blogTitle"
                            placeholder="Enter blog title"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />

                    </div>

                    {/* Category */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={blogform.category}
                            onChange={(e) => setblogform({
                                ...blogform, category: e.target.value
                            })}
                            className='w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none '
                        >
                            <option value={''}>Not Selected</option>
                            <option value="fitness">Fitness & Wellness</option>
                            <option value="massgain">Muscle Gain Nutrition</option>
                            <option value="fatloss">Weight Loss & Fat Burn</option>
                        </select>

                    </div>

                    {/* Image */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Blog Image
                        </label>

                        <input
                            type="file"
                            name="blogImg"
                            required={!id}
                            onChange={(e) => setblogform({
                                ...blogform, blogImg: e.target.files[0]
                            })}
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 bg-white"
                        />

                        {id ? <p className='text-[green] font-bold mt-3'>Old Img:{oldImg}</p> : ''}

                    </div>

                    {/* Blog Content */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Blog Content
                        </label>

                        <textarea
                            rows="3"
                            value={blogform.blogContent}
                            onChange={(e) => setblogform({
                                ...blogform, blogContent: e.target.value
                            })}
                            name="blogContent"
                            placeholder="Enter blog description"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        ></textarea>

                    </div>

                    {/* Author */}
                    <div>

                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Author Name
                        </label>

                        <input
                            type="text"
                            value={blogform.authorName}
                            onChange={(e) => setblogform({
                                ...blogform, authorName: e.target.value
                            })}
                            name="authorName"
                            placeholder="Enter author name"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />

                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">

                        <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-medium transition">
                            {id ? 'Edit Blog' : 'Add Blog'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}