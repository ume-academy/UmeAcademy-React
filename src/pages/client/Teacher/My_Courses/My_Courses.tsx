import Card from '@/components/client/commonComponents/Card/Card'
import Loading from '@/components/client/commonComponents/Loading/Loading'
import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useGetAllCourseOfTeacherQuery } from '@/redux/slices/course/courseApiSlice'
import { Pagination } from 'antd'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const My_Courses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching } = useGetAllCourseOfTeacherQuery({ page: currentPage })

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
        {data?.data && data?.data.length > 0 ? (
          <div className='flex flex-wrap gap-10 justify-center md:justify-between lg:gap-x-2 p-3'>
            {data?.data.map((course: TCourse) => <Card {...course} key={course.id} />)}
          </div>
        ) : (
          <div className='flex flex-col gap-y-2 justify-center items-center min-h-[400px] text-black dark:text-[#B9B7C0]'>
            <p>Bạn chưa tạo khóa học nào. Hãy bắt đầu tạo ra khóa học của riêng bạn</p>
            <Link
              to={`${router.formCourse}`}
              className='py-2 px-4 w-full md:w-auto mt-4 text-white  bg-[#f84563]  rounded-md  border  border-transparent  hover:border-[#f84563]  hover:bg-white  hover:text-[#f84563] dark:hover:bg-[#efeff2] dark:hover:text-[#b9b7c0]'
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
