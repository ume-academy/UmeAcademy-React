import { router } from '@/configs/routes'
import { useGetLessonByCourseIdQuery } from '@/redux/slices/lesson/lessonApiSlice'
import { DownOutlined, LeftOutlined, LoadingOutlined, MenuOutlined, MoonFilled, PlayCircleFilled, SunFilled } from '@ant-design/icons'
import { Progress } from 'antd'
import { ChevronRight, X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { getTitleTab, logo, useIsMobile, useIsTablet } from '../../../../constants/client'
import { ThemeContext, ThemeContextType } from '../../../../contexts/ThemeContext'
import VideoPlayer from '../../commonComponents/VideoPlayer/VideoPlayer'
import style from './Lesson.module.scss'


const Lesson = () => {
  const {id} = useParams()
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const { data: lessonByCourseID, isLoading } = useGetLessonByCourseIdQuery(Number(id))
  console.log(lessonByCourseID)

  const selectedVideoLinkDefault =
   lessonByCourseID?.chapters?.[0]?.lessons?.[0]?.video_link;
  console.log(selectedVideoLinkDefault)

  const [selectedVideoLink, setSelectedVideoLink] = useState<string>(selectedVideoLinkDefault)
  // console.log(selectedVideoLink)



  // Sử dụng để kiểm tra kích thước màn hình rồi render element
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  // State đóng mở sidebar
  const [isOpenSideBar, setIsSideBar] = useState(isMobile || isTablet ? true : false)

  // State cho đóng mở subMenu
  const [isOpenChapter, setIsOpenChapter] = useState<number | null>(null)

  const toggleSubMenu = (chapterId: number) => {
    console.log(chapterId)
    setIsOpenChapter(prevChapterId => (prevChapterId === chapterId ? null : chapterId))
  }

  const toggleSideBar = () => {
    console.log(isOpenSideBar)
    setIsSideBar(!isOpenSideBar)
  }



  if(isLoading) return <LoadingOutlined  size={100} color='red'/>

  return (
    <>
      <div className=''>
        <Helmet>
          <style>{`body { overflow: hidden}`}</style>
          <title>
            {getTitleTab('Bài học')}
          </title>
        </Helmet>
        {/* header */}
        <div className='bg-[#3d3a4e] h-[60px] flex items-center justify-between'>
          <div className='flex items-center h-full '>
            <Link
              to={`${router.courseDetail.replace(':id', Number(id).toString())}`}
              className='mr-2 px-4 border-r-[1px] border-gray-600 hover:bg-[#0000001a] h-full flex items-center'
            >
              <LeftOutlined style={{ fontSize: 20, color: '#fff' }} />
            </Link>
            {!isMobile && (
              <Link className='h-[60%]  flex items-center mr-3' to={`${router.home}`}>
                <img className='h-full' src={logo} alt='' />
              </Link>
            )}
            <h1 className='font-title text-[#fff] mt-[4px] h-full flex items-center text-[14px] lg:text-[18px] '>
              {lessonByCourseID?.name}
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
              percent={lessonByCourseID?.progress}
              format={(percent) => <p className='text-[#fff] font-desc text-[12px]'>{percent} %</p>}
            />
            {!isMobile && (
              <>
                <p className='text-[#fff] pr-5 text-[12px] mt-[2px]'>{lessonByCourseID?.total_lesson_completed}/{lessonByCourseID?.total_lesson} bài học</p>
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
              </>
            )}
          </div>
        </div>

        {/* main */}
        <div className='flex h-[100vh] overflow-y-hidden'>
          {/*  content */}
          <div
            className={`h-full ${isOpenSideBar === true ? 'pr-0' : 'pr-2'} max-h-screen dark:bg-[#131022] overflow-y-auto transition-all duration-300 ${isOpenSideBar ? 'w-[100%]' : 'w-[75%]'} `}
          >
            <VideoPlayer videoURL={selectedVideoLink} thumbnail={lessonByCourseID?.thumbnail}/>
          </div>

          {/* sidebar */}
          <div
            className={`lg:w-[25%] border-l-[1px] border-[#dedfe0] dark:border-gray-700 ${isOpenSideBar ? 'hidden' : 'block'}`}
          >
            <div className='bg-[#fff] dark:bg-[#131022] absolute top-0 right-0 left-0 bottom-0 z-50 lg:relative lg:z-0'>
              <div className='flex bg-[#fff] dark:bg-[#131022] justify-between items-center pl-[16px] pr-[12px] lg:px-[16px] py-[12px]'>
                <h2 className='font-title text-[20px] dark:text-[#b9b7c0]'>Nội dung khóa học</h2>
                {(isMobile || isTablet) && (
                  <button
                    onClick={() => toggleSideBar()}
                    className='text-[#333] dark:text-[#fff] bg-[#eceef1] dark:bg-[#1b172f] rounded-full p-1.5'
                  >
                    <X color={theme === 'light' ? '#333' : '#fff'} size={16} />
                  </button>
                )}
              </div>
              <div className='max-h-[80vh] md:max-h-[100vh] lg:max-h-screen overflow-y-auto'>
                {/* đoạn này thay đổi chiều cao thanh cuộn */}
                <ul className='mb-[20px] lg:mb-[162px]'>

                  {lessonByCourseID?.chapters.map((chapter, index) => (
                    <li className='bg-[#f7f8fa] dark:bg-[#131022]' onClick={() => toggleSubMenu(chapter.id)} key={chapter.id}>
                      <div className='hover:bg-[#edeff1] dark:hover:bg-[#413655] px-[20px] py-[8px] border-b-[#dedfe0] dark:border-gray-700 border-b-[1px] '>
                        <div className='flex justify-between'>
                          <h4 className='font-subtitle mb-1.5 text-[16px] dark:text-[#b9b7c0]'>{index + 1}. {chapter.name}</h4>
                          <DownOutlined
                            className={`transition-all dark:text-[#b9b7c0]  ${isOpenChapter === chapter.id ? 'rotate-180' : 'rotate-0'}`}
                            style={{ fontSize: 14 }}
                          />
                        </div>
                        <div className='flex text-[12px]'>
                          <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{chapter.lesson_completed}</span>
                          <div className='border-l-[0.5px] border-[#29303b] mt-[4px] mb-[4px] mx-1.5 dark:border-[#b9b7c0]'></div>
                          <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{chapter.chapter_duration}</span>
                        </div>
                      </div>

                      {isOpenChapter === chapter.id && (
                        <>
                          {/* Bài học */}
                            <ul className={`text-[14px] transition-all duration-1000 `}>
                              {chapter.lessons.map((lesson) => (
                                <li
                                  key={lesson.id}
                                  onClick={(event) => {
                                    event.stopPropagation() 
                                    setSelectedVideoLink(lesson.video_link)
                                  }} 
                                  className={`px-[28px] py-[8px] dark:bg-[#1b172f] hover:bg-[#edeff1] dark:hover:bg-[#413655]`}
                                >
                                  <h4 className='mb-2 dark:text-[#b9b7c0] font-desc'>{lesson.name}</h4>
                                  <div className='flex text-[11px]'>
                                    <PlayCircleFilled
                                      className='dark:text-[#edeff1]'
                                      style={{ fontSize: 12, color: '#888888' }}
                                    />
                                    <span className='inline text-[#29303b] ml-1 dark:text-[#b9b7c0]'>{lesson.video_duration}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* prev and next bottom*/}
        <div className='fixed bottom-0 left-0 right-0 z-30 bg-[#fff] dark:bg-[#131022] h-[50px] px-[20px] flex items-center justify-between shadow-[15px_4px_23px_rgba(0,0,0,0.10)]'>
          <div className=''></div>
          <div className='flex items-center'>
            <button className={`${style['buttonPrev']} mr-3 text-[14px] dark:bg-transparent font-title`}>
              Bài trước
            </button>
            <button className={`${style['buttonNext']} text-[14px] font-title`}>Bài tiếp theo</button>
          </div>
          <div className=''>
            {isOpenSideBar ? (
              <MenuOutlined
                onClick={() => toggleSideBar()}
                className='transition-all duration-300 ease-in-out '
                style={{ color: `${theme === 'light' ? '#333' : '#fff'}` }}
              />
            ) : (
              <ChevronRight
                onClick={() => toggleSideBar()}
                className='transition-all duration-300 ease-in-out'
                style={{ color: `${theme === 'light' ? '#333' : '#fff'}`}}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Lesson
