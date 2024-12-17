import { formatPrice } from '@/constants/utils'
import { TPaymentMethob } from '@/interfaces/TPaymentMethob'
import { useCheckOutMutation, useGetInfoCourseByIdQuery } from '@/redux/slices/course/courseApiSlice'
import { useGetPaymentMethodsQuery } from '@/redux/slices/payment_method/paymentMethodApiSlice'
import { useCheckVoucherMutation } from '@/redux/slices/voucher/voucherApiSlice'
import { BookFilled, LoadingOutlined } from '@ant-design/icons'
import { Input, message, Radio } from 'antd'
import { Check, CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import { getTitleTab } from '../../../../constants/client'
import './RadioAntd.scss'
import { router } from '@/configs/routes'

const Course_Payment_Method = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null)
  const { id } = useParams()
  const courseId = Number(id)
  const { data: course } = useGetInfoCourseByIdQuery(courseId)
  const { data: methob } = useGetPaymentMethodsQuery({})
  const [checkOut, { isLoading: loadingCheckout, error }] = useCheckOutMutation()
  const [checkVoucher, { isLoading }] = useCheckVoucherMutation()
  const [voucherCode, setVouCherCode] = useState<String | undefined>(undefined)
  const [voucherId, setVoucherId] = useState<Number | null>(null)
  const [discountPrice, setDiscountPrice] = useState<Number | null>(null)
  const nav = useNavigate()

  const onChangeMethod = (e: any) => {
    setSelectedMethod(e.target.value)
  }

  useEffect(() => {
    if (course?.is_enrolled) {
      message.warning('Bạn đã sỡ hữu khóa học này rồi.')
      nav(`${router.purchasedCourses}`)
    }
  }, [course?.is_enrolled, nav])

  const handleVoucher = async () => {
    try {
      const voucher = {
        code: String(voucherCode),
        course_id: courseId
      }
      const res = await checkVoucher(voucher)

      if (res.data) {
        setVoucherId(res.data.id)
        const discountPercentage = res.data.discount || 0
        const discountAmount = ((course?.price as number) * discountPercentage) / 100
        const discountedPrice = (course?.price as number) - discountAmount
        setDiscountPrice(discountedPrice)
        message.success('Sử dụng voucher thành công!')
      } else {
        message.error('Voucher không hợp lệ hoặc đã hết hạn')
        setDiscountPrice(null)
      }
    } catch (error) {
      console.log(error)
      setDiscountPrice(null)
    }
  }

  const handleVoucherCodeChange = (e: any) => {
    setVouCherCode(e.target.value)

    if (e.target.value === '') {
      setDiscountPrice(null)
    }
  }

  const handleClearVoucher = () => {
    setVoucherId(null)
    setDiscountPrice(null)
    setVouCherCode('')
  }

  //Hiển thị lỗi bên be trả về
  useEffect(() => {
    const errorData = (error as { data?: any })?.data
    if (errorData && errorData.error) {
      message.error(errorData.error)
    }
  }, [error])

  const handleSubmitPayment = async () => {
    try {
      const paymentData: any = {
        origin_price: course?.price,
        course_id: Number(id),
        payment_method_id: selectedMethod
      }

      if (voucherId) {
        paymentData.voucher_id = Number(voucherId)
        if (discountPrice === 0) {
          paymentData.payment_method_id = 3
          setSelectedMethod(3)
        }
      }
      console.log(paymentData)

      const res = await checkOut(paymentData)

      console.log(res)

      const successData = (res.data as { data?: string }).data
      if (successData && successData === 'success') {
        message.success('Thanh toán khóa học thành công!')
        nav(`${router.courseDetail.replace(':id', String(id))}`)
      }

      if (res.data && res.data?.checkoutUrl) {
        message.success('Vui lòng chờ trong giây lát')
        window.location.href = res.data.checkoutUrl
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(discountPrice)

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] mt-20 mb-10 md:mt-40 md:mb-20'>
      <Helmet>
        <title>{getTitleTab('Thanh toán khóa học')}</title>
      </Helmet>
      <div className='flex flex-wrap justify-between sm:justify-center flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-[59%] dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-xl mb-7'>
          <p className='font-title text-2xl border-b border-[#e9ecef] dark:border-[#5a5a5a] p-4 md:p-6'>
            Phương thức thanh toán
          </p>
          <Radio.Group onChange={onChangeMethod} value={selectedMethod} className='pl-6 pt-14 pb-14  w-full space-y-6'>
            <div className='space-y-4 w-full'>
              {methob?.data
                .filter((m: TPaymentMethob) => m.id != 3)
                .map((m: TPaymentMethob) => (
                  <Radio value={Number(m.id)} className='w-full' key={m.id}>
                    <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                      Thanh toán qua phương thức {m.name}
                    </span>
                  </Radio>
                ))}
            </div>
          </Radio.Group>
        </div>

        <div className='w-full lg:w-[39%] dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none mb-7'>
          <p className='text-2xl font-title border-b border-[#e9ecef] dark:border-[#5a5a5a] p-4 md:p-6'>Chi tiết</p>
          <div className='space-y-3 p-4 md:px-6  mb-6'>
            <p className='text-lg font-medium h-11'>{course?.name}</p>
            <p className='text-[14px]'>
              Giảng viên: <span>{course?.teacher.fullname}</span>
            </p>
            <div className='flex justify-between text-[14px]'>
              <div className='flex items-center gap-1'>
                <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
                <span>{course?.total_lesson}+ Bài học</span>
              </div>
              <p>
                Giá: <span>{formatPrice(Number(course?.price))}</span>
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <Input
                type='text'
                placeholder='Mã giảm giá'
                className=' dark:bg-[#2b2838] px-3 py-3 text-[14px] rounded-lg w-[72%] '
                value={voucherCode as string}
                onChange={handleVoucherCodeChange}
                allowClear
                onClear={handleClearVoucher}
              />
              <button
                type='button'
                className='bg-[#ff5364] text-white w-20 py-3 border border-[#ff5364]  text-[14px] rounded-lg hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
                onClick={handleVoucher}
                disabled={!voucherCode}
              >
                {isLoading ? <LoadingOutlined /> : <span>Sử dụng</span>}
              </button>
            </div>

            {discountPrice !== null && discountPrice !== undefined && (
              <p className='text-[14px]'>
                Số tiền đã được giảm:{' '}
                {discountPrice === course?.price
                  ? formatPrice(Number(course?.price))
                  : formatPrice(Number(course?.price) - Number(discountPrice))}
              </p>
            )}

            <div className='flex justify-between w-full font-subtitle text-xl pt-3'>
              <p>Tổng tiền:</p>
              <span>
                {discountPrice !== null && discountPrice !== undefined
                  ? formatPrice(Number(discountPrice))
                  : formatPrice(Number(course?.price))}
              </span>
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-[#ff5364] text-white h-12 w-full border-[#ff5364] text-lg rounded-lg 
              hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white 
              transition duration-200'
                disabled={discountPrice !== 0 && !selectedMethod}
                onClick={handleSubmitPayment}
              >
                Thanh toán {loadingCheckout && <LoadingOutlined />}
              </button>
            </div>

            {discountPrice !== 0 && !selectedMethod ? (
              <div className='text-red-500 text-sm md:text-[16px] flex gap-1 items-center'>
                <span>
                  <CircleAlert size={16} />
                </span>
                <span>Vui lòng chọn phương thức thanh toán</span>
              </div>
            ) : discountPrice === 0 && (
              <div className='text-green-400 text-sm md:text-[16px] flex gap-1 items-center'>
                <span>
                  <Check size={16} />
                </span>
                <span>Nhấn thanh toán để hoàn thành thanh toán khóa học</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course_Payment_Method
