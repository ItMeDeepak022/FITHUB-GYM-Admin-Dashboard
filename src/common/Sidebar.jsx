import React, { useState } from 'react'
import {
    FiLogOut,
    FiChevronDown,
    FiChevronUp,
    FiChevronLeft,
    FiChevronRight,
    FiGrid,
    FiActivity,
    FiPieChart,
    FiFileText,
    FiMapPin,
    FiHelpCircle,
    FiMessageSquare,
    FiMail,
    FiCreditCard,
    FiUsers
} from 'react-icons/fi'
import { LuDumbbell } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router'

export default function Sidebar({ collapsed, setCollapsed }) {
    const [openIndex, setOpenIndex] = useState(null)

    const list = [
        { title: 'Program', icon: FiActivity, submenu: ['View'] },
        { title: 'Nutrition', icon: FiPieChart, submenu: ['View'] },
        { title: 'Blog', icon: FiFileText, submenu: ['View'] },
        { title: 'Location', icon: FiMapPin, submenu: ['View'] },
        { title: 'FAQ', icon: FiHelpCircle, submenu: ['View'] },
        { title: 'Testimonial', icon: FiMessageSquare, submenu: ['View'] },
        { title: 'User-Query', icon: FiMail, submenu: ['View'] },
        { title: 'Subscription', icon: FiCreditCard, submenu: ['View'] },
        { title: 'Register-Users', icon: FiUsers, submenu: ['View'] },
    ]

    const toggleOpen = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

    const navigate = useNavigate()
    const logOutNow = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        navigate('/')
    }

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
    }

    return (
        <aside className={`relative h-screen flex flex-col bg-[#F3F4F6] text-slate-800 shadow-xl border-r border-slate-200 transition-all duration-300 ease-in-out select-none ${collapsed ? "w-[72px]" : "w-64"}`}>

            {/* Toggle Button on Sidebar Border */}
            <button
                type="button"
                onClick={toggleSidebar}
                className="absolute -right-3.5 top-6 z-50 hidden sm:flex items-center justify-center w-7 h-7 bg-white text-slate-700 border border-slate-300 rounded-full shadow-md hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-label="Toggle sidebar"
            >
                {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </button>

            {/* Brand / Logo Header (React Icon + Styled Text with Logo Colors) */}
            <div className="w-full bg-white py-4.5 px-3 flex items-center justify-center border-b border-gray-200 shrink-0 overflow-hidden select-none">
                <Link to="/dashboard" className="flex items-center justify-center w-full group">
                    {collapsed ? (
                        <div className="w-full flex items-center justify-center" title="FitHub GYM">
                            <LuDumbbell className="text-[#00e5ff] text-5xl " />
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 px-1">
                            <LuDumbbell className="text-[#00e5ff] text-5xl " />
                            <div className="flex flex-col justify-center">
                                {/* FITHUB Title */}
                                <div className="text-4xl font-black italic tracking-wider leading-none">
                                    <span className="text-black">FIT</span>
                                    <span className="text-[#00e5ff]">HUB</span>
                                </div>
                                {/* — GYM — Subtitle */}
                                <div className="flex items-center justify-between w-full mt-1.5 px-0.5">
                                    <span className="h-[2px] bg-[#00e5ff] flex-1 rounded-full opacity-80" />
                                    <span className="text-[10px] font-black tracking-[0.25em] text-[#00e5ff] px-1.5 leading-none">
                                        GYM
                                    </span>
                                    <span className="h-[2px] bg-[#00e5ff] flex-1 rounded-full opacity-80" />
                                </div>
                            </div>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto scroll-smooth scrollbar-none overflow-x-hidden p-2 space-y-2 pb-24">
                {/* Dashboard Link */}
                <div>
                    <Link
                        to="/dashboard"
                        title={collapsed ? "Dashboard" : ""}
                        className={`flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white ${collapsed ? "justify-center px-2 text-slate-700" : "px-3 bg-slate-200 text-slate-800"
                            }`}
                    >
                        <FiGrid className="text-[30px] shrink-0" />
                        {!collapsed && <span className="whitespace-nowrap">Dashboard</span>}
                    </Link>
                </div>

                {/* Dynamic Menu Items */}
                <ul className="space-y-2">
                    {list.map((item, index) => {
                        const isOpen = openIndex === index
                        const Icon = item.icon

                        const handleItemClick = () => {
                            if (collapsed) {
                                setCollapsed(false)
                                setOpenIndex(index)
                            } else {
                                toggleOpen(index)
                            }
                        }

                        return (
                            <li key={item.title}>
                                <button
                                    type="button"
                                    onClick={handleItemClick}
                                    title={collapsed ? item.title : ""}
                                    className={`w-full flex items-center rounded-xl py-2.5 text-sm font-medium transition-colors hover:bg-slate-700 hover:text-white cursor-pointer ${collapsed ? "justify-center px-2 text-slate-700" : "justify-between px-3 bg-slate-200 text-slate-800"
                                        } ${isOpen && !collapsed ? "bg-slate-700 text-white" : ""}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="text-[28px] shrink-0" />
                                        {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
                                    </div>
                                    {!collapsed && (
                                        isOpen ? <FiChevronUp className="text-base shrink-0" /> : <FiChevronDown className="text-base shrink-0" />
                                    )}
                                </button>

                                {/* Dropdown Submenu */}
                                {!collapsed && (
                                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                        <ul className="space-y-1 pl-7">
                                            {item.submenu.map((sub) => (
                                                <li key={sub}>
                                                    <Link
                                                        to={`/${sub.toLowerCase()}-${item.title.toLowerCase()}`}
                                                        className="block rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-300 hover:text-black transition-colors"
                                                    >
                                                        {sub} {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Logout Footer */}
            <div className="p-3 bg-slate-200 border-t border-slate-300 absolute bottom-0 left-0 w-full z-20">
                <button
                    type="button"
                    onClick={logOutNow}
                    title={collapsed ? "Logout" : ""}
                    className={`w-full flex items-center gap-3 rounded-xl py-2 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer ${collapsed ? "justify-center px-2" : "px-3"
                        }`}
                >
                    <FiLogOut className="text-2xl shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    )
}
