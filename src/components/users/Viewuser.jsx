import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdDownload } from 'react-icons/io'

export default function UsersDashboard() {

    let [query, setquery] = useState([])


    let getData = (e) => {
        axios.get(
            'http://localhost:1000/admin-dashboard/get-query')
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setquery(finalRes.data)

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
                `http://localhost:1000/admin-dashboard/delete-query/${Id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getData()
                })
        }

    }

    const getAllPdf = () => {
        axios.get(
            "http://localhost:1000/admin-dashboard/download-pdf",
            {
                responseType: "blob",
            }
        )
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);

                const a = document.createElement("a");
                a.href = url;
                a.download = "query-report.pdf";

                document.body.appendChild(a);
                a.click();

                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch((err) => {
                console.log(err);
            });
    };

     

    return (
        <div className="min-h-screen bg-slate-100 sm:p-6">

            
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white  shadow-lg p-8 mb-8">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Users Query
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Manages user query like registered customers, memberships, and gym activities
                    </p>

                </div>



                {/* User Query List */}
                <div className="overflow-hidden sm:bg-white">

                    {/* Header */}
                    <div className="w-full bg-slate-900 gap-5 p-6 flex sm:flex-row flex-col  items-center justify-around">

                        <div className='w-full '>

                            <h2 className="text-2xl text-white font-bold">
                                Customer Queries
                            </h2>

                            <p className="text-slate-300 mt-1">
                                View all customer inquiries and messages
                            </p>

                        </div>

                        <div className='flex  sm:gap-10 sm:p-4   sm:justify-around  items-center justify-between w-full '>
                            <div className='text-white text-[18px] '>Total Query <span className='text-[red] font-bold ml-1 inline-block'>{query.length > 9 ? `${query.length}` : `0${query.length}`} </span> </div>

                            <button onClick={getAllPdf} disabled={query.length > 0 ? false : true} className='text-[18px] bg-red-700 cursor-pointer hover:bg-red-800 py-2 px-2 rounded-[10px] text-white flex items-center gap-2'>
                                Download
                                <IoMdDownload className='text-[20px] mt-0' />
                            </button>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-6 p-0 sm:mt-0 mt-7">

                        {/* Query Card 1 */}

                        {
                            query.length > 0 ?
                                query.map((obj) => {
                                    const { date, email, message, name, phone, program } = obj
                                    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    });
                                    return (
                                        <div className="border border-slate-200 sm:rounded-3xl p-6 bg-slate-50">

                                            {/* User */}
                                            <div className="flex items-center gap-5">

                                                {/* <img
                                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                                    alt="User"
                                                    className="h-20 w-20 rounded-full object-cover"
                                                /> */}

                                                <div>

                                                    <h3 className="text-2xl font-bold text-slate-900">
                                                        {name}
                                                    </h3>

                                                    <p className="text-slate-500 mt-1">
                                                        {email}
                                                    </p>

                                                    <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mt-3">
                                                        New Query
                                                    </span>

                                                </div>

                                            </div>

                                            {/* Details */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                                                {/* Program */}
                                                <div className="bg-white rounded-2xl p-4">

                                                    <p className="text-sm text-slate-500">
                                                        Selected Program
                                                    </p>

                                                    <h4 className="font-semibold text-slate-900 mt-1">
                                                        {program}
                                                    </h4>

                                                </div>

                                                {/* Query Date */}
                                                <div className="bg-white rounded-2xl p-4">

                                                    <p className="text-sm text-slate-500">
                                                        Query Date
                                                    </p>

                                                    <h4 className="font-semibold text-slate-900 mt-1">
                                                        {formattedDate}
                                                    </h4>

                                                </div>

                                            </div>

                                            {/* Message */}
                                            <div className="bg-white rounded-2xl p-4 mt-4">

                                                <p className="text-sm text-slate-500 mb-2">
                                                    Message
                                                </p>

                                                <p className="text-slate-700 leading-7">
                                                    {message}
                                                </p>

                                            </div>

                                            {/* Buttons */}
                                            <div className="flex flex-wrap gap-3 mt-6">


                                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                    Mark Pending
                                                </button>

                                                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                    Approve
                                                </button>

                                                <button onClick={getId} value={obj._id} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                    Delete
                                                </button>

                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <div>No Query Founds...</div>
                        }






                    </div>

                </div>

            </div>

        </div>
    )
}