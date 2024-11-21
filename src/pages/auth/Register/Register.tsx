// img
import { useContext, useEffect, useState } from 'react'

// css
import styles from '../auth.module.scss'

import { router } from '@/configs/routes'
import { dataCarousel } from '@/constants/auth'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TRegister } from '@/interfaces/TAuth'
import { FacebookFilled, GoogleCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { getTitleTab, logo } from '../../../constants/client'
import { TRegisterError } from '@/interfaces/TApi_Errors/Validation_Errors_Handler'
import { useRegisterMutation } from '@/redux/slices/auth/authApiSlice'

const Register = () => {
  const [index, setIndex] = useState(0)
  const [form] = Form.useForm<TRegister>()
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const { loading , startLoading, stopLoading} = useLoading()
  const [ register ] = useRegisterMutation()
  const nav = useNavigate()



  const next = () => {
    if (index === dataCarousel.length - 1) {
      setIndex(0) // Nếu đã đến cuối mảng, quay lại chỉ số 0
    } else {
      setIndex(index + 1) // Nếu chưa đến cuối mảng, tăng chỉ số thêm 1
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 4000) // Chuyển ảnh sau 2s

    return () => {
      clearInterval(interval) // Clear interval khi component bị hủy
    }
  }, [index])

  const onfinish = async (data: TRegister) => {
    try {
        startLoading()
        await register(data).unwrap()
        stopLoading()
        message.success('Đăng ký thành công')
        nav(router.login)

    } catch (error) {
        stopLoading()
        let err = error as TRegisterError
        message.error(err?.data?.errors?.email ?? 'Đăng ký thất bại')
        console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Đăng ký')}</title>
      </Helmet>

      <div className={`${styles['parent']} flex items-stretch `}>
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
          <div
            className={`${styles['top']} 
            p-5 
            md:p-10 
            lg:p-10
            xl:p-20 
            space-y-6
          `}
          >
            <div className={`${styles['heading']} flex justify-between items-center`}>
              <div className={`${styles['logo']} text-3xl font-title`}>
                <Link to={router.home}>
                  <img src={logo} alt='' width={150} />
                </Link>
              </div>

              <div className=''>
                <Link to={router.home} className='underline text-gray-400 hover:text-[#ff875a]'>
                  Quay lại trang chủ
                </Link>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='title'>
                <h1 className='text-2xl'>Đăng ký</h1>
              </div>

              <Form form={form} onFinish={onfinish} layout='vertical' className={`${styles['form']} space-y-7`}>
                <div className={`${styles['formGroup']} space-y-2`}>
                  <Form.Item
                    name='fullname'
                    label={<h6 className={`${theme === 'light' ? '#050507' : 'text-[#B9B7C0] text-[14px]'} font-subtitle`}>Tên đầy đủ</h6>}
                    rules={[
                      { required: true, message: 'Vui lòng nhập tên đầy đủ!' },
                      { max: 32, message: 'Tên đầy đủ không được vượt quá 64 ký tự' },
                      { 
                        pattern: /^[\p{L}\s]+$/u, 
                        message: 'Tên đầy đủ chỉ được chứa các ký tự chữ cái và dấu cách' 
                      }
                    ]}
                  >
                    <Input
                      style={{ background: `${theme === 'light' ? '#fff' : '#3b3a43'}`}}
                      className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md`}
                      placeholder='Điền tên hiển thị'
                    />
                  </Form.Item>
                </div>

                <div className={`${styles['formGroup']} space-y-4`}>
                  <Form.Item
                    name='email'
                    label={<h6 className={`${theme === 'light' ? '#050507' : 'text-[#B9B7C0] text-[14px]'} font-subtitle`}>Email</h6>}
                    rules={[
                      { required: true, message: 'Vui lòng nhập địa chỉ email!'},
                      { type: 'email', message: 'Email không đúng định dạng'}
                    ]}
                  >
                    <Input
                      style={{ background: `${theme === 'light' ? '#fff' : '#3b3a43'}`}}
                      className={`${styles['input']} py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`}
                      placeholder='Nhập địa chỉ email'
                    />
                  </Form.Item>
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <Form.Item
                    name='password'
                    label={<h6 className={`${theme === 'light' ? '#050507' : 'text-[#B9B7C0] text-[14px]'} font-subtitle`}>Mật khẩu</h6>}
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
                      
                      style={{ background: `${theme === 'light' ? '#fff' : '#3b3a43'}` }}
                      className={`${styles['ant-input-outlined']} border-[2px] py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`}
                      placeholder='Nhập mật khẩu'
                    />
                  </Form.Item>
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <Form.Item
                    name='confirmPassword'
                    label={<h6 className={`${theme === 'light' ? '#050507' : 'text-[#B9B7C0] text-[14px]'} font-subtitle`}>Nhập lại mật khẩu</h6>}
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Vui lòng nhập lại mật khẩu' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Mật khẩu không trùng khớp'))
                        }
                      })
                    ]}
                  >
                    <Input.Password
                      style={{ background: `${theme === 'light' ? '#fff' : '#3b3a43'}`}}
                      className={`${styles['ant-input-outlined']} border-[2px] py-3 px-3 dark:text-[#fff] dark:bg-[#3b3a43] rounded-md placeholder:text-[#9ca3af]`}
                      placeholder='Nhập lại mật khẩu'
                    />
                  </Form.Item>
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <Button htmlType='submit' disabled={loading} className={`${styles['btn']} font-subtitle text-lg text-white py-8 mt-6 rounded-md`}>
                    {loading ? <LoadingOutlined /> : 'Đăng ký'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/* Đăng ký bằng cách khác */}
          <div
            className={`${styles['others']} dark:bg-[#5C505B] bg-[#FFF5F4] flex flex-col items-center space-y-6 p-5`}
          >
            <div className='title text-center'>
              <p>Hoặc đăng nhập bằng</p>
            </div>

            <div className='act flex flex-col md:flex-row items-center gap-6'>
              <div className='text-md text-center flex items-center gap-3'>
                <GoogleCircleFilled className='text-3xl' />
                <Link to={''}>Đăng nhập bằng Google</Link>
              </div>

              <div className='hidden md:block mx-6 '>|</div>

              <div className='text-md text-center flex items-center gap-3'>
                <FacebookFilled className='text-3xl' />
                <Link to={''}>Đăng nhập bằng Facebook</Link>
              </div>
            </div>

            <div className=''>
              <p>
                Đã có tài khoản? Đăng nhập ngay{' '}
                <Link to={router.login} className='font-subtitle text-[#FF875A]'>
                  tại đây
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
