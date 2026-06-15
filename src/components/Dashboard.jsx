import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const apiUrl = import.meta.env.VITE_AdminUrl;
  let token = localStorage.getItem('token')
  let [member, setmeber] = useState([])
  let [program, setprogram] = useState([])
  let [nutrition, setnutrition] = useState([])


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
      `${apiUrl}/get-Allmember`
    ).then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes, 'dashboard ka hai');
        setmeber(finalRes.data)
      })
  }
  let getprogramdata = () => {
    axios.get(
      `${apiUrl}/get-program`).then((res) => res.data)
      .then((finalRes) => {
        setprogram(finalRes.data)
      })
  }
  let getnutrition = () => {
    axios.get(
      `${apiUrl}/get-nutrition`
    ).then((res) => res.data)
      .then((finalRes) => {
        setnutrition(finalRes.data)
      })
  }

  let [user, setuser] = useState([])
  let getsubs = () => {
    axios.get(
      `${apiUrl}/get-Allmember`
    ).then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes);
        setuser(finalRes.data)
      })
  }

  let [test, settest] = useState([])
  let getTestimonial = () => {
    axios.get(
      `${apiUrl}/get-testimonial`
    ).then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes);
        settest(finalRes.data)
      })
  }

  let [query, setquery] = useState([])
  let getQuery = () => {
    axios.get(
      `${apiUrl}/get-query`).then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes);
        setquery(finalRes.data)
      })
  }


  token && (
    useEffect(() => {
      getdata()
      getprogramdata()
      getnutrition()
      getsubs()
      getTestimonial()
      getQuery()

    }, [token])
  )


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="sm:text-3xl text-[24px] font-bold sm:font-semibold text-gray-900">Gym Admin Dashboard</h1>
              <p className="mt-2 text-gray-600">Monitor classes, members, performance and schedule.</p>
            </div>

          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-4 sm:grid-cols-1 mb-8">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Active Members</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">{activePlans} </p>
            <p className="mt-2 text-sm text-green-600">+12% this month</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">₹{totalIncome}</p>
            <p className="mt-2 text-sm text-green-600">+8% vs last month</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Total Programs</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">{program.length} Plan Available </p>
            <p className="mt-2 text-sm text-blue-600"> Ideal body , Fit body ,Muscle gain</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Total Nutrition Plan</p>
            <p className="mt-4 text-3xl font-bold text-gray-900"> {nutrition.length} Available</p>
            <p className="mt-2 text-sm text-purple-600">Nutrition Plan Available with your BMI</p>
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-3 grid-cols-1 mb-8">

          <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Workout Attendance</h2>
                <p className="mt-1 text-sm text-gray-500">Weekly member check-ins trend</p>
              </div>
              <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">View Report</button>
            </div>
            <div className="h-72 rounded-3xl bg-gradient-to-br from-indigo-50 to-white p-6 text-gray-500">
              <div className="flex h-full flex-col justify-center items-center">
                <p className="text-lg font-medium">Chart placeholder</p>
                <p className="mt-2 text-sm">Integrate a chart library for actual attendance graphs.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Our Testimonial Ceremony</h2>
            <ul className="mt-6 space-y-4">

              {
                test.map((obj) => {
                  let { name, rating, program, feedback } = obj
                  return (
                    <li className="flex flex-col gap-2 rounded-2xl bg-gray-50 p-4">
                      <div className='flex items-center sm:gap-10 gap-3'>
                        <div className='flex flex-col '>
                          <p className="font-semibold text-gray-900 text-md">{name}</p>
                          <p className="text-sm text-gray-500"> {program} </p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {rating === '1' && ('⭐')}
                          {rating === '2' && ('⭐⭐')}
                          {rating === '3' && ('⭐⭐⭐')}
                          {rating === '4' && ('⭐⭐⭐⭐')}
                          {rating === '5' && ('⭐⭐⭐⭐⭐')}
                        </span>
                      </div>

                      <div className='sm:text-[14px] text-[13px] text-[blue]'>
                        {feedback}
                      </div>
                    </li>
                  )
                })
              }

            </ul>
          </div>

        </section>

        <section className="grid gap-6 sm:grid-cols-3 grid-cols-1">

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Subsription Details</h2>
                <p className="mt-1 text-sm text-gray-500">Hurry up to book and schedule slotes</p>
              </div>
              <span className="rounded-full bg-sky-100 sm:px-3 px-5 py-1 text-sm text-[red] font-bold text-center"> {member.length} booked</span>
            </div>
            {
              member.map((obj) => {
                let { name, email, phone, membership } = obj
                return (
                  <div className="mt-6 space-y-4">

                    <div className="rounded-2xl bg-gray-50 p-4 flex sm:flex-row flex-col ">

                      <div>
                        <p className="font-semibold text-gray-900">Subscriptioner Name</p>
                        <p className="text-sm text-[green] sm:text-center"> {name}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Membership Plan</p>
                        <p className="text-sm text-[green] sm:text-center"> {membership}</p>
                      </div>
                    </div>

                  </div>
                )
              })
            }



          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-200 xl:col-span-2">
            <div className="flex sm:items-start items-center sm:justify-between justify-around">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Latest User Query Activity</h2>
                <p className="mt-1 text-sm text-gray-500">Recent user query check-ins.</p>
              </div>
              <span className="rounded-full bg-sky-100 sm:px-3 px-5 sm:py-2 py-1 text-sm text-[green] font-bold text-center"> {query.length} Recieved</span>
            </div>
            <div className="mt-6 space-y-4">

              {
                query.map((obj) => {
                  let { name, message, date } = obj
                  const hour = new Date(date).getHours();
                  return (
                    <div className="flex sm:gap-10 gap-2 sm:items-start items-center sm:ml-5 rounded-2xl bg-gray-50 p-3">
                      <div>
                        <p className="font-semibold text-gray-900">{name} </p>
                        <p className="text-sm text-gray-500"> {message} </p>
                      </div>
                      <span className="text-sm text-[red]">{hour}h ago</span>
                    </div>
                  )
                })
              }

            </div>
          </div>

        </section>
      </div>
    </div>
  )
}
