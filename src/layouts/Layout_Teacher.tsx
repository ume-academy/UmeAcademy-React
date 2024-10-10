import { Outlet } from 'react-router-dom'
import Sidebar_Teacher from '../components/client/teacher/SidebarTeacher/Sidebar_Teacher'
import Header from '../components/client/commonComponents/Header/Header'
import Footer from '../components/client/commonComponents/Footer/Footer'

const Layout_Teacher = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='dark:bg-[#131022]'>
      <Header />
      <div className='py-[140px] w-[1280px] mx-auto'>
        <div className='flex gap-4'>
          {/* Sidebar */}
          <div className='w-[25%]'>
            <Sidebar_Teacher />
          </div>

          <div className='flex-1'>{children || <Outlet />}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout_Teacher
