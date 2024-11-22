import { formatPrice } from '@/components/client/commonComponents/Card/Card'
import { useGetInfoCourseByIdQuery } from '@/redux/slices/course/courseSlice'
import { useCheckOutMutation } from '@/redux/slices/payment/checkoutApiSlice'
import { useCheckVoucherMutation } from '@/redux/slices/voucher/checkVoucherApiSlice'
import { BookFilled } from '@ant-design/icons'
import { message, Modal, Radio } from 'antd'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { getTitleTab, vmpayLogo } from '../../../../constants/client'
import './RadioAntd.scss'

const Course_Payment_Method = () => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { id } = useParams()
  const { data } = useGetInfoCourseByIdQuery(id)
  const [checkOut] = useCheckOutMutation()
  const [checkVoucher] = useCheckVoucherMutation()
  const [voucherCode, setVouCherCode] = useState<String | undefined>(undefined)
  const [voucherId, setVoucherId] = useState<Number | null>(null)
  const [discountPrice, setDiscountPrice] = useState<Number>()

  const onChangeMethod = (e: any) => {
    setSelectedMethod(e.target.value)
  }
  const handleVoucher = async () => {
    try {
      const res = await checkVoucher({ code: voucherCode, course_id: id })
      if (res.data) {
        setVoucherId(res.data.id)
        const discountPercentage = res.data.discount || 0

        const discountAmount = ((data?.price as number) * discountPercentage) / 100

        const discountedPrice = (data?.price as number) - discountAmount
        setDiscountPrice(discountedPrice)
        message.success('Sử dụng voucher thành công!')
      } else {
        message.error('Voucher không hợp lệ hoặc đã hết hạn')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirm = () => {
    Modal.confirm({
      title: <span className='text-red-500 font-title text-[16px] md:text-lg'>Xác nhận thanh toán khóa học này</span>,
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78] text-sm md:text-[16px]'>
          Vui lòng kiểm tra lại thông tin trước khi thanh toán. Bạn có chắc chắn muốn thanh toán cho khóa học này không?
        </p>
      ),
      okText: 'Thanh toán',
      okType: 'danger',
      cancelText: 'Hủy',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' } // Màu nền, viền và chữ nút OK
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn'
      },
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null,
      onOk: handleSubmitPayment
    })
  }

  const handleSubmitPayment = async () => {
    setConfirmLoading(true)
    try {
      const paymentData: any = {
        origin_price: data?.price,
        course_id: Number(id),
        payment_method_id: selectedMethod
      }

      await new Promise((resolve) => setTimeout(resolve, 1666))

      if (voucherId != null) {
        paymentData.voucher_id = voucherId;
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
      setConfirmLoading(false)
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
            {/* <div className='flex gap-4 items-center w-full'>
              <Radio value='Ume Wallet' className='w-full '>
                <div className='flex items-center'>
                  <WalletFilled className='text-[#ff5364] text-[41px] rounded-[6px]' />
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua ví UME <span className='text-[16px]'>( Số dư: 1.000.000.000đ )</span>
                  </span>
                </div>
              </Radio>
            </div> */}
            <div className='flex gap-4 items-center w-full'>
              <Radio value={2} className='w-full '>
                <div className='flex items-center'>
                  <img src={vmpayLogo} alt='VNPAY' width='50' className='rounded-lg border' />
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua ví VNPAY
                  </span>
                </div>
              </Radio>
            </div>
            {/* <div className='flex gap-4 items-center w-full'>
              <Radio value='E-Wallet' className='w-full '>
                <div className='flex items-center'>
                  <div className='text-white'>
                    <div className='border bg-[#000000] rounded-lg p-2'>
                      <Landmark size={22} />
                    </div>
                  </div>
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua Ngân hàng
                  </span>
                </div>
              </Radio>
            </div> */}
          </Radio.Group>
        </div>

        <div className='w-full lg:w-[39%] dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none mb-7'>
          <p className='text-2xl font-title border-b border-[#e9ecef] dark:border-[#5a5a5a] p-4 md:p-6'>Chi tiết</p>
          <div className='space-y-3 p-4 md:px-6'>
            <p className='text-lg font-medium h-11'>{data?.name}</p>
            <p className='text-[14px]'>
              Giảng viên: <span>{data?.teacher.fullname}</span>
            </p>
            <div className='flex justify-between text-[14px]'>
              <div className='flex items-center gap-1'>
                <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
                <span>{data?.total_lesson}+ Bài học</span>
              </div>
              <p>
                Giá: <span>{formatPrice(Number(data?.price))}</span>
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

            <div className='flex justify-between w-full font-subtitle text-xl pt-3'>
              <p>Tổng tiền:</p>
              <span>
                {formatPrice(Math.min(Number(discountPrice) || Number(data?.price), Number(data?.price) || 0))}
              </span>
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-[#ff5364] text-white h-12 w-full text-lg rounded-lg hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
                onClick={handleConfirm}
                disabled={!selectedMethod}
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
