import { getTitleTab } from '@/constants/client'
import { TBlog } from '@/interfaces/TBlog'
import { motion } from 'framer-motion'
import { CalendarDays, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet'

const Blog_Detail = () => {
  const data: TBlog = {
    id: 1,
    title: 'Learn Webs Applications Development from Experts',
    content:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede.      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede',
    thumbnail: 'https://dreamslms.dreamstechnologies.com/html/assets/img/blog/blog-05.jpg',
    user_id: 1,
    status: 0,
    create_at: '21/12/2024',
    category: 'React'
  }
  return (
    <div className='max-w-[768px] md:max-w-[1024px]   p-4 lg:p-0 lg:max-w-[1280px] mx-auto text-[#685f78] dark:text-[#B9B7C0] mt-20 mb-10 md:mt-32 md:mb-32'>
      <Helmet>
        <title>{getTitleTab('Bài viết')}</title>
      </Helmet>
      <div className='w-full'>
        <div className='space-y-6' key={data.id}>
          <div className='space-y-4'>
            <div>
              <p className='font-title text-2xl md:text-4xl text-black dark:text-gray-200'>{data.title}</p>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                  <CalendarDays size={20} className='text-[#ff5364] text-[14px]' /> <p>{data.create_at}</p>
                </div>
                <p>|</p>
                <div className='flex items-center gap-2'>
                  <Tag size={20} strokeWidth={3} className='text-red-400 text-[14px]' /> <p>{data.category}</p>
                </div>
              </div>
            </div>

            <div className='overflow-hidden rounded-md'>
              <motion.img
                src={data.thumbnail as string}
                alt=''
                className='w-full h-full  object-cover hover:rounded-md'
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          <p className='text-[16px] md:text-lg'>{data.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog_Detail
