import { Form, Input, Radio } from 'antd'
import './paymentMethodAntd.scss'
import styles from './paymentMethods.module.scss'
import { Helmet } from 'react-helmet'
import { getTitleTab } from '@/contants/client'

const Payment_Methods = () => {

  const handleSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Phương thức thanh toán')}</title>
      </Helmet>

      <div className={`${styles['parent']} dark:border-transparent dark:bg-[#2B2838] border border-[#e9ecef] rounded-xl`}>
        <div className={`${styles['heading']} dark:text-[#b9b7c0] font-title text-2xl p-6`}>
          <h3>Phương thức thanh toán</h3>
        </div>

        <div className={`${styles['content']} p-6`}>
          <div className={`${styles['subHeading']} dark:text-[#b9b7c0] font-subtitle text-md pb-6`}>
            <h5>Lựa chọn phương thúc thanh toán</h5>
          </div>

          <Form
            layout='vertical'
            onFinish={handleSubmit}
          >
            <Form.Item name='payment_method'>
              <Radio.Group className='flex flex-col items-start dark:border-[#e9ecef] border border-[#e9ecef] p-4 rounded-lg'>
                <Radio
                  value='banking'
                  className='font-subtitle dark:text-[#e5e7eb] text-md'
                  checked
                >
                  Chuyển khoản ngân hàng
                </Radio>
              </Radio.Group>
            </Form.Item>

            <div className="dark:border-[#e9ecef] border border-[#e9ecef] p-4 rounded-lg">
              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#e5e7eb]'>Tên tài khoản</span>}>
                    <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#e5e7eb]'>Số tài khoản</span>}>
                    <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item name='name_banking' label={<span className='font-subtitle dark:text-[#e5e7eb]'>Tên ngân hàng</span>}>
                    <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#e5e7eb]'>Mã số IBAN</span>}>
                    <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#e5e7eb]'>BIC/SWIFT</span>}>
                    <Input className='  py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#e5e7eb]'>Số ti</span>}>
                    <Input className='  py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>
              </div>

              <Form.Item>
                <button type='submit' className='bg-[#f84563] text-white py-2 px-4 border-none hover:bg-[#e5e7eb] hover:text-[#000] rounded-md'>
                  Lưu tài khoản rút tiền
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}


export default Payment_Methods
