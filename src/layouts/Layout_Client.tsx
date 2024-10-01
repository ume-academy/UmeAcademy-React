import { Outlet } from 'react-router-dom'
import Header from '../Components/client/CommonComponents/Header/Header'
import Footer from '../Components/client/CommonComponents/Footer/Footer'

const Layout_Client = () => {
  return (
    <div>
      <div className="dark:bg-[#131022] min-h-screen flex flex-col">
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer/>
        </div>
    </div>
  )
}

export default Layout_Client

