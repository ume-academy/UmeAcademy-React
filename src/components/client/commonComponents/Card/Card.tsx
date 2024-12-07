import { router } from '@/configs/routes'
import { getButtonDetails } from '@/constants/client'
import { formatPrice, formatSeconds } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { BookFilled, FieldTimeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { message, Modal, Rate, TreeSelect } from 'antd'
import { motion } from 'framer-motion'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const CustomTreeSelect = styled(TreeSelect)`
  .ant-select-selector {
    width: 100% !important; /* Đảm bảo chiều rộng 100% */
    background-color: #fafafa !important;
    border: 1px solid #c1c9d2 !important;
  }
  .dark & .ant-select-selector {
    background-color: #131022 !important;
    border: 1px solid #c7c7c740 !important;
  }
  .ant-select-selector .ant-select-selection-placeholder {
    color: #6e82a3 !important;
  }
  .dark & .ant-select-selector .ant-select-selection-placeholder {
    color: #e9ecef !important;
  }
`
const Card = ({
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
  status
}: TCourse) => {
  const [heart, setHeart] = useState(is_wishlist)
  const [isEnrolled, setIsEnrolled] = useState(is_enrolled)
  const { buttonText, targetPath } = getButtonDetails(isEnrolled, id, status)
  const location = useLocation()

  const isMyCoursesPage = location.pathname === `${router.myCourses}`
  const isHistoryLesson = location.pathname === `${router.purchasedCourses}`

  console.log(is_wishlist)
  console.log(status)

  useEffect(() => {
    setHeart(is_wishlist)
    setIsEnrolled(is_enrolled)
  }, [is_wishlist, is_enrolled])

  const handleClick = () => {
    if (heart) {
      setHeart(false)
      message.error('Đã bỏ khóa học khỏi danh sách yêu thích')
    } else {
      setHeart(true)
      message.success('Đã thêm khóa học vào danh sách yêu thích')
    }
  }

  const handleOpenModal = (type: 'refund' | 'delete' | 'review') => {
    if (!isHistoryLesson && !isMyCoursesPage) {
      return
    }

    Modal.confirm({
      title: (
        <p className='text-red-500 font-title text-[16px] md:text-lg'>
          {type === 'refund' ? 'Yêu cầu hoàn tiền khóa học' : 'Yêu cầu xóa khóa học'}
        </p>
      ),
      content: (
        <div className=' dark:text-[#b9b7c0] text-[#685f78]'>
          <div className='flex items-start gap-4 mb-4'>
            <img src={thumbnail} alt='' className='w-24 md:w-28 h-auto' />
            <div className='text-[15px] md:text-[17px] md:space-y-1'>
              <p className='text-[16px] md:text-xl line-clamp-2'>{name}</p>
              <p>Giá: {formatPrice(price)}</p>
              {/* <p>{type === 'refund' ? 'Thời gian mua:' : 'Thời gian tạo:'} {type === 'refund' ? purchaseDate : '02/11/2024'}</p> */}
            </div>
          </div>
          <div className='w-full space-y-1'>
            <CustomTreeSelect
              treeDefaultExpandAll
              className='w-full h-10 md:h-11 text-[15px] md:text-[17px]'
              placeholder={type === 'refund' ? 'Lý do hoàn tiền khóa học' : 'Lý do xóa khóa học'}
              treeData={[{ value: 0, title: <span className='text-green-500'>Như chim cút</span> }]}
            />
            {!isMyCoursesPage && (
              <div className='flex items-center gap-2 text-sm md:text-[16px]'>
                <CircleAlert size={14} />
                <p>Số tiền sẽ được hoàn về ví Ume</p>
              </div>
            )}
          </div>
        </div>
      ),
      okText: type === 'refund' ? 'Hoàn tiền' : 'Xóa',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn'
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null
    })
  }

  return (
    <div className='group dark:bg-[#2b2838] hover:bg-[#2b2838] dark:hover:text-white hover:text-white dark:text-[#B9B7C0] bg-white text-[#002058] w-[300px] text-[13px] border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden p-[17px] cursor-pointer'>
      <Link
        to={
          isMyCoursesPage
            ? `${router.courseManagement.replace(':id', String(id))}`
            : `${router.courseDetail.replace(':id', String(id))}`
        }
        className='group hover:text-white'
      >
        <div className='relative'>
          <div className='rounded-[10px] overflow-hidden'>
            <motion.img
              src={thumbnail}
              className='image w-full h-[220px] object-cover'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          <div className='absolute bottom-3 right-3 px-4 py-2 rounded-[6px] flex justify-between gap-2 items-center bg-white dark:bg-gray-900'>
            <p className='text-[15px] font-bold text-[#ff5364] dark:text-[#B9B7C0]'>{formatPrice(price)}</p>
            <p className='text-gray-400 line-through text-[12px] pt-[2px]'>{}</p>
          </div>
        </div>
      </Link>

      {!isMyCoursesPage && (
        <div className='mt-6 flex justify-between items-center'>
          <div className='flex items-center'>
            <img src={teacher?.avatar as string} alt='avatarTeacher' className='w-12 h-12 rounded-full object-cover' />
            <div className='ml-3'>
              <p className='hover:text-[#ff5364] text-[16px]'>{teacher?.fullname}</p>
              <p className=''>Giảng viên</p>
            </div>
          </div>
          <div onClick={handleClick} className='cursor-pointer text-xl'>
            {heart ? (
              <HeartFilled className='text-[#ff5364] group-hover:text-white' />
            ) : (
              <HeartOutlined className='text-[#ff5364] group-hover:text-white' />
            )}
          </div>
        </div>
      )}
      <Link
        to={
          isMyCoursesPage
            ? `${router.courseManagement.replace(':id', String(id))}`
            : `${router.courseDetail.replace(':id', String(id))}`
        }
        className='group hover:text-white'
      >
        <div className='space-y-5 mt-4'>
          <h3 className='text-[17px] h-12 hover:text-[#ff5364] w-[90%] line-clamp-2'>{name}</h3>
          <div className='flex justify-between items-center border-b border-b-gray-500 pb-4'>
            <div className='flex items-center gap-1'>
              <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
              <span>{total_lesson}+ Bài học</span>
            </div>
            {duration > 0 && (
              <div className='flex items-center gap-1'>
                <FieldTimeOutlined className='text-purple-500 text-lg group-hover:text-white' />
                <span>{formatSeconds(duration)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      <div className='flex justify-between items-center mt-4'>
        <span className='text-[11px] space-x-[6px]'>
          <Rate allowHalf value={Number(rating)} className='text-[11px] group-hover:text-white' disabled />
          <span>
            {rating} ({total_review})
          </span>
        </span>
        <Link to={targetPath}>
          <button
            onClick={() => handleOpenModal(buttonText === 'Hoàn tiền' ? 'refund' : 'delete')}
            className='border-[3px] border-[#b4a7f5] py-2 px-5 rounded-[50px] hover:bg-[#b4a7f5] hover:text-white text-[14px]'
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card
