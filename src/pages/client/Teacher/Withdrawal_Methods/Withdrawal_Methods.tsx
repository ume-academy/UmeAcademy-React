import { getTitleTab } from '@/constants/client';
import { Form, Input, Select } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import './withdrawalMethodAntd.scss'; // SCSS cho thành phần này
import styles from './withdrawalMethods.module.scss';

const Withdrawal_Methods = () => {

  const [sttChecked, setSttChecked] = useState('default');

  const handleChangeCheckbox = (e: any) => {
    console.log(e);

    setSttChecked(e);
  }

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Phương thức thanh toán')}</title>
      </Helmet>

      <div className="p-4 lg:p-0">
        <div className={`${styles['parent']} payment-method-wrapper dark:border-transparent dark:bg-[#2B2838] border border-[#e9ecef] rounded-xl`}>
          <div className={`${styles['heading']} dark:text-[#b9b7c0] dark:border-b-[#5a5a5a] border-b-[#e9ecef]  text-[#685f78] font-title text-2xl p-6`}>
            <h3>Phương thức rút tiền</h3>
          </div>

          <div className={`${styles['content']} p-6`}>
            <div className={`${styles['subHeading']} dark:text-[#b9b7c0] text-[#685f78] font-subtitle text-md pb-6`}>
              <h5>Lựa chọn phương thúc rút tiền</h5>
            </div>

            <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item name='payment_method'>
                <Select
                  className='slc'
                  onChange={handleChangeCheckbox}
                  defaultValue={'default'}
                >
                  <Select.Option value="default">Chọn ngân hàng</Select.Option>
                  <Select.Option value="mb_bank">MB Bank</Select.Option>\
                  <Select.Option value="vietinbank">Vietinbank</Select.Option>
                  <Select.Option value="tp_bank">TP Bank</Select.Option>
                  <Select.Option value="sacombank">Sacombank</Select.Option>
                </Select>
              </Form.Item>

              {
                sttChecked !== 'default' ? (
                  <div className="dark:border-transparent border border-[#e9ecef] p-4 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                      <div className="flex-1">
                        <Form.Item
                          name='name_account'
                          label={
                            <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>
                              Tên tài khoản
                            </span>
                          }>
                          <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div>

                      <div className="flex-1">
                        <Form.Item
                          name='number_account'
                          label={
                            <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>
                              Số tài khoản
                            </span>
                          }>
                          <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                      {/* <div className="flex-1">
                        <Form.Item
                          name='name_banking'
                          label={
                            <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>
                              Tên ngân hàng
                            </span>
                          }>
                          <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div> */}

                      {/* <div className="flex-1">
                        <Form.Item
                          name='bic_swift_number'
                          label={
                            <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>
                              BIC/SWIFT
                            </span>
                          }>
                          <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div>

                      <div className="flex-1">
                        <Form.Item
                          name='iban_number'
                          label={
                            <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'
                            >
                              Mã số IBAN
                            </span>
                          }>
                          <Input className='py-2 haha font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div> */}
                    </div>

                    {/* <div className="flex gap-6">
                      <div className="flex-1">
                        <Form.Item 
                        name='bic_swift_number' 
                        label={
                        <span className='font-subtitle dark:text-[#b9b7c0] text-[#685f78]'>
                          BIC/SWIFT
                          </span>
                        }>
                          <Input className='py-2 font-semibold dark:text-[#b9b7c0] bg-transparent' />
                        </Form.Item>
                      </div>

                      <div className="flex-1 hidden md:block">
                      </div>
                    </div> */}

                    <Form.Item>
                      <button
                        type='submit'
                        className='bg-[#f84563] w-full md:w-[20%] mt-4 md:mt-0 text-white py-2 px-4 border border-transparent dark:border-[#f84563] hover:bg-white hover:text-[#f84563] hover:border-[#f84563] rounded-md'
                      >
                        Lưu tài khoản rút tiền
                      </button>
                    </Form.Item>

                  </div>
                ) : (
                  ''
                )
              }
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal_Methods;
