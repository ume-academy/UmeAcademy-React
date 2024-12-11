import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TTransaction } from '@/interfaces/TTransaction'
import { useGetAllTransactionQuery } from '@/redux/slices/transaction/transactionApiSlice'
import { Pagination, Table, TableColumnsType, Tag, TreeSelect } from 'antd'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const CustomTreeSelect = styled(TreeSelect)`
  .ant-select-selector {
    background-color: #fafafa !important;
    border: 1px solid #c1c9d2 !important;
  }
  .dark & .ant-select-selector {
    background-color: #131022 !important;
    border: 1px solid #c7c7c740 !important;
  }
  .ant-select-selector .ant-select-selection-placeholder {
    color: #6e82a3 !important;
  }
  .dark & .ant-select-selector .ant-select-selection-placeholder {
    color: #e9ecef !important;
  }
`
const List_Transactions = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isFetching } = useGetAllTransactionQuery({ per_page: 10, page: currentPage })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  console.log(data)

  // const filteredDate = (transaction: Transaction) => {
  //   const createdAt = transaction.created_at ? new Date(transaction.created_at) : ''

  //   const start = startDate ? new Date(startDate) : null
  //   const end = endDate ? new Date(endDate) : null

  //   return (!start || createdAt >= start) && (!end || createdAt <= end)
  // }

  const filteredStatus = (transaction: TTransaction) => {
    return selectedStatus === undefined || transaction.status === String(selectedStatus)
  }

  const filteredData = data?.data.filter((transaction: TTransaction) => filteredStatus(transaction)) || []

  const dataSource = filteredData.map((item: TTransaction, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns: TableColumnsType<TTransaction> = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      width: 60
    },
    {
      title: 'Mã giao dịch',
      key: 'transaction_code',
      dataIndex: 'transaction_code',
      width: 120
    },
    {
      title: 'Họ và tên',
      key: 'user',
      dataIndex: 'user',
      render: (user: any) => <div>{user.name}</div>,
      width: 150
    },
    {
      title: 'Tên khóa học',
      key: 'course',
      dataIndex: 'course',
      render: (course: any) => <div>{course.name}</div>,
      width: 200
    },
    {
      title: 'Giá gốc',
      key: 'origin_price',
      dataIndex: 'origin_price',
      render: (origin_price: number) => <p>{formatPrice(origin_price)}</p>,
      width: 110
    },
    {
      title: 'Giá giảm giá',
      key: 'discount_price',
      dataIndex: 'discount_price',
      render: (discount_price: number) => <p>{formatPrice(discount_price)}</p>,
      width: 110
    },
    {
      title: 'Thời gian',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at: string) => <p>{formatDate(created_at)}</p>,
      width: 120
    },
    {
      title: 'Phương thức than toán',
      key: 'payment_method',
      dataIndex: 'payment_method',
      render: (payment_method: any) => <p>Phương thức {payment_method?.name}</p>,
      width: 170
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'pending' | 'success' | 'canceled') => (
        <Tag
          className='text-sm py-1 px-2 min-w-[120px] text-center'
          color={status === 'pending' ? 'blue' : status === 'success' ? 'green' : 'red'}
        >
          {status === 'pending' ? 'Chưa thanh toán' : status === 'success' ? 'Đã thanh toán' : 'Đã từ chối'}
        </Tag>
      ),
      width: 100
    }
  ]

  return (
    <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
      <Helmet>
        <title>{getTitleTab('Quản lý giao dịch')}</title>
      </Helmet>
      <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-4'>
        <p className='text-xl font-semibold'>Danh sách giao dịch</p>
        <div className='flex flex-col sm:flex-row gap-4 lg:gap-6 items-center mt-4 md:mt-2 lg:mt-0'>
          {/* <div className='flex gap-2 items-center'>
            <DatePicker
              value={startDate}
              placeholder='Ngày bắt đầu'
              className='dark:bg-[#2b2838] bg-white h-9'
              onChange={setStartDate}
            />
            <span className='hidden sm:block'>-</span>
            <DatePicker
              value={endDate}
              placeholder='Ngày kết thúc'
              className='dark:bg-[#2b2838] bg-white h-9'
              onChange={setEndDate}
            />
          </div> */}
          <CustomTreeSelect
            placeholder='Lọc theo trạng thái'
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as string)}
            className='w-full sm:w-40 h-10'
            treeData={[
              { value: 'pending', title: 'Chưa thanh toán' },
              { value: 'success', title: 'Đã thanh toán' },
              { value: 'canceled', title: 'Đã từ chối' }
            ]}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 1300 }}
        loading={isLoading}
      />

      <div className='flex justify-between items-center my-6 text-sm'>
        <p className='dark:text-[#b9b7c0]'>
          Trang số <span className='text-[#F84563] font-subtitle'>{data?.meta?.current_page}</span> trên tổng số{' '}
          <span className='text-[#F84563] font-subtitle'>{data?.meta?.last_page}</span> trang
        </p>
        <Pagination
          pageSize={data?.meta?.per_page}
          total={data?.meta?.total}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default List_Transactions
