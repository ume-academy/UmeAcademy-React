import { DownOutlined, LeftOutlined, MenuOutlined, MoonFilled, PlayCircleFilled, SunFilled } from '@ant-design/icons'
import { Progress } from 'antd'
import { ChevronRight, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { getTitleTab, logo, useIsMobile, useIsTablet } from '../../../../contants/client'
import { ThemeContext, ThemeContextType } from '../../../../contexts/ThemeContext'
import style from './Lesson.module.scss'

const Lesson = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType

  // Sử dụng để kiểm tra kích thước màn hình rồi render element
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  // State đóng mở sidebar
  const [isOpenSideBar, setIsSideBar] = useState(isMobile || isTablet ? true : false)

  // State cho đóng mở subMenu
  const [isOpen, setIsOpen] = useState(false)

  const toggleSubMenu = () => {
    console.log(isOpen)
    setIsOpen(!isOpen)
  }

  const toggleSideBar = () => {
    console.log(isOpenSideBar)
    setIsSideBar(!isOpenSideBar)
  }

  const items = [
    {
      id: 1,
      title: 'Bắt đầu',
      completedLessons: '13/13',
      duration: '21.39',
      lessons: [
        { id: 1, title: 'Bạn sẽ nhận được gì sau khóa học này?', duration: '21.39' },
        { id: 2, title: 'Tìm hiểu nội dung chính của khóa học', duration: '15.20' },
        { id: 3, title: 'Giới thiệu giảng viên và phương pháp học', duration: '10.10' }
      ]
    },
    {
      id: 2,
      title: 'Chương 2: Tiếp tục',
      completedLessons: '8/10',
      duration: '18.45',
      lessons: [
        { id: 1, title: 'Cách thực hành bài học', duration: '12.30' },
        { id: 2, title: 'Tự đánh giá kết quả học tập', duration: '6.15' }
      ]
    },
    {
      id: 3,
      title: 'Chương 3: Nâng cao',
      completedLessons: '10/12',
      duration: '22.15',
      lessons: [
        { id: 1, title: 'Các kỹ thuật học tập hiệu quả', duration: '13.40' },
        { id: 2, title: 'Ứng dụng kiến thức vào thực tế', duration: '8.35' }
      ]
    },
    {
      id: 4,
      title: 'Chương 4: Kinh nghiệm học',
      completedLessons: '9/11',
      duration: '20.50',
      lessons: [
        { id: 1, title: 'Những điều cần biết khi học online', duration: '11.45' },
        { id: 2, title: 'Xây dựng tư duy học tập chủ động', duration: '9.05' }
      ]
    },
    {
      id: 5,
      title: 'Chương 5: Phát triển bản thân',
      completedLessons: '7/9',
      duration: '16.35',
      lessons: [
        { id: 1, title: 'Thiết lập mục tiêu học tập', duration: '8.15' },
        { id: 2, title: 'Quản lý thời gian hiệu quả', duration: '8.20' }
      ]
    },
    {
      id: 6,
      title: 'Chương 6: Kỹ năng mềm',
      completedLessons: '5/8',
      duration: '19.20',
      lessons: [
        { id: 1, title: 'Giao tiếp trong môi trường học tập', duration: '12.10' },
        { id: 2, title: 'Kỹ năng thuyết trình', duration: '7.10' }
      ]
    },
    {
      id: 7,
      title: 'Chương 7: Định hướng nghề nghiệp',
      completedLessons: '6/10',
      duration: '18.55',
      lessons: [
        { id: 1, title: 'Lựa chọn nghề nghiệp phù hợp', duration: '10.45' },
        { id: 2, title: 'Cách viết CV ấn tượng', duration: '8.10' }
      ]
    },
    {
      id: 8,
      title: 'Chương 8: Quản lý dự án',
      completedLessons: '11/12',
      duration: '22.50',
      lessons: [
        { id: 1, title: 'Giới thiệu về quản lý dự án', duration: '12.25' },
        { id: 2, title: 'Các giai đoạn của một dự án', duration: '10.25' }
      ]
    },
    {
      id: 9,
      title: 'Chương 9: Công cụ công nghệ',
      completedLessons: '9/9',
      duration: '17.30',
      lessons: [
        { id: 1, title: 'Sử dụng công cụ học tập trực tuyến', duration: '9.10' },
        { id: 2, title: 'Công cụ quản lý thời gian', duration: '8.20' }
      ]
    },
    {
      id: 10,
      title: 'Chương 10: Tư duy logic',
      completedLessons: '10/10',
      duration: '15.10',
      lessons: [
        { id: 1, title: 'Phát triển tư duy phân tích', duration: '7.30' },
        { id: 2, title: 'Giải quyết vấn đề hiệu quả', duration: '7.40' }
      ]
    },
    {
      id: 5,
      title: 'Chương 5: Phát triển bản thân',
      completedLessons: '7/9',
      duration: '16.35',
      lessons: [
        { id: 1, title: 'Thiết lập mục tiêu học tập', duration: '8.15' },
        { id: 2, title: 'Quản lý thời gian hiệu quả', duration: '8.20' }
      ]
    },
    {
      id: 6,
      title: 'Chương 6: Kỹ năng mềm',
      completedLessons: '5/8',
      duration: '19.20',
      lessons: [
        { id: 1, title: 'Giao tiếp trong môi trường học tập', duration: '12.10' },
        { id: 2, title: 'Kỹ năng thuyết trình', duration: '7.10' }
      ]
    },
    {
      id: 7,
      title: 'Chương 7: Định hướng nghề nghiệp',
      completedLessons: '6/10',
      duration: '18.55',
      lessons: [
        { id: 1, title: 'Lựa chọn nghề nghiệp phù hợp', duration: '10.45' },
        { id: 2, title: 'Cách viết CV ấn tượng', duration: '8.10' }
      ]
    },
    {
      id: 8,
      title: 'Chương 8: Quản lý dự án',
      completedLessons: '11/12',
      duration: '22.50',
      lessons: [
        { id: 1, title: 'Giới thiệu về quản lý dự án', duration: '12.25' },
        { id: 2, title: 'Các giai đoạn của một dự án', duration: '10.25' }
      ]
    },
    {
      id: 9,
      title: 'Chương 9: Công cụ công nghệ',
      completedLessons: '9/9',
      duration: '17.30',
      lessons: [
        { id: 1, title: 'Sử dụng công cụ học tập trực tuyến', duration: '9.10' },
        { id: 2, title: 'Công cụ quản lý thời gian', duration: '8.20' }
      ]
    },
    {
      id: 10,
      title: 'Chương 10: Tư duy logic',
      completedLessons: '10/10',
      duration: '15.10',
      lessons: [
        { id: 1, title: 'Phát triển tư duy phân tích', duration: '7.30' },
        { id: 2, title: 'Giải quyết vấn đề hiệu quả', duration: '7.40' }
      ]
    },
    {
      id: 11,
      title: 'Chương 11: Kỹ năng quản lý thời gian',
      completedLessons: '5/7',
      duration: '12.50',
      lessons: [
        { id: 1, title: 'Lập kế hoạch công việc', duration: '6.20' },
        { id: 2, title: 'Ưu tiên và sắp xếp công việc', duration: '6.30' }
      ]
    },
    {
      id: 12,
      title: 'Chương 12: Giao tiếp và truyền đạt',
      completedLessons: '8/8',
      duration: '14.20',
      lessons: [
        { id: 1, title: 'Kỹ năng lắng nghe', duration: '7.00' },
        { id: 2, title: 'Truyền đạt ý tưởng hiệu quả', duration: '7.20' }
      ]
    },
    {
      id: 13,
      title: 'Chương 13: Quản lý căng thẳng',
      completedLessons: '6/6',
      duration: '13.00',
      lessons: [
        { id: 1, title: 'Hiểu và kiểm soát căng thẳng', duration: '6.30' },
        { id: 2, title: 'Kỹ thuật thư giãn', duration: '6.30' }
      ]
    }
  ]

  return (
    <>
      <div className=''>
        <Helmet>
          <style>{`
                   body {
                   overflow: hidden;
                   }
                `}</style>
          <title>{getTitleTab('Bài học')}</title>
        </Helmet>
        {/* header */}
        <div className='bg-[#3d3a4e] h-[60px] flex items-center justify-between'>
          <div className='flex items-center h-full '>
            <Link to={`/course/1`} className='mr-2 px-4 border-r-[1px] border-gray-600 hover:bg-[#0000001a] h-full flex items-center'>
              <LeftOutlined style={{ fontSize: 20, color: '#fff' }} />
            </Link>
            {!isMobile && (
              <Link className='h-[60%]  flex items-center mr-3' to={`/`}>
              <img className='h-full' src={logo} alt='' />
            </Link>
            )}
            <h1 className='font-title text-[#fff] mt-[4px] h-full flex items-center text-[14px] lg:text-[18px] '>
              Thế giới đa chiều - vũ trụ song song
            </h1>
          </div>
          <div className='flex items-center'>
            <Progress
              className='mr-4'
              size={40}
              type='circle'
              strokeWidth={5}
              trailColor='#4d4f50'
              strokeColor={'#f66962'}
              percent={80}
              format={(percent) => <p className='text-[#fff] font-desc text-[12px]'>{percent} %</p>}
            />
            {!isMobile && (<>
              <p className='text-[#fff] pr-5 text-[12px] mt-[2px]'>23/120 bài học</p>
              <button
              className='dark:bg-[#fff] flex items-center justify-center bg-black rounded-lg border-none mr-[20px] self-center py-[10px] px-[10px]'
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <MoonFilled rotate={10} style={{ color: '#fff', fontSize: 16 }} />
              ) : (
                <SunFilled style={{ color: '#808080', fontSize: 16 }} />
              )}
            </button>
            </>)}
            
          </div>
        </div>

        {/* main */}
        <div className='flex h-[100vh] overflow-y-hidden'>
          {/*  content */}
          <div
            className={`h-full ${isOpenSideBar === true ? 'pr-0' : 'pr-2'} max-h-screen dark:bg-[#131022] overflow-y-auto transition-all duration-300 ${isOpenSideBar ? 'w-[100%]' : 'w-[75%]'} `}
          >
            <iframe
              width='100%'
              height={isMobile ? '300' : '532'} //532 cho pc
              src='https://www.youtube.com/embed/6BvmfGS47Do?si=GWXiAiWUdeh1skuM'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
            ></iframe>
          </div>


