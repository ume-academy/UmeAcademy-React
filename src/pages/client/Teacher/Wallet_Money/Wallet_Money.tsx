import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { THistoryWallet } from '@/interfaces/THistoryWallet'
import {
  useCreateWithdrawalRequestMutation,
  useTransactionHistoryQuery,
  useWalletBalanceQuery
} from '@/redux/slices/teacher/wallet/walletApiSlice'
import '@/scss/PaginationAntd.scss'
import { WalletFilled } from '@ant-design/icons'
import { Form, Input, message, Modal, Pagination, Table, TableColumnsType } from 'antd'
import { CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const Wallet_Money = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useTransactionHistoryQuery({ page: currentPage })
  const { data: price, refetch } = useWalletBalanceQuery({})
  const [withdrawlaRequest] = useCreateWithdrawalRequestMutation({})
  const [form] = Form.useForm()

  console.log('price: ', price)

  useEffect(() => {
    refetch()
  }, [])

  const dataSource = data?.data.map((item: THistoryWallet, index: number) => ({
    key: index + 1,
    ...item
  }))

  const onFinish = async (value: { money: number }) => {
    try {
      const money = Number(value.money)
      console.log(money)
      const res = await withdrawlaRequest({ money: money }).unwrap()
      form.resetFields()
      console.log(res)
      message.success('Yêu cầu rút tiền đã được tạo thành công.')
    } catch (error) {
      message.error('Đã có lỗi xảy ra khi bạn tạo yêu cầu rút tiền')
    }
  }

  const handleForm = () => {
    Modal.confirm({
      title: (
        <span className='font-title text-lg md:text-2xl dark:text-[#b9b7c0] text-[#685f78]'>Yêu cầu rút tiền</span>
      ),
      content: (
        <div className='dark:text-[#b9b7c0] text-[#685f78]'>
          <p className='text-sm lg:text-[16px] font-subtitle mb-6'>
            Vui lòng kiểm tra thông báo giao dịch của bạn trên phương thức rút tiền bạn đã đăng kí
          </p>
          <div className='text-sm lg:text-[16px] flex justify-between items-center mb-4'>
            <div>
              <p>Số dư hiện tại:</p>
              <p className='text-[#ff4667]'>{formatPrice(Number(price))}</p>
            </div>
            <div>
              <div className='flex gap-2'>
                <span>Phương thức:</span>
              </div>
              <p>Chuyển khoản ngân hàng</p>
            </div>
          </div>
          <Form form={form} onFinish={onFinish} className='text-[15px] space-y-2  dark:text-[#b9b7c0] text-[#685f78]'>
            <label>Số tiền</label>
            <Form.Item
              name='money'
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject('Nhập số tiền bạn muốn yêu cầu')
                    }
                    if (value < 100000) {
                      return Promise.reject('Số tiền rút tối thiểu là 100.000đ')
                    }
                    if (value && value > Number(price)) {
                      return Promise.reject('Số tiền đã vượt quá số dư của ví UME')
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input id='money' type='number' className='w-full p-3' placeholder='Nhập số tiền muốn rút' />
            </Form.Item>

            <div className='text-[15px] dark:text-[#B9B7C0] text-[#685f78] flex items-center gap-1'>
              <CircleAlert size={14} className='mr-2' />
              <p>Số tiền rút tối thiểu là:</p>
              <p className='dark:text-white text-[#685f78]'>100.000đ</p>
            </div>
          </Form>
        </div>
      ),
      okType: 'danger',
      okText: <div>Gửi yêu cầu</div>,
      cancelText: 'Hủy',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff', padding: 20 }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn',
        style: { padding: 20 }
      },
      onOk: () => {
        form.submit()
      },
      centered: true,
      maskClosable: false,
      width: 666,
      icon: null
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const columns: TableColumnsType<THistoryWallet> = [
    {
      title: <div>STT</div>,
      key: 'key',
      dataIndex: 'key',
      width: 50
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 100
    },
    {
      title: 'Phương thức',
      dataIndex: 'type',
      key: 'type',
      width: 190
    },
    {
      title: 'Thời gian',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (created_at: string) => <div className='text-sm lg:text-[16px]'>{formatDate(created_at)}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'balance_tracking',
      key: 'balance_tracking',
      width: 120,
      render: (balance_tracking: number) => (
        <span className='text-sm lg:text-[16px]'>{formatPrice(balance_tracking)}</span>
      )
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: 100
    }
  ]

  return (
    <div className='md:flex md:flex-col md:justify-center lg:flex-none p-4 lg:p-0 '>
      <Helmet>
        <title>{getTitleTab('Ví UME')}</title>
      </Helmet>
      <div className='mb-4 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]  rounded-lg dark:border-none border border-[#e9ecef]'>
        <p className='border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 lg:p-6 font-title text-xl md:text-2xl'>
          Ví Ume
        </p>
        <div className='flex justify-between items-center p-4 lg:p-6'>
          <div className='flex gap-1 md:gap-4 items-center font-subtitle'>
            <div>
              <WalletFilled className='text-[#ff4667] text-4xl md:text-5xl lg:text-[50px]' />
            </div>
            <div>
              <p className='text-sm md:text-[15px]'>Số dư hiện tại</p>

              <div className="">
                <div className="text-xs md:text-lg  dark:hover:text-white  flex items-center">
                  <p className='min-w-[100px] md:min-w-[160px]'>
                    Số dư khả dụng:
                  </p>

                  <span>
                    {price?.available_balance ? <strong>{formatPrice(Number(price?.available_balance))}</strong> : <strong>0 đ</strong>}
                  </span>
                </div>

                <div className="text-xs md:text-lg  dark:hover:text-white  flex items-center">
                  <p className='min-w-[100px] md:min-w-[160px]'>
                    Số dư tạm thời:
                  </p>

                  <span>
                    {price?.temporary_balance ? <strong>{formatPrice(Number(price?.temporary_balance))}</strong> : <strong>0 đ</strong>}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleForm}
            className='bg-[#ff4667] text-white py-2 px-2 md:py-2 md:px-6 text-[11px] md:text-[15px] hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white'
          >
            Yêu cầu rút tiền
          </button>
        </div>
      </div>

      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='text-lg md:text-xl font-title border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 lg:p-6'>
          Lịch sử giao dịch của ví
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

export default Wallet_Money
