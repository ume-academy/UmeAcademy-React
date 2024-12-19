import Loading from '@/components/client/commonComponents/Loading/Loading'
import { getTitleTab } from '@/constants/client'
import { useTeacherInfoCourseQuery } from '@/redux/slices/teacher/profile/profileTeacherApiSlice'
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'

const Teacher_Info_Course = () => {
  const { id } = useParams()
  const { data, isLoading, isFetching } = useTeacherInfoCourseQuery({ id })

  if (isLoading || isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /></div>

  return (
    <div className='max-w-full md:max-w-[1024px] lg:max-w-[1066px] p-4 lg:p-6 mx-auto text-[#685f78] dark:text-[#B9B7C0] mt-24 mb-10 md:mt-32 md:mb-20 flex flex-wrap-reverse md:flex-wrap justify-center md:justify-between items-start gap-y-10 border shadow-md'>
      <Helmet>
        <title>{getTitleTab('Thông tin giảng viên')}</title>
      </Helmet>
      <div className='space-y-6 md:space-y-10 w-full md:w-[70%] '>
        <div className='space-y-3'>
          <p>Giảng viên</p>
          <h1 className='text-4xl text-gray-800 dark:text-gray-200 font-title pb-2 md:pb-1'>{data?.data.fullname}</h1>
          <b className='text-gray-700 dark:text-gray-300'>{data?.data.email}</b>
        </div>
        <div className='flex items-center gap-10'>
          <div>
            <p>Tổng khóa học</p>
            <b className='text-xl text-gray-700 dark:text-gray-300'>{data?.data.total_course}</b>
          </div>
          <div>
            <p>Đánh giá</p>
            <b className='text-xl text-gray-700 dark:text-gray-300'>{data?.data.count_review}</b>
          </div>
        </div>
        <div className='space-y-2'>
          <b className='text-lg text-gray-700 dark:text-gray-300'>Giới thiệu</b>
          <p>{data?.data.bio}</p>
        </div>
      </div>
      <div className='space-y-6 w-full md:w-[26%]   flex flex-col justify-center items-center'>
        <div>
          <img
            src={data?.data.avatar as string}
            alt='avatarTeacher'
            className='w-40 h-40 md:w-56 md:h-56 rounded-full object-cover mx-auto'
          />
        </div>
        <div className='flex flex-wrap gap-3 items-center justify-between'>
          {data?.data.twitter && (
            <Link
              to={`${data?.data.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center py-2 gap-2 hover:text-white hover:bg-[#f84563] rounded-md border border-[#f84563]   bg-white  text-[#f84563]  w-[45%] md:w-full'
            >
              <Twitter /> <span>Twitter</span>
            </Link>
          )}
          {data?.data.facebook && (
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to={`${data?.data.facebook}`}
              className='flex items-center justify-center py-2 gap-2 hover:text-white hover:bg-[#f84563] rounded-md border border-[#f84563]   bg-white  text-[#f84563]  w-[45%] md:w-full'
            >
              <Facebook /> <span>Facebook</span>
            </Link>
          )}
          {data?.data.linkedin && (
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to={`${data?.data.linkedin}`}
              className='flex items-center justify-center py-2 gap-2 hover:text-white hover:bg-[#f84563] rounded-md border border-[#f84563]   bg-white  text-[#f84563]  w-[45%] md:w-full'
            >
              <Linkedin /> <span>Linkedin</span>
            </Link>
          )}
          {data?.data.youtube && (
            <Link
              target='_blank'
              rel='noopener noreferrer'
              to={`${data?.data.youtube}`}
              className='flex items-center justify-center py-2 gap-2 hover:text-white hover:bg-[#f84563] rounded-md border border-[#f84563]   bg-white  text-[#f84563]  w-[45%] md:w-full'
            >
              <Youtube /> <span>Youtube</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Teacher_Info_Course
