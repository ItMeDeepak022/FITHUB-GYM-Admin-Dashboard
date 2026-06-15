import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { TbLockPassword } from "react-icons/tb";
export default function AdminProfile() {
    const apiUrl = import.meta.env.VITE_AdminUrl;

    let [edit, setedit] = useState(false)
    let [change, setchange] = useState(false)

    let showHide = () => {
        setedit(!edit)
    }

    let changePassword = () => {
        setchange(!change)
    }


    let changeadinPassword = (e) => {
        e.preventDefault()
        let obj = {
            current: e.target.current.value,
            confirm: e.target.confirm.value,
            newpassword: e.target.newpassword.value,
        }

        axios.put(`${apiUrl}/change-adminPassword`, obj,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    e.target.reset()
                    alert(finalRes.message)
                    changePassword()
                }
                else {
                    alert(finalRes.message)
                }
            })
    }

    let [profileData, setprofileData] = useState({})
    let { name, email, phone, aboutAdmin, profileImg } = profileData

    let [oldImg, setoldImg] = useState('')

    let token = localStorage.getItem("token")

    let getAdminProfile = () => {
        axios.get(`${apiUrl}/get-adminProfile`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    // console.log(finalRes);
                    setprofileData(finalRes.data)
                }
                else {
                    console.log(finalRes.message)
                }
            })
    }

    {
        token && (
            useEffect(() => {
                getAdminProfile()
            }, [token])
        )
    }

    useEffect(() => {
        if (profileImg) {
            const fileName = decodeURIComponent(
                profileImg.split('/').pop()
            );
            setoldImg(fileName);
            // console.log(fileName,'hai ye to');
        }
    }, [profileImg]);

    let editAdminProfile = (e) => {

        e.preventDefault()
        let formValue = new FormData()
        formValue.append('name', name)
        formValue.append('email', email)
        formValue.append('phone', phone)
        formValue.append('aboutAdmin', aboutAdmin)
        if (e.target.profileImg.files[0]) {
            formData.append(
                "profileImg",
                e.target.profileImg.files[0]
            );
        }


        axios.put(`${apiUrl}/edit-adminProfile`, formValue,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    // console.log(finalRes);
                    e.target.reset()
                    alert(finalRes.message)
                    showHide()
                    getAdminProfile()
                }
                else {
                    console.log(finalRes.message)
                }
            })


    }



    return (
        <div className="min-h-screen bg-slate-100 p-3 mt-5">

            {/* Container */}
            <div className="max-w-6xl mx-auto pb-5">

                {/* Top Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

                    {/* Cover */}
                    <div className="h-56 bg-black relative">

                        {/* Profile Image */}
                        <div className="absolute top-12 sm:left-20 left-7 ">

                            <img
                                src={profileImg}
                                alt='admin-profile'
                                className="w-60 h-60 rounded-full border-[6px] border-[purple] shadow-xl object-cover"
                            />

                        </div>

                    </div>

                    {/* Info */}
                    <div className="relative pt-20 pb-8 sm:px-10  px-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div className='sm:text-start text-center' >

                            <h1 className="sm:text-4xl text-[25px] font-bold text-slate-900">
                                {name}
                            </h1>

                            <div className='flex flex-col gap-2'>
                                <p className="text-slate-500 mt-2 text-lg">
                                    {email}
                                </p>
                                <p className="text-slate-500 mt-2 text-lg">
                                    {phone}
                                </p>
                            </div>

                            <div className="flex flex-wrap sm:justify-start justify-center gap-3 mt-5">

                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Admin
                                </span>

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Active
                                </span>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className='flex sm:gap-5 gap-2 sm:flex-row flex-col sm:justify-center justify-center' >



                            <button onClick={showHide} className="border flex  justify-center items-center gap-3  text-[16px] hover:border-[cyan] font-normal border-1 border-slate-200 text-[purple]  px-5 sm:py-1 py-2 rounded-[15px] transition-all">
                                <p className=''>Edit</p> <FiEdit />
                            </button>

                            <button onClick={changePassword} className="border flex  justify-center items-center gap-3  text-[16px] hover:border-[cyan] font-normal border-1 border-slate-200 text-[purple]  px-5 sm:py-1 py-2 rounded-[15px] transition-all">
                                <p className=''>Chagne Password</p> <TbLockPassword />
                            </button>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200 sm:m-8 m-2">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">
                            About Admin
                        </h2>

                        <p className="text-slate-600 leading-7 text-[16px] text-justify">
                            {aboutAdmin}
                        </p>


                    </div>
                </div>



            </div>

            {

                edit && (
                    <div className='max-w-[1150px] mx-auto bg-white mt-8 rounded-[10px]'>
                        <div className="bg-black  p-8 text-white rounded-t-[10px]">

                            <h1 className="text-4xl font-bold">
                                Edit Profile
                            </h1>

                            <p className="mt-2 text-slate-300">
                                Update your account information
                            </p>

                        </div>

                        <form className="p-8 space-y-5" onSubmit={editAdminProfile}>

                            {/* Profile Image */}
                            <div className="flex flex-col gap-3 justify-center items-center">



                                <input
                                    type="file"
                                    name='profileImg'
                                    required={edit ? false : true}
                                    className="mt-5 border border-slate-300 rounded-xl sm:w-[20%] w-[100%] py-2 px-3 "
                                />
                                <p className='text-[16px] text-[green] font-bold'>Old Img:{oldImg} </p>
                            </div>


                            {/* Inputs */}
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Full Name */}
                                <div>

                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setprofileData({ ...profileData, name: e.target.value })}
                                        placeholder="Enter full name"
                                        className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none"
                                    />

                                </div>

                                {/* Email */}
                                <div>

                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        name='email'
                                        onChange={(e) => setprofileData({ ...profileData, email: e.target.value })}
                                        placeholder="Enter email"
                                        className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none"
                                    />

                                </div>

                                {/* Mobile */}
                                <div>

                                    <label className="block mb-2 font-semibold text-slate-700">
                                        Mobile Number
                                    </label>

                                    <input
                                        type="phone"
                                        maxLength={10}
                                        minLength={10}
                                        name='phone'
                                        value={phone}
                                        onChange={(e) => setprofileData({ ...profileData, phone: e.target.value })}
                                        placeholder="Enter mobile number"
                                        className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none"
                                    />

                                </div>

                                {/* Role */}
                                <div>

                                    <label className="block mb-2">
                                        Role
                                    </label>

                                    <input
                                        type="text"
                                        value="GYM Admin"
                                        readOnly
                                        className="w-full outline-none text-[red] bg-slate-100 border border-slate-300 rounded-2xl px-5 py-3"
                                    />

                                </div>

                            </div>

                            {/* About */}
                            <div>

                                <label className="block mb-2 font-semibold text-slate-700">
                                    About
                                </label>

                                <textarea
                                    rows="3"
                                    name='aboutAdmin'
                                    value={aboutAdmin}
                                    onChange={(e) => setprofileData({ ...profileData, aboutAdmin: e.target.value })}
                                    placeholder="Write something about yourself..."
                                    className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none "
                                ></textarea>

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">

                                <button
                                    type="submit"
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all"
                                >
                                    Update Profile
                                </button>

                                <button
                                    type="button"
                                    className="border border-slate-300 hover:bg-slate-100 px-8 py-3 rounded-2xl font-semibold transition-all"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>

                )
            }

            {
                change && (

                    <div className="max-w-[1150px] mx-auto bg-white rounded-3xl shadow-xl mt-8 overflow-hidden">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-black via-slate-800 to-black p-8 text-white">

                            <h1 className="text-4xl font-bold">
                                Change Password
                            </h1>

                            <p className="mt-2 text-slate-300">
                                Keep your account secure by updating your password.
                            </p>

                        </div>

                        {/* Form */}
                        <form className="p-8 space-y-6" onSubmit={changeadinPassword}>

                            {/* Current Password */}
                            <div>

                                <label className="block mb-2 font-semibold text-slate-700">
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    name='current'
                                    placeholder="Enter current password"
                                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-black focus:ring-2 focus:ring-slate-200 transition-all"
                                />

                            </div>

                            {/* New Password */}
                            <div>

                                <label className="block mb-2 font-semibold text-slate-700">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name='newpassword'
                                    placeholder="Enter new password"
                                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-black focus:ring-2 focus:ring-slate-200 transition-all"
                                />

                            </div>

                            {/* Confirm Password */}
                            <div>

                                <label className="block mb-2 font-semibold text-slate-700">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name='confirm'
                                    placeholder="Confirm new password"
                                    className="w-full border border-slate-300 rounded-2xl px-5 py-4 outline-none focus:border-black focus:ring-2 focus:ring-slate-200 transition-all"
                                />

                            </div>

                            {/* Password Rules */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

                                <h3 className="font-bold text-slate-800 mb-3">
                                    Password Requirements
                                </h3>

                                <ul className="space-y-2 text-sm text-slate-600">

                                    <li>✓ Minimum 8 characters</li>
                                    <li>✓ At least one uppercase letter</li>
                                    <li>✓ At least one lowercase letter</li>
                                    <li>✓ At least one number</li>
                                    <li>✓ At least one special character</li>

                                </ul>

                            </div>

                            {/* Buttons */}
                            <div className="flex sm:flex-row flex-col gap-3 pt-2">

                                <button
                                    type="submit"
                                    className="bg-black hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
                                >
                                    Update Password
                                </button>

                                <button
                                    type="button"
                                    className="border border-slate-300 hover:bg-slate-100 px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                )
            }


        </div >
    )
}
