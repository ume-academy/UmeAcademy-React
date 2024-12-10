import { router } from '@/configs/routes'
import { TChapter } from '@/interfaces/TLesson'
import { useGetLessonByCourseIdQuery } from '@/redux/slices/lesson/lessonApiSlice'
import {
  LeftOutlined,
  LoadingOutlined,
  MenuOutlined,
  MoonFilled,
  PlayCircleFilled,
  SunFilled
} from '@ant-design/icons'
import { Progress, message } from 'antd'
import { Check, ChevronRight, ChevronUp, X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { getTitleTab, logo, useIsMobile, useIsTablet } from '../../../../constants/client'
import { ThemeContext, ThemeContextType } from '../../../../contexts/ThemeContext'
import VideoPlayer from '../../commonComponents/VideoPlayer/VideoPlayer'
import style from './Lesson.module.scss'
import useRedirectToPurchase from '@/hooks/useRedirectToPurchase'

const Lesson = () => {
  const { id } = useParams();

  // const { isEnrolled } = useRedirectToPurchase();

  // console.log(isEnrolled)

  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const { data: courseData, isLoading } = useGetLessonByCourseIdQuery(Number(id))
  
  // Sử dụng để kiểm tra kích thước màn hình rồi render element
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  // Sử dụng để setButton không thể click khi đã đến chapter cuối cùng và bài bài học cuối của chapter
  const [isDisableNextButton, setIsDisableNextButton] = useState(false)

  // State đóng mở sidebar
  const [isOpenSideBar, setIsSideBar] = useState(isMobile || isTablet ? true : false)

  const toggleSideBar = () => {
    setIsSideBar(!isOpenSideBar)
  }

  //Dùng để lấy link video mặc định khi vào trang và thay đổi khi chọn bài học khác
  const [selectedVideoLink, setSelectedVideoLink] = useState<string>('')

  // 2 state xử lý khi click vào nút prev hoặc next hoặc chuyển chapter/lesson trên UI
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0)

  // 2 state này để lưu giá trị của chapterId và lessonId để truyền vào videoPlayer
  const [chapterId, setChapterId] = useState<number>(0)
  const [lessonId, setLessonId] = useState<number>(0)
  const [isLessonCompleted, setIsLessonCompleted] = useState<boolean>(false)

  // Xử lý lấy ra chapterId hiện tại/ Lấy chapterId hiện tại nếu đã gọi api xong và chapterId hiện tại chưa có giá trị
  if(courseData && !chapterId) {
    setChapterId(courseData.chapters[currentChapterIndex].id)
  }

  // Xử lý lấy ra lessonId hiện tại/ Lấy lessonId hiện tại nếu đã gọi api xong và lessonId hiện tại chưa có giá trị
  if(courseData && !lessonId) {
    setLessonId(courseData.chapters[currentChapterIndex].lessons[currentLessonIndex].id)
  }


  // if(courseData && !isLessonCompleted === false) {
  //   setIsLessonCompleted(courseData.chapters[currentChapterIndex].lessons[currentLessonIndex].is_completed)
  // }
  
  // Xử lý lấy ra isLessonCompleted hiện tại/ Lấy isLessonCompleted hiện tại nếu đã gọi api xong và isLessonCompleted hiện tại chưa có giá trị
  useEffect(() => {
    if (courseData) {
      const completed = courseData.chapters[currentChapterIndex].lessons[currentLessonIndex].is_completed;
      setIsLessonCompleted(completed); // Gán giá trị boolean từ API
    }
  }, [courseData, currentChapterIndex, currentLessonIndex]);

  // Xử lý lấy ra link hiện tại/ Lấy link hiện tại nếu đã gọi api xong và link hiện tại chưa có giá trị
  if (courseData && !selectedVideoLink) {
    setSelectedVideoLink(courseData.chapters[currentChapterIndex].lessons[currentLessonIndex].video_link) // Viết như này cho đỡ hashcode [0]
  }
  
  const handlePrevious = () => {
    // Lấy ra chapter hiện tại
    const currentChapter = getChapterByIndex(currentChapterIndex)

    if (!currentChapter) {
      // Đây là case không xảy ra nhưng mà cứ if như này để thằng typescript không báo lỗi
      return
    }

    // Lấy ra lesson trước của chapter hiện tại
    let prevLesson = getLessonByIndex(currentChapter, currentLessonIndex - 1)

    // prevLesson có giá trị => Có lesson trước trong chapter hiện tại
    if (prevLesson) {
      // Chapter không thay đổi nên không cần setState lại
      setSelectedVideoLink(prevLesson.video_link)
      setCurrentLessonIndex(currentLessonIndex - 1)
      setChapterId(currentChapter.id)
      setLessonId(prevLesson.id)
      setIsLessonCompleted(prevLesson.is_completed)
      return // Để ko dính vào phần code dưới
    }

    // prevLesson không có giá trị => Không có lesson trước trong chapter hiện tại  => phải check chapter trước

    // Lấy ra chapter trước
    const prevChapter = getChapterByIndex(currentChapterIndex - 1)

    if (!prevChapter) {
      message.warning('Đây là bài học đầu tiên')
      return // Để ko dính vào phần code dưới
    }else {
      // Nếu có chapter trước thì setchapterId để truyền vào videoPlayer
      setChapterId(prevChapter?.id)
    }

    // prevChapter có giá trị và lessons của nextChapter có giá trị, anh sẽ lấy lesson đầu tiên của chapter đó (nên lessonIndex = 0)
    prevLesson = getLessonByIndex(prevChapter, prevChapter.lessons.length - 1)
    setLessonId(prevLesson.id)
    setIsLessonCompleted(prevLesson.is_completed)

    if (!prevLesson) {
      message.warning('Đây là bài học đầu tiên')
      return // Để ko dính vào phần code dưới
    }

    setCurrentChapterIndex(currentChapterIndex - 1)
    setCurrentLessonIndex(prevChapter.lessons.length - 1)
    setSelectedVideoLink(prevLesson.video_link)
  }

  const handleNext = () => {
    // Lấy ra chapter hiện tại
    const currentChapter = getChapterByIndex(currentChapterIndex)

    if (!currentChapter) {
      // Đây là case không xảy ra nhưng mà cứ if như này để thằng typescript không báo lỗi
      return
    }

    // Lấy ra lesson tiếp theo của chapter hiện tại
    let nextLesson = getLessonByIndex(currentChapter, currentLessonIndex + 1)

    // NextLesson có giá trị => Có lesson tiếp theo trong chapter hiện tại
    if (nextLesson) {
      // Chapter không thay đổi nên anh ko cần setState lại
      setSelectedVideoLink(nextLesson.video_link)
      setCurrentLessonIndex(currentLessonIndex + 1)
      setChapterId(currentChapter?.id)
      setLessonId(nextLesson.id)
      setIsLessonCompleted(nextLesson.is_completed)
      return // Để ko dính vào phần code dưới
    }

    // NextLesson không có giá trị => Không có lesson tiếp theo trong chapter hiện tại => Anh phải check chapter tiếp theo

    // Lấy ra chapter tiếp theo
    const nextChapter = getChapterByIndex(currentChapterIndex + 1)


    // Đây là trường hợp không còn chapter hay lesson tiếp theo
    if (!nextChapter) {
      // DisableNextButton khi không còn chapter hay lesson tiếp theo
      message.warning('Đây là bài học cuối cùng')
      setIsDisableNextButton(true)
      return // Để ko dính vào phần code dưới
    }else {
      // Nếu có chapter tiếp theo thì setchapterId để truyền vào videoPlayer
      setChapterId(nextChapter?.id)
    }

    // nextChapter có giá trị và lessons của nextChapter có giá trị, lấy lesson đầu tiên của chapter đó (nên lessonIndex = 0)
    nextLesson = getLessonByIndex(nextChapter, 0)
    setLessonId(nextLesson.id)
    setIsLessonCompleted(nextLesson.is_completed)

    if (!nextLesson) {
      // DisableNextButton khi không còn chapter hay lesson tiếp theo
      message.warning('Đây là bài học cuối cùng')
      setIsDisableNextButton(true)
      return // Để ko dính vào phần code dưới
    }

    setCurrentChapterIndex(currentChapterIndex + 1)
    setCurrentLessonIndex(0)
    setSelectedVideoLink(nextLesson.video_link)
  }

  const getChapterByIndex = (index: number) => {
    return courseData?.chapters[index]
  }

  const getLessonByIndex = (chapter: TChapter, index: number) => {
    return chapter?.lessons[index]
  }


  const toggleSubMenu = (indexChapter: number) => {
    setCurrentChapterIndex((prevChapterId) => (prevChapterId === indexChapter ? -1 : indexChapter))
    if (currentChapterIndex !== indexChapter) {
        setCurrentLessonIndex(0)
    }
  }

  if (isLoading) return <LoadingOutlined size={100} color='red' />

  return (
    <>
      <div className=''>
        <Helmet>
          <style>{`body { overflow: hidden}`}</style>
          <title>{getTitleTab('Bài học')}</title>
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
              {courseData?.name}
            </h1>
          </div>
          <div className='flex items-center'>
            <Progress
              className='mr-4'
              size={42}
              type='circle'
              strokeWidth={5}
              trailColor='#4d4f50'
              strokeColor={'#f66962'}
              percent={courseData?.progress}
              format={(percent) => <p className='text-[#fff] font-desc text-[11px]'>{percent} %</p>}
            />
            {!isMobile && (
              <>
                <p className='text-[#fff] pr-5 text-[12px] mt-[2px]'>
                  {courseData?.total_lesson_completed}/{courseData?.total_lesson} bài học
                </p>
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
            {selectedVideoLink && (
              <VideoPlayer 
                courseId={Number(id)} 
                chapterId={chapterId} 
                lessonId={lessonId} 
                videoURL={selectedVideoLink} 
                thumbnail={courseData?.thumbnail} 
                isCompleted={isLessonCompleted}
                height={'560px'} />
            )}
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
                  {courseData?.chapters.map((chapter, indexChapter) => (
                    <li
                      className='bg-[#f7f8fa] dark:bg-[#131022]'
                      onClick={() => {
                        toggleSubMenu(indexChapter)
                        setCurrentChapterIndex(indexChapter)
                      }}
                      key={chapter.id}
                    >
                      <div className='hover:bg-[#edeff1] dark:hover:bg-[#413655] px-[20px] py-[8px] border-b-[#dedfe0] dark:border-gray-700 border-b-[1px] '>
                        <div className='flex justify-between'>
                          <h4 className='font-subtitle mb-1.5 text-[16px] dark:text-[#b9b7c0]'>
                            {indexChapter + 1}. {chapter.name}
                          </h4>
                          {/* <ChevronUp size={32} strokeWidth={1.75} /> */}
                          <ChevronUp
                            className={`transition-all dark:text-[#b9b7c0] ${currentChapterIndex === indexChapter ? 'rotate-180' : 'rotate-0'}`}
                            size={24}
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className='flex text-[12px]'>
                          <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{chapter.lesson_completed} bài</span>
                          <div className='border-l-[0.5px] border-[#29303b] mt-[4px] mb-[4px] mx-1.5 dark:border-[#b9b7c0]'></div>
                          <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{chapter.chapter_duration}s</span>
                        </div>
                      </div>

                      {currentChapterIndex === indexChapter && (
                        <>
                          {/* Bài học */}
                          <ul className={`text-[14px] transition-all duration-1000 `}>
                            {chapter.lessons.map((lesson, indexLesson) => (
                              <li
                                key={lesson.id}
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setSelectedVideoLink(lesson.video_link)
                                  setCurrentLessonIndex(indexLesson)
                                  setChapterId(chapter.id)
                                  setLessonId(lesson.id)
                                  setIsLessonCompleted(lesson.is_completed)
                                }}
                                className={`pl-[28px] pr-[24px] py-[8px] flex justify-between ${ currentLessonIndex === indexLesson && 'dark:bg-[#413655] bg-[#edeff1]'} dark:bg-[#1b172f] hover:bg-[#edeff1] dark:hover:bg-[#413655]`}
                              >
                                <div className="">
                                <h4 className='mb-2 dark:text-[#b9b7c0] font-desc'>{lesson.name}</h4>
                                <div className='flex text-[11px]'>
                                  <PlayCircleFilled
                                    className='dark:text-[#edeff1]'
                                    style={{ fontSize: 12, color: '#888888' }}
                                  />
                                  <span className='inline text-[#29303b] ml-1 dark:text-[#b9b7c0]'>
                                    {lesson.video_duration}
                                  </span>
                                </div>
                                </div>
                                {lesson.is_completed === true && (
                                  <div className="">
                                  <Check size={14} strokeWidth={6} className='text-[8px] bg-[#f66962] p-[3px] rounded-full ' style={{color: '#fff', fontWeight: 100}}/>
                                </div>
                                )}
                                
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
            <button
              onClick={handlePrevious}
              className={`${currentLessonIndex === 0 && currentChapterIndex === 0 && 'disabled cursor-not-allowed'} ${style['buttonPrev']} mr-3 text-[14px] dark:bg-transparent font-title`}
            >
              Bài trước
            </button>
            <button
              className={`${
                isDisableNextButton === true && 'disabled cursor-not-allowed'
              } ${style['buttonNext']} text-[14px] font-title`}
              onClick={handleNext}
            >
              Bài tiếp theo
            </button>
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
                style={{ color: `${theme === 'light' ? '#333' : '#fff'}` }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Lesson
