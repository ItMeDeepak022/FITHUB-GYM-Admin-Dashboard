import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Loginhere() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    
    let [state, setstate] = useState(true)
    let navigate = useNavigate()
    let changeForm = () => {
        setstate(!state)
    }

    let [loader, setloader] = useState(false)


    let submitForm = (e) => {
        e.preventDefault()
        setloader(true)
        if (state) {
            let obj = {
                email: e.target.email.value,
                password: e.target.password.value,
            }
            axios.post(`${apiUrl}/admin-signIn`, obj)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    if (finalRes.status) {
                        setloader(false)
                        alert(finalRes.message)
                        localStorage.setItem('token', finalRes.token)
                        e.target.reset()

                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 200);
                    }
                    else {
                        alert(finalRes.message)
                        setloader(false)

                    }
                })
        }
        else {
            let obj = {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
            }
            axios.post(`${apiUrl}/admin-signUp`, obj)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        changeForm()
                        alert(finalRes.message)
                        setloader(false)
                        e.target.reset()
                    }
                    else {
                        alert(finalRes.message)
                        setloader(false)

                    }
                })

        }

    }



    return (


        <>
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="mx-auto shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side */}
                    <div className="rounded-tl-lg rounded-bl-lg sm:flex flex-col p-3 gap-2 justify-center items-center text-white hidden">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0B82tMkDdFUgqJJGwfxN3w02XtlImKcR_UA&s"
                            alt="Admin Dashboard"
                            className="w-100 h-105 object-contain"
                        />

                        <h2 className="text-3xl text-black font-bold text-center">
                            Welcome to Admin Dashboard
                        </h2>

                        <p className="text-center text-blue-600 text-lg">
                            Manage your GYM Application
                        </p>
                    </div>

                    {/* Right Side */}
                    {
                        state ?

                            /* Login Form */
                            <div className="sm:rounded-tr-2xl sm:rounded-tl-none sm:rounded-bl-none rounded-lg shadow-lg bg-slate-200 flex flex-col justify-center">

                                <div className='flex flex-col items-center justify-center sm:hidden'>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0B82tMkDdFUgqJJGwfxN3w02XtlImKcR_UA&s"
                                        alt="Admin Dashboard"
                                        className="w-full h-full object-cover"
                                    />

                                    <h1 className="text-2xl font-bold text-blue-300 mb-1 mt-2 text-center">
                                        Welcome to Dashboard
                                    </h1>
                                </div>

                                <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-1 text-center">
                                    Login Here
                                </h1>

                                <form className="space-y-4 p-10" onSubmit={submitForm} autoComplete="on">

                                    {/* Email */}
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </div>

                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </div>

                                        <input
                                            type="password"
                                            required
                                            name="password"
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full sm:mt-10 flex justify-center items-center gap-4 bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        Login

                                        {
                                            loader && (
                                                <div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-white border-t-transparent shadow-md"></div>
                                            )
                                        }
                                    </button>
                                </form>

                                <p className="flex justify-center gap-2 text-center text-gray-600 pb-5 text-sm">
                                    Don't have an account?

                                    <span
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={changeForm}
                                    >
                                        Sign Up Now
                                    </span>
                                </p>
                            </div>

                            :

                            /* Registration Form */
                            <div className="sm:rounded-tr-2xl sm:rounded-tl-none sm:rounded-bl-none rounded-lg shadow-lg bg-slate-200 flex flex-col justify-center">

                                <div className='flex flex-col items-center justify-center sm:hidden'>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0B82tMkDdFUgqJJGwfxN3w02XtlImKcR_UA&s"
                                        alt="Admin Dashboard"
                                        className="w-full h-full object-cover"
                                    />

                                    <h1 className="text-2xl font-bold text-blue-300 mb-1 mt-2 text-center">
                                        Welcome to Dashboard
                                    </h1>
                                </div>

                                <h1 className="sm:text-5xl text-3xl font-bold text-gray-800 mb-1 text-center">
                                    Registration Now
                                </h1>

                                <form className="space-y-4 p-10" onSubmit={submitForm} autoComplete="on">

                                    {/* Name */}
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Name
                                        </div>

                                        <input
                                            type="text"
                                            required
                                            name="name"
                                            autoComplete="name"
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </div>

                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <div className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </div>

                                        <input
                                            type="password"
                                            required
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full sm:mt-10 flex justify-center items-center gap-4 bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    >
                                        Create Account

                                        {
                                            loader && (
                                                <div className="w-7 h-7 rounded-full animate-spin border-4 border-solid border-white border-t-transparent shadow-md"></div>
                                            )
                                        }
                                    </button>
                                </form>

                                <p
                                    onClick={changeForm}
                                    className="cursor-pointer underline text-center text-gray-600 pb-5 text-sm"
                                >
                                    Login Here
                                </p>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}


