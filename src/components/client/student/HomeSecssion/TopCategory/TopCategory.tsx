import { easeInOut, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { medal, ruler, tutor, university } from '../../../../../contants/client'
import SliderCategory from './SliderCategory'

const TopCategory = () => {
  // Sử dụng để bắt sự kiện hover vào card thông tin
  const [hoverStates, setHoverStates] = useState([false, false, false, false])

  // Sử dụng để bắt sự kiện hover vào card thông tin
  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates]
    newHoverStates[index] = true
    setHoverStates(newHoverStates)
  }

  // Sử dụng để bắt sự kiện hover vào card thông tin
  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates]
    newHoverStates[index] = false
    setHoverStates(newHoverStates)
  }

  // Tạo ref cho từng khối (ref: tro tới phần tử dom mà được gọi và render)
  const topRef = useRef(null)
  const middleRef = useRef(null)
  const bottomRef = useRef(null)

  // Theo dõi theo từng khối ref để tạo hiệu ứng cho nó
  const isTopInView = useInView(topRef, { amount: 0.1, once: true }) //amount: % phần tử khi di chuyển đến sẽ xuất hiện | once: không lặp lại
  const isMiddleInView = useInView(middleRef, { amount: 0.1, once: true })
  const isBottomInView = useInView(middleRef, { amount: 0.1, once: true })

  return (
    <>
      <div className='max-w-[1296px] mx-auto pb-[80px]'>
        <div className=''>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={isTopInView ? { y: 0, opacity: 100 } : {}}
            transition={{ duration: 1, ease: easeInOut }}
            ref={topRef}
            className='grid grid-cols-4 gap-7 relative mt-[-60px]'
          >
            {/* Số lượng khóa học */}
            <motion.div
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={() => handleMouseLeave(1)}
              animate={hoverStates[1] ? { y: -10 } : {}}
              className='flex items-center p-[26px] border-[1px] border-[#e9ecef] dark:border-transparent bg-[#fff] dark:bg-[#2b2838] rounded-2xl'
            >
              <div className='w-[81px] h-[81px] bg-[#fff0ee] rounded-full p-4'>
                <img className='w-full h-full object-cover' src={ruler} alt='' />
              </div>
              <div className='ml-[20px]'>
                <h4 className='dark:text-[#B9B7C0] text-[#000] text-[20px] font-title'>10 nghìn</h4>
                <p className='dark:text-[#B9B7C0] text-[#000] text-[16px]'>Các khóa học trực tuyến</p>
              </div>
            </motion.div>
            {/* Gia sư chuyên gia */}
            <motion.div
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={() => handleMouseLeave(2)}
              animate={hoverStates[2] ? { y: -10 } : {}}
              className='flex items-center p-[26px] border-[1px] border-[#e9ecef] dark:border-transparent bg-[#fff] dark:bg-[#2b2838] rounded-2xl'
            >
              <div className='w-[81px] h-[81px] bg-[#ecedfe] rounded-full p-3'>
                <img className='w-full h-full object-cover' src={tutor} alt='' />
              </div>
              <div className='ml-[20px]'>
                <h4 className='dark:text-[#B9B7C0] text-[#000] text-[20px] font-title'>200+</h4>
                <p className='dark:text-[#B9B7C0] text-[#000] text-[16px]'>Gia sư chuyên gia</p>
              </div>
            </motion.div>
            {/* Các khóa học */}
            <motion.div
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={() => handleMouseLeave(3)}
              animate={hoverStates[3] ? { y: -10 } : {}}
              className='flex items-center p-[26px] border-[1px] border-[#e9ecef] dark:border-transparent bg-[#fff] dark:bg-[#2b2838] rounded-2xl'
            >
              <div className='w-[116px] h-[81px] bg-[#fff2f8] rounded-full p-3'>
                <img className='w-full h-full object-cover' src={medal} alt='' />
              </div>
              <div className='ml-[20px]'>
                <h4 className='dark:text-[#B9B7C0] text-[#000] text-[20px] font-title'>6K +</h4>
                <p className='dark:text-[#B9B7C0] text-[#000] text-[16px]'>Các khóa học được chứng nhận</p>
              </div>
            </motion.div>
            {/* Các học viên */}
            <motion.div
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={() => handleMouseLeave(4)}
              animate={hoverStates[4] ? { y: -10 } : {}}
              className='flex items-center p-[26px] border-[1px] border-[#e9ecef] dark:border-transparent bg-[#fff] dark:bg-[#2b2838] rounded-2xl'
            >
              <div className='w-[81px] h-[81px] bg-[#eafdff] rounded-full p-3'>
                <img className='w-full h-full object-cover' src={university} alt='' />
              </div>
              <div className='ml-[20px]'>
                <h4 className='dark:text-[#B9B7C0] text-[#000] text-[20px] font-title'>60 nghìn +</h4>
                <p className='dark:text-[#B9B7C0] text-[#000] text-[16px]'>Học viên trực tuyến</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isMiddleInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={middleRef}
          className='flex justify-between items-center mb-[18px] pt-[80px]'
        >
          <div className=''>
            <p className='text-[#f66962] mb-[18px] text-[18px] font-subtitle'>Khóa học yêu thích</p>
            <h1 className='dark:text-[#B9B7C0] text-[#0b0b0b] text-[36px] font-title'>Danh mục hàng đầu</h1>
          </div>
          <Link
            to={``}
            className='mr-[20px] border-[2px] min-w-[140px] transition-all duration-300 ease-in-out dark:text-[#b9b7c0] flex justify-center items-center rounded-3xl border-[#b4a7f5] text-[#392c7d] px-[15px] py-[10px] hover:bg-[#917cf6] hover:border-transparent dark:hover:text-[#fff] hover:text-[#fff]'
          >
            Tất cả các danh mục
          </Link>
        </motion.div>
        <motion.p
          initial={{ y: 100, opacity: 0 }}
          animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={bottomRef}
          className='max-w-[700px] text-[#685f78] dark:text-[#B9B7C0] mb-[80px]'
        >
          {' '}
          Khám phá danh mục hàng đầu với những khóa học chất lượng cao, được thiết kế để giúp bạn nâng cao kỹ năng và
          kiến thức. Từ các khóa học chuyên sâu cho đến các chương trình đào tạo ngắn hạn, hãy tìm cho mình lộ trình học
          tập phù hợp để mở rộng sự nghiệp và đạt được mục tiêu cá nhân. Tham gia ngay để không bỏ lỡ cơ hội phát triển
          bản thân!
        </motion.p>
        <SliderCategory />
      </div>
    </>
  )
}

export default TopCategory
