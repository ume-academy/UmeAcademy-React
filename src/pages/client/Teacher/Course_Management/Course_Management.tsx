import { router } from '@/configs/routes'
import { routerConfigAdmin } from '@/constants/admin'
import { itemsStep_CourseManagement, routerConfigTeacher, useIsMobile, useIsTablet } from '@/constants/client'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import useLoading from '@/hooks/useLoading'
import { TCourseDetail } from '@/interfaces/TCourseDetail'
import { useApprovalCourseMutation, useGetCourseAdminByIdQuery, useGetCourseByIdOfTeacherQuery } from '@/redux/slices/course/courseApiSlice'
import { useRequestApprovalCourseMutation } from '@/redux/slices/teacher/requestApprovalCourse/requestApprovalCourseApiSlice'
import { LoadingOutlined, MoonFilled, SunFilled, TagOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import { Drawer, message, Steps, Tag, TreeSelect } from 'antd'
import { TreeNode } from 'antd/es/tree-select'
import { AlignJustify, ChevronLeft, TicketCheck, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Form_Course from '../Form_Course/Form_Course'
import List_Students from '../Students/List_Students'
import './Course_Management_Antd.scss'
import FormChapter from './FormChapter/Form_Chapter'
import Targets from './Targets/Targets'
import Voucher from './Voucher/Voucher'
import List_Voucher from './List_Voucher/List_Voucher'
import { Ticket } from 'lucide'

const Course_Management = () => {
  const [openDrawer, setOpenDrawer] = useState(false) // State để kiểm soát việc mở và đóng drawer
  const [current, setCurrent] = useState(0) // State để kiểm soát step hiện tại
  const [extraSelected, setExtraSelected] = useState(false) // State để kiểm soát danh sách học viên
  const [extraSelectedVoucherList, setExtraSelectedVoucherList] = useState(false) // State để kiểm soát danh sách voucher

  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const { id } = useParams() // Lấy id từ url
  const { loading, startLoading, stopLoading } = useLoading()

  const [requestApprovalCourseTeacher] = useRequestApprovalCourseMutation()
  // Sử dụng hook để render thông tin vị trí của route hiện tại render component cho phù hợp. Dùng kèm theo việc gọi API
  const location = useLocation()
  const isAdminRoute = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })
  const isTeacherRoute = routerConfigTeacher.isTeacherLayout.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })


  // API lấy thông tin khóa học theo id cho teacher
  const {
    data: dataCrouseAdmin,
    isLoading: isLoadingAdmin,
    isFetching: isFetchingAdmin,
    refetch: isRefetchAdmin
  } = useGetCourseAdminByIdQuery(id, { skip: isTeacherRoute })

  const {
    data: dataCrouseTeacher,
    isLoading: isLoadingTeacher,
    isFetching: isFetchingTeacher,
    refetch: isRefetchTeacher
  } = useGetCourseByIdOfTeacherQuery(id, { skip: isAdminRoute })
  const [approvalCourse] = useApprovalCourseMutation() // Duyệt khóa học phía admin

  // Hàm xử lý khi thay đổi select duyệt khóa học phía ADMIN
  const handleApproval = (status: number) => {
    try {
      if (id) {
        // console.log(id, status)
        approvalCourse({ id, status }).unwrap()
        isRefetchAdmin()
        message.success('Duyệt khóa học thành công')
      }
    } catch (error) {
      message.error('Duyệt khóa học thất bại')
    }
  }

  // Call API gửi yêu cầu duyệt khóa học phía TEACHER
  const handleRequestApprovalCourse = async () => {
    startLoading()
    try {
      if(id){
        await requestApprovalCourseTeacher(Number(id)).unwrap()
        isRefetchTeacher()
        message.success('Gửi yêu cầu duyệt khóa học thành công')
      }
      stopLoading()
    } catch (error) {
      const errorData = (error as { data?: any })?.data;
      // Kiểm tra và hiển thị tất cả các lỗi trong errors
      // Nếu có trường error trong data, hiển thị thông báo lỗi
      if (errorData?.error) {
        message.error(errorData.error); // Hiển thị thông báo lỗi từ trường error trong data
      } else {
        // Nếu không có trường error, hiển thị thông báo lỗi mặc định
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
      }
      stopLoading()
    }
  }

 

  // Lấy dữ liệu khóa học tùy theo route
  const courseData = isAdminRoute ? dataCrouseAdmin : dataCrouseTeacher
  const isLoading = isAdminRoute ? isLoadingAdmin || isFetchingAdmin : isLoadingTeacher || isFetchingTeacher
  const isRefetch = isAdminRoute ? isRefetchAdmin : isRefetchTeacher

  const isMobile = useIsMobile() // Kiểm tra xem có phải thiết bị di động không
  const isTable = useIsTablet() // Kiểm tra xem có phải thiết bị tablet không được

  // Hàm xử lý khi click vào nút mở drawer
  const showDrawer = () => {
    setOpenDrawer(true)
  }

  // Hàm xử lý đóng drawer
  const onClose = () => {
    setOpenDrawer(false)
  }

  // Hàm xử lý khi chuyển step
  const handleStepChange = (current: number) => {
    setCurrent(current)
    setExtraSelected(false) // Khi chuyển step, tắt trạng thái extra
    setExtraSelectedVoucherList(false)
    setOpenDrawer(false)
  }

  // Hàm xử lý khi click button danh sách học viên
  const handleListStudent = () => {
    setExtraSelected(true) // Bật trạng thái extra khi người dùng bấm vào
    setCurrent(-1) // Đặt current thành -1 để không hiển thị các step
    setExtraSelectedVoucherList(false)
    setOpenDrawer(false)
  }
  // Hàm xử lý khi click button danh sách học viên
  const handleListVoucher = () => {
    setExtraSelected(false) // Bật trạng thái extra khi người dùng bấm vào
    setCurrent(-1) // Đặt current thành -1 để không hiển thị các step
    setExtraSelectedVoucherList(true)
    setOpenDrawer(false)
  }

  // Custom lại thẻ Drawer
  const CustomDrawer = styled(Drawer)`
    .ant-drawer-header {
      background-color: #333;
      padding: 16px 24px 16px 12px;
    }

    .ant-drawer-body {
      background: ${theme === 'light' ? '#fff' : '#2b2838'};
      padding: 0;
    }
  `

  // Custom lại thẻ Select
  const CustomTreeSelect = styled(TreeSelect)`
    .ant-select-selector {
      background-color: #fafafa !important;
      border: 1px solid #c1c9d2 !important;
    }
    .dark & .ant-select-selector {
      background-color: #131022 !important;
      color: #b9b7c0 !important;
      border: 1px solid #c7c7c740 !important;
    }
    // Đổ màu cho placeholder
    .ant-select-selector .ant-select-selection-placeholder {
      color: #6e82a3 !important;
    }
    .dark & .ant-select-selector .ant-select-selection-placeholder {
      color: #e9ecef !important;
    }import List_Voucher from './List_Voucher/List_Voucher';

  `

  const filteredStep = isAdminRoute 
  ? itemsStep_CourseManagement.filter((_, index) => index !== 3) // Ví dụ ẩn Step 2
  : itemsStep_CourseManagement;

  return (
    <div>
      {/* header */}
      {!isAdminRoute && (
        <div className='fixed top-0 right-0 left-0 z-50 bg-[#3d3a4e] h-[70px] flex items-center justify-between'>
          <div className='flex items-center h-full'>
            <Link
              to={`${router.myCourses}`}
              className='mr-4 px-4 border-r-[1px] border-gray-600 hover:bg-[#3b3657] hover:text-[#fff] h-full flex items-center text-[#fff]'
            >
              <ChevronLeft strokeWidth={3} size={18} />
              <p className=' hidden lg:block text-[14px]'>Quay lại khóa học</p>
            </Link>

            <span className='font-title text-[14px] text-[#fff] h-full flex items-center lg:text-[16px] max-w-[200px] lg:max-w-[300px] truncate border-transparent'>
              {courseData?.name}
            </span>
            <h2 className='ml-6 text-[#fff] text-[14px] border-[1px] px-2 py-0.5 font-title bg-[#b4a7f5] border-transparent rounded-lg'>
              {courseData?.status === 0 ? 'Nháp' : courseData?.status === 1 ? 'Chờ phê duyệt' : 'Đã phê duyệt'}
            </h2>
          </div>
          <div className=' items-center mr-4 hidden md:flex lg:flex'>
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
          </div>
        </div>
      )}

      {/* content */}
      <div
        className={`max-w-[768px] md:max-w-[1024px] lg:max-w-[1290px] mx-auto grid grid-cols-1 min-h-screen lg:grid-cols-[2fr_8fr] gap-5  ${!isAdminRoute ? 'pt-[60px] md:pt-[60px] lg:pt-[120px]' : 'pt-[40px] md:pt-10 lg:pt-[40px]'} pb-[60px]`}
      >
        {isMobile || isTable ? (
          // Dành cho thiết bị di động và tablet
          <div className='custom-drawer'>
            <div className={`${!isAdminRoute ? 'pt-12' : 'pt-0'} px-[16px] flex justify-between items-center`}>
              <AlignJustify onClick={() => showDrawer()} color={theme === 'light' ? '#333' : '#fff'} />
              {!isAdminRoute ? (
                <button className=' px-4 py-1.5 rounded-lg cursor-pointer bg-[#f66962] w-[50%] text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]'>
                  Gửi đi xét duyệt
                </button>
              ) : (
                <CustomTreeSelect
                  treeDataSimpleMode
                  style={{ width: '50%', marginTop: 12, height: 44 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder='Vui lòng xác nhận--'
                >
                  <TreeNode value='jav' title='Xác nhận duyệt' />
                  <TreeNode value='forn' title='Từ chối' />
                </CustomTreeSelect>
              )}
            </div>
            <CustomDrawer
              closeIcon={false}
              width={300}
              title={
                <div className='flex items-center justify-between'>
                  <h2 className='text-[#fff] text-[14px]'>Lên kế hoạch cho khóa học của bạn</h2>
                  <X className='mt-1' size={22} color={'#fff'} onClick={onClose} />
                </div>
              }
              placement='left'
              onClose={onClose}
              open={openDrawer}
            >
              <Steps
                className='min-h-[400px] font-desc text-[16px] pl-6 pt-14'
                onChange={handleStepChange}
                direction='vertical'
                current={current}
                items={itemsStep_CourseManagement}
              />
              {!isAdminRoute && (
                <button className={`flex justify-center items-center pl-4 group`} onClick={handleListStudent}>
                  <UsergroupDeleteOutlined
                    className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
                    ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-gray-200 dark:bg-[#2b2838] text-[#fff]'}`}
                  />
                  <p
                    className={`font-desc text-[16px] ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}
                  >
                    Danh sách học viên
                  </p>
                </button>
              )}
            </CustomDrawer>
          </div>
        ) : (
          //Dành cho thiết bị desktop
          <>
            <div className={`pt-10 ${!isAdminRoute ? 'pl-4' : 'pl-4'}`}>
              <Steps
                className='min-h-[360px] font-desc text-[16px] pl-4 '
                onChange={handleStepChange}
                direction='vertical'
                current={current}
                items={filteredStep} // Các bước step được đặt trong contant client
              />
              {/*  Danh sách voucher */}
              <button className={`flex justify-center items-center pl-4 group mb-[40px]`} onClick={handleListVoucher}>
                  <TagOutlined
                    className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
                    ${extraSelectedVoucherList ? 'bg-[#f66962] text-[#fff]' : 'bg-[#f0f0f0] dark:bg-[#2b2838] text-[#fff]'}`}
                  />
                  <p
                    className={`font-desc text-[16px] ${extraSelectedVoucherList ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}
                  >
                    Danh sách voucher
                  </p>
                </button>
              {!isAdminRoute ? (
                <>
                  {/* Danh sách học viên */}
                  <button className={`flex justify-center items-center pl-4 group`} onClick={handleListStudent}>
                    <UsergroupDeleteOutlined
                      className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
                ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-[#f0f0f0] dark:bg-[#2b2838] text-[#fff]'}
                border-[2px] border-transparent group-hover:border-[#d9d9d9] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] dark:group-hover:border-transparent`}
                    />
                    <p
                      className={`font-desc text-[16px] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] ' ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}
                    >
                      Danh sách học viên
                    </p>
                  </button>

                  {/* Duyệt khóa học */}
                  {dataCrouseTeacher?.status === 0 ? (<button 
                    onClick={() => handleRequestApprovalCourse()}
                    className='mt-12 px-4 py-2 rounded-lg cursor-pointer bg-[#f66962] w-full text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]'>
                    {loading ? <LoadingOutlined /> : 'Gửi đi xét duyệt'}
                  </button>) :(
                    <Tag
                      className='text-[16px] py-2 mt-12 w-[86%] text-center'
                      color={
                        dataCrouseTeacher?.status === 0
                          ? 'red'
                          : dataCrouseTeacher?.status === 1
                            ? 'blue'
                            : dataCrouseTeacher?.status === 2
                              ? 'green'
                              : 'gold'
                      }
                    >
                      {dataCrouseTeacher?.status === 0
                        ? 'Nháp '
                        : dataCrouseTeacher?.status === 1
                          ? 'Chờ phê duyệt'
                          : dataCrouseTeacher?.status === 2
                            ? 'Đã phê duyệt'
                            : 'Lưu trữ'}
                    </Tag>
                  )}
                </>
              ) : dataCrouseAdmin?.status === 1 ? (
                <CustomTreeSelect
                  treeDataSimpleMode
                  style={{ width: '90%', marginTop: 12, height: 44, marginLeft: 18 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder='Phê duyệt khóa học--'
                  onChange={(value) => handleApproval(Number(value))}
                >
                  <TreeNode value={2} title='Xác nhận duyệt' />
                  <TreeNode value={0} title='Từ chối' />
                </CustomTreeSelect>
              ) : (
                <Tag
                  className='text-[16px] py-2  w-[86%] text-center'
                  color={
                    dataCrouseAdmin?.status === 0
                      ? 'red'
                      : dataCrouseAdmin?.status === 1
                        ? 'blue'
                        : dataCrouseAdmin?.status === 2
                          ? 'green'
                          : 'gold'
                  }
                >
                  {dataCrouseAdmin?.status === 0
                    ? 'Nháp '
                    : dataCrouseAdmin?.status === 1
                      ? 'Chờ phê duyệt'
                      : dataCrouseAdmin?.status === 2
                        ? 'Đã phê duyệt'
                        : 'Lưu trữ'}
                </Tag>
              )}
            </div>
          </>
        )}

        <div className=''>
          {current === 0 && <Form_Course courseData={courseData as any} isLoading={isLoading as any} />}
          {current === 1 && <Targets courseData={courseData as TCourseDetail} isLoading={isLoading} isRefetch={isRefetch} />}
          {current === 2 && <FormChapter courseData={courseData as TCourseDetail} isRefetch={isRefetch} />}
          {!isAdminRoute && current === 3 && <Voucher  isRefetch={isRefetch}/>}
          {extraSelectedVoucherList && <List_Voucher isLoading={isLoading}  courseData={courseData as TCourseDetail}/>}
          {extraSelected && <List_Students />} {/* Render component khi extra được chọn */}
        </div>
      </div>
    </div>
  )
}

export default Course_Management
