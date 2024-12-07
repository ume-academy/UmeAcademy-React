import Loading from '@/components/client/commonComponents/Loading/Loading'
import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { TRole } from '@/interfaces/TRole'
import { useGetAllRoleQuery } from '@/redux/slices/role/roleApiSlice'
import { Button, Form, Input, message, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import './createUserSystemAntd.scss'
import { useCreateUserSystemMutation } from '@/redux/slices/user/userSlice'
import useLoading from '@/hooks/useLoading'

const Create_User_System = () => {

  const [form] = Form.useForm();

  const { loading, startLoading, stopLoading } = useLoading();

  const { data: roles, isLoading, isFetching } = useGetAllRoleQuery([]);

  const [createUserSystem] = useCreateUserSystemMutation();

  const rolesData = roles?.data?.data?.map((role: TRole) => ({
    label: role.name,
    value: role.id
  }));

  const onFinish = async (values: any) => {
    // console.log(values)

    try {
      startLoading();
      const res = await createUserSystem(values).unwrap();

      console.log(res)

      if (res?.data) {
        form.resetFields();
        stopLoading();
        message.success('Thêm mới người dùng thành công!');
      } else {
        stopLoading();
        message.error('Thêm mới người dùng thất bại!');
      }

    } catch (error: any) {
      console.log(error)

      const errors = error?.data?.errors || {};
      Object.entries(errors).forEach(([field, messages]: any) => {
        messages.forEach((msg: any) => message.error(`${msg}`));
      });

    } finally {
      stopLoading()
    }
  }

  const handleChange = (value: string, option: any) => {
    // Ghi đè giá trị bằng label thay vì value
    form.setFieldsValue({
      role: option.label, // Đặt lại giá trị là label
    });
  };

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /> </div>;

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Tạo mới tài khoản hệ thống')}</title>
      </Helmet>

      <div className="heading pb-4 flex justify-between items-center">
        <p className="font-title text-xl">Thêm mới người dùng hệ thống</p>

        <Link
          to={router.usersSystem}
          className='
            border 
            border-[#F84563] 
            w-[35%]
            p-2
            px-4
            rounded-md 
            bg-[#F84563] 
            md:w-auto 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            gap-x-3
            lg:w-auto
            '
        >
          Quay lại
        </Link>
      </div>

      <div className="content">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className='formSubmit'
        >
          <div className="flex flex-col items-stretch md:flex-row md:justify-between gap-x-6">
            <Form.Item
              label="Tên đầy đủ"
              name='fullname'
              className='flex-1'
              rules={[
                { required: true, message: 'Không được bỏ trống!' },
                { type: "string", message: 'Tên đầy đủ không được chứa ký tự số!' }
              ]}
            >
              <Input
                className='py-2'
                type='text'
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name='email'
              className='flex-1'
              rules={[
                { required: true, message: 'Không được bỏ trống!' },
                { type: "email", message: 'Email không hợp lệ!' }
              ]}
            >
              <Input
                className='py-2'
                type="email"
              />
            </Form.Item>
          </div>

          <div className="flex flex-col items-center md:flex-row md:justify-between gap-x-6">
            <Form.Item
              label="Mật khẩu"
              name='password'
              className='flex-1'
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
                className='py-2'
              />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name='role'
              className='flex-1'
              rules={[
                { required: true, message: 'Không được bỏ trống!' },
              ]}
            >
              <Select
                options={rolesData}
                style={{ width: '100%', display: 'flex', alignItems: 'center' }}
                onChange={handleChange}
                placeholder="Chọn vai trò"
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Mô tả"
            name='bio'
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType='submit'
              loading={loading}
              disabled={loading}       
              className='bg-[#F84563] border-[#F84563] text-white '
            >
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Create_User_System