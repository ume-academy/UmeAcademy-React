// img
import { useContext, useEffect, useState } from 'react'

// css
import styles from '../auth.module.scss'

//
import { router } from '@/configs/routes'
import { dataCarousel } from '@/constants/auth'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TLogin, TResponseLogin } from '@/interfaces/TAuth'
import { useLoginMutation } from '@/redux/slices/auth/authApiSlice'
import { setToken } from '@/redux/slices/auth/authSlice'
import { FacebookFilled, GoogleCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getTitleTab, logo } from '../../../constants/client'

const Login = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType
  const { loading, startLoading, stopLoading} = useLoading()
  const [ login ] = useLoginMutation()
  const [ form ] = Form.useForm()
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [index, setIndex] = useState(0)

  
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

  const onfinish = async (data: TLogin) => {
    try {
      startLoading()
      console.log(1)
      const {access_token, refresh_token, expires_in}: TResponseLogin = await login(data).unwrap()

      dispatch(setToken({
        accessToken: access_token, 
        refreshToken: refresh_token, 
        expiresIn: expires_in
      }))
      stopLoading()
      message.success('Đăng nhập thành công')
      nav(router.home)
    } catch (error) {
      stopLoading()
      message.error('Tài khoản hoặc mật khẩu không chính xác.')
      console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Đăng nhập')}</title>
      </Helmet>

      <div className={`${styles['parent']} flex items-stretch `}>
        <div className="hidden md:block flex-1">
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
                <Link to={router.home} className='underline text-gray-400'>
                  Quay lại trang chủ
                </Link>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='title'>
                <h1 className='text-2xl'>Đăng nhập</h1>
              </div>

              <Form form={form} layout='vertical' onFinish={onfinish} className={`${styles['form']} space-y-7`}>
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

                <div className=''>
                  <Link to={router.forgot_password} className='text-[#B9B7C0] hover:text-[#ff875a]'>
                    Quên mật khẩu?
                  </Link>
                </div>

                <div className={`${styles['formGroup']} space-y-2`}>
                  <Button htmlType='submit' disabled={loading} className={`${styles['btn']} font-subtitle text-lg text-white py-8 mt-6 rounded-md`}>
                    {loading ? <LoadingOutlined /> : 'Đăng nhập'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/* Register with other way */}
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
                Chưa có tài khoản? Đăng ký ngay{' '}
                <Link to={router.register} className='font-subtitle text-[#FF875A]'>
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

export default Login
