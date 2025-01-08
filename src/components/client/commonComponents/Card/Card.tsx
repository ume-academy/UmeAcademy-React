import { router } from '@/configs/routes'
import { getButtonDetails } from '@/constants/client'
import { formatPrice, formatSeconds } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { TCourse } from '@/interfaces/TCourse'
import { useAddCourseToFavoriteMutation, useRemoveCourseInFavoriteMutation, useTeacherRemoveCourseByIdMutation } from '@/redux/slices/course/courseApiSlice'
import { useCreateRefundRequestMutation } from '@/redux/slices/transaction/refundApiSlice'
import { BookFilled, FieldTimeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Rate, TreeSelect } from 'antd'
import { motion } from 'framer-motion'
import { CircleAlert, UserCheck } from 'lucide-react'
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

type CardProps = TCourse & {
  refetch?: () => void; // Hoặc kiểu tương ứng của `refetch`
  isLogin?: string | null; // Hoặc kiểu tương ứng của `isLogin`
};

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
  status,
  refund,
  transaction_code,
  total_student,
  refetch, // Thêm prop refetch
  isLogin, // Thêm prop isLogin
}: CardProps) => {


  const [heart, setHeart] = useState(is_wishlist)

  const [isEnrolled, setIsEnrolled] = useState(is_enrolled)

  const { buttonText, targetPath } = getButtonDetails(isEnrolled, id, status, refund, total_student)

  const location = useLocation()

  const [form] = Form.useForm()

  const { loading, startLoading, stopLoading } = useLoading()

  const isMyCoursesPage = location.pathname === `${router.myCourses}`

  const isHistoryLesson = location.pathname === `${router.purchasedCourses}`

  //* FAV
  const [addToFav] = useAddCourseToFavoriteMutation()
  const [removeCourseInFavorite] = useRemoveCourseInFavoriteMutation()
  // **

  //* REMOVE COURSE
  const [removeCourse] = useTeacherRemoveCourseByIdMutation();
  // **

  const [createRefundRequest] = useCreateRefundRequestMutation()

  // console.log(is_wishlist)

  useEffect(() => {
    setHeart(is_wishlist)
    setIsEnrolled(is_enrolled)
  }, [is_wishlist, is_enrolled])

  //! ADD, REMOVE COURSE IN FAV
  const handleClickForFav = async (courseId: string | number) => {

    if (!isLogin) return message.error('Vui lòng đăng nhập để thực hiện chức năng này!')

    try {

      await message.loading({ content: `Đang xử lý...`, key: 'loading' })

      // heart ? await removeCourseInFavorite(courseId) : await addToFav(courseId)

      if (heart) {
        const res = await removeCourseInFavorite(courseId)

        if (res.error) return message.error((res as any).error.data.error)

      } else {
        const res = await addToFav(courseId)

        if (res.error) return message.error((res as any).error.data.error)
      }

      if (refetch) {
        await refetch()
      }

      message.success(`${is_wishlist ? 'Xóa' : 'Thêm mới'} khóa học vào danh sách yêu thích thành công!`)

    } catch (error) {
      console.log(error)
      return message.error('Đã xảy ra lỗi, vui lòng thử lại sau!')
    }
  }

  //! REMOVE COURSE
  const handleRemoveCourse = (courseId: string | number, totalStudent: number) => {
    if (totalStudent !== 0) return message.error('Không thể xóa khóa học này khi đã có học viên tham gia!')

    // return alert('Xóa thành công!')

    return Modal.confirm({
      title: (
        <p className='text-red-500 font-title text-[16px] md:text-lg text-center'>
          Yêu cầu xóa khóa học
        </p>
      ),
      footer: null,
      closable: true,
      content: (
        <div className=' dark:text-[#b9b7c0] text-[#685f78]'>
          <div className='flex items-stretch gap-4 mb-4'>
            <img src={thumbnail} alt='' className='w-24 md:w-28 h-auto object-cover' />
            <div className='text-[15px] md:text-[17px] md:space-y-1'>
              <p className='text-[16px] md:text-xl line-clamp-2'>{name}</p>
              <p>Giá: {formatPrice(price)}</p>
              <p>Số lượng học viên tham gia: {totalStudent}</p>
            </div>
          </div>

          <div className='w-full space-y-1'>
            <p>Lưu ý: Sẽ không thể xóa nếu khóa học đã có học viên tham gia!</p>
          </div>

          <div className="flex items-end justify-end gap-x-4 pt-6">
            <div className="bg-transparent border border-[#f8f8f8] text-[#000] px-3 py-2 rounded-md cursor-pointer"
              onClick={() => Modal.destroyAll()}
            >
              Hủy
            </div>

            <div className="bg-[#F84563] border text-[#fff] px-3 py-2 rounded-md cursor-pointer"
              onClick={async () => {
                try {

                  // return alert(courseId)

                  const res = await removeCourse(id);

                  // console.log(res)

                  //* Đóng modal sau khi xác nhận
                  Modal.destroyAll();

                  //* error alert
                  if (res.error) return message.error((res as any).error.data.error)

                  //* success alert
                  return message.success(res.data.message)

                } catch (error) {
                  console.log(error)

                  return message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
                }
              }}
            >
              Xóa khóa học
            </div>
          </div>
        </div>
      ),
      // okText: 'Xóa khóa học',
      // okType: 'danger',
      // okButtonProps: {
      //   style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      // },
      // cancelButtonProps: {
      //   className: 'custom-cancel-btn'
      // },
      // cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null
    })
  }

  useEffect(() => {
    if (!isHistoryLesson) {
      form.resetFields()
    }
  }, [form])

  const onFinish = async (values: any) => {
    // console.log(values)

    if (!refund) return

    try {
      const res = await createRefundRequest({ ...values, transactionCode: transaction_code })

      // console.log(res)

      Modal.destroyAll();

      if (res.data) {
        message.success(res.data.message || 'Yêu cầu hoàn tiền thành công!')
      }

      if (res.error) {
        message.error((res.error as any)?.data?.message || 'Có lỗi từ hệ thống, vui lòng thử lại sau!')
      }
    } catch (error: any) {
      console.log(error)

      Modal.destroyAll();

      return message.error('Có lỗi từ hệ thống, vui lòng thử lại sau!')
    }
  }

  const handleOpenModal = (type: 'refund' | 'delete' | 'review') => {
    if (!isHistoryLesson && !isMyCoursesPage) return

    if (isHistoryLesson && refund) {
      return Modal.confirm({
        title: (
          <p className='text-red-500 font-title text-[16px] md:text-lg'>
            Yêu cầu hoàn tiền khóa học
          </p>
        ),
        footer: null,
        closable: true,
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

            {!isMyCoursesPage && (
              <div className='flex items-center gap-2 text-sm md:text-[16px] py-4'>
                <CircleAlert size={14} />
                <p>Số tiền sẽ được hoàn về ví Ume</p>
              </div>
            )}

            <div className='w-full space-y-1'>
              <Form form={form} layout='vertical' onFinish={onFinish} className='space-y-4'>
                <Form.Item
                  name='refund_reason'
                  label='Lý do hoàn tiền'
                  rules={[{ required: true, message: `Cần điền lý do hoàn trả để thực hiện yêu cầu!` }]}
                >
                  <Input placeholder='Nhập lý do hoàn tiền' className='py-3' disabled={loading} />
                </Form.Item>

                <Form.Item className='py-4'>
                  <Button
                    loading={loading}
                    disabled={loading}
                    htmlType='submit'
                    className='bg-[#ef4444] text-white py-2 px-6'
                  >
                    Xác nhận
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        ),
        okText: 'Hoàn tiền',
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
          {isMyCoursesPage && total_student !== 0 && (
            <div className='absolute top-0 left-0 flex items-center  gap-1 bg-[#ff5364] text-white px-6 py-1 rounded-tl-[10px]  rounded-br-[10px] font-medium text-[16px]'>
              <UserCheck size={16} strokeWidth={3} /> <p>{total_student} </p>
            </div>
          )}
          <div className='absolute bottom-3 right-3 px-4 py-2 rounded-[6px] flex justify-between gap-2 items-center bg-white dark:bg-gray-900'>
            <p className='text-[15px] font-bold text-[#ff5364] dark:text-[#B9B7C0]'>{formatPrice(price)}</p>
            <p className='text-gray-400 line-through text-[12px] pt-[2px]'>{ }</p>
          </div>
        </div>
      </Link>

      {!isMyCoursesPage && (
        <div className='mt-6 flex justify-between items-center'>
          <Link to={`${router.teacherInfoCourse.replace(':id', String(teacher.id))}`} className='hover:text-inherit'>
            <div className='flex items-center'>
              <img
                src={teacher?.avatar as string}
                alt='avatarTeacher'
                className='w-12 h-12 rounded-full object-cover'
              />
              <div className='ml-3'>
                <p className='hover:text-[#ff5364] text-[16px]'>{teacher?.fullname}</p>
                <p className=''>Giảng viên</p>
              </div>
            </div>
          </Link>
          <div onClick={() => handleClickForFav(id)} className='cursor-pointer text-xl'>
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
        <span className='text-[11px] space-x-[6px] flex items-center'>
          <Rate allowHalf value={Number(rating)} className='text-[11px] group-hover:text-white' disabled />
          <span>
            {rating} ({total_review})
          </span>
        </span>
        <Link to={targetPath}>
          <button
            onClick={() => {
              // Chức năng xóa khi pathname hiện tại === biến path
              location.pathname === `${router.myCourses}` ? (
                handleRemoveCourse(id, total_student)
              ) :
                handleOpenModal(buttonText === 'Hoàn tiền' ? 'refund' : 'refund')
              form.resetFields()
            }}
            className={`border-[3px] border-[#b4a7f5] py-2 px-[17px] rounded-[50px] hover:bg-[#b4a7f5] hover:text-white text-[14px]`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div >
  )
}

export default Card
