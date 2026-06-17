import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Register_Users() {



    let [programs, setprogram] = useState([])

    let getProgram = () => {
        axios.get(`https://backend-of-fithub-gym.onrender.com/admin-dashboard/get-registered`)
            .then((res) => res.data)
            .then((finalRes) => {
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
            axios.delete(`https://backend-of-fithub-gym.onrender.com/admin-dashboard/delete-registered/${delId}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    getProgram()
                })
        }


    }

    return (
        <div className="min-h-screen bg-white sm:p-8 p-5">
            <div className="max-w-6xl mx-auto">
                <div className="sm:mb-4 mb-3 sm:mt-5 relative">
                    <h1 className="sm:text-4xl text-3xl font-bold text-black mb-2">FitHub Registered Users</h1>
                    <p className="text-gray-400">Manage and view all registered members</p>

                    <div className="mt-8 text-center sm:block hidden absolute sm:top-[-20px] sm:right-10 top-25">
                        <button className="bg-black text-white font-semibold py-2 px-5 rounded-[20px] shadow-lg transition duration-200">
                            Total Registred - <span className="text-[red] font-bold">{programs.length > 9 ? programs.length : `0${programs.length}`}</span>
                        </button>
                    </div>
                </div>
                <div className="text-start mb-5 sm:hidden block">
                    <button className="bg-black text-white font-semibold py-2 px-5 rounded-[20px] shadow-lg transition duration-200">
                        Total Registred - <span className="text-[red] font-bold">{programs.length > 9 ? programs.length : `0${programs.length}`}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:p-6 ">
                    {
                        programs.length > 0 ?
                            programs.map(user => {
                                let {
                                    name,
                                    email,
                                    profileImg, createdAt,

                                } = user
                                return (
                                    <div className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300">
                                        <div className="p-6">
                                            <div className="flex flex-col items-center mb-4">
                                                <img
                                                    src={profileImg}
                                                    alt={name}
                                                    className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500 object-cover"
                                                />
                                                <h2 className="text-xl font-bold text-white text-center">{name}</h2>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="bg-gray-600 p-3 rounded">
                                                    <p className="text-gray-300 text-sm">Email</p>
                                                    <p className="text-white font-semibold break-all">{email}</p>
                                                </div>

                                                <div className="bg-gray-600 p-3 rounded">
                                                    <p className="text-gray-300 text-sm">Registered Date</p>
                                                    <p className="text-white font-semibold">{new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                            </div>

                                            <button onClick={getId} value={user._id} className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                                                Delete Registration
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            )
                            :
                            <div className='max-w-full text-red-600 sm:text-3xl text-2xl'>No Registred User Founds...</div>

                    }
                </div>



            </div>
        </div>
    )
}
