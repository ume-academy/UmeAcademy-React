import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/client/CommonComponents/Footer/Footer'
import Header from '../Components/client/CommonComponents/Header/Header'
import { routerConfig } from '../contants/client'

const Layout_Client = ({children} : {children?: React.ReactNode}) => {

  const location = useLocation()
  const hidenHeaderFotter = routerConfig.hidenHeaderFooter.some((route) => {
    const regex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
    return regex.test(location.pathname)
  })

  return (
    <div>
      <div className="dark:bg-[#131022] min-h-screen flex flex-col">
            {!hidenHeaderFotter && <Header />}
            <main className='flex-grow'>
                {children || <Outlet /> }
            </main>
            {!hidenHeaderFotter && <Footer/>}
        </div>
    </div>
  )
}

export default Layout_Client

