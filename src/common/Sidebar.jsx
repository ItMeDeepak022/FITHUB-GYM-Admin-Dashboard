import React, { useState } from 'react'
import { FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'

export default function Sidebar() {
    const [openIndex, setOpenIndex] = useState(null)

    const list = [
        { title: 'Program', submenu: [ 'View'] },
        { title: 'Nutrition', submenu: [ 'View'] },
        { title: 'Blog', submenu: ['View'] },
        { title: 'Location', submenu: [ 'View'] },
        { title: 'FAQ', submenu: ['View'] },
        { title: 'Testimonial', submenu: ['View'] },
        { title: 'User-Query', submenu: ['View'] },
        { title: 'Subscription', submenu: ['View'] },
        { title: 'Register-Users', submenu: ['View'] },

    ]

    const toggleOpen = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }
    let navigate = useNavigate()
    let logOutNow = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <aside className="relative w-full min-h-screen bg-[#F3F4F6] text-black shadow-lg ">
            <div className='w-full bg-black flex flex-col items-center justify-center'>
                <div className=" mr-10 w-full h-20">
                    <img src="https://fithubgymapplication.vercel.app/Img/logo.png"
                        className='w-full h-full object-cover'
                        alt="" />
                </div>

                <h1 className='text-white'>Admin Dashboard</h1>
            </div>

            <nav className="mt-2 px-2">
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" className="flex items-center bg-gray-200 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white">
                            Dashboard
                        </Link>
                    </li>

                    {list.map((item, index) => {
                        const isOpen = openIndex === index

                        return (
                            <li key={item.title}>
                                <button
                                    type="button"
                                    onClick={() => toggleOpen(index)}
                                    className="w-full flex items-center  transition-all duration-500 ease-out justify-between bg-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-left transition-colors hover:bg-slate-700 hover:text-white"
                                >
                                    <span>{item.title}</span>
                                    {isOpen ? <FiChevronUp className='text-lg' /> : <FiChevronDown className='text-lg' />}
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className="mt-2 space-y-1 pl-4">
                                        {item.submenu.map((sub) => (
                                            <li key={sub}>
                                                <a
                                                    href={`/${sub.toLowerCase()}-${item.title.toLowerCase()}`}
                                                    className="block rounded-lg px-4 py-2 text-sm text-gray-700 bg-white hover:bg-slate-100"
                                                >
                                                    {sub}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* <div className='absolute bottom-0 pl-5 bg-gray-200 w-full py-3'>
                <FiLogOut onClick={logOutNow} className='text-[30px] cursor-pointer font-bold hover:text-[red] transition-all duration-300' />
            </div> */}
        </aside>
    )
}
