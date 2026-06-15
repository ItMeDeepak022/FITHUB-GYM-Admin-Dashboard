import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className=" backdrop:blur-lg bg-transparent shadow-lg text-black sm:py-4 p-1">
      <div className=" flex sm:flex-row flex-col sm:items-center  justify-center gap-0">
        <div className="text-sm sm:pt-0 pt-2  ml-6">© {year} Gym Web Application. All rights reserved.</div>
        <div className="text-sm text-center text-purple-900">Developed by ❤️ Deepak Kushwaha</div>
      </div>
    </footer>
  )
}
