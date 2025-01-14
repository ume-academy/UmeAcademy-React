import Card from '@/components/client/commonComponents/Card/Card'
import { router } from '@/configs/routes'
import { smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useGetAllFavoriteCoursesQuery, useGetPurchasedCoursesQuery } from '@/redux/slices/course/courseApiSlice'
import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { getTitleTab } from '../../../../constants/client'
import DotLoader from '@/components/client/commonComponents/Loader/DotLoader'

const Purchased_Courses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const isLogin = localStorage.getItem('access_Token')
  const perPage = 6
  const { data, isFetching, isLoading, refetch } = useGetPurchasedCoursesQuery({ per_page: perPage, page: currentPage })
  const { refetch: refetchFav} = useGetAllFavoriteCoursesQuery([])


  // console.log(data)

  useEffect(() => {
    refetch()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] mt-20 mb-10 md:mt-28 md:mb-20'>
      <Helmet>
        <title>{getTitleTab('Khóa học đã mua')}</title>
      </Helmet>
      <div className='dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-xl font-title p-4 md:p-6 mb-7'>
        Các khóa học đã mua
      </div>

      {isLoading || isFetching ? (
        <div className='min-h-screen'>
          <DotLoader/>
        </div>
      ) : data?.data && data?.data.length > 0 ? (
        <div className='flex flex-wrap gap-16 justify-center lg:justify-normal lg:gap-[26px]'>
          {data?.data.map((courses: TCourse) => <Card key={courses.id} {...courses} refetch={refetchFav} isLogin={isLogin}/>)}
        </div>
      ) : (
        <div className='flex flex-col gap-y-6 justify-center items-center h-[366px] dark:text-[#B9B7C0] text-lg md:text-xl'>
          <p>Bạn chưa đăng ký khóa học nào. Hãy bắt đầu khám phá và mua khóa học yêu thích của bạn.</p>
          <Link
            to={`${router.home}`}
            className='flex justify-center py-3 w-44 text-white bg-[#f84563] rounded-md border border-transparent hover:border-[#f84563] hover:bg-white hover:text-[#f84563] dark:hover:bg-[#efeff2] dark:hover:text-[#b9b7c0]'
          >
            Xem khóa học
          </Link>
        </div>
      )}
      <div className='flex justify-between items-center my-6 text-sm'>
        <p className='dark:text-[#b9b7c0]'>
          Trang số <span className='text-[#F84563] font-subtitle'>{data?.meta?.current_page}</span> trên tổng số{' '}
          <span className='text-[#F84563] font-subtitle'>{data?.meta?.last_page}</span> trang
        </p>
        <Pagination
          pageSize={data?.meta?.per_page}
          total={data?.meta?.total}
          current={data?.meta?.current_page}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default Purchased_Courses
