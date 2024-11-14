import { StarFilled } from '@ant-design/icons'
import { easeInOut, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { imageIntroduce, routerConfig, useIsMobile, useIsTablet } from '../../../../../constants/client'
import Search from '@/components/client/commonComponents/Header/Search/Search'
import { useMediaQuery } from 'react-responsive'

export const Introduce = () => {
  // Bật trạng thái trong suốt khi ở trang home
  const transperent = routerConfig.transparentHeader.includes(location.pathname)

  // Kiểm tra màn hình để thay đổi width của search
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  const [count, setCount] = useState(100) // Bắt đầu từ 100

  useEffect(() => {
    const target = 1000 // Mục tiêu là 1000
    const duration = 1500 // Thời gian hoàn thành (1 giây)
    const steps = 100 // Số bước
    const increment = (target - count) / steps // Giá trị tăng mỗi bước

    const interval = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount + increment
        if (newCount >= target) {
          clearInterval(interval)
          return target // Đảm bảo dừng lại ở 1000
        }
        return Math.floor(newCount) // Làm tròn số
      })
    }, duration / steps) // Cập nhật mỗi bước

    return () => clearInterval(interval) // Dọn dẹp khi component unmount
  }, [])

  return (
    <div>
      <div
        className={`min-h-[100vh] md:min-h-[50vh] lg:min-h-[100vh] pb-[140px] lg:pb-[200px] ${transperent && `bg-[url("/assets/images/client/homeBGR/banner.png")] bg-cover bg-center`
          } dark:bg-[#131022] dark:bg-none`}
      >
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 1, ease: easeInOut }}
          className='max-w-[768px] pt-[100px] px-[16px] grid grid-cols-1
                    md:max-w-[1024px] 
                    lg:max-w-[1280px] lg:pt-[160px] lg:px-0 mx-auto md:grid-cols-2 lg:grid-cols-2'
        >
          <div className='lg:justify-self-start'>
            <h4 className='text-[16px] mb-[26px] text-[#685f78] dark:text-[#B9B7C0] lg:text-[20px] font-title'>
              UMECADEMY dẫn đầu trong học tập trực tuyến
            </h4>

            <h1 className='text-[32px] mb-[20px] font-title leading-[44px]
                           lg:leading-[60px] text-[#22100d] dark:text-[#B9B7C0]
                           lg:text-[48px] max-w-[300px] md:max-w-[400px] lg:max-w-[500px]'>
              Các khóa học trực tuyến hấp dẫn và dễ tiếp cận dành cho tất cả mọi người
            </h1>

            {/* Kiểm tra nếu là mobi và tablet thì cho hiển thị search */}
            {(isMobile || isTablet)  && (<Search />)}
            
            <p className='text-[16px] mb-4 lg:mb-[30px] text-[#685f78] dark:text-[#B9B7C0] lg:text-[18px]'>
              Sở hữu tương lai của bạn bằng cách học các kỹ năng mới trực tuyến
            </p>
            <p className='text-[16px] text-[#685f78] dark:text-[#B9B7C0] lg:text-[20px] mb-6 lg:mb-[10px]'>
              Được hơn 15 nghìn người tin dùng <br /> trên cả nước kể từ năm 2024
            </p>

            {/*div Star  */}
            <div className='flex dark:text-[#B9B7C0]'>
              <h1 className='font-title text-[32px] lg:text-[48px] mr-14 transition-all ease-in-out'>{Math.floor(count)}+</h1>
              <div className='flex items-center'>
                <h1 className='font-title text-[32px] lg:text-[48px]'>4.4</h1>
                <div className='ml-4'>
                  <StarFilled className='text-yellow-400 mr-1 lg:mr-4 text-[14px] lg:text-[20px]' />
                  <StarFilled className='text-yellow-400 mr-1 lg:mr-4 text-[14px] lg:text-[20px]' />
                  <StarFilled className='text-yellow-400 mr-1 lg:mr-4 text-[14px] lg:text-[20px]' />
                  <StarFilled className='text-yellow-400 mr-1 lg:mr-4 text-[14px] lg:text-[20px]' />
                  <StarFilled className='text-yellow-400 mr-1 lg:mr-4 text-[14px] lg:text-[20px]' />
                </div>
              </div>
            </div>
          </div>

          <div className='w-[340px] md:w-[360px] lg:w-[522px] mt-10 md:mt-0 lg:mt-0 justify-self-center md:justify-self-end  lg:justify-self-end '>
            <img src={imageIntroduce} alt='' />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
