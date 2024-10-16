import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/client/commonComponents/Footer/Footer'
import Header from '../components/client/commonComponents/Header/Header'
import { routerConfig } from '../contants/client'

const Layout_Client = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation()
  const hidenHeaderFotter = routerConfig.hidenHeaderFooter.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  return (
    <div>
      <div className='dark:bg-[#131022] min-h-screen flex flex-col'>
        {!hidenHeaderFotter && <Header />}
        <main className='flex-grow'>{children || <Outlet />}</main>
        {!hidenHeaderFotter && <Footer />}l
      </div>
    </div>
  )
}

export default Layout_Client
