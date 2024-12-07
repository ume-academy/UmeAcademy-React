// import { routerConfigAdmin } from '@/constants/admin'
// import { itemsStep_CourseManagement, useIsMobile, useIsTablet } from '@/constants/client'
// import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
// import FormLesson from '@/pages/client/Teacher/Course_Management/FormLesson/Form_Lesson'
// import Targets from '@/pages/client/Teacher/Course_Management/Targets/Targets'
// import Voucher from '@/pages/client/Teacher/Course_Management/Voucher/Voucher'
// import Form_Course from '@/pages/client/Teacher/Form_Course/Form_Course'
// import List_Students from '@/pages/client/Teacher/Students/List_Students'
// import { useApprovalCourseMutation, useGetCourseAdminByIdQuery } from '@/redux/slices/course/courseApiSlice'
// import { UsergroupDeleteOutlined } from '@ant-design/icons'
// import { Drawer, message, Modal, Steps, Tag, TreeSelect } from 'antd'
// import { TreeNode } from 'antd/es/tree-select'
// import { AlignJustify, X } from 'lucide-react'
// import { useContext, useState } from 'react'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import styled from 'styled-components'

// const Course_Detail = () => {
//   const [openDrawer, setOpenDrawer] = useState(false) // State để kiểm soát việc mở và đóng drawer
//   const [current, setCurrent] = useState(0) // State để kiểm soát step hiện tại
//   const [extraSelected, setExtraSelected] = useState(false) // State để kiểm soát mục mới
//   const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
//   const { id } = useParams()
//   const location = useLocation()
//   const [approvalCourse, { isLoading }] = useApprovalCourseMutation()
//   const nav = useNavigate()
//   const { data } = useGetCourseAdminByIdQuery(id)

//   const handleapprovalCourse = (status: number) => {
//     Modal.confirm({
//       title: <span className='text-red-500 font-title'>Xác nhận thay đổi trạng thái</span>,
//       content: (
//         <p className='dark:text-[#b9b7c0] text-[#685f78]'>
//           Bạn có chắc chắn muốn <span className='font-desc'>"{status === 1 ? 'phê duyệt' : 'từ chối'}"</span> khóa học
//           này không?
//         </p>
//       ),
//       okText: 'Đồng ý',
//       okType: 'danger',
//       okButtonProps: {
//         style: { backgroundColor: '#F84563', borderColor: '#F84563', color: '#fff' }
//       },
//       cancelButtonProps: {
//         className: 'custom-cancel-btn'
//       },
//       onOk: () => {
//         return new Promise((resolve) => {
//           setTimeout(async () => {
//             await approvalCourse({ id, status })
//             message.success(`Đã ${status === 2 ? 'Phê duyệt' : 'Từ chối'} khóa học này!`)
//             nav('/admin/courses')
//             resolve(undefined)
//           }, 666)
//         })
//       },
//       cancelText: 'Hủy',
//       centered: true,
//       maskClosable: false,
//       icon: null,
//       width: 600
//     })
//   }

//   // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
//   const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
//     const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
//     return regex.test(location.pathname)
//   })

//   const isMobile = useIsMobile() // Kiểm tra xem có phải thiết bị di động không
//   const isTable = useIsTablet() // Kiểm tra xem có phải thiết bị tablet không

//   // Hàm xử lý khi click vào nút mở drawer
//   const showDrawer = () => {
//     setOpenDrawer(true)
//   }

//   // Hàm xử lý đóng drawer
//   const onClose = () => {
//     setOpenDrawer(false)
//   }

//   // Hàm xử lý khi chuyển step
//   const handleStepChange = (current: number) => {
//     setCurrent(current)
//     setExtraSelected(false) // Khi chuyển step, tắt trạng thái extra
//     setOpenDrawer(false)
//   }

//   // Hàm xử lý khi click button danh sách học viên
//   const handleListStudent = () => {
//     setExtraSelected(true) // Bật trạng thái extra khi người dùng bấm vào
//     setCurrent(-1) // Đặt current thành -1 để không hiển thị các step
//     setOpenDrawer(false)
//   }

//   // Custom lại thẻ Drawer
//   const CustomDrawer = styled(Drawer)`
//     .ant-drawer-header {
//       background-color: #333;
//       padding: 16px 24px 16px 12px;
//     }

//     .ant-drawer-body {
//       background: ${theme === 'light' ? '#fff' : '#2b2838'};
//       padding: 0;
//     }
//   `

