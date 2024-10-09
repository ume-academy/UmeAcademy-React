import { Outlet } from 'react-router-dom'
import Sidebar_Teacher from '../components/client/teacher/SidebarTeacher/Sidebar_Teacher'
import Header from '../components/client/CommonComponents/Header/Header'
import Footer from '../components/client/CommonComponents/Footer/Footer'

const Layout_Teacher = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className='py-[80px] my-6 container mx-auto'>
        <div className='flex gap-4'>
          {/* Sidebar */}
          <div className='w-[25%]'>
            <Sidebar_Teacher />
          </div>

          <div className='flex-1'>{children || <Outlet />}</div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout_Teacher
