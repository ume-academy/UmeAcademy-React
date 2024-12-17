import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { TTeacher } from '@/interfaces/TTeacher'
import { useGetAllCourseAdminQuery } from '@/redux/slices/course/courseApiSlice'
import { Image, Pagination, Table, TableColumnsType, Tag, TreeSelect, TreeSelectProps } from 'antd'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface CustomTreeSelectProps extends TreeSelectProps<any> {
  value?: any
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

const List_Courses = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading } = useGetAllCourseAdminQuery({
    page: currentPage,
    status: selectedStatus
  })
  console.log(selectedStatus)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  const dataSource = data?.data.map((item: TCourse, index: number) => ({
    key: (currentPage - 1) * data?.meta?.per_page + index + 1,
    ...item
  }))

  const columns: TableColumnsType<TCourse> = [
    {
      title: 'Stt',
      key: 'stt',
      render: (_, record, index: number) => {
        return (+data?.meta?.current_page - 1) * +data?.meta?.per_page + index + 1
      },
      width: 50
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <Image src={thumbnail} alt='Course thumbnail' style={{ width: '80px', height: 'auto', objectFit: 'cover' }} />
      ),
      width: 80
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
      key: 'name',
      width: 250
    },
    {
      title: 'Tác giả',
      dataIndex: 'teacher',
      key: 'teacher',
      width: 150,
      render: (teacher: TTeacher) => <div>{teacher.fullname}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <div>{formatPrice(price)}</div>,
      width: 100
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => <div>{formatDate(created_at)}</div>,
      width: 150
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 0 | 1 | 2) => (
        <Tag
          className='text-sm py-1 px-2 min-w-[110px] text-center'
          color={status === 0 ? 'red' : status === 1 ? 'blue' : status === 2 ? 'green' : 'gold'}
        >
          {status === 0 ? 'Nháp ' : status === 1 ? 'Chờ xuất bản' : status === 2 ? 'Đã xuất bản' : 'Lưu trữ'}
        </Tag>
      ),
      width: 150
    },
    {
      title: 'Chi tiết',
      key: 'actions',
      render: (record) => (
        <Link to={`${router.checkCourse.replace(':id', record.id)}`}>
          <Info className='flex-1 text-xl hover:text-[#ff4667] ml-3' />
        </Link>
      ),
      width: 80
    }
  ]

  return (
    <>
      <Helmet>
        <title>{getTitleTab('Quản lý khóa học')}</title>
      </Helmet>
      <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
        <div className='flex flex-wrap justify-between items-center pb-4'>
          <p className='font-title text-xl'>Danh sách khóa học</p>
          <CustomTreeSelect
            placeholder='Lọc theo trạng thái'
            value={selectedStatus}
            onChange={(value) => {
              setSelectedStatus(value as string)
            }}
            className='w-44 h-10 mt-4 md:mt-0'
            treeData={[
              { value: 'draft', title: 'Nháp' },
              { value: 'pending', title: 'Chờ xuất bản' },
              { value: 'published', title: 'Đã xuất bản' }
            ]}
            allowClear
          />
        </div>
        <div className='overflow-x-auto'>
          <Table
            columns={columns}
            pagination={false}
            rowKey='id'
            dataSource={dataSource}
            scroll={{ x: 'max-content' }}
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
            current={data?.meta?.current_page}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  )
}

export default List_Courses
