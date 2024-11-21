import Card from '@/components/client/commonComponents/Card/Card'
import { getTitleTab } from '@/constants/client'
import { TCourse } from '@/interfaces/TCourse'
import { useGetInfoCourseByIdQuery } from '@/redux/slices/courseSlice'
import { Pagination } from 'antd'
import { easeInOut, motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'

const My_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })

  const { data: data1 } = useGetInfoCourseByIdQuery(24)
  const { data: data2 } = useGetInfoCourseByIdQuery(22)

  const course: TCourse = data1
  const course2: TCourse = data2

  console.log('Course_1:', course)
  console.log('Course_2:', course2)
  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Danh sách khóa học')}</title>
      </Helmet>
      <div className=' border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white  max-w-[400px] md:max-w-[800px] p-4 lg:p-0 lg:max-w-full '>
        <div className='border-b border-[#e9ecef]  dark:border-[#5a5a5a]'>
          <p className='p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78]  text-2xl font-title'>Các khóa học của tôi</p>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={bottomRef}
          className='flex flex-wrap gap-10 justify-center md:justify-between lg:gap-2  p-3'
        >
          <Card {...course} />
          <Card {...course2} />
          <Card {...course} />
          <Card {...course2} />
        </motion.div>
      </div>
      <div className='flex justify-end mt-10 '>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default My_Courses
