import { validateDiscount, validateQuantity } from '@/Validators/voucher_form_validator'
import { routerConfigAdmin } from '@/constants/admin'
import useLoading from '@/hooks/useLoading'
import { TVoucherForm } from '@/interfaces/TVoucher'
import { useAddVoucherByTeacherMutation } from '@/redux/slices/voucher/voucherApiSlice'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, message } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import './Voucher_Antd.scss'


interface VoucherProps {
  isRefetch: () => void 
}


const Voucher = ({isRefetch}: VoucherProps ) => {
  const [form] = Form.useForm()
  const [isHovered, setIsHovered] = useState(false);
  const [createVoucher] = useAddVoucherByTeacherMutation()

  // Hàm xử lý sự kiện hover
  const handleMouseEnter = () => {
  setIsHovered(true); // Cập nhật state khi hover vào
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false); // Cập nhật state khi rời khỏi
  };

  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const { id } = useParams()
  const {loading, stopLoading, startLoading} = useLoading()

  const onfinish = async (data: TVoucherForm) => {
    startLoading()
    try {
       // Định dạng lại trước khi gửi lên server
        const formattedData = {
          ...data,
          start_date: data.start_date.format('YYYY-MM-DD'),
          end_date: data.end_date.format('YYYY-MM-DD'),
        };
        if(id){
          await createVoucher({id: Number(id), data: formattedData}).unwrap()
          form.resetFields()
        }
        isRefetch()
        stopLoading()
        message.success('Tạo mã giảm giá thành công')
    } catch (error) {
      console.log('lỗi rồi',error)    

      const errorData = (error as { data?: any })?.data;
      // Kiểm tra và hiển thị tất cả các lỗi trong errors
      if (errorData.errors) {
        Object.keys(errorData.errors).forEach((field) => {
          const fieldErrors = errorData.errors[field];
          // Nếu có lỗi cho trường này, bắn tất cả thông báo lỗi ra
          fieldErrors.forEach((errorMessage: string) => {
            message.error(errorMessage); // Hiển thị từng thông báo lỗi cho trường
          });
        });
      } else {
        // Hiển thị thông báo lỗi mặc định nếu không có dữ liệu lỗi cụ thể
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
      }
      stopLoading()
    }
  }

  return (
    // Page thêm mới voucher cho khóa học
    <div className='px-[16px]'>
      <div className='h-full shadow-[0_2px_4px_rgba(0,0,0,0.08),_0_4px_12px_rgba(0,0,0,0.16)] p-[16px]  lg:p-14 rounded-lg border-[1px] border-transparent bg-[#fff] dark:bg-[#2b2838]'>
        <h4 className='text-[28px] font-title text-[#f66962] mb-6'>Mã giảm giá (voucher)</h4>
        <Form form={form} layout='vertical' onFinish={onfinish}>
          
            {/* Mã giảm giá */}
            <Form.Item 
              name='code'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Mã giảm giá</label>}
              className='mb-8'
              rules={[
                {required: true, message: 'Mã giảm giá là bắt buộc'},
                {max: 10, message: 'Mã giảm giá không được nhập quá 10 ký tự'}
              ]}
              > 
              <Input
                type='text'
                disabled={hideCourseFunction}
                className=' py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                placeholder='Vd: NPK99Z2754A'
              />
            </Form.Item>
            
            {/* Phần trăm */}
            <Form.Item
                name='discount' 
                label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Phần trăm muốn giảm (%)</label>}
                className='mb-8'
                rules={[
                  {
                    validator:  (_, value) => {
                      return validateDiscount(value)
                    }
                  }
                ]}
            >
              <Input
                type='text'
                disabled={hideCourseFunction}
                className=' py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                placeholder='Nhập số % muốn giảm'
              />
            </Form.Item>

            <Form.Item 
              name='quantity'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Số lượng</label>}
              className='mb-8'
              rules={[
                {validator: (_, value) => {
                  return validateQuantity(value)
                }}
              ]}
            >
              <Input
                type='text'
                disabled={hideCourseFunction}
                className=' py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#131022] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                placeholder='Nhập số lượng'
              />
            </Form.Item>

          <div className='text-[14px] space-x-2 flex items-center w-[100%] mb-16'>
            <Form.Item
              name='start_date'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ngày bắt đầu</label>}
              className='w-full'
              rules={[
                {required: true, message: 'Ngày bắt đầu là bắt buộc'}
              ]}
            >
            <DatePicker
              format='DD/MM/YYYY'
              disabled={hideCourseFunction}
              className='w-full  py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                          h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              placeholder='Ngày bắt đầu '
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
            </Form.Item>
            
            <Form.Item 
              name='end_date'
              label={<label className='text-[#685f78] dark:text-[#b9b7c0] text-[16px]'>Ngày kết thúc</label>}
              className='w-full'
              rules={[
                {required: true, message: 'Ngày kết thúc là bắt buộc'}
              ]}
            >
            <DatePicker
              format='DD/MM/YYYY'
              disabled={hideCourseFunction}
              className='w-full py-[6px] px-[16px] bg-[#fafafa] dark:bg-[#2b2838] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                          h-[44px] dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
              placeholder='Ngày Kết thúc'
              disabledDate={(current) => current && current < moment().add(1, 'days').startOf('day')} // cho chọn lớn hơn ngày hiện tại
            />
            </Form.Item>
          </div>

          {!hideCourseFunction && (
            <div className='flex justify-end'>
              <Button
                htmlType='submit'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{border: '2px solid #ff5364', color: `${isHovered === false ? '#fff' : '#ff5364'}` }}
                className='w-full md:w-[180px] lg:w-[180px] font-title bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
                disabled={loading}
              >
                {loading ? <LoadingOutlined /> : 'Lưu'}
              </Button>
            </div>
          )}
      </Form>
      </div>
    </div>
  )
}

export default Voucher
