import { Form, Input, Radio } from 'antd';
import './paymentMethodAntd.scss'; // SCSS cho thành phần này
import styles from './paymentMethods.module.scss';
import { Helmet } from 'react-helmet';
import { getTitleTab } from '@/contants/client';

const Payment_Methods = () => {

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Phương thức thanh toán')}</title>
      </Helmet>

      <div className={`${styles['parent']} payment-method-wrapper dark:border-transparent dark:bg-[#2B2838] border border-[#e9ecef] rounded-xl`}>
        <div className={`${styles['heading']} dark:text-[#b9b7c0] dark:border-b-[#5a5a5a] border-b-[#e9ecef]  text-[#685f78] font-title text-2xl p-6`}>
          <h3>Phương thức thanh toán</h3>
        </div>

        <div className={`${styles['content']} p-6`}>
          <div className={`${styles['subHeading']} dark:text-[#b9b7c0] text-[#685f78] font-subtitle text-md pb-6`}>
            <h5>Lựa chọn phương thúc thanh toán</h5>
          </div>

          <Form layout='vertical' onFinish={handleSubmit}>
            <Form.Item name='payment_method'>
              <Radio.Group className='flex flex-col items-start dark:border-[#5a5a5a] border border-[#e9ecef] p-4 rounded-lg'>
                <Radio
                  value='banking'
                  className='font-subtitle dark:text-[#b9b7c0] text-[#685f78] text-md'
                  checked
                >
                  Chuyển khoản ngân hàng
                </Radio>
              </Radio.Group>
            </Form.Item>

            <div className="dark:border-[#5a5a5a] border border-[#e9ecef] p-4 rounded-lg">
              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>Tên tài khoản</span>}>
                    <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>Số tài khoản</span>}>
                    <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item name='name_banking' label={<span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>Tên ngân hàng</span>}>
                    <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>Mã số IBAN</span>}>
                    <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <Form.Item label={<span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>BIC/SWIFT</span>}>
                    <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                  </Form.Item>
                </div>

                <div className="flex-1">
                </div>
              </div>

              <Form.Item>
                <button
                  type='submit'
                  className='bg-[#f84563] text-white py-2 px-4 border border-transparent dark:border-[#f84563] hover:bg-white hover:text-[#f84563] hover:border-[#f84563] rounded-md'
                >
                  Lưu tài khoản rút tiền
                </button>
              </Form.Item>

            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Payment_Methods;
