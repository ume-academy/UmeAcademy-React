import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, formatPrice, smoothScrollToTop } from '@/constants/utils'
import { TCourse } from '@/interfaces/TCourse'
import { TTeacher } from '@/interfaces/TTeacher'
import { useGetAllCourseAdminQuery } from '@/redux/slices/course/courseApiSlice'
import { Pagination, Table, TableColumnsType, Tag, TreeSelect } from 'antd'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
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

const List_Courses = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isFetching, isLoading } = useGetAllCourseAdminQuery({
    page: selectedStatus ? 0 : currentPage,
    status: selectedStatus
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  const filteredData = data?.data?.filter(
    (course: TCourse) => selectedStatus === undefined || course.status === Number(selectedStatus)
  )

  const columns: TableColumnsType<TCourse> = [
    {
      title: 'Stt',
      key: 'stt',
      render: (_, __, index: number) => <div>{index + 1}</div>,
      width: 50,
      responsive: ['md']
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <img src={thumbnail} alt='Course thumbnail' width={100} />,
      width: 80,
      responsive: ['sm']
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
      responsive: ['md'],
      render: (teacher: TTeacher) => <div>{teacher.fullname}</div>
    },
    {
      title: 'Số tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <div>{formatPrice(price)}</div>,
      width: 100,
      responsive: ['md']
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => <div>{formatDate(created_at)}</div>,
      width: 150,
      responsive: ['lg']
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
          {status === 0 ? 'Nháp ' : status === 1 ? 'Chờ phê duyệt' : status === 2 ? 'Đã phê duyệt' : 'Lưu trữ'}
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
              setCurrentPage(1)
            }}
            className='w-44 h-10 mt-4 md:mt-0'
            treeData={[
              { value: 0, title: 'Nháp' },
              { value: 1, title: 'Chờ phê duyệt' },
              { value: 2, title: 'Đã phê duyệt' },
              { value: 3, title: 'Lưu trữ' }
            ]}
            allowClear
          />
        </div>
        <div className='overflow-x-auto'>
          <Table
            columns={columns}
            pagination={false}
            rowKey='id'
            dataSource={filteredData}
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
