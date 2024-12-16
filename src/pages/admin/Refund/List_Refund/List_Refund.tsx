import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TRefund } from '@/interfaces/TRefund'
import {
  useGetAllRefundRequestQuery,
  useUpdateStatusRefundRequestMutation
} from '@/redux/slices/transaction/refundApiSlice'
import { message, Pagination, Table, TableColumnsType, TreeSelect, TreeSelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import './listAntd.scss'
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

const List_Refund = () => {
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, refetch } = useGetAllRefundRequestQuery({
    per_page: 10,
    status: selectedStatus || '',
    page: currentPage
  })
  const [updateStatus] = useUpdateStatusRefundRequestMutation()

  useEffect(() => {
    refetch()
  }, [])

  const dataSource = data?.data.map((item: TRefund, index: number) => ({
    key: (currentPage - 1) * data?.meta?.per_page + index + 1,
    ...item
  }))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const columns: TableColumnsType<TRefund> = [
    {
      title: 'STT',
      render: (_, record, index: number) => {
        return (+data?.meta?.current_page - 1) * +data?.meta?.per_page + index + 1
      },
      width: 50,
      align: 'center'
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
      key: 'price',
      dataIndex: 'price',
      render: (price: number) => <p>{formatPrice(price)}</p>,
      width: 110,
      align: 'center' as const
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
      width: 160,
      align: 'center' as const
    },
    {
      title: 'Lý do hoàn trả',
      dataIndex: 'refund_reason',
      key: 'refund_reason',
      render: (refund_reason: string) => <p>{refund_reason ? refund_reason : 'Trống'}</p>,
      width: 200
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: TRefund) => (
        // <Select
        //   className='selectFormUpdate w-full text-red-600'
        //   options={optionStatus}
        //   value={record.status}
        //   onChange={(value) => handleChangeStatus(value, record.transaction_code)}
        // />

        <CustomTreeSelect
          value={record.status}
          placeholder={record.status === 0 ? 'Đã từ chối' : record.status === 1 ? 'Đã phê duyệt' : 'Chờ phê duyệt'}
          onChange={(value) => handleChangeStatus(value, record.transaction_code)}
          className='w-36 h-10'
          treeData={[
            { value: 0, title: 'Đã từ chối' },
            { value: 2, title: 'Chờ phê duyệt' },
            { value: 1, title: 'Đã phê duyệt' }
          ]}
        />
      ),
      align: 'center' as const
    }
  ]

  const handleChangeStatus = async (value: any, transactionCode: string) => {
    try {
      const res = await updateStatus({ transactionCode: transactionCode, status: value })

      console.log(res)

      if (res.data) {
        message.success((res as any).data.message)
      } else {
        message.error('Không thể quay trở lại trạng thái Chờ phê duyệt!')
      }
    } catch (error) {
      console.log(error)

      message.error('Đã xảy ra lỗi khi cập nhật trạng thái yêu cầu hoàn tiền!')
    }
  }

  const optionStatus = [
    { value: 0, label: 'Đã từ chối' },
    { value: 1, label: 'Đã phê duyệt' },
    { value: 2, label: 'Chờ phê duyệt' }
  ]

  return (
    <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
      <Helmet>
        <title>{getTitleTab('Yêu cầu hoàn tiền')}</title>
      </Helmet>
      <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-4'>
        <p className='text-xl font-semibold'>Danh sách yêu cầu hoàn tiền</p>
        <div className=' mt-4 md:mt-2 lg:mt-0'>
          <CustomTreeSelect
            placeholder='Lọc theo trạng thái'
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value as number)}
            className='w-full sm:w-40 h-10'
            treeData={[
              { value: 'reject', title: 'Đã từ chối' },
              { value: 'pending', title: 'Đã phê duyệt' },
              { value: 'success', title: 'Chờ phê duyệt' }
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
        rowKey='key'
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
