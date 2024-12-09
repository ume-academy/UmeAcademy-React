import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice } from '@/constants/utils'
import { TTransactionHistory } from '@/interfaces/TTransactionHistory'
import { useGetTransactionHistoriesQuery } from '@/redux/slices/transaction_history/transactionHistoryApiSlice'
import '@/scss/TableAntd.scss'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Table, Tag } from 'antd'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'




const Transaction_History = () => {

  const [page, setPage] = useState(1);

  const { data: histories, isLoading, isError, error, isFetching } = useGetTransactionHistoriesQuery(page);

  // console.log(histories);

  const data = histories?.data?.map((item: TTransactionHistory, index: number) => (
    {
      key: index + 1,
      ...item
    }
  ))

  console.log(data)

  const columns = [
    {
      title: 'STT',
      key: 'key',
      dataIndex: 'key',
      align: 'center' as const,
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'transaction_code',
      key: 'transaction_code',
      align: 'center' as const,
    },
    {
      title: 'Tên khóa học',
      render: (_: any, record: TTransactionHistory) => (
        <Link to={router.courseDetail.replace(':id', String(record?.course?.id))}>{record?.course?.name}</Link>
      )
    },
    {
      title: 'Ngày giao dịch',
      render: (_: any, record: TTransactionHistory) => (
        <span>
          {
            formatDate(record.created_at)
          }
        </span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Giá gốc',
      render: (_: any, record: TTransactionHistory) => (
        <span>{formatPrice(+record?.origin_price)}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Giá khuyến mại',
      render: (_: any, record: TTransactionHistory) => (
        <span>{formatPrice(+record?.discount_price)}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Phương thức giao dịch',
      render: (_: any, record: TTransactionHistory) => (
        <span>{record?.payment_method?.name}</span>
      ),
      align: 'center' as const,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: TTransactionHistory) => (
        <Tag className='text-[15px] py-2 px-6 min-w-[128px] text-center font-semibold' color={record?.status === 'success' ? 'green' : record?.status === 'pending' ? 'yellow' : 'volcano'}>
          {record?.status === 'success' ? 'Hoàn thành' : record?.status === 'pending' ? 'Đang xử lý' : 'Đã hủy'}
        </Tag>
      ),
      align: 'center' as const,
    },
    // {
    //   title: 'Trạng thái',
    //   key: 'status',
    //   dataIndex: 'status',
    //   align: 'center' as const,
    // },
  ]

  if (isLoading && isFetching) return <div className="min-h-screen flex justify-center icon"><LoadingOutlined size={62} /></div>

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto mt-20 mb-10 md:mt-40 md:mb-32'>
      <Helmet>
        <title>{getTitleTab('Lịch sử giao dịch')}</title>
      </Helmet>
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg border border-[#e9ecef] dark:border-none'>
        <h2 className='font-title text-2xl border-b border-[#e9ecef] dark:border-[#5a5a5a] p-4 md:p-6'>Lịch sử giao dịch</h2>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey='id'
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-4 md:p-6 '
          scroll={{ x: 966 }}
        />
      </div>
      <div className="pt-4 space-x-3 flex justify-end">

        {histories?.meta?.last_page > 0 && (
          Array.from({ length: histories?.meta?.last_page }, (_, index) => (
            <Button
              key={`page-${index}`}
              onClick={() => setPage(index + 1)}
              style={{
                fontWeight: page === index + 1 ? 'bold' : 'normal', // Làm nổi bật trang hiện tại
                backgroundColor: page === index + 1 ? '#f84563' : 'transparent', // Làm nổi bật trang hiện tại
                color: page === index + 1 ? '#fff' : '#f84563', // Làm nổi bật trang hiện tại
                height: '40px',
              }}
            >
              {index + 1}
            </Button>
          ))
        )}
      </div>
    </div>
  )
}

export default Transaction_History
