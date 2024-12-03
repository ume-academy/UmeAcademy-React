import { getTitleTab } from '@/constants/client'
import { useAddRoleMutation, useEditRoleMutation, useGetRoleByIdQuery } from '@/redux/slices/role/roleApiSlice'
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Input, message } from 'antd'
import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Form_Role = () => {
  const [form] = Form.useForm()
  const { id } = useParams()
  const [isLoading, setLoading] = useState(false)
  const [addRole] = useAddRoleMutation()
  const [editRole] = useEditRoleMutation()
  const { data } = useGetRoleByIdQuery(id, { skip: !id })
  const nav = useNavigate()

  useEffect(() => {
    if (data) {
      form.setFieldValue('name', data?.data?.name)
      console.log(data)
    }
  }, [data, form])

  const onFinish = async (name: string) => {
    try {
      setLoading(true)
      if (id) {
        const res = await editRole({ name, id: Number(id) })
        if (res.data) {
          message.success('Cập nhật quyền thành công')

          nav('/admin/roles')
        } else {
          message.error('Cập nhật quyền không thành công')
        }
      } else {
        const res = await addRole({ name })
        if (res.data) {
          message.success('Thêm mới quyền thành công')
          nav('/admin/roles')
        } else {
          message.error('Thêm mới quyền không thành công')
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Quản lý phân quyền')}</title>
      </Helmet>
      <Form layout='vertical' form={form} onFinish={onFinish} style={{ maxWidth: '100%' }}>
        <div className='flex flex-wrap gap-y-2 justify-between items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7'>
          <h5 className='font-title text-xl'>{id ? 'Cập nhật quyền' : 'Thêm mới quyền'}</h5>
          <div className='flex items-center gap-2'>
            <Link
              to={'/admin/roles'}
              className='py-2 px-4 flex items-center rounded-md bg-[#F84563] text-white hover:bg-white hover:text-[#F84563] border hover:border-[#F84563] border-[#F84563]'
            >
              <MoveLeft />
              <span className='ml-2'>Quay lại</span>
            </Link>
            <button
              type='submit'
              className='py-2 px-4 rounded-md bg-[#F84563] text-white hover:bg-white hover:text-[#F84563] flex items-center gap-2 border hover:border-[#F84563] border-[#F84563]'
            >
              {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
              {id ? 'Cập nhật quyền' : 'Thêm mới quyền'}
            </button>
          </div>
        </div>

        <div className='w-full p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg'>
          <Form.Item
            name='name'
            label={<span className='dark:text-[#b9b7c0] text-[#685f78]'>Tên quyền</span>}
            rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
          >
            <Input id='name' placeholder='Nhập tên quyền' className='p-3' />
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Form_Role
