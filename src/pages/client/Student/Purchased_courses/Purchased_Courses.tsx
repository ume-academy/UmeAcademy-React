import { motion, easeInOut, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '../../../../contants/client'
import { Pagination } from 'antd'
import Card, { CardProps } from '@/components/client/commonComponents/Card/Card'

const Purchased_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  //data card
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
    <div className='w-[1280px] mx-auto  mt-40 mb-20 text-[#685f78] dark:text-[#B9B7C0]'>
      <Helmet>
        <title>{getTitleTab('Khóa học đã mua')}</title>
      </Helmet>
      <div className=' dark:bg-[#2b2838] bg-white  rounded-lg border border-[#e9ecef] dark:border-none text-2xl font-title p-6 mb-7'>
        Các khóa học đã mua
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1, ease: easeInOut }}
        ref={bottomRef}
        className='grid grid-cols-4 gap-7'
      >
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
        <Card {...cardData} />
      </motion.div>
      <div className='flex justify-end mt-10 '>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default Purchased_Courses
