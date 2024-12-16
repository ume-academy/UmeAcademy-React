import Card from '@/components/client/commonComponents/Card/Card';
import Loading from '@/components/client/commonComponents/Loading/Loading';
import { router } from '@/configs/routes';
import { TCourse } from '@/interfaces/TCourse';
import { useGetAllFavoriteCoursesQuery } from '@/redux/slices/course/courseApiSlice';
import { Pagination } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Favorite_Courses = () => {

  const [page, setPage] = useState(1)

  const isLogin = localStorage.getItem('access_Token')

  const { data: favCourses, refetch, isLoading, isFetching } = useGetAllFavoriteCoursesQuery(page, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  });

  // console.log(favCourses)

  if (isLoading || isFetching) return <div className='min-h-screen flex justify-center items-center'><Loading /></div>

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] py-[60px] md:py-[80px]'>
      <div className="pt-10">
        <div className="heading dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none p-4 md:p-6 mb-7">
          <h3 className='font-title text-md md:text-xl'>Danh sách khóa học yêu thích [{favCourses?.data?.length > 0 ? favCourses?.data?.length : '0'}]</h3>
        </div>
      </div>

      <div className="content px-4 lg:px-0">
        {
          favCourses?.data?.length === 0 ? (
            // Không có khóa học yêu thích
            <div className=" text-center">
              <h3 className='font-title text-2xl py-4'>Tài khoản hiện tại của bạn không có khóa học yêu thích nào!</h3>

              <Link to={router.home}>
                <button className='px-9 py-3 rounded-full bg-[#ed4e37] text-white border hover:text-[#ed4e37] hover:border-[#d93a2a] hover:bg-white transition'>
                  Quay lại trang chủ
                </button>
              </Link>
            </div>
          ) : (
            <div className="">
              {/* // Danh sách khóa học yêu thích */}
              <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                  favCourses?.data?.map((item: TCourse, index: number) => (
                    <div key={index}>
                      <Card {...item} refetch={refetch} isLogin={isLogin}/>
                    </div>
                  ))
                }
              </div>

              <div className="flex justify-end py-4">
                <Pagination
                  pageSize={favCourses?.meta?.per_page}
                  total={favCourses?.meta?.total}
                  current={favCourses?.meta?.current_page}
                  onChange={(page) => setPage(page)}
                />
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Favorite_Courses