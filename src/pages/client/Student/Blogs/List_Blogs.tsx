import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { formatDate, smoothScrollToTop } from '@/constants/utils'
import { TBlog } from '@/interfaces/TBlog'
import { useGetAllArticlePublishedQuery } from '@/redux/slices/blog/blogApiSlice'
import { Pagination } from 'antd'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const List_Blogs = () => {
  // const [form] = Form.useForm()
  // const { data: categoriesData } = useGetAllCategoryQuery({})
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 6
  const { data, refetch } = useGetAllArticlePublishedQuery({ per_page: perPage, page: currentPage })

  useEffect(() => {
    refetch()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    smoothScrollToTop()
  }
  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto  text-black dark:text-gray-200   mb-10 mt-32 md:mb-20 '>
      <Helmet>
        <title>{getTitleTab('Bài viết')}</title>
      </Helmet>
      <div className='w-full  flex flex-wrap gap-y-10 items-center justify-center md:justify-between'>
        {data?.data.map((blog: TBlog) => (
          <div className='space-y-6' key={blog.id}>
            <Link to={`${router.blogDetail.replace(':id', String(blog.id))}`}>
              <div className='overflow-hidden rounded-md'>
                <motion.img
                  src={blog.thumbnail as string}
                  alt=''
                  className='w-full h-full lg:w-[626px] lg:h-[360px] object-cover hover:rounded-md'
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            </Link>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <CalendarDays size={20} className='text-[#ff5364]' /> <p>{formatDate(blog.created_at)}</p>
              </div>
              {/* <p>|</p>
              <div className='flex items-center gap-2'>
                <Tag size={20} strokeWidth={3} className='text-red-400' /> <p>{blog.category}</p>
              </div> */}
            </div>
            <div className='space-y-6'>
              <Link
                to={`${router.blogDetail.replace(':id', String(blog.id))}`}
                className='hover:text-[#ff5364] font-title text-2xl  cursor-pointer line-clamp-2 md:line-clamp-1'
              >
                {blog.title}
              </Link>
              {/* <p className='text-sm line-clamp-4 md:line-clamp-3'>{blog.content}</p> */}
              <div>
                <Link
                  to={`${router.blogDetail.replace(':id', String(blog.id))}`}
                  className='border border-[#ff5364] hover:border-[#ff5364] hover:bg-white hover:text-[#ff5364] text-white bg-[#ff5364] py-3 px-6 rounded-lg'
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center my-6 text-sm mt-10'>
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
      {/* <div className='w-full lg:w-[26%]'>
        <div className='p-4 border dark:border-[#5a5a5a] rounded-md text-[16px] md:text-lg'>
          <div className='flex justify-between items-center font-semibold dark:text-[#B9B7C0]'>
            <p>Danh mục bài viết</p>
            <RotateCcw
              size={18}
              //  onClick={() => handleCategory('')}
              className='hover:text-[#b9b7c0] cursor-pointer'
            />
          </div>
          <div className='py-4 space-y-2'>
            <Form form={form} className='my-0'>
              <div>
                {categoriesData &&
                  categoriesData?.data.map((c: TCategory) => (
                    <Checkbox
                      className='flex items-center'
                      key={c.id}
                      // checked={filter.categories === c.name}
                      // onChange={() => handleCategory(c.name)}
                    >
                      {c.name} <span>(0)</span>
                    </Checkbox>
                  ))}
              </div>
            </Form>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default List_Blogs