{/* sidebar */}
<div
  className={`lg:w-[25%] border-l-[1px] border-[#dedfe0] dark:border-gray-700 ${isOpenSideBar ? 'hidden' : 'block'}`}
>
  <div className='bg-[#fff] dark:bg-[#131022] absolute top-0 right-0 left-0 bottom-0 z-50 lg:relative lg:z-0'>
    <div className='flex bg-[#fff] dark:bg-[#131022] justify-between items-center pl-[16px] pr-[12px] lg:px-[16px] py-[12px]'>
      <h2 className='font-title text-[18px] dark:text-[#b9b7c0]'>
        Nội dung khóa học
      </h2>
      {(isMobile || isTablet) && (
        <button onClick={() => toggleSideBar()} className='text-[#333] dark:text-[#fff] bg-[#eceef1] dark:bg-[#1b172f] rounded-full p-1.5'>
          <X color={theme === 'light' ? '#333' : '#fff'} size={16} />
        </button>
      )}
    </div>
    <div className='max-h-[80vh] md:max-h-[100vh] lg:max-h-screen overflow-y-auto'>
      {/* đoạn này thay đổi chiều cao thanh cuộn */}
      <ul className='mb-[50px] lg:mb-[162px]'>
        {items.map((item, key) => (
          <li className='bg-[#f7f8fa] dark:bg-[#131022]' onClick={toggleSubMenu} key={key}>
            <div className='hover:bg-[#edeff1] dark:hover:bg-[#413655] px-[20px] py-[8px] border-b-[#dedfe0] dark:border-gray-700 border-b-[1px]'>
              <div className='flex justify-between'>
                <h4 className='font-title mb-1.5 text-[14px] dark:text-[#b9b7c0]'>1. {item.title}</h4>
                <DownOutlined
                  className={`transition-all dark:text-[#b9b7c0] duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

          
        </div>
        {/* prev and next bottom*/}
        <div className='fixed bottom-0 left-0 right-0 z-30 bg-[#fff] dark:bg-[#131022] h-[50px] px-[20px] flex items-center justify-between shadow-[15px_4px_23px_rgba(0,0,0,0.10)]'>
            <div className=""></div>
            <div className='flex items-center'>
              <button className={`${style['buttonPrev']} mr-3 text-[14px] dark:bg-transparent font-title`}>
                Bài trước
              </button>
              <button className={`${style['buttonNext']} text-[14px] font-title`}>Bài tiếp theo</button>
            </div>
            <div className="">
              {isOpenSideBar ? (
                <MenuOutlined
                  onClick={() => toggleSideBar()}
                  className='transition-all duration-300 ease-in-out '
                  style={{color: `${theme === 'light' ? '#333' : '#fff'}`}}
                />
              ) : (
                <ChevronRight
                  onClick={() => toggleSideBar()}
                  className='transition-all duration-300 ease-in-out'
                  style={{color: `${theme === 'light' ? '#333' : '#fff'}`}}
                />
              )}
              </div>
          </div>
      </div>
    </>
  )
}

export default Lesson
