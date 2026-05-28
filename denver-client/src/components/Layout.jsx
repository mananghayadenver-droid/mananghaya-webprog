import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-1 pb-16 pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
