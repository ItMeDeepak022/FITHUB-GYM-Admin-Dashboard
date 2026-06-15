import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootLayout from './Layout/RootLayout'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard'
import Loginhere from './components/authentication/Loginhere'
import Addprogram from './components/program/Addprogram'
import ProtectedRoute from './ProtectedRoutes'
import Viewprogram from './components/program/Viewprogram'
import EditProgram from './components/program/Addprogram'
import AddNutrition from './components/nutritions/AddNutrition'
import ViewNutrition from './components/nutritions/ViewNutrition'
import Addblog from './components/blogs/Addblog'
import Viewblog from './components/blogs/Viewblog'
import AddLocation from './components/location/Addlocation'
import ViewLocation from './components/location/Viewlocation'
import AddFaq from './components/faq/Addfaq'
import ViewFaq from './components/faq/Viewfaq'
import AddTestimonials from './components/testimonials/Addtestimonial'
import ViewTestimonials from './components/testimonials/Viewtestimonial'
import UsersDashboard from './components/users/Viewuser'
import SubscriptionDashboard from './components/subscription/ViewSubscription'
import AdminProfile from './components/admin-profile/AdminProfile'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path='/' element={<Loginhere />} />

      <Route element={<ProtectedRoute> <RootLayout /> </ProtectedRoute>} >
      {/* <Route element={<RootLayout />} > */}

        <Route path='/dashboard' element={<Dashboard />} />



        {/* Admin Profile */}

        <Route path='admin-profile' element={<AdminProfile />} />

        {/* -------------------------------------------- */}

        {/* Program Sections */}
        <Route path='add-program' element={<Addprogram />} />
        <Route path='view-program' element={<Viewprogram />} />
        <Route path='edit-program/:id' element={<Addprogram />} />

        {/* Nutrition Sections */}
        <Route path='add-nutrition' element={<AddNutrition />} />
        <Route path='view-nutrition' element={<ViewNutrition />} />
        <Route path='edit-nutrition/:id' element={<AddNutrition />} />

        {/* Blogs Sections */}
        <Route path='add-blog' element={<Addblog />} />
        <Route path='view-blog' element={<Viewblog />} />
        <Route path='edit-blog/:id' element={<Addblog />} />

        {/* Location Sections */}
        <Route path='add-location' element={<AddLocation />} />
        <Route path='view-location' element={<ViewLocation />} />
        <Route path='edit-location/:id' element={<AddLocation />} />


        {/* Faq Sections */}
        <Route path='add-faq' element={<AddFaq />} />
        <Route path='view-faq' element={<ViewFaq />} />
        <Route path='edit-faq/:id' element={<AddFaq />} />

        {/* Testimonial Sections */}
        <Route path='add-testimonial' element={<AddTestimonials />} />
        <Route path='view-testimonial' element={<ViewTestimonials />} />
        <Route path='edit-testimonial/:id' element={<AddTestimonials />} />




        {/* Users Sections */}
        <Route path='view-user' element={<UsersDashboard />} />

        /* Subscription  Sections */
        <Route path='view-subscription' element={<SubscriptionDashboard />} />

      </Route>

    </Routes>
  </BrowserRouter>
)