//   // Custom lại thẻ Select
//   const CustomTreeSelect = styled(TreeSelect)`
//     .ant-select-selector {
//       background-color: #fafafa !important;
//       border: 1px solid #c1c9d2 !important;
//     }
//     .dark & .ant-select-selector {
//       background-color: #131022 !important;
//       color: #b9b7c0 !important;
//       border: 1px solid #c7c7c740 !important;
//     }
//     // Đổ màu cho placeholder
//     .ant-select-selector .ant-select-selection-placeholder {
//       color: #6e82a3 !important;
//     }
//     .dark & .ant-select-selector .ant-select-selection-placeholder {
//       color: #e9ecef !important;
//     }
//   `
//   return (
//     <div>
//       <div
//         className={`max-w-[768px] md:max-w-[1024px] lg:max-w-[1290px] mx-auto grid grid-cols-1 min-h-screen lg:grid-cols-[2fr_8fr] gap-5  ${!hideCourseFunction ? 'pt-[60px] md:pt-[60px] lg:pt-[120px]' : 'pt-[40px] md:pt-10 lg:pt-[40px]'} pb-[60px]`}
//       >
//         {isMobile || isTable ? (
//           <div className='custom-drawer'>
//             <div className={`${!hideCourseFunction ? 'pt-12' : 'pt-0'} px-[16px] flex justify-between items-center`}>
//               <AlignJustify onClick={() => showDrawer()} color={theme === 'light' ? '#333' : '#fff'} />
//               {!hideCourseFunction ? (
//                 <button className=' px-4 py-1.5 rounded-lg cursor-pointer bg-[#f66962] w-[50%] text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]'>
//                   Gửi đi xét duyệt
//                 </button>
//               ) : (
//                 <CustomTreeSelect
//                   treeDataSimpleMode
//                   style={{ width: '50%', marginTop: 12, height: 44 }}
//                   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
//                   placeholder='Vui lòng xác nhận--'
//                 >
//                   <TreeNode value='jav' title='Xác nhận duyệt' />
//                   <TreeNode value='forn' title='Từ chối' />
//                 </CustomTreeSelect>
//               )}
//             </div>
//             <CustomDrawer
//               closeIcon={false}
//               width={300}
//               title={
//                 <div className='flex items-center justify-between'>
//                   <h2 className='text-[#fff] text-[14px]'>Lên kế hoạch cho khóa học của bạn</h2>
//                   <X className='mt-1' size={22} color={'#fff'} onClick={onClose} />
//                 </div>
//               }
//               placement='left'
//               onClose={onClose}
//               open={openDrawer}
//             >
//               <Steps
//                 className='min-h-[400px] font-desc text-[16px] pl-6 pt-14'
//                 onChange={handleStepChange}
//                 direction='vertical'
//                 current={current}
//                 items={itemsStep_CourseManagement}
//               />
//               {!hideCourseFunction && (
//                 <button className={`flex justify-center items-center pl-4 group`} onClick={handleListStudent}>
//                   <UsergroupDeleteOutlined
//                     className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
//                     ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-gray-200 dark:bg-[#2b2838] text-[#fff]'}`}
//                   />
//                   <p
//                     className={`font-desc text-[16px] ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}
//                   >
//                     Danh sách học viên
//                   </p>
//                 </button>
//               )}
//             </CustomDrawer>
//           </div>
//         ) : (
//           <>
//             <div className={`pt-12 ${!hideCourseFunction ? 'pl-4' : 'pl-4'}`}>
//               <Steps
//                 className='min-h-[400px] font-desc text-[16px] pl-4 '
//                 onChange={handleStepChange}
//                 direction='vertical'
//                 current={current}
//                 items={itemsStep_CourseManagement} // Các bước step được đặt trong contant client
//               />
//               {/* Nút gửi yêu cầu */}
//               {!hideCourseFunction ? (
//                 <>
//                   <button className={`flex justify-center items-center pl-4 group`} onClick={handleListStudent}>
//                     <UsergroupDeleteOutlined
//                       className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
//                 ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-gray-200 dark:bg-[#2b2838] text-[#fff]'}
//                 border-[2px] border-transparent group-hover:border-[#d9d9d9] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] dark:group-hover:border-transparent`}
//                     />
//                     <p
//                       className={`font-desc text-[16px] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] ' ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}
//                     >
//                       Danh sách học viên
//                     </p>
//                   </button>
//                   <button className='mt-12 px-4 py-2 rounded-lg cursor-pointer bg-[#f66962] w-full text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]'>
//                     Gửi đi xét duyệt
//                   </button>
//                 </>
//               ) : data?.status === 1 ? (
//                 <CustomTreeSelect
//                   treeDataSimpleMode
//                   style={{ width: '86%', marginTop: 12, height: 44, marginLeft: 18 }}
//                   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
//                   placeholder='Phê duyệt khóa học'
//                   onChange={(e) => handleapprovalCourse(Number(e))}
//                 >
//                   <TreeNode value={2} title='Xác nhận duyệt' />
//                   <TreeNode value={0} title='Từ chối' />
//                 </CustomTreeSelect>
//               ) : (
//                 <Tag
//                   className='text-[16px] py-2  w-[86%] text-center'
//                   color={
//                     data?.status === 0 ? 'red' : data?.status === 1 ? 'blue' : data?.status === 2 ? 'green' : 'gold'
//                   }
//                 >
//                   {data?.status === 0
//                     ? 'Nháp '
//                     : data?.status === 1
//                       ? 'Chờ phê duyệt'
//                       : data?.status === 2
//                         ? 'Đã phê duyệt'
//                         : 'Lưu trữ'}
//                 </Tag>
//               )}
//             </div>
//           </>
//         )}

//         <div className=''>
//           {current === 0 && <Form_Course />}
//           {current === 1 && <Targets />}
//           {current === 2 && <FormLesson />}
//           {current === 3 && <Voucher />}
//           {extraSelected && <List_Students />} {/* Render component khi extra được chọn */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Course_Detail
