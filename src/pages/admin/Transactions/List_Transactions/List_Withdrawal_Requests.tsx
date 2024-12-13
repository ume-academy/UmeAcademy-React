import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TInfoWithdrawRequest } from '@/interfaces/TInfoWithdraw'
import {
  useGetAllWithdrawRequestQuery,
  useUpdateStatusWithdrawRequestMutation
} from '@/redux/slices/teacher/withdraw/withdrawApiSlice'
import { DatePicker, message, Modal, Pagination, Table, TableColumnType, TreeSelect, TreeSelectProps } from 'antd'
import { Info } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

interface CustomTreeSelectProps extends TreeSelectProps<any> {
  value?: number
}

const CustomTreeSelect = styled(({ value, ...props }: CustomTreeSelectProps) => <TreeSelect {...props} />)`
  .ant-select-selector {
    background-color: ${({ value }) => (value === 0 ? '#fff1f0' : value === 1 ? '#f6ffed' : '#e6f4ff')} !important;
    border: ${({ value }) => (value === 0 ? '#ffa39e' : value === 1 ? '#b7eb8f' : '#91caff')} 1px solid !important;
  }

  .dark & .ant-select-selector {
    background-color: ${({ value }) => (value === 0 ? '#fff1f0' : value === 1 ? '#f6ffed' : '#e6f4ff')} !important;
    border: ${({ value }) => (value === 0 ? '#ffa39e' : value === 1 ? '#b7eb8f' : '#91caff')} 1px solid !important;
  }

  .ant-select-selector .ant-select-selection-placeholder {
    color: ${({ value }) => (value === 0 ? '#d81322' : value === 1 ? '#389e0d' : '#098eea')} !important;
  }

  .dark & .ant-select-selector .ant-select-selection-placeholder {
    color: ${({ value }) => (value === 0 ? '#d81322' : value === 1 ? '#389e0d' : '#098eea')} !important;
  }
`

