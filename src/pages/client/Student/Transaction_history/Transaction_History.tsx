import { getTitleTab } from '@/contants/client'
import { Table, Pagination, Tag } from 'antd'
import { Helmet } from 'react-helmet'
import '@/scss/TableAntd.scss'

interface Transaction {
  id: number
  courseName: string
  date: string
  price: string
  status: '0' | '1'
}

const transactions: Transaction[] = [
  {
    id: 2643,
    courseName: 'Xây dựng Website Thực tế với HTML5 và CSS3',
    date: '10/12/2024',
    price: '340.000',
    status: '0'
  },
  {
    id: 2644,
    courseName: 'Thiết kế từ A đến Z (2024): Trở thành nhà thiết kế ứng dụng',
    date: '10/11/2024',
    price: '340.000',
    status: '0'
  },
  {
    id: 2645,
    courseName: 'Hướng dẫn Cơ bản về Angular',
    date: '10/10/2024',
    price: '340.000',
    status: '1'
  },
  {
    id: 2646,
    courseName: 'Xây dựng Website Thực tế với HTML5 và CSS3',
    date: '14/12/2024',
    price: '340.000',
    status: '0'
  }
]

const Transaction_History = () => {
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 50,
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => `#${text}`
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
      key: 'courseName'
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `${text} ₫`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: '0' | '1') => (
        <Tag className='text-[15px] py-2 px-6' color={status === '1' ? 'green' : 'volcano'}>
          {status === '1' ? 'Hoàn thành' : 'Đang chờ'}
        </Tag>
      )
    }
  ]

  return (
    <div className='w-[1280px] mx-auto mt-40 mb-40'>
      <Helmet>
        <title>{getTitleTab('Lịch sử giao dịch')}</title>
      </Helmet>
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg border border-[#e9ecef] dark:border-none'>
        <h2 className='font-title text-2xl border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-6'>Lịch sử đơn hàng</h2>
        <Table
          dataSource={transactions}
          columns={columns}
          pagination={false}
          rowKey='id'
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-6'
        />
      </div>
      <div className='flex justify-end mt-6 '>
        <Pagination defaultCurrent={1} total={20} />
      </div>
    </div>
  )
}

export default Transaction_History
