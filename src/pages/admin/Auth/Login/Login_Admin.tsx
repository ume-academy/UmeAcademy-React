import { router } from '@/configs/routes'
import { Button, Form, Input } from 'antd'
import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Login_Admin = () => {

  const nav = useNavigate();

  const onFinish = (values: any) => {
    console.log(values)

    nav(router.dashBoard)
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
                  { required: true, message: 'Không được bỏ trống!' }
                ]}
              >
                <Input className='py-2' />
              </Form.Item>

              <Form.Item
                label={<span className='font-subtitle'>Mật khẩu</span>}
                name="password"
                rules={[
                  { required: true, message: 'Không được bỏ trống!' }
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