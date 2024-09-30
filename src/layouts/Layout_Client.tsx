import { Outlet } from 'react-router-dom'
import Header from '../Components/client/CommonComponents/Header/Header'

const Layout_Client = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Layout_Client

