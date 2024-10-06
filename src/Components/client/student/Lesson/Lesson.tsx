import { DownOutlined, LeftOutlined, MenuOutlined, MoonFilled, PlayCircleFilled, SunFilled } from '@ant-design/icons'
import { Progress } from 'antd'
import { ChevronRight } from 'lucide-react'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { getTitleTab, logo } from '../../../../contants/client'
import { ThemeContext, ThemeContextType } from '../../../../contexts/ThemeContext'
import style from './Lesson.module.scss'

const Lesson = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

    // State đóng mở sidebar 
    const [isOpenSideBar, setIsSideBar] = useState(false)

    // State cho đóng mở subMenu
    const [isOpen, setIsOpen] = useState(false)

    const toggleSubMenu = () => {
        console.log(isOpen)
        setIsOpen(!isOpen);
    }

    const toggleSideBar = () => {
        console.log(isOpenSideBar)
        setIsSideBar(!isOpenSideBar);
    }
    
    const items = [
        {
          id: 1,
          title: "Bắt đầu",
          completedLessons: "13/13",
          duration: "21.39",
          lessons: [
            { id: 1, title: "Bạn sẽ nhận được gì sau khóa học này?", duration: "21.39" },
            { id: 2, title: "Tìm hiểu nội dung chính của khóa học", duration: "15.20" },
            { id: 3, title: "Giới thiệu giảng viên và phương pháp học", duration: "10.10" }
          ]
        },
        {
          id: 2,
          title: "Chương 2: Tiếp tục",
          completedLessons: "8/10",
          duration: "18.45",
          lessons: [
            { id: 1, title: "Cách thực hành bài học", duration: "12.30" },
            { id: 2, title: "Tự đánh giá kết quả học tập", duration: "6.15" }
          ]
        },
        {
          id: 3,
          title: "Chương 3: Nâng cao",
          completedLessons: "10/12",
          duration: "22.15",
          lessons: [
            { id: 1, title: "Các kỹ thuật học tập hiệu quả", duration: "13.40" },
            { id: 2, title: "Ứng dụng kiến thức vào thực tế", duration: "8.35" }
          ]
        },
        {
          id: 4,
          title: "Chương 4: Kinh nghiệm học",
          completedLessons: "9/11",
          duration: "20.50",
          lessons: [
            { id: 1, title: "Những điều cần biết khi học online", duration: "11.45" },
            { id: 2, title: "Xây dựng tư duy học tập chủ động", duration: "9.05" }
        ]
    },
    {
      id: 5,
      title: "Chương 5: Phát triển bản thân",
      completedLessons: "7/9",
      duration: "16.35",
      lessons: [
        { id: 1, title: "Thiết lập mục tiêu học tập", duration: "8.15" },
        { id: 2, title: "Quản lý thời gian hiệu quả", duration: "8.20" }
      ]
    },
    {
      id: 6,
      title: "Chương 6: Kỹ năng mềm",
      completedLessons: "5/8",
      duration: "19.20",
      lessons: [
        { id: 1, title: "Giao tiếp trong môi trường học tập", duration: "12.10" },
        { id: 2, title: "Kỹ năng thuyết trình", duration: "7.10" }
      ]
    },
    {
      id: 7,
      title: "Chương 7: Định hướng nghề nghiệp",
      completedLessons: "6/10",
      duration: "18.55",
      lessons: [
        { id: 1, title: "Lựa chọn nghề nghiệp phù hợp", duration: "10.45" },
        { id: 2, title: "Cách viết CV ấn tượng", duration: "8.10" }
      ]
    },
    {
      id: 8,
      title: "Chương 8: Quản lý dự án",
      completedLessons: "11/12",
      duration: "22.50",
      lessons: [
        { id: 1, title: "Giới thiệu về quản lý dự án", duration: "12.25" },
        { id: 2, title: "Các giai đoạn của một dự án", duration: "10.25" }
      ]
    },
    {
      id: 9,
      title: "Chương 9: Công cụ công nghệ",
      completedLessons: "9/9",
      duration: "17.30",
      lessons: [
        { id: 1, title: "Sử dụng công cụ học tập trực tuyến", duration: "9.10" },
        { id: 2, title: "Công cụ quản lý thời gian", duration: "8.20" }
      ]
    },
    {
      id: 10,
      title: "Chương 10: Tư duy logic",
      completedLessons: "10/10",
      duration: "15.10",
      lessons: [
        { id: 1, title: "Phát triển tư duy phân tích", duration: "7.30" },
        { id: 2, title: "Giải quyết vấn đề hiệu quả", duration: "7.40" }
      ]
    }
  
,
{
  id: 5,
  title: "Chương 5: Phát triển bản thân",
  completedLessons: "7/9",
  duration: "16.35",
  lessons: [
    { id: 1, title: "Thiết lập mục tiêu học tập", duration: "8.15" },
    { id: 2, title: "Quản lý thời gian hiệu quả", duration: "8.20" }
  ]
},
{
  id: 6,
  title: "Chương 6: Kỹ năng mềm",
  completedLessons: "5/8",
  duration: "19.20",
  lessons: [
    { id: 1, title: "Giao tiếp trong môi trường học tập", duration: "12.10" },
    { id: 2, title: "Kỹ năng thuyết trình", duration: "7.10" }
  ]
},
{
  id: 7,
  title: "Chương 7: Định hướng nghề nghiệp",
  completedLessons: "6/10",
  duration: "18.55",
  lessons: [
    { id: 1, title: "Lựa chọn nghề nghiệp phù hợp", duration: "10.45" },
    { id: 2, title: "Cách viết CV ấn tượng", duration: "8.10" }
  ]
},
{
  id: 8,
  title: "Chương 8: Quản lý dự án",
  completedLessons: "11/12",
  duration: "22.50",
  lessons: [
    { id: 1, title: "Giới thiệu về quản lý dự án", duration: "12.25" },
    { id: 2, title: "Các giai đoạn của một dự án", duration: "10.25" }
  ]
},
{
  id: 9,
  title: "Chương 9: Công cụ công nghệ",
  completedLessons: "9/9",
  duration: "17.30",
  lessons: [
    { id: 1, title: "Sử dụng công cụ học tập trực tuyến", duration: "9.10" },
    { id: 2, title: "Công cụ quản lý thời gian", duration: "8.20" }
  ]
},
{
  id: 10,
  title: "Chương 10: Tư duy logic",
  completedLessons: "10/10",
  duration: "15.10",
  lessons: [
    { id: 1, title: "Phát triển tư duy phân tích", duration: "7.30" },
    { id: 2, title: "Giải quyết vấn đề hiệu quả", duration: "7.40" }
  ]
}
  ];
  
      
    return (
        <>
            <div className="">
                <Helmet>
                    <style>{`
                        body {
                        overflow: hidden;
                        }
                    `}</style>
                    <title>{getTitleTab('Bài học')}</title>
                </Helmet>
                {/* header */}
                <div className="bg-[#3d3a4e] h-[60px] flex items-center justify-between">
                    <div className="flex items-center h-full ">
                        <div className="mr-2 px-4 border-r-[1px] border-gray-600 hover:bg-[#0000001a] h-full flex items-center"><LeftOutlined style={{fontSize: 20, color:'#fff'}} /></div>
                        <Link className='h-[60%]  flex items-center mr-3' to={`/`}><img className='h-full' src={logo} alt="" /></Link>
                        <h1 className='font-title text-[#fff] mt-[4px] h-full flex items-center text-[18px] '>Thế giới đa chiều - vũ trụ song song</h1>
                    </div>
                    <div className="flex items-center">
                        <Progress className='mr-4' size={42} type="circle" strokeWidth={5} trailColor='#4d4f50' strokeColor={'#f66962'} percent={80} format={(percent) => (<p className='text-[#fff] font-desc text-[12px]'>{percent} %</p>)} />
                        <p className='text-[#fff] pr-5 text-[12px] mt-[2px]'>23/120 bài học</p>
                        <button
                          className="dark:bg-[#fff] flex items-center justify-center bg-black rounded-lg border-none mr-[20px] self-center py-[10px] px-[10px]"
                          onClick={toggleTheme}
                        >
                          {theme === "light" ? (
                            <MoonFilled rotate={10} style={{ color: "#fff", fontSize: 16 }} />
                          ) : (
                            <SunFilled style={{ color: "#808080", fontSize: 16 }} />
                          )}
                        </button>
                        {/* <MenuOutlined onClick={() => toggleSideBar()} style={{marginRight: 20, color:'#fff'}}/> */}
                        {isOpenSideBar ?  <MenuOutlined onClick={() => toggleSideBar()} className='transition-all duration-300 ease-in-out' style={{marginRight: 20, color:'#fff'}}/> : <ChevronRight onClick={() => toggleSideBar()} className='transition-all duration-300 ease-in-out' style={{marginRight: 20, color:'#fff'}}/>  }
                    </div>
                </div>

                {/* main */}
                <div className="flex h-[100vh] overflow-y-hidden">
                    {/*  content */}
                    <div className={`h-full ${isOpenSideBar === true ? 'pr-0' : 'pr-2' } max-h-screen dark:bg-[#131022] overflow-y-auto transition-all duration-300 ${isOpenSideBar ? 'w-[100%]' : 'w-[75%]'} `}>
                      <iframe width="100%" height="532" src="https://www.youtube.com/embed/6BvmfGS47Do?si=GWXiAiWUdeh1skuM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                    </div>

                    {/* sidebar */}
                    <div className={`w-[25%] border-l-[1px] border-[#dedfe0] dark:border-gray-700 ${isOpenSideBar ? 'hidden' : 'block'}`}>
                        <div className=''>
                            <h2 className='bg-[#fff] dark:bg-[#131022] dark:text-[#b9b7c0] px-[16px] py-[12px] font-title text-[18px]'>Nội dung khóa học</h2>
                            <div className="max-h-screen overflow-y-auto">
                                {/* đoạn này thay đổi chiều cao thanh cuộn */}
                            <ul className='mb-[162px]'> 
                              {items.map((item, key) => (
                                      <li className='bg-[#f7f8fa] dark:bg-[#131022]' onClick={toggleSubMenu} key={key}>
                                      <div className="hover:bg-[#edeff1] dark:hover:bg-[#413655] px-[20px] py-[8px] border-b-[#dedfe0] dark:border-gray-700 border-b-[1px] ">
                                          <div className="flex justify-between" >
                                              <h4 className='font-title mb-1.5 text-[14px] dark:text-[#b9b7c0]'>1. {item.title}</h4>
                                              <DownOutlined className={`transition-all dark:text-[#b9b7c0] duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} style={{fontSize:14}}/>
                                          </div>
                                          <div className="flex text-[12px]">
                                              <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{item.completedLessons}</span>
                                              <div className="border-l-[0.5px] border-[#29303b] mt-[4px] mb-[4px] mx-1.5 dark:border-[#b9b7c0]"></div>
                                              <span className='inline text-[#29303b] dark:text-[#b9b7c0]'>{item.duration}</span>
                                          </div>
                                      </div>
                                      <ul className={`text-[14px] transition-all duration-1000 ${isOpen ? 'block' : 'hidden'}`}>
                                              {item.lessons.map((lesson) => (
                                                  <li className={`px-[28px] py-[8px] dark:bg-[#1b172f] hover:bg-[#edeff1] dark:hover:bg-[#413655]`}>
                                                    <h4 className='mb-2 dark:text-[#b9b7c0] font-subtitle'>{lesson.title}</h4>
                                                    <div className="flex text-[11px]">
                                                        <PlayCircleFilled className='dark:text-[#edeff1]' style={{fontSize: 12, color: '#888888'}} />
                                                        <span className='inline text-[#29303b] ml-1 dark:text-[#b9b7c0]'>{item.duration}</span>
                                                    </div>
                                                </li>
                                                ))}
                                      </ul>
                                  </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* prev and next bottom*/}
                    <div className="fixed bottom-0 left-0 right-0 bg-[#fff] dark:bg-[#131022] h-[50px] flex items-center justify-end px-10 shadow-[15px_4px_23px_rgba(0,0,0,0.10)]">
                        <div className="">
                          <button className={`${style['buttonPrev']} mr-3 text-[14px] dark:bg-transparent font-title`}>
                            Bài trước
                          </button>
                          <button className={`${style['buttonNext']} text-[14px] font-title`}>
                            Bài tiếp theo
                          </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lesson