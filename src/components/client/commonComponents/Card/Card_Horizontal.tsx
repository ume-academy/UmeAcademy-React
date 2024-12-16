import { router } from '@/configs/routes'
import { getButtonDetails } from '@/constants/client'
import { formatPrice, formatSeconds } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { useAddCourseToFavoriteMutation, useRemoveCourseInFavoriteMutation } from '@/redux/slices/course/courseApiSlice'
import { BookFilled, FieldTimeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { message, Rate } from 'antd'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type CardProps = TCourse & {
  refetch: () => void; // Hoặc kiểu tương ứng của `refetch`
  isLogin?: string | null; // Hoặc kiểu tương ứng của `isLogin`
};

const Card_Horizontal = ({
  thumbnail,
  name,
  id,
  price,
  rating,
  total_lesson,
  total_review,
  teacher,
  duration,
  is_wishlist,
  is_enrolled,
  status,
  refund,
  transaction_code,
  total_student,
  refetch, // Thêm prop refetch
  isLogin, // Thêm prop isLogin
}: CardProps) => {

  const [heart, setHeart] = useState(is_wishlist)
  const [isEnrolled, setIsEnrolled] = useState(is_enrolled)
  const { buttonText, targetPath } = getButtonDetails(isEnrolled, id, status, refund, transaction_code)

  const nav = useNavigate();

  const [addToFav] = useAddCourseToFavoriteMutation()
  const [removeCourseInFavorite] = useRemoveCourseInFavoriteMutation()

  useEffect(() => {
    setHeart(is_wishlist);
    setIsEnrolled(is_enrolled);
  }, [is_wishlist, is_enrolled]);


  console.log('is_log', isLogin)


  // ADD, REMOVE COURSE IN FAV
  const handleClickForFav = async (courseId: string | number) => {

    if(!isLogin) return message.error('Vui lòng đăng nhập để thực hiện chức năng này!')

    try {
      await message.loading({ content: `Đang xử lý...`, key: 'loading' })

      heart ? await removeCourseInFavorite(courseId) : await addToFav(courseId)
      refetch()
      message.success(`${heart ? 'Xóa' : 'Thêm mới'} khóa học vào danh sách yêu thích thành công!`);

    } catch (error) {
      console.log(error)
      return message.error('Đã xảy ra lỗi, vui lòng thử lại sau!')
    }
  }

  return (
    <div className='group flex flex-col md:flex-row w-full dark:bg-[#2b2838] hover:bg-[#2b2838] dark:hover:text-white hover:text-white dark:text-[#B9B7C0] bg-white text-[#002058] text-[13px] border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden p-4 cursor-pointer'>
      <Link
        to={`${router.courseDetail.replace(':id', String(id))}`}
        className='group flex flex-col md:flex-row md:items-center gap-4 hover:text-white'
      >
        <div className='relative'>
          <div className='rounded-[10px] overflow-hidden '>
            <motion.img
              src={thumbnail}
              alt='thumbnail'
              className='image w-full  md:w-[296px] h-[230px] md:h-[186px] object-cover'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <div className='absolute bottom-3 right-3 px-4 py-2 rounded-[6px] flex justify-between gap-2 items-center bg-white dark:bg-gray-900'>
            <p className='text-[15px] font-bold text-[#ff5364] dark:text-[#B9B7C0]'>{formatPrice(price)}</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-col-reverse flex-1'>
          <div className='space-y-6 md:space-y-2'>
            <span className='text-[11px] space-x-2 hidden md:block'>
              <Rate allowHalf value={Number(rating)} className='text-[13px] group-hover:text-white' disabled />
              <span>
                {rating} ({total_review})
              </span>
            </span>
            <div className='flex justify-between items-start'>
              <Link to={`${router.teacherInfoCourse.replace(':id', String(id))}`} className='hover:text-inherit'>
                <div className='flex items-center'>
                  <img
                    src={teacher?.avatar as string}
                    alt='avatar'
                    className='w-12 h-12 md:w-14 md:h-14 rounded-full'
                  />
                  <div className='ml-3'>
                    <p className='hover:text-[#ff5364] text-[16px] md:text-[17px] line-clamp-1'>{teacher?.fullname}</p>
                    <p className='md:text-sm'>Giảng viên</p>
                  </div>
                </div>
              </Link>

              <div onClick={() => handleClickForFav((id))} className='cursor-pointer text-xl block md:hidden'>
                {heart ? (
                  <HeartFilled className='text-[#ff5364] group-hover:text-white' />
                ) : (
                  <HeartOutlined className='text-[#ff5364] group-hover:text-white' />
                )}
              </div>
            </div>
          </div>

          <div className='space-y-3'>
            <h3 className='text-[17px] md:text-lg  hover:text-[#ff5364] line-clamp-2 h-14 mt-3 md:mt-0'>{name}</h3>
            <div className='flex justify-between md:justify-start items-center gap-4 pb-4'>
              <div className='flex items-center gap-1'>
                <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
                <span>{total_lesson}+ Bài học</span>
              </div>
              <div className='flex items-center gap-1'>
                <FieldTimeOutlined className='text-purple-500 text-lg group-hover:text-white' />
                <span>{formatSeconds(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <span className='bg-gray-500 h-[1px] block md:hidden'></span>
      <div className='flex flex-row md:flex-col flex-1 justify-between items-center md:items-end mt-4'>
        <div onClick={() => handleClickForFav(id)} className='cursor-pointer text-xl'>
          {heart ? (
            <HeartFilled className='text-[#ff5364] group-hover:text-white' />
          ) : (
            <HeartOutlined className='text-[#ff5364] group-hover:text-white' />
          )}
        </div>

        <span className='text-[11px] space-x-2 block md:hidden'>
          <Rate allowHalf value={Number(rating)} className='text-[11px] group-hover:text-white' disabled />
          <span>
            {rating} ({total_review})
          </span>
        </span>
        <Link to={targetPath} className='hover:text-inherit'>
          <button className='border-[3px] w-[120px] border-[#b4a7f5] py-3 rounded-[50px] hover:bg-[#b4a7f5] hover:text-white text-[14px]'>
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card_Horizontal
