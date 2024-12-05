import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Create_User_System = () => {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4">
      <Helmet>
        <title>{getTitleTab('Tạo tài khoản hệ thống')}</title>
      </Helmet>

      <div className="heading pb-4 flex justify-between items-center">
        <p className="font-title text-xl">Thêm mới người dùng hệ thống</p>

        <Link
          to={router.usersSystem}
          className='
            border 
            border-[#F84563] 
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[25%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            gap-x-3
            md:py-2 md:px-5
            lg:w-[10%]
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
          <Form.Item label="Tên đầy đủ" name='fullname'>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name='email'>
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name='password'>
            <Input.Password />
          </Form.Item>

          <Form.Item label="Select" name='role'>
            <Select>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Mô tả" name='bio'>
            <TextArea rows={4} />
          </Form.Item>

          {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item> */}
          <Form.Item>
            <Button htmlType='submit'>Thêm mới</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Create_User_System