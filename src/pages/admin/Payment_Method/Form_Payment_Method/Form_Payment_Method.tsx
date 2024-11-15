import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { CheckOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Asterisk, MoveLeft } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'

interface Payment_MethodType {
  id?: number
  name: string
  created_at: string
}

const Form_Payment_Method = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [extraFields, setExtraFields] = useState<number[]>([]); // State để quản lý các ô input bổ sung
  const [errorMsg, setErrorMsg] = useState(''); // Thêm state để quản lý thông báo lỗi

  const addExtraField = () => {
    setExtraFields([...extraFields, Date.now()]); // Thêm một ID duy nhất cho mỗi ô input bổ sung
  };

  const removeExtraField = (id: number) => {
    setExtraFields(extraFields.filter((fields) =>  fields !== id ))
  }

  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false);
  const [isHoveredSupplement, setIsHoveredSupplement] = useState(false);
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // Giả lập quá trình chờ dữ liệu tải
      const values = await form.validateFields();
      console.log(values)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (id) {
        message.success('Cập nhật thành công');
      } else {
        message.success('Thêm mới thành công');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>{getTitleTab(id ? 'Cập nhật phương thức thanh toán' : 'Thêm mới phương thức thanh toán')}</title>
      </Helmet>
      <Form layout='vertical' form={form} onFinish={onFinish} style={{ maxWidth: '100%' }}>
        <div className='flex justify-between flex-col items-start md:flex-col lg:flex-row lg:items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7 md:mb-7 lg:mb-0'>
          <h5 className='font-title text-xl'>{id ? 'Cập nhật phương thức thanh toán' : 'Thêm mới phương thức thanh toán'}</h5>

          <div className='flex items-center gap-2 mt-4 md:mt-4 lg:mt-0'>
            <Link
              to={`${router.listPaymentMethod}`}
              className='py-2 px-2 md:px-4 lg:px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
            >
              <MoveLeft />
              <span className='ml-2'>Quay lại</span>
            </Link>
            <Button
              onMouseEnter={() => setIsHoveredSubmit(true)}
              onMouseLeave={() => setIsHoveredSubmit(false)}
              style={{border: '1px solid #ff5364', color: `${isHoveredSubmit === false ? '#fff' : '#ff5364'}` }}
              htmlType='submit'
              className='w-full md:w-[180px] lg:w-[180px] bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
              disabled={loading}
              >
                {loading ? <LoadingOutlined /> : <CheckOutlined />}
                {id ? 'Cập nhật phương thức' : 'Thêm mới phương thức'}
            </Button>
          </div>
        </div>

        <div className='w-full'>
          <div className='p-4 md:p-4 lg:p-10 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg'>
            <Form.Item
              name='name'
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tên phương thức</span>}
              rules={[{ required: true, message: 'Vui lòng nhập tên phương thức!' }, {min: 3, message: 'Tên phương thức phải có ít nhất 3 ký tự!'}]}
              className='mb-8' // Thêm khoảng cách dưới mỗi trường
            >
              <Input className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78]' />
            </Form.Item>

            <Form.Item
             name='minMoney'
             label={(<><Asterisk color='#ff4d4f' size={12} className='mr-0.5'/><span className=' dark:text-[#b9b7c0] text-[#685f78]'>Số tiền tối thiểu</span></>)}
             help={errorMsg} // Hiển thị lỗi theo thứ tự
             rules={[
               {
                 validator: (_, value) => {
                   if (!value) {
                     setErrorMsg('Vui lòng nhập số tiền tối thiểu!');
                     return Promise.reject();
                   } else if (value < 50000) {
                     setErrorMsg('Số tiền tối thiểu phải là 50.000đ');
                     return Promise.reject();
                   } else {
                     setErrorMsg(''); // Xóa lỗi nếu không còn lỗi nào
                     return Promise.resolve();
                   }
                 },
               },
             ]}
             className='mb-8' // Thêm khoảng cách dưới mỗi trường
           >
             <Input
               className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78]'
             />
           </Form.Item>
              
            {extraFields.map((key) => (
              <Form.Item
                key={key}
                name={`extraField_${key}`}
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Ô nhập liệu bổ sung</span>}
                rules={[{ required: true, message: 'Vui lòng nhập dữ liệu bổ sung!' }]}
                className='mb-8'
              >
                <div className="flex justify-between">
                <Input className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78] w-[90%] md:w-[94%] lg:w-[96%]' /> 
                <div className="flex justify-end w-[4%]">
                  <button 
                  className='lg:px-4'
                  type='button'
                  onClick={() => removeExtraField(key)}
                  >
                    <DeleteOutlined className='text-[18px] md:text-[18px] lg:text-[16px] dark:text-[#f66962]'/>
                  </button>
                </div>
                </div>
              </Form.Item>
            ))}

            <Button
              onMouseEnter={() => setIsHoveredSupplement(true)}
              onMouseLeave={() => setIsHoveredSupplement(false)}
              style={{border: '1px solid #ff5364', color: `${isHoveredSupplement === false ? '#fff' : '#ff5364'}` }}
              htmlType="button"
              onClick={addExtraField}
              className='p-5 mt-12 bg-[#ff5364] text-[#fff] rounded-lg hover:text-[#ff5364] hover:bg-transparent'
            >
              Bổ sung
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Form_Payment_Method