const List_Withdrawal_Requests = () => {
  // const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [startDate, setStartDate] = useState<string | ''>('')
  const [endDate, setEndDate] = useState<string | ''>('')
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching, refetch } = useGetAllWithdrawRequestQuery({
    per_page: 10,
    page: currentPage,
    start_date: startDate,
    end_date: endDate
  })
  const [updateStatus] = useUpdateStatusWithdrawRequestMutation()

  const handleInfoBank = (bank: any) => {
    Modal.confirm({
      title: <span className='text-red-500 font-title text-xl'>Thông tin ngân hàng</span>,
      content: (
        <div className='dark:text-[#b9b7c0] text-[#685f78] space-y-2 flex items-start gap-10 w-full text-lg p-4'>
          <div>
            <img src={bank.qrUrl} alt='qr' className='w-56 shadow-lg' />
          </div>
          <div className='space-y-4'>
            <p>
              Tên ngân hàng: <b>{bank.name_bank}</b>
            </p>
            <p>
              Tên tài khoản: <b>{bank.name_account}</b>
            </p>
            <p>
              Số tài khoản: <b>{bank.number_account}</b>
            </p>
            <p>
              Số tiền: <b>{formatPrice(bank.amount)}</b>
            </p>
          </div>
        </div>
      ),
      okText: 'Xong',
      okButtonProps: {
        style: {
          backgroundColor: '#F84563',
          borderColor: '#F84563',
          color: '#fff',
          padding: '20px 30px',
          fontSize: '16px'
        }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn hidden'
      },
      cancelText: false,
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

  const handleStartDate = (date: any) => {
    if (date) {
      setStartDate(date.format('YYYY-MM-DD'))
      console.log(startDate)
    } else setStartDate('')
  }

  const handleEndDate = (date: any) => {
    if (date) {
      setEndDate(date.format('YYYY-MM-DD'))
      console.log(endDate)
    } else setEndDate('')
  }

  // const filteredStatus = (withdraw: TInfoWithdrawRequest): boolean => {
  //   return selectedStatus === undefined || withdraw.status === Number(selectedStatus)
  // }

  // const filteredData = data?.data?.filter((withdraw: TInfoWithdrawRequest) => filteredStatus(withdraw)) || []

  const dataSource = data?.data?.map((item: TInfoWithdrawRequest, index: number) => ({
    key: index + 1,
    ...item
  }))

  const columns: TableColumnType<TInfoWithdrawRequest>[] = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      width: 60
    },
    {
      title: 'Mã giao dịch',
      key: 'code',
      dataIndex: 'code',
      width: 100
    },
    {
      title: 'Tên giảng viên',
      key: 'teacher',
      dataIndex: 'teacher',
      width: 150,
      render: (teacher: any) => <div>{teacher.name}</div>
    },
    {
      title: 'Số tiền',
      key: 'money',
      dataIndex: 'money',
      width: 120,
      render: (money: number) => <p>{formatPrice(money)}</p>
    },
    {
      title: 'Thời gian yêu cầu',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 136,
      render: (created_at: string) => <p>{formatDate(created_at)}</p>
    },
    {
      title: 'Thời gian yêu cầu',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 136,
      render: (created_at: string) => <p>{formatDate(created_at)}</p>
    },
    {
      title: 'Ngân hàng',
      key: 'teacher',
      dataIndex: 'teacher',
      width: 110,
      render: (teacher: any, record: TInfoWithdrawRequest) => (
        <div
          title='Thông tin ngân hàng'
          className='cursor-pointer pl-5'
          onClick={() =>
            handleInfoBank({
              ...teacher.bank,
              qrUrl: `https://img.vietqr.io/image/${teacher.bank.name_bank.replace(/\s+/g, '')}-${teacher.bank.number_account}-compact2.png?amount=${record.money}&addInfo=${record.code}`,
              amount: record.money
            })
          }
        >
          <Info />
        </div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: number, record: TInfoWithdrawRequest) => {
        const handleStatusChange = async (value: number) => {
          try {
            await updateStatus({ id: record.id, status: value }).unwrap()
            message.success('Cập nhật trạng thái yêu cầu rút tiền thành công')
          } catch (error) {
            message.error('Đã có lỗi xảy ra khi cập nhật trạng thái yêu cầu rút tiền')
            console.log(error)
          }
        }

        return (
          <CustomTreeSelect
            value={status}
            placeholder={status === 0 ? 'Đã từ chối' : status === 1 ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
            onChange={(value: number) => handleStatusChange(value as number)}
            className='w-36 h-10'
            treeData={[
              { value: 0, title: 'Từ chối' },
              { value: 2, title: 'Chờ phê duyệt' },
              { value: 1, title: 'Phê duyệt' }
            ]}
          />
        )
      }
    }
  ]

  return (
    <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
      <Helmet>
        <title>{getTitleTab('Quản lý giao dịch')}</title>
      </Helmet>
      <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-4'>
        <p className='text-xl font-semibold'>Yêu cầu rút tiền</p>
        <div className='flex flex-col sm:flex-row gap-4 lg:gap-6 items-center mt-4 md:mt-2 lg:mt-0'>
          <div className='flex gap-2 items-center'>
            <DatePicker
              value={startDate ? moment(startDate) : ''}
              placeholder='Ngày bắt đầu'
              className='dark:bg-[#2b2838] bg-white h-10'
              onChange={handleStartDate}
            />
            <span className='hidden sm:block'>-</span>
            <DatePicker
              value={endDate ? moment(endDate) : ''}
              placeholder='Ngày kết thúc'
              className='dark:bg-[#2b2838] bg-white h-10'
              onChange={handleEndDate}
            />
          </div>
          {/* <CustomTreeSelect
            placeholder='Lọc theo trạng thái'
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as string)}
            className='w-full sm:w-40 h-10'
            treeData={[
              { value: 0, title: 'Đã từ chối' },
              { value: 1, title: 'Đã phê duyệt' },
              { value: 2, title: 'Chờ phê duyệt' }
            ]}
            allowClear
          /> */}
        </div>
      </div>

      <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: 1260 }} loading={isLoading} />

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
export default List_Withdrawal_Requests
