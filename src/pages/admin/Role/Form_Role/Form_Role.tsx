import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input } from 'antd';
import { MoveLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Checkbox.scss'
import { getTitleTab } from '@/contants/client';
import { Helmet } from 'react-helmet';
const Form_Role = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const permissions = [
    {
      title: 'Quản lý tài khoản',
      subPermissions: [
        { label: 'Quản lý tài khoản', value: 'manageAccounts' },
        { label: 'Xem tài khoản', value: 'viewAccounts' },
        { label: 'Khóa tài khoản', value: 'lockAccounts' },
        { label: 'Xóa tài khoản', value: 'deleteAccounts' }
      ]
    },
    {
      title: 'Quản lý khóa học',
      subPermissions: [
        { label: 'Thêm khóa học', value: 'addProducts' },
        { label: 'Sửa khóa học', value: 'editProducts' },
        { label: 'Xóa khóa học', value: 'deleteProducts' },
        { label: 'Xem khóa học', value: 'viewProducts' }
      ]
    }
  ];



  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Quản lý phân quyền')}</title>
      </Helmet>
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        style={{ maxWidth: '100%' }}
      >
        <div className="flex justify-between items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7">
          <h5 className='font-title text-xl'>
            {id ? 'Cập nhật quyền' : 'Thêm mới quyền'}
          </h5>

          <div className='flex items-center gap-2'>
            <Link
              to={'/admin/roles'}
              className='py-2 px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
            >
              <MoveLeft />
              <span className='ml-2'>Quay lại</span>
            </Link>
            <button
              type='submit'
              className='py-2 px-4 rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] flex items-center gap-2 border hover:border-[#F84563] border-[#F84563]'
            >
              {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
              {id ? 'Cập nhật quyền' : 'Thêm mới quyền'}
            </button>
          </div>
        </div>


        <div className='w-full flex justify-between items-start'>
          <div className='w-[48%] p-10 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg '>
            <Form.Item
              name="name"
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tên quyền</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
            >
              <Input className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78]' />
            </Form.Item>
            <Form.Item
              name="description"
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Mô tả</span>}
            >
              <Input.TextArea className='formInput dark:text-[#b9b7c0] text-[#685f78]' />
            </Form.Item>
          </div>

          <div className='w-[50%]  pt-10 pl-20  bg-white dark:bg-[#2b2838] rounded-lg'>
            {permissions.map((permission) => (
              <Form.Item
                key={permission.title}
                label={<span className='dark:text-[#b9b7c0] text-[#685f78] text-[15px]'>{permission.title}</span>}
              >
                {permission.subPermissions.map((subPermission) => (
                  <div className="pl-4 p-1" key={subPermission.value}>
                    <Checkbox>{subPermission.label}</Checkbox>
                  </div>
                ))}
              </Form.Item>
            ))}

          </div>

        </div>
      </Form>
    </div>
  );
}

export default Form_Role;
