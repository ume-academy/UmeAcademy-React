import { router } from '@/configs/routes';
import { getTitleTab } from '@/constants/client';
import useLoading from '@/hooks/useLoading';
import { TCategory } from '@/interfaces/TCategory';
import { useCreateCategoryMutation, useGetOneCategoryQuery, useUpdateCategoryMutation } from '@/redux/slices/category/categoryApiSlice';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { MoveLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import './catalogForm.scss';

const Catalog_Form_Submit = () => {

  const { id } = useParams();

  const [form] = Form.useForm();

  const { loading, startLoading, stopLoading } = useLoading();

  const [createCategory] = useCreateCategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();

  const { data: category, isLoading, isFetching, isError, error } = useGetOneCategoryQuery(id);

  // fill data
  useEffect(() => {
    if (category?.data) {
      form.setFieldsValue(category?.data);
    }
  }, [category?.data, form, id])


  const onFinish = async (values: TCategory) => {
    // console.log(values);
    try {
      startLoading();
      if (id) {
        console.log('update', );

        const res = await updateCategory({...values, id: id, _method: 'PUT'});

        console.log(res)

        if (res?.data) {
          message.success(res?.data?.message);
        } else {
          throw new Error(res?.data?.message);
        }

      } else {
        console.log('create');

        const res = await createCategory(values);

        // console.log(res)

        if (res?.data?.status === 'true') {
          message.success(res?.data?.message);
          form.resetFields();
        } else {
          throw new Error(res?.data?.message);
        }
      }
    } catch (error) {
      // console.log(error)

      return message.error('Có lỗi xảy ra, vui lòng thử lại sau!');
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <Helmet>
        <title>{getTitleTab(id ? 'Cập nhật danh mục' : 'Sản phẩm danh mục')}</title>
      </Helmet>
      <div className="p-4 dark:bg-[#2b2838] bg-white">
        <div className="heading flex justify-between items-center pb-4">
          <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>
            {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
          </h5>

          <Link
            to={router.listCatalogues}
            className='
            border 
            border-[#F84563] 
            py-2
            px-3
            w-auto
            rounded-md 
            bg-[#F84563] 
            md:w-[20%] 
            flex 
            justify-center 
            items-center 
            text-white 
            hover:bg-white 
            hover:border-[#F84563] 
            hover:text-[#F84563] 
            
            md:py-2 md:px-5 md:gap-2
            lg:w-[15%]'
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
              <Button
                loading={loading}
                // disabled={loading}
                htmlType='submit'
                className='py-2 px-4 w-full flex items-center justify-center md:justify-start md:w-auto  rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563]  gap-2 border hover:border-[#F84563] border-[#F84563]'
              >
                {
                  loading ? '' : <CheckOutlined />
                }

                {id ? 'Cập nhật bản ghi' : 'Thêm mới bản ghi'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Catalog_Form_Submit