import { WalletFilled } from '@ant-design/icons'
import { Pagination, Table, Tag } from 'antd'
import '@/scss/TableAntd.scss'
interface WalletTransaction {
  key: string
  type: string
  date: string
  amount: string
  status: '0' | '1'
}

const wallet: WalletTransaction[] = [
  {
    key: '1',
    type: 'Mua hàng',
    date: '10/12/2024',
    amount: '-1000222',
    status: '1'
  },
  {
    key: '2',
    type: 'Hoàn tiền',
    date: '10/12/2024',
    amount: '500000',
    status: '0'
  },
  {
    key: '3',
    type: 'Nạp tiền',
    date: '10/12/2024',
    amount: '300000',
    status: '1'
  },
  {
    key: '4',
    type: 'Mua hàng',
    date: '10/12/2024',
    amount: '-300000',
    status: '1'
  }
]

const formatCurrency = (amount: string) => {
  const absAmount = Math.abs(parseInt(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${parseInt(amount) < 0 ? '-' : ''}${absAmount} ₫`
}

const Wallet_History = () => {
  const columns = [
    {
      title: <div className='pl-5'>STT</div>,
      key: 'stt',
      width: 50,
      render: (_: any, __: any, index: number) => <div className='pl-5'>{index + 1}</div>
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => <div className='text-[16px]'>{type}</div>
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => <div className='text-[16px]'>{date}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount: string) => (
        <span className='text-[16px]' style={{ color: parseInt(amount) < 0 ? 'red' : 'green' }}>
          {formatCurrency(amount)}
        </span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: '0' | '1') => (
        <Tag className='text-[17px] py-2 px-9' color={status === '1' ? 'green' : 'volcano'}>
          {status === '1' ? 'Thành công' : 'Thất bại'}
        </Tag>
      ),
      width: 100
    }
  ]

  return (
    <div className='w-[1280px] mx-auto mt-40 mb-40'>
      <div className='mb-4 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg'>
        <p className='font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] p-6'>Ví Ume</p>
        <div className='flex justify-between items-center p-6'>
          <div className='flex gap-4 items-center'>
            <div className='relative flex items-center'>
              <WalletFilled className='text-[#ff5364] text-[50px]' />
              <span className='absolute top-[-3px] left-2 text-[#fff] font-bold text-[10px]'>UME</span>
            </div>
            <div>
              <p>Số dư hiện tại</p>
              <p className='dark:hover:text-white'>Bạn đang có: 1000.000.000đ</p>
            </div>
          </div>
          <button className='bg-[#ff5364] text-white h-10 px-6 text-[15px] hover:border hover:text-[#ff5364] rounded-lg hover:border-[#ff5364] hover:bg-white'>
            Nạp tiền
          </button>
        </div>
      </div>
      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='text-xl font-semibold border-b border-[#e9ecef] dark:border-[#5a5a5a] p-6'>Lịch sử giao dịch</h2>
        <Table
          columns={columns}
          dataSource={wallet}
          pagination={false}
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-6 '
        />
      </div>
      <div className='flex justify-end mt-6'>
        <Pagination defaultCurrent={1} total={22} />
      </div>
    </div>
  )
}

export default Wallet_History
