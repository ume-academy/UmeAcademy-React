import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TRefund } from '@/interfaces/TRefund'
import {
  useGetAllRefundRequestQuery,
  useUpdateStatusRefundRequestMutation
} from '@/redux/slices/transaction/refundApiSlice'
import { message, Pagination, Table, TableColumnsType, Tag, TreeSelect } from 'antd'
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
const List_Refund = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isFetching } = useGetAllRefundRequestQuery({ per_page: 10, page: currentPage })
  const [updateStatus] = useUpdateStatusRefundRequestMutation()

  const filteredStatus = (withdraw: TRefund): boolean => {
    return selectedStatus === undefined || withdraw.status === Number(selectedStatus)
  }

  const filteredData = data?.data?.filter((withdraw: TRefund) => filteredStatus(withdraw)) || []

  const dataSource = filteredData.map((item: TRefund, index: number) => ({
    key: index + 1,
    ...item
  }))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const columns: TableColumnsType<TRefund> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      align: 'center' as const,
      width: 60
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'student',
      key: 'student',
      width: 160
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'course',
      key: 'course',
      width: 200
    },
    {
      title: 'Số tiền',
      key: 'money',
      dataIndex: 'money',
      render: (money: number) => <p>{formatPrice(money)}</p>,
      width: 110
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'teacher',
      key: 'teacher',
      width: 160
    },

    {
      title: 'Thời gian yêu cầu',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at: string) => <p>{formatDate(created_at)}</p>,
      width: 160
    },
    {
      title: 'Lý do hoàn trả',
      dataIndex: 'refund_reason',
      key: 'refund_reason',
      width: 200
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number, record: TRefund) => {
        const handleStatusChange = async (value: number) => {
          try {
            const res = await updateStatus({ id: record.id, status: value })
            if (res.data) {
              message.success('Cập nhật trạng thái yêu cầu hoàn tiền thành công')
            } else {
              message.error('Đã xảy ra lỗi khi cập nhật trạng thái yêu cầu hoàn tiền')
            }
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        }
        if (status === 2) {
          return (
            <CustomTreeSelect
              value={undefined}
              placeholder='Chờ phê duyệt'
              onChange={(value) => handleStatusChange(value as number)}
              className='w-full sm:w-40 h-10'
              treeData={[
                { value: 0, title: 'Từ chối' },
                { value: 1, title: 'Phê duyệt' }
              ]}
            />
          )
        } else {
          return (
            <Tag className='text-sm w-full sm:w-40 py-[10px] text-center' color={status === 0 ? 'red' : 'green'}>
              {status === 0 ? 'Đã từ chối' : 'Thành công'}
            </Tag>
          )
        }
      },
      width: 100
    }
  ]

  return (
    <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
      <Helmet>
        <title>{getTitleTab('Yêu cầu hoàn tiền')}</title>
      </Helmet>
      <div className='flex flex-col lg:flex-row lg:justify-between mb-4'>
        <p className='text-xl font-semibold'>Danh sách yêu cầu hoàn tiền</p>
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
              { value: 0, title: 'Đã từ chối' },
              { value: 1, title: 'Đã phê duyệt' },
              { value: 2, title: 'Chờ phê duyệt' }
            ]}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content' }}
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

export default List_Refund
