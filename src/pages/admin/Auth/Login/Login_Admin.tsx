import { router } from '@/configs/routes'
import useLoading from '@/hooks/useLoading'
import { TLoginError } from '@/interfaces/TApi_Errors/Validation_Errors_Handler'
import { TLogin, TResponseLogin } from '@/interfaces/TAuth'
import { useLoginMutation } from '@/redux/slices/auth/authApiSlice'
import { setToken } from '@/redux/slices/auth/authSlice'
import { useGetProfileQuery } from '@/redux/slices/profile/profileApiSlice'
import { Button, Form, Input, message } from 'antd'
import { ArrowLeftIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login_Admin = () => {
  const { loading, startLoading, stopLoading } = useLoading()

  const [login] = useLoginMutation()

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const nav = useNavigate()

  const { refetch } = useGetProfileQuery({})

  const onFinish = async (data: TLogin) => {
    try {
      startLoading()

      const { access_token, refresh_token, expires_in}: TResponseLogin = await login(data).unwrap()


      dispatch(
        setToken({
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresIn: expires_in
        })
      )
      
      await refetch() // Lấy thông tin người dùng MỚI NHẤT sau khi đăng nhập

      stopLoading()

      message.success('Đăng nhập thành công') 

      nav(router.dashBoard)
      
    } catch (error) {
      stopLoading()
      let err = error as TLoginError
      message.error(err.data?.error ?? 'Tài khoản hoặc mật khẩu không chính xác!')
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] mx-auto px-4 lg:px-0'>
      <div className="absolute py-10">

        <Link to={router.home} className='text-[#f84563] font-subtitle flex items-center gap-x-2 hover:text-[#d0a6ad] hover:underline'>
          <ArrowLeftIcon size={24} />
          Quay lại trang chủ
        </Link>
      </div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="border border-[#d9d9d9] bg-[#eeeeee] w-[700px] rounded-md p-4 md:p-6 lg:p-8">
          <div className="heading font-title text-md md:text-lg pb-4 text-center">
            <h3>ĐĂNG NHẬP DÀNH CHO QUẢN TRỊ VIÊN</h3>
          </div>

          <div className="content">
            <Form
              layout='vertical'
              onFinish={onFinish}
              className='space-y-4'
            >
              <Form.Item
                label={<span className='font-subtitle'>Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Không được bỏ trống!' },
                  { type: 'email', message: 'Email không hợp lệ' },
                ]}
              >
                <Input className='py-2' />
              </Form.Item>

              <Form.Item
                label={<span className='font-subtitle'>Mật khẩu</span>}
                name="password"
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
                <Input.Password className='py-2' />
              </Form.Item>

              {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" className='w-full py-6 bg-[#f84563] font-subtitle'>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login_Admin