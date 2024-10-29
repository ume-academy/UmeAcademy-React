import { BackwardFilled, CheckOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './catalogForm.scss';
import { MoveLeft } from 'lucide-react';

const Catalog_Form_Submit = () => {

  const [form] = Form.useForm();

  const { id } = useParams();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className="p-4">
        <div className="heading flex justify-between items-center pb-4">
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>
            {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
          </h5>

          <Link
            to={'/admin/catalogues'}
            className='py-2 px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
          >
            <MoveLeft />
            <span className='ml-2'>Quay lại</span>
          </Link>
        </div>

        <div className="content">
          <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: '100%' }}
          // className='formSubmit'
          >
            <Form.Item
              name="name"
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tên danh mục</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập tên danh mục!' }
              ]}
            >
              <Input className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78]' />
            </Form.Item>

            <Form.Item>
              {/* <button
                type='submit'
                className='
              border-none 
              py-1 px-4
              rounded-md
            bg-[#F84563] 
            text-white
            hover:bg-[#ee9aa8]
            hover:text-black'
              >
                {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
              </button> */}

              <button
                type='submit'
                className='py-2 px-4 rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] flex items-center gap-2 border hover:border-[#F84563] border-[#F84563]'
              >
                <CheckOutlined />
                {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Catalog_Form_Submit