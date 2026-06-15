import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';

export default function AddLocation() {
    const apiUrl = import.meta.env.VITE_AdminUrl;
    let navigate = useNavigate()

    let submitData = (e) => {
        e.preventDefault()
        const obj = {
            phoneNumber: e.target.phoneNumber.value,
            openingTime: e.target.openingTime.value,
            email: e.target.email.value,
            Address: e.target.Address.value,
            locationurl: e.target.locationurl.value,
            aboutgym: e.target.aboutgym.value,
        };

        e.preventDefault()

        let data = new FormData(e.target)

        axios.post(
            `${apiUrl}/add-location`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    e.target.reset()
                    alert(finalRes.message)
                    navigate('/view-location')
                }
            })
    }
    // ................................................................

    let { id } = useParams()
    let { state } = useLocation()

    let [update, setupdate] = useState(
        {
            phoneNumber: '',
            openingTime: '',
            email: '',
            Address: '',
            locationurl: '',
            aboutgym: '',
        }
    )


    useEffect(() => {
        if (state) {
            setupdate(
                {
                    phoneNumber: state.phoneNumber,
                    openingTime: state.openingTime,
                    email: state.email,
                    Address: state.Address,
                    locationurl: state.locationurl,
                    aboutgym: state.aboutgym,
                }
            )
        }
    }, [state])

    let updateData = (e) => {
        e.preventDefault()

        axios.put(
            `${apiUrl}/edit-location/${id}`, update)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    setupdate(
                        {
                            phoneNumber: '',
                            openingTime: '',
                            email: '',
                            Address: '',
                            locationurl: '',
                            aboutgym: '',
                        }
                    )
                    alert(finalRes.message)
                    navigate('/view-location')
                }
            })
    }


    return (
        <div className="min-h-screen bg-slate-100 sm:p-[18px_0px] p-[0px_0px] sm:mt-0 mt-3 ">

            <div className="max-w-3xl mx-auto bg-white shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-white">

                    <h1 className="text-4xl font-bold">
                        {id ? ' Edit Location Details' : ' Add Location Details'}
                    </h1>

                    <p className="text-slate-300 mt-3">
                        Add gym contact and address information
                    </p>

                </div>

                {/* Form */}
                <form className="p-8 space-y-5" onSubmit={id ? updateData : submitData}>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={update.phoneNumber}
                            onChange={(e) => setupdate({
                                ...update, phoneNumber: e.target.value
                            })}
                            required
                            placeholder="Enter phone number"
                            maxLength={10}
                            minLength={10}
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {/* Opening Time */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Opening Time
                        </label>

                        <input
                            type="text"
                            name="openingTime"
                            value={update.openingTime}
                            onChange={(e) => setupdate({
                                ...update, openingTime: e.target.value
                            })}
                            required
                            placeholder="Enter GYM opening time like eg. 6:00 AM - 10:00 PM"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={update.email}
                            onChange={(e) => setupdate({
                                ...update, email: e.target.value
                            })}
                            required
                            placeholder="Enter email address"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {/* Location Address */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Location Address
                        </label>

                        <textarea
                            rows="3"
                            name="Address"
                            value={update.Address}
                            onChange={(e) => setupdate({
                                ...update, Address: e.target.value
                            })}
                            required
                            placeholder="Enter full address"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Location Url
                        </label>

                        <input
                            type="text"
                            name="locationurl"
                            value={update.locationurl}
                            onChange={(e) => setupdate({
                                ...update, locationurl: e.target.value
                            })}
                            required
                            placeholder="Enter location url"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            name="aboutgym"
                            value={update.aboutgym}
                            onChange={(e) => setupdate({
                                ...update, aboutgym: e.target.value
                            })}
                            required
                            placeholder="Enter gym description"
                            className="w-full border border-slate-300 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-slate-400"
                        ></textarea>
                    </div>

                    {/* Save Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-medium transition"
                        >
                            {id ? 'Edit Details' : '  Save Details'}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}