import { WalletFilled } from '@ant-design/icons'
import { Pagination, Table } from 'antd'
import '@/scss/TableAntd.scss'
import { useState } from 'react'
import { CircleAlert, X } from 'lucide-react'

interface WalletTransaction {
  id: string
  type: string
  method: string
  date: string
  amount: string
  note: string
}

const wallet: WalletTransaction[] = [
  {
    id: 'dh73232đww33',
    type: 'Mua hàng',
    date: '10/12/2024',
    method: 'Chuyển khoản ngân hàng',
    amount: '-1000222',
    note: 'giao dep trai'
  },
  {
    id: 'dh73232đww33',
    type: 'Hoàn tiền',
    method: 'Chuyển khoản ngân hàng',
    date: '10/12/2024',
    amount: '500000',
    note: 'giao dep trai'
  },
  {
    id: 'dh73232đww33',
    type: 'Nạp tiền',
    method: 'Chuyển khoản ngân hàng',
    date: '10/12/2024',
    amount: '300000',
    note: 'giao dep trai'
  },
  {
    id: 'dh73232đww33',
    type: 'Mua hàng',
    method: 'Chuyển khoản ngân hàng',
    date: '10/12/2024',
    amount: '-300000',
    note: 'giao dep trai'
  }
]

const formatCurrency = (amount: string) => {
  const absAmount = Math.abs(parseInt(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${parseInt(amount) < 0 ? '-' : ''}${absAmount} ₫`
}

const Wallet_History = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'id',
      key: 'id',
      width: 150
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      width: 130,
      render: (type: string) => <div className='text-[16px]'>{type}</div>
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'method',
      key: 'method',
      width: 160
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 140,
      render: (date: string) => <div className='text-[16px]'>{date}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      render: (amount: string) => (
        <span className='text-[16px]' style={{ color: parseInt(amount) < 0 ? 'red' : 'green' }}>
          {formatCurrency(amount)}
        </span>
      )
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: 200
    }
  ]

  return (
    <div className='w-[1280px] mx-auto mt-40 mb-40'>
      <div className='mb-6 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg shadow-lg'>
        <p className='font-title text-2xl border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-6'>Ví Ume</p>
        <div className='flex justify-between items-center p-6'>
          <div className='flex gap-4 items-center'>
            <div className='relative flex items-center'>
              <WalletFilled className='text-[#ff5364] text-[50px]' />
              <span className='absolute top-[-3px] left-2 text-[#fff] font-bold text-[10px]'>UME</span>
            </div>
            <div>
              <p className='text-[15px]'>Số dư hiện tại</p>
              <p className='text-[18px] font-semibold dark:hover:text-white'>Bạn đang có: 1.000.000.000 ₫</p>
            </div>
          </div>
          <button onClick={openModal}
            className='bg-[#ff5364] text-white h-10 px-6 text-[15px] hover:border hover:text-[#ff5364] rounded-lg hover:border-[#ff5364] hover:bg-white' >
            Nạp tiền
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg  relative w-[46%] p-7">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 border border-[#ff4667] rounded-full p-1 bg-white text-[#ff4667] hover:bg-[#ff4667] hover:text-white">
              <X size={16} />
            </button>
            <h2 className="font-subtitle mb-4">Nạp tiền vào ví Ume</h2>
            <p className='text-[16px] mb-4'>Việc nạp tiền vào ví Ume của bạn thật đơn giản và thuận tiện. Hãy kiểm tra thông báo giao dịch để theo dõi hoạt động nạp tiền của bạn nhé!</p>
            <form>
            <div className="mb-6 text-[15px] space-y-2">
                <label>
                  Số tiền
                </label>
                <input
                  id="amount"
                  type="number"
                  className="w-full pl-4 pr-4 py-2 dark:bg-[#131022] dark:border-none border border-[#e9ecef] outline-none rounded-md dark:placeholder:text-[#B9B7C0] placeholder:text-[#685f78] "
                  placeholder="đ"
                />
                <div className="text-[15px] dark:text-[#B9B7C0] text-[#685f78] flex items-center gap-1 pt-2">
                  <CircleAlert size={14} className='mr-2' />
                  <p>Số tiền rút tối thiểu là:</p>
                  <p className="dark:text-white text-[#685f78]">100.000đ</p>
                </div>
              </div>
              <div className="flex justify-start text-[16px] gap-4">
                <button
                  type="submit"
                  className="bg-[#ff4667] border border-[#ff4667] text-white py-2 px-6 hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white">
                  Nạp tiền
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className=" text-[#ff4667] py-2 px-4 rounded-lg border border-[#ff4667] hover:bg-[#ff4667] hover:text-white">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='font-title text-2xl border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-6'>Lịch sử giao dịch</h2>
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