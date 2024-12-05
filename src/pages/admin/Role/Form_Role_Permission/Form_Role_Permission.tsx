import { getTitleTab } from '@/constants/client'
import {
  useAddPermissionToRoleMutation,
  useGetAllPermissonQuery,
  useGetRolePermissonByIdQuery
} from '@/redux/slices/role/roleApiSlice'
import { LoadingOutlined, CheckOutlined } from '@ant-design/icons'
import { Checkbox, Form, message } from 'antd'
import { MoveLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Checkbox.scss'
import Loading from '@/components/client/commonComponents/Loading/Loading'

const Form_Role_Permission = () => {
  const { data: permissions } = useGetAllPermissonQuery({}) //Lấy tất cả các permissions
  const [loading, setloading] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()
  const { data, isLoading, isFetching } = useGetRolePermissonByIdQuery(id, { skip: !id }) //Lấy danh sách các permissions đã chọn
  const nav = useNavigate()
  const [addPermissionToRole] = useAddPermissionToRoleMutation()

  useEffect(() => {
    if (data) {
      const selected = data?.data.map((permission: { name: string }) => permission.name)
      form.setFieldsValue({ permissions: selected })
    }
  }, [data, form])

  const onFinish = async (name: string) => {
    try {
      setloading(true)
      const res = await addPermissionToRole({ id: Number(id), name: name })
      console.log(res)
      if (res.data) {
        message.success('Cập nhật vai trò cho quyền thành công')
        nav('/admin/roles')
      } else {
        message.error('Đã xảy ra lỗi khi cập nhật vai trò cho quyền')
      }
      setloading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }
  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )
  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Quản lý phân quyền')}</title>
      </Helmet>
      <Form layout='vertical' form={form} onFinish={onFinish} style={{ maxWidth: '100%' }}>
        <div className='flex flex-wrap gap-y-2 justify-between items-center p-4 dark:text-[#b9b7c0] text-[#685f78] bg-white dark:bg-[#2b2838] rounded-lg mb-7'>
          <h5 className='font-title text-xl'>Cập nhật vai trò quyền</h5>
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
              {loading ? <LoadingOutlined /> : <CheckOutlined />}
              Cập nhật vai trò
            </button>
          </div>
        </div>
        <div className='w-full p-6 bg-white dark:bg-[#2b2838] rounded-lg'>
          <Form.Item name='permissions'>
            {permissions?.data && permissions.data.length > 0 ? (
              <Checkbox.Group className='grid grid-cols-3 gap-2'>
                {permissions.data.map((permission: { id: string; name: string }) => (
                  <Checkbox key={permission.id} value={permission.name}>
                    {permission.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            ) : (
              <span>Không có quyền nào được tìm thấy</span>
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Form_Role_Permission
