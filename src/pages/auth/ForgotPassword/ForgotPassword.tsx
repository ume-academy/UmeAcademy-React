// img
import { useEffect, useState } from 'react'

// css
import styles from '../auth.module.scss'

//
import { router } from '@/configs/routes'
import { dataCarousel } from '@/constants/auth'
import { useForgotPasswordMutation } from '@/redux/slices/auth/authApiSlice'
import { LoadingOutlined } from '@ant-design/icons'
import { Form, Input, message } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { getTitleTab, logo } from '../../../constants/client'

const ForgotPassword = () => {
  const [index, setIndex] = useState(0)
  const [form] = Form.useForm()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const next = () => {
    if (index === dataCarousel.length - 1) {
      setIndex(0) // Nếu đã đến cuối mảng, quay lại chỉ số 0
    } else {
      setIndex(index + 1) // Nếu chưa đến cuối mảng, tăng chỉ số thêm 1
    }

    // alert(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 4000) // Chuyển ảnh sau 2s

    return () => {
      clearInterval(interval) // Clear interval khi component bị hủy
    }
  }, [index])

  const onFinish = async (email: string) => {
    try {
      const res = await forgotPassword({ email }).unwrap()
      message.success('Đã gửi yêu cầu khôi phục lại mật khẩu cho email của bạn')
      console.log(res)
    } catch (error) {
      message.error('Đã xảy ra lỗi khi đặt lại mật khẩu')
      console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Quên mật khẩu')}</title>
      </Helmet>

      <div className={`${styles['parent']} flex `}>
        <div className='hidden md:block flex-1'>
          <div
            className={`${styles['left']} dark:bg-[#131022] dark:bg-none dark:text-[#B9B7C0] flex flex-col space-y-4 justify-between`}
          >
            <img src={dataCarousel[index].path} alt='' />

            <div className='text-center'>
              <h1 className='text-2xl font-title'>{dataCarousel[index].title}</h1>
              <p className='text-md dark:text-[#B9B7C0] text-[#22100d]'>{dataCarousel[index].description}</p>
            </div>
          </div>
        </div>

        <div className={`${styles['right']} dark:text-[#B9B7C0] dark:bg-[#2b2838]  bg-[#fff]`}>
          <div className={`${styles['top']}  p-5  md:p-10  lg:p-10 xl:p-20  space-y-6`}>
            <div className={`${styles['heading']} flex justify-between items-center`}>
              <div className={`${styles['logo']} text-3xl font-title`}>
                <Link to={router.home}>
                  <img src={logo} alt='' width={150} />
                </Link>
              </div>

              <div className=''>
                <Link to={router.home} className='underline text-gray-400 hover:text-[#FF875A]'>
                  Quay lại trang chủ
                </Link>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='title'>
                <h1 className='text-2xl'>Quên mật khẩu?</h1>
              </div>

              <Form form={form} onFinish={onFinish} layout='vertical' className={`${styles['form']} space-y-7`}>
                <p>Nhập Email của bạn để tạo lại mật khẩu mới.</p>
                <div className='space-y-2'>
                  <label className='font-subtitle text-[16px]'>
                    Email <span className='text-red-500'>*</span>
                  </label>
                  <Form.Item
                    name='email'
                    className={`${styles['formGroup']} `}
                    rules={[
                      { required: true, message: 'Vui lòng nhập địa chỉ email!' },
                      { type: 'email', message: 'Email không đúng định dạng' }
                    ]}
                  >
                    <Input placeholder='Email' className={`${styles['ant-input-outlined']} border-[2px] py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`} />
                  </Form.Item>
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <button className={`${styles['btn']} font-subtitle text-lg text-white py-4 mt-6 rounded-md`}>
                    <span>Xác nhận</span> {isLoading && <LoadingOutlined />}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
