import { router } from '@/configs/routes'
import { formatDate } from '@/constants/utils'
import { TBlog } from '@/interfaces/TBlog'
import { useGetAllArticlePublishedQuery } from '@/redux/slices/blog/blogApiSlice'
import { easeInOut, motion, useInView } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const NewBlog = () => {
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const { data, refetch } = useGetAllArticlePublishedQuery({ per_page: 2, page: 1 })

  useEffect(() => {
    refetch()
  }, [])
  // Theo dõi theo từng khối ref để tạo hiệu ứng cho nó
  const isTopInView = useInView(topRef, { amount: 0.1, once: true }) //amount: % phần tử khi di chuyển đến sẽ xuất hiện | once: không lặp lại
  const isBottomInView = useInView(bottomRef, { amount: 0.05, once: true })
  // const data: TBlog[] = [
  //   {
  //     id: 1,
  //     title: 'Learn Webs Applications Development from Experts',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede',
  //     thumbnail: 'https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-05.jpg',
  //     user_id: 1,
  //     status: 0,
  //     create_at: '21/12/2024',
  //     category: 'React'
  //   },
  //   {
  //     id: 2,
  //     title: 'Expand Your Career Opportunities With Python',
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede',
  //     thumbnail: '	https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-06.jpg',
  //     user_id: 2,
  //     status: 0,
  //     create_at: '21/12/2024',
  //     category: 'React'
  //   }
  // ]
  return (
    <div className='max-w-[768px] md:max-w-[1024px] lg:max-w-[1280px] mx-auto pt-[80px] pb-0 lg:pb-[90px] space-y-10 text-black dark:text-gray-200'>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isTopInView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1, ease: easeInOut }}
        ref={topRef}
        className='flex justify-between items-center mb-[18px]'
      >
        <div className=''>
          <h1 className='dark:text-[#B9B7C0] text-[#0b0b0b] text-[36px] font-title'>Bài viết</h1>
        </div>
        <Link
          to={`${router.listBlogs}`}
          className='mr-[20px] border-[2px] min-w-[140px] text-center transition-all duration-300 ease-in-out dark:text-[#b9b7c0] flex justify-center items-center rounded-3xl border-[#b4a7f5] text-[#392c7d] px-[15px] py-[10px] hover:bg-[#917cf6] hover:border-transparent dark:hover:text-[#fff] hover:text-[#fff]'
        >
          Xem thêm các bài viết
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isBottomInView ? { y: 0, opacity: 100 } : {}}
        transition={{ duration: 1, ease: easeInOut }}
        ref={bottomRef}
        className='w-full grid md:grid-cols-2 gap-x-2 gap-y-10 p-4 md:p-0'
      >
        {data?.data.map((blog: TBlog) => (
          <div className='space-y-6 w-full md:w-[98%]' key={blog.id}>
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
      </motion.div>
    </div>
  )
}

export default NewBlog
