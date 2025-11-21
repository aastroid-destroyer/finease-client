import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'

const MainLayout = () => {
    return (
        <div className='flex flex-col bg-gradient-to-br from-base-300 via-base-400 to-base-300 min-h-screen bg-blue-100'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout