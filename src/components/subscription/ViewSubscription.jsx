import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function SubscriptionDashboard() {
    let token = localStorage.getItem('token')
    let [member, setmeber] = useState([])


    const totalIncome = member.reduce((sum, item) => {
        return item.paymentStatus === "Success"
            ? sum + Number(item.total || 0)
            : sum;
    }, 0);
    const activePlans = member.filter(
        (item) => item.paymentStatus === "Success"
    ).length;

    let getdata = () => {
        axios.get(
            "http://localhost:1000/admin-dashboard/get-Allmember"
        ).then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes, 'dashboard ka hai');
                setmeber(finalRes.data)
            })
    }

    token && (
        useEffect(() => {
            getdata()

        }, [token])



    )


    let getId = (e) => {
        let Id = e.target.value
        let Ischeck = confirm('Are you sure to delete..')
        if (Ischeck) {
            axios.delete(
                `http://localhost:1000/admin-dashboard/delete-member/${Id}`,
            ).then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    getdata()
                })
        }
    }
    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

                    <h1 className="text-4xl font-bold text-slate-900">
                        Subscription Dashboard
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Track customer subscriptions, payments, and revenue details
                    </p>

                </div>
                {/* Top Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    {/* Total Subscriptions */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Total Subscriptions
                                </p>

                                <h2 className="text-4xl font-bold text-slate-900 mt-2">
                                    {member.length}
                                </h2>

                            </div>

                            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl text-3xl">
                                📋
                            </div>

                        </div>

                    </div>

                    {/* Active Plans */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Active Plans
                                </p>

                                <h2 className="text-4xl font-bold text-green-600 mt-2">
                                    {activePlans}
                                </h2>

                            </div>

                            <div className="bg-green-100 text-green-600 p-4 rounded-2xl text-3xl">
                                ✅
                            </div>

                        </div>

                    </div>

                    {/* Monthly Revenue */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <div className="flex items-center justify-between">

                            <div className='flex flex-col'>

                                <p className="text-slate-500 text-sm">
                                    Monthly Revenue
                                </p>

                                <h2 className="text-3xl font-bold text-yellow-500 mt-2">

                                    <div>₹ {totalIncome}</div>

                                </h2>

                            </div>



                        </div>

                    </div>

                    {/* Expired Plans */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-500 text-sm">
                                    Expired Plans
                                </p>

                                <h2 className="text-4xl font-bold text-red-500 mt-2">
                                    85
                                </h2>

                            </div>

                            <div className="bg-red-100 text-red-500 p-4 rounded-2xl text-3xl">
                                ❌
                            </div>

                        </div>

                    </div>

                </div>

                {/* Subscription Plans */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    {/* Top */}
                    <div className="bg-slate-900 text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                            <h2 className="text-3xl font-bold">
                                Customer Subscriptions
                            </h2>

                            <p className="text-slate-300 mt-2">
                                View all subscription details and payments
                            </p>

                        </div>



                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">


                        {
                            member.length > 0 ?
                                member.map((obj, index) => {
                                    let { _id, name, email, membership, total, duration, paymentStatus } = obj

                                    return (
                                        <>
                                            {/* Card 1 */}
                                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">

                                                {/* User */}
                                                <div className="flex items-center gap-5">



                                                    <div>

                                                        <h3 className="text-2xl font-bold text-slate-900">
                                                            {name}
                                                        </h3>

                                                        <p className="text-slate-500 mt-1">
                                                            {email}
                                                        </p>

                                                        <span className={`inline-block bg-green-100 ${paymentStatus === 'Success' ? 'text-[green]' : 'text-[red]'} px-4 py-2 rounded-full text-sm font-medium mt-3`}>
                                                            {paymentStatus === 'Success' ? 'Active' : 'Deactive'}
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* Details */}
                                                <div className="grid grid-cols-2 gap-4 mt-6">

                                                    <div className="bg-white rounded-2xl p-4">

                                                        <p className="text-sm text-slate-500">
                                                            Plan Name
                                                        </p>

                                                        <h4 className="font-semibold text-slate-900 mt-1">
                                                            {membership}
                                                        </h4>

                                                    </div>

                                                    <div className="bg-white rounded-2xl p-4">

                                                        <p className="text-sm text-slate-500">
                                                            Total Cost
                                                        </p>

                                                        <h4 className="font-semibold text-green-600 mt-1">
                                                            {total}
                                                        </h4>

                                                    </div>

                                                    <div className="bg-white rounded-2xl p-4">

                                                        <p className="text-sm text-slate-500">
                                                            Duration
                                                        </p>

                                                        <h4 className="font-semibold text-slate-900 mt-1">
                                                            {duration}
                                                        </h4>

                                                    </div>

                                                    <div className="bg-white rounded-2xl p-4">

                                                        <p className="text-sm text-slate-500">
                                                            Payment Status
                                                        </p>

                                                        <h4 className={`font-semibold ${paymentStatus === 'Success' ? 'text-green-600' : 'text-[red]'}  mt-1`}>
                                                            {paymentStatus}
                                                        </h4>

                                                    </div>

                                                </div>

                                                {/* Buttons */}
                                                <div className="flex flex-wrap gap-3 mt-6">



                                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                        View
                                                    </button>

                                                    <button onClick={getId} value={_id} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-medium transition">
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>
                                        </>
                                    )
                                })
                                :
                                <div className='text-2xl font-bold sm:text-start text-center'>No Data founds..</div>
                        }




                    </div>

                </div>



            </div>

        </div>
    )
}