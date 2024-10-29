import { getTitleTab } from '@/contants/client'
import { CheckOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Input, message } from 'antd'
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
  const [isLoading, setLoading] = useState(false)
  const [extraFields, setExtraFields] = useState<number[]>([]); // State để quản lý các ô input bổ sung
  const [errorMsg, setErrorMsg] = useState(''); // Thêm state để quản lý thông báo lỗi

  const addExtraField = () => {
    setExtraFields([...extraFields, Date.now()]); // Thêm một ID duy nhất cho mỗi ô input bổ sung
  };

  const removeExtraField = (id: number) => {
    setExtraFields(extraFields.filter((fields) =>  fields !== id ))
  }

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // Giả lập quá trình chờ dữ liệu tải
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
        <div className='flex justify-between items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7'>
          <h5 className='font-title text-xl'>{id ? 'Cập nhật phương thức thanh toán' : 'Thêm mới phương thức thanh toán'}</h5>

          <div className='flex items-center gap-2'>
            <Link
              to={'/admin/list-payment-method'}
              className='py-2 px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
            >
              <MoveLeft />
              <span className='ml-2'>Quay lại</span>
            </Link>
            <button
              className='py-2 px-4 rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] flex items-center gap-2 border hover:border-[#F84563] border-[#F84563]'
            >
              {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
              {id ? 'Cập nhật phương thức' : 'Thêm mới phương thức'}
            </button>
          </div>
        </div>

        <div className='w-full'>
          <div className='p-10 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg'>
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
                <div className="flex">
                <Input className='formInput p-2 dark:text-[#b9b7c0] text-[#685f78] w-[96%]' /> 
                <div className="flex justify-end w-[4%]">
                  <button 
                  type='button'
                  onClick={() => removeExtraField(key)}
                  >
                    <DeleteOutlined className=' dark:text-[#f66962]'/>
                  </button>
                </div>
                </div>
              </Form.Item>
            ))}

            <button
              type="button"
              onClick={addExtraField}
              className='py-2 px-4 mt-12 rounded-md bg-[#F84563] text-white hover:bg-white hover:text-[#F84563] flex items-center gap-2 border hover:border-[#F84563] border-[#F84563]'
            >
              Bổ sung
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Form_Payment_Method
