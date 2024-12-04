// img
import { useEffect, useState } from 'react'

// css
import styles from '../auth.module.scss'

//
import { router } from '@/configs/routes'
import { dataCarousel } from '@/constants/auth'
import { TResetPass } from '@/interfaces/TAuth'
import { useResetPasswordMutation } from '@/redux/slices/auth/authApiSlice'
import { Form, Input, message } from 'antd'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { getTitleTab, logo } from '../../../constants/client'
import { LoadingOutlined } from '@ant-design/icons'

const ResetPassword = () => {
  const [index, setIndex] = useState(0)
  const [form] = Form.useForm()
  const [forgotPassword, { isLoading }] = useResetPasswordMutation()
  const nav = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const token = params.get('token')
    const email = params.get('email')

    if (!token || !email) {
      message.error('Bạn chưa xác thực email! Vui lòng vào email xác thức để đặt lại mật khẩu')
    }

    form.setFieldValue('email', email)
    form.setFieldValue('token', token)
  }, [])

  const onFinish = async (data: TResetPass) => {
    try {
      await forgotPassword(data).unwrap()
      setTimeout(() => {
        nav(`${router.login}`)
      }, 6666)
      message.success('Đặt lại mật khẩu thành công')
    } catch (error) {
      message.error('Đã xảy ra lỗi khi đặt lại mật khẩu')
      console.log(error)
    }
  }

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
          <div className={`${styles['top']}  p-5  md:p-10  lg:p-10 xl:p-20  space-y-10 `}>
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
                <h1 className='text-2xl'>Đặt lại mật khẩu?</h1>
              </div>

              <Form form={form} onFinish={onFinish} layout='vertical' className={`${styles['form']} space-y-7`}>
                <p>Nhập mật khẩu mới của bạn để cập nhật lại mật khẩu.</p>
                <Form.Item name='token' hidden>
                  <Input type='hidden' />
                </Form.Item>
                <Form.Item name='email' hidden>
                  <Input type='hidden' />
                </Form.Item>
                <div className='space-y-2'>
                  <label className='font-subtitle text-[16px]'>
                    Mật khẩu mới <span className='text-red-500'>*</span>
                  </label>
                  <Form.Item
                    name='password'
                    className={`${styles['formGroup']} `}
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu' },
                      { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                      { max: 32, message: 'Mật khẩu không được vượt quá 32 ký tự' },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Mật khẩu bao gồm a-z, A-Z, 0-9 và phải chứa ít nhất một ký tự đặc biệt.'
                      }
                    ]}
                  >
                    <Input.Password
                      placeholder='Mật khẩu mới'
                      className={`${styles['ant-input-outlined']} border-[2px] py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`}
                    />
                  </Form.Item>
                </div>

                <div className='space-y-2'>
                  <label className='font-subtitle text-[16px] '>
                    Xác nhận lại mật khẩu mới <span className='text-red-500'>*</span>
                  </label>
                  <Form.Item
                    name='password_confirmation'
                    className={`${styles['formGroup']} space-y-2`}
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu' },
                      { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                      { max: 32, message: 'Mật khẩu không được vượt quá 32 ký tự' },
                      {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Mật khẩu bao gồm a-z, A-Z, 0-9 và phải chứa ít nhất một ký tự đặc biệt.'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Mật khẩu không trùng khớp với mật khẩu mới'))
                        }
                      })
                    ]}
                  >
                    <Input.Password
                      placeholder='Nhập lại mật khẩu mới'
                      className={`${styles['ant-input-outlined']} border-[2px] py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`}
                    />
                  </Form.Item>
                </div>
                <div className={`${styles['formGroup']} space-y-2`}>
                  <button className={`${styles['btn']} font-subtitle text-lg text-white py-4 mt-6 rounded-md`}>
                    <span>Xác nhận</span> {isLoading && <LoadingOutlined />}
                  </button>
                </div>
              </Form>
            </div>
            <div className={`${styles['others']} dark:bg-[#5C505B] bg-[#FFF5F4] flex flex-col items-center p-5`}>
              <div>
                <span>Đặt lại mặt khẩu thành công. </span>
                <Link to={router.login} className='font-subtitle hover:text-[#FF875A] underline'>
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
