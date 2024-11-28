import { formatPrice } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { useGetInfoCourseByIdQuery } from '@/redux/slices/course/courseApiSlice'
import { useCheckOutMutation } from '@/redux/slices/payment/checkOutApiSlice'
import { useCheckVoucherMutation } from '@/redux/slices/voucher/checkVoucherApiSlice'
import { BookFilled } from '@ant-design/icons'
import { message, Radio } from 'antd'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { getTitleTab } from '../../../../constants/client'
import './RadioAntd.scss'
import { useGetPaymentMethodsQuery } from '@/redux/slices/payment_method/paymentMethodApiSlice'
import { TPaymentMethob } from '@/interfaces/TPaymentMethob'

const Course_Payment_Method = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null)
  const { startLoading, loading, stopLoading } = useLoading()
  const { id } = useParams()
  const courseId = Number(id)
  const { data: course } = useGetInfoCourseByIdQuery(courseId)
  const { data: methob } = useGetPaymentMethodsQuery({})
  const [checkOut] = useCheckOutMutation()
  const [checkVoucher] = useCheckVoucherMutation()
  const [voucherCode, setVouCherCode] = useState<String | undefined>(undefined)
  const [voucherId, setVoucherId] = useState<Number | null>(null)
  const [discountPrice, setDiscountPrice] = useState<Number>()

  // console.log(methob?.data)

  const onChangeMethod = (e: any) => {
    setSelectedMethod(e.target.value)
  }
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitPayment = async () => {
    startLoading
    try {
      const paymentData: any = {
        origin_price: course?.price,
        course_id: Number(id),
        payment_method_id: selectedMethod
      }
      if (voucherId != null) {
        paymentData.voucher_id = voucherId
      }
      const res = await checkOut(paymentData)

      const checkout = res.data

      if (checkout) {
        window.location.href = checkout.checkoutUrl
      }
    } catch (error) {
      console.log(error)
      message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!')
    } finally {
      stopLoading
    }
  }

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
              {methob?.data.map((m: TPaymentMethob) => (
                <Radio value={Number(m.id)} className='w-full' key={m.id}>
                  {/* <img src={vmpayLogo} alt='VNPAY' width='50' className='rounded-lg border' /> */}
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
          <div className='space-y-3 p-4 md:px-6'>
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
              <input
                type='text'
                placeholder='Mã giảm giá'
                className='border border-[#dce0eb] outline-none dark:bg-[#4a4755] dark:border-[#2b2838] h-11 pl-4 text-[14px] rounded-lg w-[70%] '
                value={voucherCode as string}
                onChange={(e) => setVouCherCode(e.target.value)}
              />
              <button
                type='button'
                className='bg-[#ff5364] text-white h-10 w-20  text-[14px] rounded-lg hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
                onClick={handleVoucher}
                disabled={!voucherCode}
              >
                Sử dụng
              </button>
            </div>
            {discountPrice && (
              <p className='text-[14px]'>
                Số tiền đã được giảm: {formatPrice(Number(course?.price) - Number(discountPrice))}
              </p>
            )}

            <div className='flex justify-between w-full font-subtitle text-xl pt-3'>
              <p>Tổng tiền:</p>
              <span>
                {formatPrice(Math.min(Number(discountPrice) || Number(course?.price), Number(course?.price) || 0))}
              </span>
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-[#ff5364] text-white h-12 w-full text-lg rounded-lg hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
                disabled={!selectedMethod}
                onClick={handleSubmitPayment}
              >
                Thanh toán
              </button>
            </div>
            {!selectedMethod && (
              <div className='text-red-500 text-sm md:text-[16px] flex gap-1 items-center'>
                <span>
                  <CircleAlert size={16} />
                </span>
                <span>Vui lòng chọn phương thức thanh toán</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course_Payment_Method
