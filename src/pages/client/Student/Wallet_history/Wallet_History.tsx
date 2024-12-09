import Loading from '@/components/client/commonComponents/Loading/Loading'
import { formatDate, formatPrice } from '@/constants/utils'
import { TWalletHistoryStudent } from '@/interfaces/TWalletHistoryStudent'
import { useGetWalletBalanceQuery, useGetWalletHistoriesQuery } from '@/redux/slices/student/walletHistoryApiSlice'
import '@/scss/TableAntd.scss'
import { WalletFilled } from '@ant-design/icons'
import { Pagination, Table } from 'antd'
import { CircleAlert, X } from 'lucide-react'
import { useState } from 'react'


const Wallet_History = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1)

  const { data: walletBalance, isLoading, isFetching } = useGetWalletBalanceQuery(page, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const { data: walletHistories } = useGetWalletHistoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  });

  console.log(walletHistories)

  const dataSourse = walletHistories?.data?.map((item: TWalletHistoryStudent, index: number) => (
    {
      key: index + 1,
      ...item
    }
  ))

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 20,
      align: 'center' as const,
    },
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      align: 'center' as const,
      width: 130
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'type',
      key: 'type',
      width: 180,
    },
    {
      title: 'Số tiền',
      width: 200,
      render: (_: any, record: TWalletHistoryStudent) => <span className=''>{formatPrice(record?.balance_tracking)}</span>,
      align: 'center' as const,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: 180
    },
    {
      title: 'Ngày giao dịch',
      width: 200,
      render: (_: any, record: TWalletHistoryStudent) => <span className=''>{formatDate(record?.created_at)}</span>,
      align: 'center' as const,
    },
  ]

  if (isLoading || isFetching) return <div className="min-h-screen flex justify-center items-center"><Loading /></div>

  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto mt-20 mb-10 md:mt-40 md:mb-32'>
      <div className='mb-6 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]  rounded-lg shadow-lg'>
        <p className='font-title text-xl md:text-2xl border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 md:p-6'>Ví Ume</p>
        <div className='flex flex-wrap justify-between items-center p-4 md:p-6'>
          <div className='flex gap-4 items-center'>
            <div className='flex items-center'>
              <WalletFilled className='text-[#ff5364] text-4xl md:text-5xl lg:text-[50px]' />
            </div>
            <div>
              <p className='text-sm md:text-[15px]'>Số dư hiện tại</p>
              <p className='text-xs md:text-lg  dark:hover:text-white'>Bạn đang có: <strong>{formatPrice(walletBalance?.data)}</strong></p>
            </div>
          </div>
          <button onClick={openModal}
            className='bg-[#ff5364] border border-[#ff5364] text-white py-1 px-4 md:py-2 md:px-6 text-[11px] md:text-[15px] hover:border hover:text-[#ff5364] rounded-lg hover:border-[#ff5364] hover:bg-white' >
            Nạp tiền
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] text-xl rounded-lg  relative w-[90%] md:w-[70%] lg:w-[50%] p-6">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 border border-[#ff4667] rounded-full p-1 bg-white text-[#ff4667] hover:bg-[#ff4667] hover:text-white">
              <X size={16} />
            </button>
            <h2 className="font-subtitle mb-4">Nạp tiền vào ví Ume</h2>
            <p className='text-sm lg:text-[15px] mb-4'>Việc nạp tiền vào ví Ume của bạn thật đơn giản và thuận tiện. Hãy kiểm tra thông báo giao dịch để theo dõi hoạt động nạp tiền của bạn nhé!</p>
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
              <div className="flex justify-start text-[15px] gap-4">
                <button
                  type="submit"
                  className="bg-[#ff4667] border border-[#ff4667] text-white  hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white text-[11px] md:text-[15px]  py-1 px-4 md:py-2 md:px-6">
                  Nạp tiền
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className=" text-[#ff4667]  rounded-lg border border-[#ff4667] hover:bg-[#ff4667] hover:text-white text-[11px] md:text-[15px]  py-1 px-7 md:py-2 md:px-10">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='font-title text-xl md:text-2xl border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 md:p-6'>Lịch sử giao dịch</h2>

        {
          walletHistories?.data?.length === 0 ? (
            <div className="text-center py-20">
              <h3>Không tìm thấy lịch sử giao dịch ở tài khoản hiện tại!</h3>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={dataSourse}
              pagination={false}
              className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-4 md:p-6 '
              scroll={{ x: 670 }}
            />
          )
        }

      </div>

      {
        walletHistories?.data?.length > 0 && (
          <div className='flex justify-end mt-10'>
            <Pagination
              pageSize={walletHistories?.meta?.per_page}
              total={walletHistories?.meta?.total}
              current={walletHistories?.meta?.current_page}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
    </div>
  )
}

export default Wallet_History  