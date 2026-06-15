import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CiCirclePlus } from "react-icons/ci";
export default function ViewLocation() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
     
    let [location, setlocation] = useState([])

    let getData = () => {

        axios.get(`${apiUrl}/get-location`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    setlocation(finalRes.data)
                }

            })
    }

    useEffect(() => {
        getData()
    }, [])

    let getId = (e) => {
        let delId = (e.target.value)
        let Isdelete = confirm("Are you sure to delete...")

        if (Isdelete) {
            axios.delete(`${apiUrl}/delete-location/${delId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    getData()
                })
        }


    }
    return (
        <div className="min-h-screen bg-slate-50 sm:p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8 sm:pt-0 pt-6 pl-6">
                    <div className='flex items-center max-w-full justify-between sm:pr-0 pr-3 mb-5'>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Gym Location
                        </h1>
                        <div className='bg-black px-5 py-2 rounded-[10px] '>
                            <Link to={'/add-location'}><CiCirclePlus className='text-3xl text-white font-extrabold' /></Link>
                        </div>
                    </div>
                    <p className="text-slate-500">
                        Manage gym branch details and contact information
                    </p>
                </div>

                {
                    location.length > 0 ?
                        location.map((obj) => {

                            const {
                                aboutgym, phoneNumber, Address, email, locationurl, openingTime } = obj
                            return (
                                <div className="grid lg:grid-cols-3 gap-6 mb-8">

                                    {/* Gym Image */}
                                    <div className="bg-white sm:rounded-2xl flex flex-col shadow-md overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                                            alt="Gym"
                                            className="flex-1 object-conatin"
                                        />
                                        <div className="p-5">
                                            <h2 className="font-bold text-xl">

                                                <span className='text-[cyan]'>FIT</span>HUB <span className='text-[cyan]'>GYM</span>

                                            </h2>

                                            <p className="text-gray-500 mt-2 leading-relaxed">
                                                {aboutgym}

                                            </p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-5 flex flex-col gap-5">

                                        <div className="grid md:grid-cols-2 gap-6">

                                            <div className="border rounded-xl p-4">
                                                <p className="text-sm text-gray-500">Branch Name</p>
                                                <h3 className="font-normal text-lg ">
                                                    <span className='text-[cyan]'>FIT</span>HUB <span className='text-[cyan]'>GYM</span>
                                                </h3>
                                            </div>

                                            <div className="border rounded-xl p-4">
                                                <p className="text-sm text-gray-500">Contact Number</p>
                                                <h3 className="font-semibold text-lg">
                                                    {phoneNumber}
                                                </h3>
                                            </div>

                                            <div className="border rounded-xl p-4">
                                                <p className="text-sm text-gray-500">Email</p>
                                                <h3 className="font-semibold text-lg">
                                                    {email}
                                                </h3>
                                            </div>

                                            <div className="border rounded-xl p-4">
                                                <p className="text-sm text-gray-500">Working Hours</p>
                                                <h3 className="font-semibold text-lg">
                                                    {openingTime}
                                                </h3>
                                            </div>

                                            <div className="md:col-span-2 border rounded-xl p-4">
                                                <p className="text-sm text-gray-500">Address</p>
                                                <h3 className="font-semibold text-lg">
                                                    {Address}
                                                </h3>
                                            </div>




                                        </div>



                                        {/* Map */}
                                        <div className="mt-6 mb-3">
                                            <iframe
                                                title="Gym Location"
                                                className="w-full h-72 sm:rounded-xl"
                                                src={`${locationurl}`}
                                            />
                                        </div>

                                        <div className="flex gap-5 mt-3 sm:w-[50%] sm:flex-row w-[100%] flex-col">

                                            <button
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300"
                                            >
                                                <Link to={`/edit-location/${obj._id}`} state={obj}> ✏️ Edit</Link>
                                            </button>

                                            <button onClick={getId} value={obj._id}
                                                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition-all duration-300"
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            )
                        })
                        :
                        <div className='text-[red] text-2xl pl-5'>No Data founds </div>
                }
            </div>
        </div>
    )
}

