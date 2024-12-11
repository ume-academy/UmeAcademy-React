import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TWithdrawalTransaction } from '@/interfaces/TWithdrawalTransaction'
import { useGetWithdrawHistoriesQuery } from '@/redux/slices/teacher/withdraw/withdrawApiSlice'
import '@/scss/PaginationAntd.scss'
import { Pagination, Table, TableColumnsType, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const Withdraw_Histories = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching, error, refetch } = useGetWithdrawHistoriesQuery({ page: currentPage })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  useEffect(() => {
    refetch()
  }, [refetch])

  const dataSource = data?.data.map((item: TWithdrawalTransaction, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns: TableColumnsType<TWithdrawalTransaction> = [
    {
      title: <div>STT</div>,
      key: 'key',
      dataIndex: 'key',
      width: 50
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
      width: 120,
      render: (money: number) => <span className='text-sm lg:text-[16px]'>{formatPrice(money)}</span>
    },
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (created_at: string) => <div className='text-sm lg:text-[16px]'>{formatDate(created_at)}</div>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 0 | 1 | 2) => (
        <Tag
          className='text-sm py-1 px-2 min-w-[120px] text-center'
          color={status === 0 ? 'red' : status === 1 ? 'green' : 'blue'}
        >
          {status === 0 ? 'Đã bị từ chối' : status === 1 ? 'Đã hoàn thành' : 'Chờ phê duyệt'}
        </Tag>
      ),
      width: 100
    }
  ]

  return (
    <div className='md:flex md:flex-col md:justify-center lg:flex-none p-4 lg:p-0 '>
      <Helmet>
        <title>{getTitleTab('Lịch sử rút tiền')}</title>
      </Helmet>

      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='text-xl md:text-2xl font-title border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 lg:p-6'>
          Lịch sử rút tiền
        </h2>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-4 lg:p-6'
          scroll={{ x: 670 }}
          loading={isLoading}
        />
      </div>

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

export default Withdraw_Histories
