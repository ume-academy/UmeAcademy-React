import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate } from '@/constants/utils'
import { TRole } from '@/interfaces/TRole'
import { useGetAllRoleQuery, useRemoveRoleMutation } from '@/redux/slices/role/roleApiSlice'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Table, TableColumnsType } from 'antd'
import { Info, Pen, Trash2 } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const List_Role = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data, isLoading } = useGetAllRoleQuery({})
  const [removeRole] = useRemoveRoleMutation()
  console.log(data)

  const dataSource = data?.data?.data.map((item: TRole, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns: TableColumnsType<TRole> = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      width: 100,
      align: 'center', // Căn giữa
    },
    {
      title: 'Tên nhóm quyền',
      key: 'name',
      dataIndex: 'name',
      width: 200,
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => <div>{formatDate(created_at)}</div>,
      width: 200,
      align: 'center', 
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (updated_at: string) => <div>{formatDate(updated_at)}</div>,
      width: 200,
      align: 'center',
    },
    {
      title: 'Chi tiết vai trò',
      render: (record: any) => (
        <div className='flex justify-center'>
          <Link to={`${router.rolePermission.replace(':id', record.id)}`}>
            <Info className='text-xl hover:text-[#ff4667]' />
          </Link>
        </div>
      ),
      align: 'center', 
    },
    {
      title: 'Chức năng',
      render: (_: any, record: any) => (
        <div className='flex items-center justify-center gap-2'>
          <Link to={`${router.rolesUpdate.replace(':id', record?.id)}`}>
            <Button type='primary'>
              <Pen size={20} />
            </Button>
          </Link>
  
          <Button type='primary' danger onClick={() => handleRemove(record.id)}>
            <Trash2 size={20} />
          </Button>
        </div>
      ),
      align: 'center', // Căn giữa
    },
  ];
  

  const handleRemove = (id: number) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận xóa quyền</span>,
      content: <p className='dark:text-[#b9b7c0] text-[#685f78]'>Bạn có chắc chắn muốn xóa quyền này hay không?</p>,
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null,
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const res = await removeRole(id)
            if (res.data) {
              messageApi.open({
                type: 'success',
                content: 'Xóa quyền thành công!'
              })
            }

            resolve(undefined)
          }, 666)
        })
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>{getTitleTab('Quản lý phân quyền')}</title>
      </Helmet>
      {contextHolder}
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
        <div className='flex flex-col md:flex-row justify-between items-center pb-4'>
          <p className='font-title text-lg md:text-xl'>Danh sách phân quyền</p>
          <Link
            to={'/admin/roles/create'}
            className='border border-[#F84563] py-2 px-4 md:px-5 rounded-md bg-[#F84563] text-white hover:bg-white hover:border-[#F84563] hover:text-[#F84563] flex items-center gap-2 md:gap-3'
          >
            <PlusCircleOutlined />
            <span className='hidden sm:inline'>Thêm mới</span>
          </Link>
        </div>
        <Table
          columns={columns}
          pagination={false}
          rowKey='id'
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
          loading={isLoading}
        />
      </div>
    </div>
  )
}

export default List_Role
