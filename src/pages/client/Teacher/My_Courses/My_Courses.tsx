import Card, { CardProps } from '@/components/client/commonComponents/Card/Card'
import { getTitleTab } from '@/contants/client'
import { Pagination } from 'antd'
import { motion, easeInOut, useInView } from 'framer-motion'
import { useRef } from "react"
import { Helmet } from 'react-helmet'

const My_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  const cardData: CardProps = {
    image: 'https://i.pravatar.cc',
    title: 'Thông tin về thiết kế bằng UI/UX',
    instructorName: 'DaddyGiao',
    instructorImage: 'https://i.pravatar.cc/150',
    price: '1.000.000 đ',
    originalPrice: '9.000.000 đ',
    lessonCount: '12+ Bài học',
    duration: '9h 30p',
    rating: 5,
  };

  return (
    <div className=" text-[16px]">
      <Helmet>
        <title>{getTitleTab('Danh sách khóa học')}</title>
      </Helmet>
      <div className=" border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white">
        <div className="border-b border-[#e9ecef]  dark:border-[#5a5a5a]">
          <p className="p-6 dark:text-[#b9b7c0] text-[#685f78]  text-2xl font-title">
            Các khóa học của tôi
          </p>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={bottomRef} className="grid grid-cols-3 gap-6 p-6">
          <Card {...cardData} />
          <Card {...cardData} />
          <Card {...cardData} />
          <Card {...cardData} />
          <Card {...cardData} />
          <Card {...cardData} />
        </motion.div>
      </div>
      <div className='flex justify-end mt-10 '>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default My_Courses