import Loading from '@/components/client/commonComponents/Loading/Loading'
import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import useLoading from '@/hooks/useLoading'
import { TVoucher } from '@/interfaces/TVoucher'
import {
  useAddVoucherByAdminMutation,
  useEditVoucherByAdminMutation,
  useGetVoucherByAdminQuery
} from '@/redux/slices/voucher/voucherApiSlice'
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, message } from 'antd'
import { MoveLeft } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Form_Voucher = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false)
  const nav = useNavigate()
  const { loading, startLoading, stopLoading } = useLoading()
  const [AddVoucher, { error }] = useAddVoucherByAdminMutation({})
  const { data, isLoading, isFetching } = useGetVoucherByAdminQuery(id)
  const [editVoucherByAdminMutation] = useEditVoucherByAdminMutation()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.data.name,
        code: data?.data.code,
        start_date: moment(data?.data.start_date),
        end_date: moment(data?.data.end_date),
        quantity: data?.data.quantity,
        discount: data?.data.discount
      })
    }
  }, [data, form])

  useEffect(() => {
    const errorData = (error as { data?: any })?.data
    console.log(errorData)
    if (errorData && errorData.errors.end_date) {
      message.error(errorData.errors.end_date)
    }
  }, [error])

  const onFinish = async (data: TVoucher) => {
    try {
      startLoading()
      const voucherData = {
        ...data,
        start_date: data.start_date.format('YYYY-MM-DD'),
        end_date: data.end_date.format('YYYY-MM-DD')
      }

      const startDate = moment(data.start_date)
      const endDate = moment(data.end_date)

      if (endDate.isBefore(startDate)) {
        message.error('Ngày kết thúc phải sau ngày bắt đầu!')
        stopLoading()
        return
      }
      if (endDate.isBefore(moment().startOf('day')) || startDate.isBefore(moment().startOf('day'))) {
        message.error('Ngày bắt đầu và kết thúc không được nhỏ hơn hôm nay!')
        stopLoading()
        return
      }
      if (id) {
        await editVoucherByAdminMutation({ id: Number(id), data: voucherData }).unwrap()
        message.success('Cập nhật voucher thành công')
      } else {
        await AddVoucher(voucherData).unwrap()
        message.success('Thêm mới voucher thành công')
      }
      nav(`${router.listVouchers}`)

      stopLoading()
    } catch (error) {
      // message.error('Đã xảy ra lỗi, xin vui lòng thử lại')
      stopLoading()
    }
  }

  const validateDates = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      const startDate = getFieldValue('start_date')
      if (!value) {
        return Promise.reject(new Error('Vui lòng chọn ngày kết thúc!'))
      }
      if (startDate && value.isBefore(startDate)) {
        return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu!'))
      }
      return Promise.resolve()
    }
  })

  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )

  return (
    <div>
      <Helmet>
        <title>{getTitleTab(id ? 'Cập nhật mã giảm giá thanh toán' : 'Thêm mới mã giảm giá thanh toán')}</title>
      </Helmet>
      <Form layout='vertical' form={form} onFinish={onFinish} style={{ maxWidth: '100%' }}>
        <div className='flex justify-between flex-col items-start md:flex-col lg:flex-row lg:items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7 md:mb-7 lg:mb-0'>
          <h5 className='font-title text-xl'>
            {id ? 'Cập nhật mã giảm giá thanh toán' : 'Thêm mới mã giảm giá thanh toán'}
          </h5>

          <div className='flex flex-wrap items-center gap-2 mt-4 md:mt-4 lg:mt-0'>
            <Link
              to={`${router.listVouchers}`}
              className='py-2 px-2 md:px-4 lg:px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white  hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
            >
              <MoveLeft />
              <span className='ml-2'>Quay lại</span>
            </Link>
            <Button
              onMouseEnter={() => setIsHoveredSubmit(true)}
              onMouseLeave={() => setIsHoveredSubmit(false)}
              style={{
                border: '1px solid #ff5364',
                color: `${isHoveredSubmit ? '#ff5364' : '#fff'}`
              }}
              htmlType='submit'
              className='w-full md:w-[180px] lg:w-[180px] bg-[#ff5364] text-[#fff] p-5 rounded-lg hover:bg-transparent'
              disabled={loading}
            >
              {loading ? <LoadingOutlined /> : <CheckOutlined />}
              {id ? 'Cập nhật mã giảm giá' : 'Thêm mới mã giảm giá'}
            </Button>
          </div>
        </div>

        <div className='p-4 md:p-4 lg:p-10 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg space-y-5'>
          <div className='flex flex-wrap justify-between'>
            <Form.Item
              name='code'
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Mã giảm giá</span>}
              rules={[
                { required: true, message: 'Vui lòng nhập mã giảm giá!' },
                { max: 10, message: 'Mã giảm giá không được vượt quá 10 ký tự!' }
              ]}
              className='w-full lg:w-[49%]'
            >
              <Input id='code' placeholder='Nhập mã giảm giá' className='p-3 w-full' />
            </Form.Item>

            <div className='flex flex-wrap justify-between gap-x-6 w-full lg:w-[49%]'>
              <Form.Item
                name='start_date'
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Ngày bắt đầu</span>}
                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
              >
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='Ngày bắt đầu'
                  className='dark:bg-[#2b2838] bg-white p-3 w-full md:w-[350px] lg:w-[266px] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                           dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                  disabledDate={(current) => current && current < moment().endOf('day')}
                />
              </Form.Item>

              <Form.Item
                name='end_date'
                label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Ngày kết thúc</span>}
                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }, validateDates]}
              >
                <DatePicker
                  format='YYYY-MM-DD'
                  placeholder='Ngày kết thúc'
                  className='dark:bg-[#2b2838] bg-white p-3 w-full md:w-[350px] lg:w-[266px] placeholder:text-[#6e82a3] dark:placeholder:text-[#b9b7c0]
                           dark:text-[#b9b7c0] border-[1px] dark:border-[#c7c7c740] hover:border-[#c1c9d2] focus:border-[#c1c9d2] 
                          focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:bg-[#fafafa]'
                  disabledDate={(current) => current && current < moment().endOf('day')}
                />
              </Form.Item>
            </div>
          </div>

          <div className='flex flex-wrap justify-between '>
            <Form.Item
              name='quantity'
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Số lượng mã giảm giá</span>}
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập số lượng mã giảm giá'))
                    }
                    const valueStr = value.toString()
                    if (isNaN(valueStr) || valueStr < 0 || valueStr > 100) {
                      return Promise.reject(new Error('Số lượng mã giảm giá phải lớn hơn 0 và nhỏ hơn 100'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
              className='w-full lg:w-[49%]'
            >
              <Input
                id='quantity'
                placeholder='Nhập số lượng'
                className='p-3 w-full'
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault()
                  }
                }}
                min={1}
              />
            </Form.Item>

            <Form.Item
              name='discount'
              label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Số % giảm giá</span>}
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value) {
                      return Promise.reject(new Error('Vui lòng nhập số % giảm giá'))
                    }
                    const valueStr = value.toString()
                    if (isNaN(valueStr) || valueStr < 0 || valueStr > 100) {
                      return Promise.reject(new Error('Số % giảm giá phải lớn hơn 0 và nhỏ hơn 100'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
              className='w-full lg:w-[49%]'
            >
              <Input
                id='discount'
                placeholder='Nhập số % giảm giá'
                className='p-3 w-full'
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === '+' || e.key === 'e') {
                    e.preventDefault()
                  }
                }}
                min={1}
                max={100}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Form_Voucher
