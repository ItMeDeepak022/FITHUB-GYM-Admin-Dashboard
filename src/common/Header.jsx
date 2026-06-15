import axios, { CanceledError } from 'axios'
import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronUp, FiMenu } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { IoMdClose, IoMdLogOut, IoMdSettings } from "react-icons/io";
export default function Header() {
  const apiUrl = import.meta.env.VITE_AdminUrl;

  const [openIndex, setOpenIndex] = useState(null)

  const list = [
    { title: 'Program', submenu: ['View'] },
    { title: 'Nutrition', submenu: ['View'] },
    { title: 'Blog', submenu: ['View'] },
    { title: 'Location', submenu: ['View'] },
    { title: 'FAQ', submenu: ['View'] },
    { title: 'Testimonial', submenu: ['View'] },
    { title: 'User', submenu: ['View'] },
    { title: 'Subscription', submenu: ['View'] },

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

  {
    token && (
      useEffect(() => {
        getAdminProfile()
      }, [token])
    )
  }
  return (

    <>
      <div className="relative">

        {/* Header */}
        <header className="z-[999] flex items-center justify-between sm:px-8 px-5 py-2 bg-white/70 backdrop-blur-lg shadow-md border-b border-white/20">

          {/* Left */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">

            {
              showMenu ? <FiMenu className="text-3xl sm:hidden" onClick={showHideMenu} /> : <IoMdClose onClick={showHideMenu} className="sm:hidden text-4xl" />
            }

            <span className="text-[20px] font-semibold sm:block hidden">
              Dashboard
            </span>

          </button>

          {/* Right */}
          <div onClick={showProfile} className="flex items-center gap-3 group cursor-pointer ">

            <div className="text-right flex flex-col">
              
              <p className="text-sm font-bold text-gray-700">

                GYM Admin 💪
              </p>
              <p className='sm:block hidden text-[green] font-normal'>{name}</p>

            </div>

            <img
              src={profileImg}
              alt='Admin-Profile'
              className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md"
            />

            <div className={` ${show ? 'hidden' : 'block'}  transition-all duration-500 absolute sm:right-2 right-0 sm:top-15 top-[65px] sm:w-45 w-40 h-35 bg-white border-1 border-gray-200 sm:hidden shadow-lg rounded-b-[10px]  sm:group-hover:block`}>
              <ul className='flex flex-col gap-4 m-[10%]'>
                <li className='bg-gray-200 hover:bg-gray-300 transition-all duration-200 py-2 shadow-md  rounded-[10px] pl-3'><Link to={'/admin-profile'}>Profile</Link> </li>

                <li onClick={logOutNow} className='flex items-center gap-4 bg-gray-200 hover:bg-gray-300 transition-all duration-200 py-2 shadow-md  rounded-[10px] pl-3'>
                  <p >Logout</p>
                  <IoMdLogOut className='font-bold text-[23px]  text-[red] ' />
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
