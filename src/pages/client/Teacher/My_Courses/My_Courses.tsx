import Card from '@/components/client/commonComponents/Card/Card'
import { getTitleTab } from '@/constants/client'
import { smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useGetAllCourseOfTeacherQuery } from '@/redux/slices/course/courseApiSlice'
import { Pagination } from 'antd'
import { easeInOut, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

const My_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const { data } = useGetAllCourseOfTeacherQuery({ per_page: perPage, page: currentPage })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  
  console.log(data)
  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Danh sách khóa học')}</title>
      </Helmet>
      <div className=' border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white  p-4 lg:p-0'>
        <div className='border-b border-[#e9ecef]  dark:border-[#5a5a5a]'>
          <p className='p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78]  text-2xl font-title'>Các khóa học của tôi</p>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
          transition={{ duration: 1, ease: easeInOut }}
          ref={bottomRef}
          className='flex flex-wrap gap-10 justify-center md:justify-between lg:gap-x-2 p-3'
        >
          {data && data?.data.map((course:TCourse)=>(
            <Card {...course} key={course.id} />
          ))}
        </motion.div>
      </div>
      <div className='flex justify-end mt-10 '>
        <Pagination total={data?.meta?.total} current={currentPage} pageSize={perPage} onChange={handlePageChange} />
      </div>
    </div>
  )
}

export default My_Courses
