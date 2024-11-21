import { motion, easeInOut, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '../../../../constants/client'
import { Pagination } from 'antd'
import Card from '@/components/client/commonComponents/Card/Card'
import { useGetInfoCourseByIdQuery } from '@/redux/slices/courseSlice'
import { TCourse } from '@/interfaces/TCourse'

const Purchased_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  const { data: data1 } = useGetInfoCourseByIdQuery(24)
  const { data: data2 } = useGetInfoCourseByIdQuery(22)

  const course: TCourse = data1
  const course2: TCourse = data2

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] mt-20 mb-10 md:mt-40 md:mb-20'>
      <Helmet>
        <title>{getTitleTab('Khóa học đã mua')}</title>
      </Helmet>
      <div className='dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-2xl md:text-3xl sm:text-4xl font-title p-4 md:p-6 mb-7'>
        Các khóa học đã mua
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1, ease: easeInOut }}
        ref={bottomRef}
        className='flex flex-wrap gap-16 justify-center lg:justify-normal lg:gap-[26px]'
      >
        <Card {...course} />
        <Card {...course2} />
        <Card {...course} />
        <Card {...course2} />
      </motion.div>
      <div className='flex justify-end mt-10'>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default Purchased_Courses
