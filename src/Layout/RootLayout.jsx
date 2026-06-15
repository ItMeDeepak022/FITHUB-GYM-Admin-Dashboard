// import React from 'react'
// import Header from '../common/Header'
// import Sidebar from '../common/Sidebar'
// import Footer from '../common/Footer'
// import { Outlet } from 'react-router'

// export default function RootLayout() {
//     return (
//         <div className='max-w-full h-screen grid sm:grid-cols-[15%_auto] grid-cols-1 '>

//             <div className='fixed top-0 left-0 h-screen w-[15%] bg-black text-white'>
//                 <Sidebar />
//             </div>

//             {/* Main Section */}
//             <div className='relative'>

//                 {/* Fixed Header */}
//                 <div className='fixed top-0 right-0 sm:w-[85%] w-full z-50'>
//                     <Header />
//                 </div>

//                 {/* Main Content */}
//                 <div className='pt-15 pb-20'>
//                     <Outlet />
//                 </div>

//                 {/* Fixed Footer */}
//                 <div className='fixed bottom-0 right-0 sm:w-[85%] w-full'>
//                     <Footer />
//                 </div>

//             </div>


//         </div>
//     )
// }

import React from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'
import Footer from '../common/Footer'
import { Outlet } from 'react-router'

export default function RootLayout() {
    return (
        <div className='max-w-full min-h-screen'>

            {/* Fixed Sidebar */}
            <div className='fixed top-0 left-0 w-[15%] h-screen sm:block hidden'>
                <Sidebar />
            </div>

            {/* Main Section */}
            <div className='sm:ml-[15%]'>

                {/* Fixed Header */}
                <div className='fixed top-0 z-50 right-0 sm:w-[85%] w-full'>
                    <Header />
                </div>

                {/* Main Content */}
                <div className='p-[50px_0px]'>
                    <Outlet />
                </div>

                {/* Fixed Footer */}
                <div className='fixed bottom-0 right-0 sm:w-[85%] w-full bg-white/20 backdrop-blur-md'>
                    <Footer />
                </div>

            </div>

        </div>
    )
}