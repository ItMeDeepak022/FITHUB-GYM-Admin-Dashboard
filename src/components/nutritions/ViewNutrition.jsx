import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router'

export default function ViewNutrition() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let [nutrition, setnutrition] = useState([])


    let getnutrition = () => {
        axios.get(`${apiUrl}/get-nutrition`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes);
                setnutrition(finalRes.data)

            })
    }

    useEffect(() => {
        getnutrition()
    }, [])


    let getId = (e) => {
        let delId = (e.target.value)

        let Isdelete = confirm("Are you sure to delete...")

        if (Isdelete) {
            axios.delete(`${apiUrl}/delete-nutrition/${delId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    // console.log(finalRes);
                    getnutrition()
                })
        }


    }
    return (
        <div className="w-full  min-h-screen bg-white">
            {/* Header */}
            <div className="mb-8 sm:mt-5 ml-5 sm:p-0 p-3">
                <div className='w-full flex sm:flex-row flex-col sm:justify-between gap-2'>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Nutrition Details
                    </h1>
                    <Link to={'/add-nutrition'} className='sm:w-[10%] bg-black py-2 rounded-3xl '>
                        <IoMdAdd className='text-3xl text-white font-bold w-full text-center' />
                    </Link>
                </div>

                <p className="text-gray-600 mt-3">
                    View and manage nutrition information
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:p-5 p-2">


                {
                    nutrition.length > 0 ?
                        nutrition.map((obj) => {
                            let {
                                nutritionName,
                                category,
                                calories,
                                protein,
                                carbs,
                                fat,
                                details,
                                nutritionImg,
                            } = obj;
                            
                            return (
                                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 ">


                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                                        {/* Left Side Image */}
                                        <div className="w-full  h-full">
                                            <img
                                                src={nutritionImg}
                                                alt="Nutrition"
                                                className="w-full h-full object-cover`"
                                            />
                                        </div>

                                        {/* Right Side Nutrition */}
                                        <div >

                                            {/* Extra Details */}
                                            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                                                {/* Heading */}
                                                <div className="flex items-center justify-between mb-6">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-slate-900">
                                                            Nutrition Information
                                                        </h2>

                                                        <p className="text-sm text-slate-500 mt-1">
                                                            Complete nutrition overview and health details
                                                        </p>
                                                    </div>

                                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                                                        Active
                                                    </span>
                                                </div>

                                                {/* Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                                                    {/* Nutrition Name */}
                                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-slate-500 mb-2">
                                                            Nutrition Name
                                                        </p>

                                                        <h3 className="text-lg font-semibold text-slate-900">
                                                            {nutritionName}
                                                        </h3>
                                                    </div>

                                                    {/* Category */}
                                                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-slate-500 mb-2">
                                                            Category
                                                        </p>

                                                        <h3 className="text-lg font-semibold text-slate-900">
                                                            {category}
                                                        </h3>
                                                    </div>

                                                    {/* Calories */}
                                                    <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-orange-500 mb-2">
                                                            Calories
                                                        </p>

                                                        <h3 className="text-lg font-bold text-orange-600">
                                                            {calories} kcal
                                                        </h3>
                                                    </div>

                                                    {/* Protein */}
                                                    <div className="rounded-2xl bg-sky-50 border border-sky-100 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-sky-500 mb-2">
                                                            Protein
                                                        </p>

                                                        <h3 className="text-lg font-bold text-sky-600">
                                                            {protein} g
                                                        </h3>
                                                    </div>

                                                    {/* Carbs */}
                                                    <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-yellow-600 mb-2">
                                                            Carbohydrates
                                                        </p>

                                                        <h3 className="text-lg font-bold text-yellow-700">
                                                            {carbs} g
                                                        </h3>
                                                    </div>

                                                    {/* Fat */}
                                                    <div className="rounded-2xl bg-pink-50 border border-pink-100 p-5 hover:shadow-md transition">
                                                        <p className="text-sm text-pink-500 mb-2">
                                                            Fat
                                                        </p>

                                                        <h3 className="text-lg font-bold text-pink-600">
                                                            {fat} g
                                                        </h3>
                                                    </div>

                                                </div>

                                                {/* Details */}
                                                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">

                                                    <p className="text-sm font-medium text-slate-500 mb-2">
                                                        Details
                                                    </p>

                                                    <p className="text-slate-700 leading-7">
                                                        {details}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 p-5 mt-5">
                                                <Link to={`/edit-nutrition/${obj._id}`} state={obj}>
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                                                        Edit
                                                    </button>
                                                </Link>


                                                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold">
                                                    print as pdf
                                                </button>

                                                <button onClick={getId} value={obj._id} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold">
                                                    Delete
                                                </button>


                                            </div>
                                        </div>

                                    </div>



                                </div>

                            )
                        })
                        :
                        <div className='text-3xl text-[red] font-bold'>No Data Available...</div>
                }





            </div>
        </div >
    )
}







