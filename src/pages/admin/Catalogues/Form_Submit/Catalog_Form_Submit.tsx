import { CheckOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { MoveLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import './catalogForm.scss';
import { Helmet } from 'react-helmet';
import { getTitleTab } from '@/constants/client';

const Catalog_Form_Submit = () => {

  const [form] = Form.useForm();

  const { id } = useParams();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Helmet>
        <title>{getTitleTab(id ? 'Cập nhật danh mục' : 'Sản phẩm danh mục')}</title>
      </Helmet>
      <div className="p-4">
        <div className="heading flex justify-between items-center pb-4">
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>
            {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
          </h5>

          <Link
            to={'/admin/catalogues'}
            className='
            border 
            border-[#F84563] 
            py-2
            px-3
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[15%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            
            md:py-2 md:px-5
            '
          >
            <MoveLeft size={16} />
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
              <button
                type='submit'
                className='py-2 px-4 w-full flex items-center justify-center md:justify-start md:w-auto  rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563]  gap-2 border hover:border-[#F84563] border-[#F84563]'
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