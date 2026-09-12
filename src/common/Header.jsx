import axios, { CanceledError } from 'axios'
import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { IoMdClose, IoMdLogOut, IoMdSettings } from "react-icons/io";
export default function Header({ collapsed, setCollapsed }) {
  const apiUrl = import.meta.env.VITE_AdminUrl;

  const [openIndex, setOpenIndex] = useState(null)

  const list = [
    { title: 'Program', submenu: ['View'] },
    { title: 'Nutrition', submenu: ['View'] },
    { title: 'Blog', submenu: ['View'] },
    { title: 'Location', submenu: ['View'] },
    { title: 'FAQ', submenu: ['View'] },
    { title: 'Testimonial', submenu: ['View'] },
    { title: 'User-Query', submenu: ['View'] },
    { title: 'Subscription', submenu: ['View'] },
    { title: 'Register-Users', submenu: ['View'] },
  ]

  const toggleOpen = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  let [showMenu, setshowMenu] = useState(true)

  let showHideMenu = () => {
    setshowMenu(!showMenu)
  }

  let navigate = useNavigate()
  let logOutNow = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    navigate('/')
  }
  let [show, setshow] = useState(true)
  let showProfile = () => {
    setshow(!show)
  }

  let token = localStorage.getItem("token")

  let [profileData, setprofileData] = useState({})
  let { profileImg, name } = profileData

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

  useEffect(() => {
    if (token) {
      getAdminProfile()
    }
  }, [token])

  return (
    <>
      <div className="relative">

        {/* Header */}
        <header className="z-[999] flex items-center justify-between sm:px-8 px-5 sm:py-5.5 py-3 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/80">

          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={showHideMenu}
              className="sm:hidden text-gray-700 hover:text-gray-900 cursor-pointer p-1"
              aria-label="Toggle mobile menu"
            >
              {showMenu ? <FiMenu className="text-3xl" /> : <IoMdClose className="text-3xl" />}
            </button>

           

            <span className="text-[20px] font-semibold text-gray-800">
              Dashboard
            </span>
          </div>

          {/* Right */}
          <div onClick={showProfile} className="flex items-center gap-3 group cursor-pointer relative">

            <div className="text-right flex flex-col">
              <p className="text-sm font-bold text-gray-700">
                GYM Admin 💪
              </p>
              <p className='sm:block hidden text-emerald-600 text-xs font-semibold'>{name}</p>
            </div>

            <img
              src={profileImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"}
              alt='Admin-Profile'
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
            />

            <div className={` ${show ? 'hidden' : 'block'} transition-all duration-300 absolute sm:right-0 right-0 sm:top-14 top-[55px] sm:w-44 w-40 bg-white border border-gray-200 sm:hidden shadow-xl rounded-xl sm:group-hover:block z-50`}>
              <ul className='flex flex-col gap-2 p-2'>
                <li className='bg-gray-50 hover:bg-gray-100 transition-all duration-200 py-2 rounded-lg px-3'>
                  <Link to={'/admin-profile'} className="block w-full text-sm font-medium text-gray-700">Profile</Link>
                </li>

                <li onClick={logOutNow} className='flex items-center justify-between bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 py-2 rounded-lg px-3 cursor-pointer'>
                  <span className="text-sm font-medium">Logout</span>
                  <IoMdLogOut className='text-lg text-red-500' />
                </li>
              </ul>
            </div>
          </div>

        </header>

        {/* Sidebar / Mobile Nav */}
        <nav className={`sm:hidden fixed  ${showMenu ? 'top-[-1000px]' : 'top-[65px]'}
           left-0 w-full sm:w-[320px]  h-[calc(100vh-65px)] overflow-y-auto bg-white shadow-2xl z-[100] transition-all duration-500 ease-in-out animate-slideDown`}>

          <div className="p-5">

            <ul className="space-y-2">

              {/* Dashboard */}
              <li onClick={showHideMenu}>

                <Link
                  to="/dashboard"
                  className="flex items-center border-t border-b border-slate-200 py-3 px-4 text-[20px] font-bold transition-all  "
                >
                  Dashboard
                </Link>

              </li>

              {/* Dynamic Menu */}
              {list.map((item, index) => {

                const isOpen = openIndex === index

                return (
                  <li key={item.title}>

                    {/* Menu Button */}
                    <button
                      type="button"
                      onClick={() => toggleOpen(index)}
                      className="w-full flex items-center justify-between bg-slate-100 rounded-xl px-4 py-3 text-md font-medium transition-all duration-300 hover:bg-slate-700 hover:text-white"
                    >

                      <span>
                        {item.title}
                      </span>

                      {
                        isOpen
                          ? <FiChevronUp className="text-lg" />
                          : <FiChevronDown className="text-lg" />
                      }

                    </button>

                    {/* Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                        ? 'max-h-96 opacity-100 mt-2'
                        : 'max-h-0 opacity-0'
                        }`}
                    >

                      <ul className="space-y-2 pl-3">

                        {item.submenu.map((sub) => (

                          <li key={sub} onClick={showHideMenu}>

                            <Link
                              to={`/${sub.toLowerCase()}-${item.title.toLowerCase()}`}
                              className="block bg-slate-50 rounded-xl px-4 py-3 text-md text-slate-700 transition-all hover:bg-slate-200"
                            >
                              {sub}
                            </Link>

                          </li>

                        ))}




                      </ul>

                    </div>

                  </li>
                )
              })}


            </ul>

          </div>

        </nav>



      </div>
    </>
  )
}
