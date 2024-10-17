import { Form, Input, InputNumber } from "antd";
import './commissionRateAntd.scss'

const Commission_Rate = () => {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className="heading flex justify-between items-center pb-4">
        <h5 className='font-title text-xl dark:text-[#b9b7c0] text-[#685f78]'>
          Cập nhật tỷ lệ hoa hồng
        </h5>
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
            label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tỷ lệ hoa hồng</span>}
            rules={[
              { required: true, message: 'Vui lòng nhập tỷ lệ!' },
              { type: 'number', message: 'Tỷ lệ chỉ chấp nhận dữ liệu là ký tự số!' },
              // { min: 1, message: 'Tỷ lệ không được phép dưới 0!' },
              // { max: 100, message: 'Tỷ lệ không được phép lớn hơn 100!' }
            ]}
          >
            <Input className='formInput w-full p-2 dark:text-[#b9b7c0] text-[#685f78]' placeholder="%"/>
          </Form.Item>

          <Form.Item>
            <button
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
              Cập nhật tỷ lệ hoa hồng
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Commission_Rate