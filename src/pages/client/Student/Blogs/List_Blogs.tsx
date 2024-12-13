import { router } from '@/configs/routes'
import { getTitleTab } from '@/constants/client'
import { TBlog } from '@/interfaces/TBlog'
import { CalendarDays, RotateCcw, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Checkbox, Form } from 'antd'
import { TCategory } from '@/interfaces/TCategory'
import { useGetAllCategoryQuery } from '@/redux/slices/category/categoryApiSlice'

const List_Blogs = () => {
  const [form] = Form.useForm()
  const { data: categoriesData } = useGetAllCategoryQuery({})

  const data: TBlog[] = [
    {
      id: 1,
      title: 'Learn Webs Applications Development from Experts',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede',
      thumbnail: 'https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-05.jpg',
      user_id: 1,
      status: 0,
      create_at: '21/12/2024',
      category: 'React'
    },
    {
      id: 2,
      title: 'Expand Your Career Opportunities With Python',
      content:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede',
      thumbnail: '	https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-06.jpg',
      user_id: 2,
      status: 0,
      create_at: '21/12/2024',
      category: 'React'
    }
  ]
  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:p-0 p-4 lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0]   mb-10 mt-32 md:mb-20 flex flex-wrap gap-y-20 justify-between items-start'>
      <Helmet>
        <title>{getTitleTab('Bài viết')}</title>
      </Helmet>
      <div className=' w-full lg:w-[70%] space-y-16'>
        {data.map((blog) => (
          <div className='space-y-6' key={blog.id}>
            <Link to={`${router.blogDetail.replace(':id', String(blog.id))}`}>
              <div className='overflow-hidden rounded-md'>
                <motion.img
                  src={blog.thumbnail as string}
                  alt=''
                  className='w-full h-full lg:w-[1000px] lg:h-[360px] object-cover hover:rounded-md'
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            </Link>
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <CalendarDays size={20} className='text-[#ff5364] text-[14px]' /> <p>{blog.create_at}</p>
              </div>
              <p>|</p>
              <div className='flex items-center gap-2'>
                <Tag size={20} strokeWidth={3} className='text-red-400 text-[14px]' /> <p>{blog.category}</p>
              </div>
            </div>
            <div className='space-y-6'>
              <Link
                to={`${router.blogDetail.replace(':id', String(blog.id))}`}
                className='hover:text-[#ff5364] font-title text-2xl text-black dark:text-gray-200 cursor-pointer line-clamp-2 md:line-clamp-1'
              >
                {blog.title}
              </Link>
              <p className='text-sm line-clamp-5 md:line-clamp-3'>{blog.content}</p>
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
      <div className='w-full lg:w-[26%]'>
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
      </div>
    </div>
  )
}

export default List_Blogs
