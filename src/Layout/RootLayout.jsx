 import React, { useState } from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'
import Footer from '../common/Footer'
import { Outlet } from 'react-router'

export default function RootLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='min-h-screen sm:bg-[#f8fafc] text-gray-800 flex flex-col'>

            {/* Desktop Fixed Sidebar */}
            <div className={`fixed top-0 left-0 h-screen z-40 sm:block hidden transition-all duration-300 ease-in-out ${collapsed ? "w-[72px]" : "w-64"}`}>
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>

            {/* Main Content Area */}
            <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${collapsed ? "sm:ml-[72px]" : "sm:ml-64"}`}>

                {/* Fixed Header */}
                <div className={`fixed top-0 z-30 right-0 transition-all duration-300 ease-in-out w-full ${collapsed ? "sm:w-[calc(100%-72px)]" : "sm:w-[calc(100%-16rem)]"}`}>
                    <Header />
                </div>

                {/* Main Content Outlet */}
                <main className='flex-1 pt-20 pb-20 px-4 sm:px-8'>
                    <Outlet />
                </main>

                {/* Fixed Footer */}
                <div className={`fixed bottom-0 right-0 z-20 transition-all duration-300 ease-in-out w-full ${collapsed ? "sm:w-[calc(100%-72px)]" : "sm:w-[calc(100%-16rem)]"} bg-white/70 backdrop-blur-md border-t border-gray-200`}>
                    <Footer />
                </div>

            </div>

        </div>
    )
}