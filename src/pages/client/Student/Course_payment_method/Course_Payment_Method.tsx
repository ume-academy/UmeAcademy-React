import { Helmet } from 'react-helmet'
import { bankLogo, getTitleTab, vmpayLogo } from '../../../../contants/client'
import { BookFilled, WalletFilled } from '@ant-design/icons'
import { Radio, Modal } from 'antd'
import { useState } from 'react'

const Course_Payment_Method = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('Ume Wallet')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onChange = (e: any) => {
    setSelectedMethod(e.target.value)
  }

  const handleConfirm = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    // Logic thanh toán ở đây

    setIsModalVisible(false) // Ẩn modal
  }

  const handleCancel = () => {
    setIsModalVisible(false) // Ẩn modal
  }

  return (
    <div className='container mx-auto mt-40 mb-20 text-[#685f78] dark:text-[#B9B7C0]'>
      <Helmet>
        <title>{getTitleTab('Thanh toán khóa học')}</title>
      </Helmet>
      <div className='flex justify-between'>
        <div className='w-[56%] dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none text-xl mb-7'>
          <p className='text-xl font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] p-6'>
            Phương thức thanh toán
          </p>
          <Radio.Group onChange={onChange} value={selectedMethod} className='pl-6 pt-14 pb-14 w-full space-y-6'>
            <div className='flex gap-4 items-center w-full'>
              <Radio value='Ume Wallet' className='w-full '>
                <div className='flex items-center'>
                  <div className='relative flex items-center'>
                    <WalletFilled className='text-[#ff5364] text-[42px]' />
                    <span className='absolute top-1 left-2 text-[#fff] font-bold text-[9px]'>UME</span>
                  </div>
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua ví UME <span className='text-[16px]'>( Số dư: 1.000.000.000đ )</span>
                  </span>
                </div>
              </Radio>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Radio value='Bank Wallet' className='w-full '>
                <div className='flex items-center'>
                  <img src={vmpayLogo} width='40' className='rounded-lg border' />
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua ví VNPAY
                  </span>
                </div>
              </Radio>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <Radio value='E-Wallet' className='w-full '>
                <div className='flex items-center'>
                  <img src={bankLogo} width='40' className='rounded-lg border' />
                  <span className='ml-2 text-lg text-[#685f78] dark:text-[#B9B7C0] dark:hover:text-white'>
                    Thanh toán qua Ngân hàng
                  </span>
                </div>
              </Radio>
            </div>
          </Radio.Group>
        </div>

        <form className='w-[40%] dark:bg-[#2b2838] bg-white rounded-lg border border-[#e9ecef] dark:border-none mb-7 p-6'>
          <p className='text-xl font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] pb-4 mb-4'>Chi tiết</p>
          <div className='space-y-2 mb-5'>
            <p className='text-lg font-medium'>Thông tin về thiết kế bằng UI/UX</p>
            <p className='text-[14px]'>
              Giảng viên: <span>DaddyGiao</span>
            </p>
            <div className='flex justify-between text-[14px] mb-4'>
              <div className='flex items-center gap-1'>
                <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
                <span>12+ Bài học</span>
              </div>
              <p className=''>
                Giá: <span>1.000.000đ</span>
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <input
                type='text'
                placeholder='Mã giảm giá'
                className='border border-[#dce0eb] outline-none dark:bg-[#4a4755] dark:border-[#2b2838] h-11 pl-4 text-[14px] rounded-lg w-[80%]'
              />
              <button
                type='button'
                className='bg-[#ff5364] text-white h-10 w-20 text-[14px] rounded-lg hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
              >
                Sử dụng
              </button>
            </div>
          </div>

          <div className='flex justify-between w-full mb-5 font-semibold text-xl'>
            <p className=''>Tổng tiền:</p>
            <span className=''>1.000.000đ</span>
          </div>
          <div className='flex justify-center'>
            <button
              type='button'
              className='bg-[#ff5364] text-white h-12 w-full text-lg rounded-lg hover:border hover:text-[#ff5364] hover:border-[#ff5364] hover:bg-white transition duration-200'
              onClick={handleConfirm}
            >
              Thanh toán
            </button>
          </div>
        </form>
      </div>

      <Modal
        title='Xác nhận thanh toán khóa học?'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Thanh toán'
        okType='danger'
        cancelText='Hủy'
      >
        <p className='pt-4 pb-6'>
          Vui lòng kiểm tra lại thông tin trước khi thanh toán. Bạn có chắc chắn muốn thanh toán cho khóa học này không?
        </p>
      </Modal>
    </div>
  )
}

export default Course_Payment_Method
