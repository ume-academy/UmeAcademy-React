import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { TPaymentMethob } from '@/interfaces/TPaymentMethob'
import {
  useGetPaymentMethodsQuery,
  useRemovePaymentMethodMutation
} from '@/redux/slices/payment_method/paymentMethodApiSlice'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, message, Modal, Table, TableColumnsType } from 'antd'
import { Pen, Trash2 } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const List_Payment_Method = () => {
  const { data, isLoading } = useGetPaymentMethodsQuery({})
  const [removePaymentMethod] = useRemovePaymentMethodMutation()
  const [messageApi, contextHolder] = message.useMessage()
  const {  startLoading, stopLoading } = useLoading()

  const handleRemove = (id: number) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>,
      content: <p className='dark:text-[#b9b7c0] text-[#685f78]'>Bạn có chắc chắn muốn xóa phương thức này không?</p>,
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn'
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null,
      onOk: () => {
        startLoading
        return new Promise((resolve) => {
          setTimeout(async () => {
            const res = await removePaymentMethod(id)
            console.log(res)
            if (res.data) {
              messageApi.open({
                type: 'success',
                content: `Xóa phương thức thành công!`
              })
            }else{ messageApi.open({
              type: 'error',
              content: `Xóa phương thức không thành công!`
            })}

            stopLoading
            resolve(undefined)
          }, 1000)
        })
      }
    })
  }

  const columns: TableColumnsType<TPaymentMethob> = [
    {
      title: 'Stt',
      key: 'stt',
      render: (_, __, index: number) => <div>{index + 1}</div>,
      width: 50
    },
    {
      title: 'Tên phương thức thanh toán',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => <div>{formatDate(created_at)}</div>,
      width: 200
    },
    {
      title: 'Chức năng',
      render: (_: any, item: any) => (
        <div className='flex items-center justify-center'>
          <Link to={`${router.paymentMethodUpdate.replace(':id', item?.id)}`}>
            <Button type='primary' className='ml-2'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button type='primary' danger className='ml-2' onClick={() => handleRemove(item?.id)}>
            <Trash2 size={20} />
          </Button>
        </div>
      ),
      width: 200,
      align: 'center' as const
    }
  ]

  return (
    <div>
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
        <Helmet>
          <title>{getTitleTab('Quản lý phương thức thanh toán')}</title>
        </Helmet>
        <div className='flex justify-between flex-col md:flex-row lg:flex-row mb-4'>
          <p className='font-title text-xl'>Danh sách phương thức thanh toán</p>
          <Link
            to={`${router.paymentMethodCreate}`}
            className='border mt-4 md:mt-0 lg:mt-0 w-[140px] flex justify-center items-center border-[#F84563] py-2 px-5 rounded-md bg-[#F84563] text-white hover:bg-white hover:border-[#F84563] hover:text-[#F84563] gap-3'
          >
            <PlusCircleOutlined />
            Thêm mới
          </Link>
        </div>
        <Table scroll={{ x: 966 }} dataSource={data?.data} columns={columns} pagination={false} rowKey='id' loading={isLoading} />
        {contextHolder}
      </div>
    </div>
  )
}

export default List_Payment_Method
