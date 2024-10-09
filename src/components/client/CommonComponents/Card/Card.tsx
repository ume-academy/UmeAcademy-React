import { BookFilled, FieldTimeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { getButtonDetails } from '~/contants/client'

const Card = () => {
  const [heart, setHeart] = useState(false)
  const location = useLocation()
  const { buttonText, targetPath } = getButtonDetails(location.pathname)
  const handleClick = () => {
    setHeart(!heart)
  }

  return (
    <div className='group dark:bg-[#2b2838] hover:bg-[#2b2838] dark:hover:text-white hover:text-white dark:text-[#B9B7C0] bg-white text-[#002058] w-[300px] text-[13px] border border-gray-200 dark:border-gray-600  rounded-lg shadow-sm overflow-hidden p-4 cursor-pointer'>
      <div className='relative'>
        <div className=' rounded-[10px] overflow-hidden'>
          <motion.img
            src='https://i.pravatar.cc'
            className='image w-full h-[220px] object-cover'
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
        <div className='absolute bottom-3 right-3 px-4 py-2  rounded-[6px] flex justify-between gap-2 items-center bg-white dark:bg-gray-900'>
          <p className='text-[15px] font-bold text-[#ff5364]  dark:text-[#B9B7C0]'>1.000.000 đ</p>
          <p className='text-gray-400 line-through text-[12px] pt-[2px]'>9.000.000 đ</p>
        </div>
      </div>
      <div className='mt-6 flex justify-between items-center'>
        <div className='flex items-center'>
          <img src='https://i.pravatar.cc/150' className='w-12 h-12  rounded-full' />
          <div className='ml-3'>
            <p className='dark:hover:text-[#ff5364] text-[16px]'>DaddyGiao</p>
            <p className=''>Giảng viên</p>
          </div>
        </div>
        <div onClick={handleClick} className='cursor-pointer text-xl'>
          {heart ? (
            <HeartFilled className='text-[#ff5364] group-hover:text-white' />
          ) : (
            <HeartOutlined className='text-[#ff5364] group-hover:text-white' />
          )}
        </div>
      </div>
      <div className='space-y-5 mt-4'>
        <h3 className='text-[17px] dark:hover:text-[#ff5364] w-[90%]'>Thông tin về thiết kế bằng UI/UX</h3>
        <div className='flex justify-between items-center border-b border-b-gray-500 pb-4'>
          <div className='flex items-center gap-1'>
            <BookFilled className='text-red-400 text-[14px] group-hover:text-white' />
            <span>12+ Bài học</span>
          </div>
          <div className='flex items-center gap-1'>
            <FieldTimeOutlined className='text-purple-500 text-lg group-hover:text-white' />
            <span>9h 30p</span>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-[11px] space-x-2'>
            <Rate allowHalf defaultValue={5} className='text-[11px]' />
            <span>5.0 (15)</span>
          </span>
          <Link to={targetPath}>
            <button
              className='border-[3px] border-[#b4a7f5] py-2 px-6 rounded-[50px] hover:bg-[#b4a7f5] hover:text-white
                        text-[14px]'
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
