import { routerConfig } from '@/contants/client'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/client/commonComponents/Footer/Footer'
import Header from '../components/client/commonComponents/Header/Header'
import Sidebar_Teacher from '../components/client/teacher/SidebarTeacher/Sidebar_Teacher'

const Layout_Teacher = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation()
  const hideSideBar = routerConfig.hiddenSideberTeacher.includes(location.pathname)

    //  Ẩn đi sidebar cho các route trong routerConfig ở file client.ts
    const hideSideBarWithId = routerConfig.hiddenSideberTeacher.some((route) => {
      const regex = new RegExp(`^${route.replace(":id", "[^/]+")}$`);
      return regex.test(location.pathname);
    });

    const hidenHeaderFotterWithId = routerConfig.hidenHeaderFooter.some((route) => {
      const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
      return regex.test(location.pathname)
    })
  

  return (
    <div className={`dark:bg-[#131022] ${hidenHeaderFotterWithId ? '' : 'bg-[#fafafa]'}`}>
      {!hidenHeaderFotterWithId && <Header />}
      <div className={`${hidenHeaderFotterWithId ? 'py-0' : 'py-[140px] w-[1280px] mx-auto' } `}>
        <div className='flex gap-4'>
          {/* Sidebar */}
          {!(hideSideBar || hideSideBarWithId) && (
            <div className='w-[25%]'>
            <Sidebar_Teacher />
          </div>
          )}

          <div className='flex-1'>{children || <Outlet />}</div>
        </div>
      </div>
      {!hidenHeaderFotterWithId && <Footer />}
    </div>
  )
}

export default Layout_Teacher
