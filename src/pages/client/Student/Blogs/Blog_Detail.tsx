import { getTitleTab } from '@/constants/client'
import { formatDate } from '@/constants/utils'
import { useGetArticlePublishedQuery } from '@/redux/slices/blog/blogApiSlice'
import { motion } from 'framer-motion'
import { CalendarDays, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styles from './blogDetail.module.scss'
import { useEffect } from 'react'
import Loading from '@/components/client/commonComponents/Loading/Loading'

const Blog_Detail = () => {
  const { id } = useParams()
  const { data, refetch, isFetching, isLoading } = useGetArticlePublishedQuery({ id })

  useEffect(() => {
    refetch()
  }, [])

  const content = data?.content || ''

  if (isLoading || isFetching)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loading />
      </div>
    )
  return (
    <div className='max-w-[768px] md:max-w-[1024px] p-4 lg:p-0 lg:max-w-[1080px] mx-auto  text-gray-800 dark:text-gray-300  mt-20 mb-10 md:mt-32 md:mb-32'>
      <Helmet>
        <title>{getTitleTab('Bài viết')}</title>
      </Helmet>
      <div className='w-full'>
        <div className='space-y-6' key={data?.id}>
          <div className='space-y-4'>
            <div>
              <p className='font-title text-2xl md:text-4xl text-black dark:text-gray-200 pb-1'>{data?.title}</p>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-2 text-sm'>
                  <CalendarDays size={18} className='text-[#ff5364]' />
                  <p>{data?.created_at && formatDate(data.created_at)}</p>
                </div>
                {/* <p>|</p>
                <div className='flex items-center gap-2'>
                  <Tag size={20} strokeWidth={3} className='text-red-400 text-[14px]' /> <p>{data?.category}</p>
                </div> */}
              </div>
            </div>

            <div className='overflow-hidden rounded-md'>
              <motion.img
                src={data?.thumbnail as string}
                alt=''
                className='w-full h-full  object-cover hover:rounded-md'
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <div className={`${styles.content}`} dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </div>
  )
}

export default Blog_Detail
