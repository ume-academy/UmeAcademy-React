import Card from '@/components/client/commonComponents/Card/Card'
import { Pagination } from 'antd'
import { easeInOut, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '../../../../constants/client'
import { TCourse } from '@/interfaces/TCourse'
import { useGetPurchasedCoursesQuery } from '@/redux/slices/course/courseSlice'

const Purchased_Courses = () => {
  const bottomRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 2  
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })

  const { data } = useGetPurchasedCoursesQuery({ per_page: perPage, page: currentPage })

  console.log("Data", data)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const meta = data?.meta 
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
        {data?.data.map((courses: TCourse) => <Card key={courses.id} {...courses} />)}
      </motion.div>
      <div className='flex justify-end mt-10'>
        <Pagination
          current={currentPage}
          total={meta?.total}  
          pageSize={perPage}  
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Purchased_Courses
