import { router } from '@/configs/routes';
import { useGetAllFavoriteCoursesQuery } from '@/redux/slices/course/favorite/favoriteCourseApiSlice';
import { Link } from 'react-router-dom';

const Favorite_Courses = () => {

  const { data: favCourses, isLoading, isFetching} = useGetAllFavoriteCoursesQuery([]);

  console.log(favCourses)


  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] py-[80px]'>
      <div className="py-20">
        <div className="heading dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-2xl md:text-3xl sm:text-4xl font-title p-4 md:p-6 mb-7">
          <h3>Danh sách khóa học yêu thích [0]</h3>
        </div>
      </div>

      <div className="content">
        {
          favCourses?.data?.length === 0 ? (
            // Không có khóa học yêu thích
            <div className=" text-center">
              <h3 className='font-title text-2xl'>Tài khoản hiện tại của bạn không có khóa học yêu thích nào!</h3>

              <Link to={router.home}>Quay lại trang chủ</Link>
            </div>
          ) : (
            // Danh sách khóa học yêu thích
            <h1>List</h1>
          )
        }
      </div>
    </div>
  )
}

export default Favorite_Courses