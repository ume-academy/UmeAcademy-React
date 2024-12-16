import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, smoothScrollToTop } from '@/constants/utils'
import useLoading from '@/hooks/useLoading'
import { TBlog } from '@/interfaces/TBlog'
import { TTransaction } from '@/interfaces/TTransaction'
import { useGetAllArticleAdminQuery, useRemoveArticleMutation } from '@/redux/slices/blog/blogApiSlice'

import {
  Button,
  Image,
  message,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  Tag,
  TreeSelect,
  TreeSelectProps
} from 'antd'
import { Pen, Trash2 } from 'lucide-react'
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

const List_Article = () => {
  const { startLoading, stopLoading } = useLoading()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(undefined)
  const { data: listArticleData, isLoading } = useGetAllArticleAdminQuery({
    per_page: 10,
    status: selectedStatus || '',
    page: currentPage
  })
  const [removeArticle] = useRemoveArticleMutation()

  console.log(listArticleData)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }

  const handleRemove = async (item: TBlog) => {
    // Xóa bản ghi
    Modal.confirm({
      title: <span className='text-red-500 font-title'>Xác nhận xóa bản ghi</span>,
      content: (
        <p className='dark:text-[#b9b7c0] text-[#685f78]'>
          Bạn có chắc chắn muốn xóa bản ghi có tên <span className='font-desc'>"{item.title}"</span> hay không?
        </p>
      ),
      okText: 'Đồng ý',
      okType: 'danger',
      okButtonProps: {
        style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
      },
      cancelButtonProps: {
        className: 'custom-cancel-btn' // Thêm lớp CSS tùy chỉnh
      },
      cancelText: 'Hủy',
      centered: true,
      maskClosable: false,
      width: 600,
      icon: null, // Bỏ biểu tượng trong modal
      onOk: () => {
        startLoading()
        try {
          // Logic
          removeArticle(item.id) // Xóa bản ghi
          message.success(`Xoá bài viết thành công!`)
        } catch (error) {
          console.log(error)
          message.success(`Xoá bài viết thất bại!`)
        } finally {
          // Dừng loading
          stopLoading()
        }
      }
    })
  }

  const columns: TableColumnsType<TTransaction> = [
    {
      title: 'Stt',
      key: 'key',
      dataIndex: 'key',
      render: (_, record, index: number) => {
        // Tính toán STT dựa trên trang và số bản ghi mỗi trang
        return (+listArticleData?.meta?.current_page - 1) * +listArticleData?.meta?.per_page + index + 1
      },
      width: 60
    },
    {
      title: 'Tên bài viết',
      key: 'title',
      dataIndex: 'title',
      render: (title: string) => <div>{title}</div>,
      width: 200,
      align: 'center' as const
    },
    {
      title: 'Thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (thumbnail: string) => <Image src={thumbnail} width={160} height={100} />,
      width: 200,
      align: 'center' as const
    },
    {
      title: 'Người tạo',
      key: 'user',
      dataIndex: 'user',
      render: (user: { fullname: string; email: string }) => <p>{user.fullname}</p>,
      width: 200,
      align: 'center' as const
    },
    {
      title: 'Thời gian',
      key: 'created_at',
      dataIndex: 'created_at',
      render: (created_at: string) => <p>{formatDate(created_at)}</p>,
      width: 200,
      align: 'center' as const
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'draft' | 'success') => (
        <Tag className='text-sm py-1 px-2 min-w-[120px] text-center' color={status === 'draft' ? 'gold' : 'green'}>
          {status === 'draft' ? 'Bản thảo' : 'Đã xuất bản'}
        </Tag>
      ),
      width: 100
    },
    {
      title: 'Chức năng',
      render: (_: any, item: any) => (
        <div className='flex items-center justify-center'>
          <Link to={`${router.articleUpdate.replace(':id', item.id)}`}>
            <Button type='primary' className='ml-2'>
              <Pen size={20} />
            </Button>
          </Link>

          <Button type='primary' danger className='ml-2' onClick={() => handleRemove(item)}>
            <Trash2 size={20} />
          </Button>
        </div>
      ),
      align: 'center' as const
    }
  ]

  return (
    <div className='dark:text-[#B9B7C0] dark:bg-[#2b2838] bg-white text-[#685f78] rounded-lg p-4'>
      <Helmet>
        <title>{getTitleTab('Quản lý bài viết')}</title>
      </Helmet>
      <div className='flex flex-col lg:flex-row lg:justify-between items-center mb-4'>
        <p className='text-xl font-semibold'>Danh sách bài viết</p>
        <div className='mt-4 md:mt-2 lg:mt-0'>
          <CustomTreeSelect
            placeholder='Lọc theo trạng thái'
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            className='w-full sm:w-40 h-10'
            treeData={[
              { value: 'draft', title: 'Bản thảo' },
              { value: 'published', title: 'Đã xuất bản' }
            ]}
            allowClear
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={listArticleData?.data}
        pagination={false}
        scroll={{ x: 1300 }}
        loading={isLoading}
      />
      <div className='flex justify-between items-center my-6 text-sm'>
        <p className='dark:text-[#b9b7c0]'>
          Trang số <span className='text-[#F84563] font-subtitle'>{listArticleData?.meta?.current_page}</span> trên tổng
          số <span className='text-[#F84563] font-subtitle'>{listArticleData?.meta?.last_page}</span> trang
        </p>
        <Pagination
          pageSize={listArticleData?.meta?.per_page}
          total={listArticleData?.meta?.total}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

export default List_Article
