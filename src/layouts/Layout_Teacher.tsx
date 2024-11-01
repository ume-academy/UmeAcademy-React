import Header_Mobile_Tablet from '@/components/client/commonComponents/Header/Header_Mobile_Tablet/Header_Mobile_Tablet'
import { routerConfig } from '@/contants/client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/client/commonComponents/Footer/Footer'
import Header from '../components/client/commonComponents/Header/Header'

const Layout_Teacher = ({ children }: { children?: React.ReactNode }) => {
  const [isVisible, setisVisible] = useState(false)
  const location = useLocation()
  const hideSideBar = routerConfig.hiddenSideberTeacher.includes(location.pathname)

  //  Ẩn đi sidebar cho các route trong routerConfig ở file client.ts
  const hideSideBarWithId = routerConfig.hiddenSideberTeacher.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const hidenHeaderFotterWithId = routerConfig.hidenHeaderFooter.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  useEffect(() => {
    const toogleVisible = () => {
      if (window.scrollY > 100) {
        setisVisible(true)
      } else {
        setisVisible(false)
      }
    }

    window.addEventListener('scroll', toogleVisible)
    return () => window.removeEventListener('scroll', toogleVisible)
  }, [])

  // Hàm cuộn mượt về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className={`dark:bg-[#131022] ${hidenHeaderFotterWithId ? '' : 'bg-[#fafafa]'}`}>
      {!hidenHeaderFotterWithId && (<><Header /> <Header_Mobile_Tablet /></>)}
      <div className={`${hidenHeaderFotterWithId ? 'py-0' : 'pt-28  mb-20 -mt-6 lg:pt-36'} flex justify-center`}>
        <div className='lg:w-[1280px] mx-auto'>
          <div className='flex gap-4'>
            {/* Sidebar */}
            {/* {!(hideSideBar || hideSideBarWithId) && (
              <div className="w-[25%]">
                <Sidebar_Teacher />
              </div>
            )} */}
            <div className='w-auto lg:w-[75%]'>{children || <Outlet />}</div>
          </div>
        </div>
      </div>

      {!hidenHeaderFotterWithId && <Footer />}
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 100 }} // Bắt đầu ở dưới
          animate={{ opacity: 1, y: 0 }} // Xuất hiện tại vị trí 0
          whileHover={{ scale: 1.2 }} // xác định trạng thái khi hover vào nút.
          whileTap={{ scale: 0.9 }} // Hiệu ứng sau khi click
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            padding: '0.5rem 0.8rem',
            backgroundColor: '#f66962',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          ⬆
        </motion.button>
      )}
    </div>
  )
}

export default Layout_Teacher
