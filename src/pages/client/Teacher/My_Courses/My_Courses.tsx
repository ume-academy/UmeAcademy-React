import Card from '@/components/client/commonComponents/Card/Card'
import Loading from '@/components/client/commonComponents/Loading/Loading'
import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useGetAllCourseOfTeacherQuery } from '@/redux/slices/course/courseApiSlice'
import { Pagination } from 'antd'
import { easeInOut, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const My_Courses = () => {
  const bottomRef = useRef(null)
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const { data, isLoading, isFetching } = useGetAllCourseOfTeacherQuery({ per_page: perPage, page: currentPage })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )
  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Danh sách khóa học')}</title>
      </Helmet>
      <div className=' border border-[#e9ecef] rounded-lg dark:border-transparent  text-[#685f78] dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white  p-4 lg:p-0'>
        <div className='border-b border-[#e9ecef]  dark:border-[#5a5a5a]'>
          <p className='p-4 lg:p-6 dark:text-[#b9b7c0] text-[#685f78]  text-2xl font-title'>Các khóa học của tôi</p>
        </div>
        {data?.data.length > 0 ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
            transition={{ duration: 1, ease: easeInOut }}
            ref={bottomRef}
            className='flex flex-wrap gap-10 justify-center md:justify-between lg:gap-x-2 p-3'
          >
            {data?.data.map((course: TCourse) => <Card {...course} key={course.id} />)}
          </motion.div>
        ) : (
          <div className='flex flex-col gap-y-6 justify-center items-center h-[366px] dark:text-[#B9B7C0] text-lg md:text-xl'>
            <p>Bạn chưa tạo khóa học nào. Hãy bắt đầu tạo ra khóa học của riêng bạn</p>
            <Link
              to={`${router.formCourse}`}
              className=' flex justify-center py-3 w-44  text-white  bg-[#f84563]  rounded-md  border  border-transparent  hover:border-[#f84563]  hover:bg-white  hover:text-[#f84563] dark:hover:bg-[#efeff2] dark:hover:text-[#b9b7c0]'
            >
              Thêm khóa học
            </Link>
          </div>
        )}
      </div>
      <div className='flex justify-between items-center my-6 text-sm'>
        <p className='dark:text-[#b9b7c0]'>
          Trang số <span className='text-[#F84563] font-subtitle'>{data?.meta?.current_page}</span> trên tổng số{' '}
          <span className='text-[#F84563] font-subtitle'>{data?.meta?.last_page}</span> trang
        </p>
        <Pagination
          pageSize={data?.meta?.per_page}
          total={data?.meta?.total}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default My_Courses
