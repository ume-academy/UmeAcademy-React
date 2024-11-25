import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice } from '@/constants/utils'
import { useTransactionHistoryQuery, useWalletBalanceQuery } from '@/redux/slices/teacher/wallet/walletApiSlice'
import '@/scss/PaginationAntd.scss'
import { WalletFilled } from '@ant-design/icons'
import { Form, Input, message, Modal, Pagination, Table } from 'antd'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

const Withdraw_Money = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 1
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const { data } = useTransactionHistoryQuery({ per_page: perPage, page: currentPage })
  const { data: price } = useWalletBalanceQuery({})
  const meta = data?.meta

  const showPopup = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFormSubmit = () => {
    try {
      messageApi.open({
        type:"success",
        content:"Gửi yêu cầu rút tiền thành công"
      })
    } catch (error) {
      
    }
  }

  const columns = [
    {
      title: <div className='pl-5'>STT</div>,
      key: 'stt',
      width: 50,
      render: (_: any, __: any, index: number) => <div className='pl-5'>{index + 1}</div>
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 140
    },
    {
      title: 'Phương thức',
      dataIndex: 'type',
      key: 'type',
      width: 190,
      render: (type: string) => (
        <div className='text-sm lg:text-[16px]'>
          {(() => {
            if (type === 'available_receive_money') {
              return <span>Số dư khả dụng</span>
            } else if (type === 'temporary_receive_money') {
              return <span>Tiền tạm giữ</span>
            } else if (type === 'withdraw_money') {
              return <span>Rút tiền</span>
            } else {
              return <span>Hoàn tiền</span>
            }
          })()}
        </div>
      )
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
        <title>{getTitleTab('Rút tiền')}</title>
      </Helmet>
      <div className='mb-4 dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]  rounded-lg'>
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
              <p className='text-xs md:text-lg  dark:hover:text-white'>
                Bạn đang có: <strong>{formatPrice(Number(price))}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={showPopup}
            className='bg-[#ff4667] text-white py-2 px-2 md:py-2 md:px-6 text-[11px] md:text-[15px] hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white'
          >
            Yêu cầu rút tiền
          </button>
          <Modal
            title={
              <span className='font-title text-[16px] md:text-xl dark:text-[#b9b7c0] text-[#685f78]'>
                Yêu cầu rút tiền
              </span>
            }
            visible={isModalVisible}
            footer={null}
            centered
            width={600}
            maskClosable={false}
            closeIcon={null}
          >
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
              <Form
                onFinish={handleFormSubmit}
                className='text-[15px] space-y-4 dark:text-[#b9b7c0] text-[#685f78]'
              >
                <label>Số tiền</label>
                <Form.Item
                  name='amount'
                  rules={[
                    {
                      required: true,
                      message: 'Nhập số tiền bạn muốn yêu cầu'
                    },
                    // {
                    //   type: 'number',
                    //   min: 100000,
                    //   message: 'Số tiền rút tối thiểu là 100.000đ'
                    // },
                    {
                      validator: (_, value) => {
                        if (value && value > Number(price)) {
                          return Promise.reject('Số tiền đã vượt quá số dư của ví UME')
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  <Input
                    id='amount'
                    type='number'
                    className='w-full pl-4 pr-4 py-2  dark:border-none border border-[#e9ecef] outline-none rounded-md dark:placeholder:text-[#B9B7C0] placeholder:text-[#685f78] '
                    placeholder='đ'
                  />
                </Form.Item>

                <div className='text-[15px] dark:text-[#B9B7C0] text-[#685f78] flex items-center gap-1 pt-6'>
                  <CircleAlert size={14} className='mr-2' />
                  <p>Số tiền rút tối thiểu là:</p>
                  <p className='dark:text-white text-[#685f78]'>100.000đ</p>
                </div>
                <div className='flex justify-start text-[16px] gap-4'>
                  <button
                    type='submit'
                    onClick={handleFormSubmit}
                    className='bg-[#ff4667] border border-[#ff4667] text-white text-[11px] md:text-[15px] py-1 px-4 md:py-2 md:px-6 hover:border hover:text-[#ff4667] rounded-lg hover:border-[#ff4667] hover:bg-white'
                  >
                    Gửi yêu cầu
                  </button>
                  <button
                    type='button'
                    onClick={handleCancel}
                    className=' text-[#ff4667] text-[11px] md:text-[15px]  py-1 px-9 md:py-2 md:px-12 rounded-lg border border-[#ff4667] hover:bg-[#ff4667] hover:text-white'
                  >
                    Hủy
                  </button>
                </div>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
      <div className='rounded-lg border border-[#e9ecef] dark:border-none dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78]'>
        <h2 className='text-xl md:text-2xl font-title border-b border-[#e9ecef]  dark:border-[#5a5a5a] p-4 lg:p-6'>
          Lịch sử rút tiền
        </h2>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          className='dark:bg-[#2b2838] dark:text-[#B9B7C0] p-4 lg:p-6'
          scroll={{ x: 670 }}
        />
      </div>
      <div className='flex justify-end mt-10'>
        <Pagination total={meta?.total} pageSize={perPage} current={currentPage} onChange={handlePageChange} />
      </div>
      {contextHolder}
    </div>
  )
}

export default Withdraw_Money
