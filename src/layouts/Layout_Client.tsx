import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { routerConfig } from '../contants/client'
import Footer from '@/components/client/commonComponents/Footer/Footer'

const Layout_Client = ({ children }: { children?: React.ReactNode }) => {
  const [isVisible, setisVisible] = useState(false)
  const location = useLocation()

  const hidenHeaderFotter = routerConfig.hidenHeaderFooter.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  useEffect(() => {
    const toogleVisible = () => {
      if(window.scrollY > 500) {
        setisVisible(true)
      }else{
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
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className='dark:bg-[#131022] min-h-screen flex flex-col'>
        {/* {!hidenHeaderFotter && <Header />} */}
        <main className='flex-grow'>{children || <Outlet />}</main>
        {!hidenHeaderFotter && <Footer />}
        {isVisible && (
          <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 100 }}  // Bắt đầu ở dưới
          animate={{ opacity: 1, y: 0 }}    // Xuất hiện tại vị trí 0
          whileHover={{ scale: 1.2 }}       // xác định trạng thái khi hover vào nút.
          whileTap={{ scale: 0.9 }}         // Hiệu ứng sau khi click
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            padding: "0.5rem 0.8rem",
            backgroundColor: "#f66962",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          ⬆ 
        </motion.button>
        )}
      </div>
    </div>
  )
}

export default Layout_Client
