import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import useLoading from '@/hooks/useLoading'
import { TPaymentMethob } from '@/interfaces/TPaymentMethob'
import {
  useAddPaymentMethodMutation,
  useEditPaymentMethodMutation,
  useGetPaymentMethodDetailQuery
} from '@/redux/slices/payment_method/paymentMethodApiSlice'
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Form_Payment_Method = () => {
  const { id } = useParams()
  const [form] = Form.useForm()
  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false)
  const { loading, startLoading, stopLoading } = useLoading()
  const [editPaymentMethodMutation] = useEditPaymentMethodMutation()
  const [addPaymentMethodMutation] = useAddPaymentMethodMutation()
  const nav = useNavigate()
  const { data } = useGetPaymentMethodDetailQuery(id, {
    skip: !id
  })

  useEffect(() => {
    if (data) {
      form.setFieldValue('name', data.name)
    }
  }, [data, form])

  const onFinish = async (name: string) => {
    try {
      startLoading()
      if (id) {
        const res = await editPaymentMethodMutation({ id: Number(id), name })
        console.log(res)
        if (res.data) {
          stopLoading()
          message.success('Cập nhật phương thức thanh toán thành công')
          nav('/admin/list-payment-method')
        } else {
          message.error('Cập nhật phương thức thanh toán thất bại')
        }
      } else {
        const res = await addPaymentMethodMutation({ name })
        if (res.data) {
          stopLoading()
          message.success('Thêm mới phương thức thanh toán thành công')
          nav('/admin/list-payment-method')
        } else {
          message.error('Thêm mới phương thức thanh toán thất bại')
        }
      }
    } catch (error) {
      stopLoading()
      console.log(error)
    }
  }

  return (
    <div>
      <Helmet>
        <title>{getTitleTab(id ? 'Cập nhật phương thức thanh toán' : 'Thêm mới phương thức thanh toán')}</title>
      </Helmet>
      <Form layout='vertical' form={form} onFinish={onFinish} style={{ maxWidth: '100%' }}>
        <div className='flex justify-between flex-col items-start md:flex-col lg:flex-row lg:items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7 md:mb-7 lg:mb-0'>
          <h5 className='font-title text-xl'>
            {id ? 'Cập nhật phương thức thanh toán' : 'Thêm mới phương thức thanh toán'}
          </h5>

          <div className='flex flex-wrap items-center gap-2 mt-4 md:mt-4 lg:mt-0'>
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
              style={{ border: '1px solid #ff5364', color: `${isHoveredSubmit === false ? '#fff' : '#ff5364'}` }}
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
              rules={[
                { required: true, message: 'Vui lòng nhập tên phương thức!' },
                { min: 3, message: 'Tên phương thức phải có ít nhất 3 ký tự!' }
              ]}
              className='mb-8'
            >
              <Input id='name' placeholder='Nhập tên quyền' className='p-3' />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Form_Payment_Method
