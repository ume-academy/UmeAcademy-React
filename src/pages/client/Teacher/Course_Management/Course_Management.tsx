import { itemsStep_CourseManagement, useIsMobile, useIsTablet } from '@/contants/client';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { MoonFilled, SunFilled, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Drawer, Steps, Tooltip, TreeSelect } from 'antd';
import { AlignJustify, ChevronLeft, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form_Course from '../Form_Course/Form_Course';
import FormLesson from './FormLesson/Form_Lesson';
import Voucher from './Voucher/Voucher';
import List_Students from '../Students/List_Students';
import './Course_Management_Antd.scss'
import styled from 'styled-components';
import Targets from './Targets/Targets';
import { routerConfigAdmin } from '@/contants/admin';
import { TreeNode } from 'antd/es/tree-select';

const Course_Management = () => {
  const [openDrawer, setOpenDrawer] = useState(false); // State để kiểm soát việc mở và đóng drawer
  const [current, setCurrent] = useState(0); // State để kiểm soát step hiện tại
  const [extraSelected, setExtraSelected] = useState(false); // State để kiểm soát mục mới
  const {theme, toggleTheme} = useContext(ThemeContext) as ThemeContextType;
  
  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation();
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const isMobile = useIsMobile(); // Kiểm tra xem có phải thiết bị di động không
  const isTable = useIsTablet(); // Kiểm tra xem có phải thiết bị tablet không

  // Hàm xử lý khi click vào nút mở drawer
  const showDrawer = () => {
    setOpenDrawer(true);
  }

  // Hàm xử lý đóng drawer
  const onClose = () => {
    setOpenDrawer(false);
  }

  // Hàm xử lý khi chuyển step
  const handleStepChange = (current: number) => {
    setCurrent(current);
    setExtraSelected(false); // Khi chuyển step, tắt trạng thái extra
    setOpenDrawer(false)
  };

  // Hàm xử lý khi click button danh sách học viên
  const handleListStudent = () => {
    setExtraSelected(true); // Bật trạng thái extra khi người dùng bấm vào
    setCurrent(-1); // Đặt current thành -1 để không hiển thị các step
    setOpenDrawer(false)
  };

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
    // Đổ màu cho thẻ
    .ant-select-selector {
      background-color: #f66962 !important;
      border: 1px solid #f66962 !important;
      color: #fff !important;
    }

    // Đổ màu cho placeholder 
    .ant-select-selector .ant-select-selection-placeholder {
      color: #fff !important; /* Màu placeholder chế độ sáng*/
    }
  `

  return (
    <div >
      {/* header */}
      {!hideCourseFunction && (
        <div className='fixed top-0 right-0 left-0 z-50 bg-[#3d3a4e] h-[70px] flex items-center justify-between'>
          <div className='flex items-center h-full'>
            <Link to={`/teacher/my-courses`} className='mr-2 px-4 border-r-[1px] border-gray-600 hover:bg-[#3b3657] hover:text-[#fff] h-full flex items-center text-[#fff]'>
            <ChevronLeft strokeWidth={3} size={18} /><p className=' hidden lg:block text-[14px]'>Quay lại khóa học</p>
            </Link>
            
            <Tooltip title="Tên của khóa học" placement='bottom' color='pink'>
              <span className='font-title text-[14px] text-[#fff] h-full flex items-center lg:text-[16px] max-w-[200px] lg:max-w-[300px] truncate border-transparent'>Tên của khóa họcTên của khóa họcTên của khóa họcTên của khóa học</span>
            </Tooltip>
            <h2 className='ml-6 text-[#fff] text-[14px] border-[1px] px-2 py-0.5 font-title bg-[#b4a7f5] border-transparent rounded-lg'>Bản nháp</h2>
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
      <div className={`max-w-[768px] md:max-w-[1024px] lg:max-w-[1290px] mx-auto grid grid-cols-1 min-h-screen lg:grid-cols-[2fr_8fr] gap-5  ${!hideCourseFunction ? 'pt-[60px] md:pt-[60px] lg:pt-[120px]' : 'pt-[40px] md:pt-10 lg:pt-[40px]'} pb-[60px]`}>
        {isMobile || isTable ? (
          <div className='custom-drawer'>
            <div className={`${!hideCourseFunction ? 'pt-12' : 'pt-0'} px-[16px] flex justify-between items-center`}>
              <AlignJustify onClick={() => showDrawer()} color={theme === 'light' ? '#333' : '#fff'} />
              {!hideCourseFunction ? (
                <button className=" px-4 py-1.5 rounded-lg cursor-pointer bg-[#f66962] w-[50%] text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]">Gửi đi xét duyệt</button>
              ) : (
                <CustomTreeSelect
                treeDataSimpleMode
                style={{ width: '50%', marginTop: 12, height: 44 }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder='Vui lòng chọn--'
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
              placement="left" 
              onClose={onClose} 
              open={openDrawer}>
                <Steps
                  className='min-h-[400px] font-desc text-[16px] pl-6 pt-14'
                  onChange={handleStepChange}
                  direction="vertical"
                  current={current}
                  items={itemsStep_CourseManagement}
                />
                {!hideCourseFunction && (
                  <button className={`flex justify-center items-center pl-4 group`} onClick={handleListStudent}>
                  <UsergroupDeleteOutlined 
                    className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
                    ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-gray-200 dark:bg-[#2b2838] text-[#fff]'}`}
                  />
                  <p className={`font-desc text-[16px] ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}>
                    Danh sách học viên
                  </p>
                </button>
                )}
          </CustomDrawer>
          </div>  
          
        ) : (
          <>
            <div className={`pt-12 ${!hideCourseFunction ? 'pl-4' : 'pl-4'}`}>
          <Steps
            className='min-h-[400px] font-desc text-[16px] pl-4 '
            
            onChange={handleStepChange}
            direction="vertical" 
            current={current}
            items={itemsStep_CourseManagement} // Các bước step được đặt trong contant client 
          />
          {/* Nút gửi yêu cầu */}
          {!hideCourseFunction ? (
            <>
              <button
              className={`flex justify-center items-center pl-4 group`}
              onClick={handleListStudent}
            >
              <UsergroupDeleteOutlined 
                className={`w-[32px] h-[32px] flex justify-center items-center rounded-full mr-4 
                ${extraSelected ? 'bg-[#f66962] text-[#fff]' : 'bg-gray-200 dark:bg-[#2b2838] text-[#fff]'}
                border-[2px] border-transparent group-hover:border-[#d9d9d9] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] dark:group-hover:border-transparent`}/>
              <p className={`font-desc text-[16px] group-hover:text-[#685f78] dark:group-hover:text-[#b9b7c0] ' ${extraSelected ? 'text-[#1e1e1e] dark:text-[#b9b7c0]' : 'text-[#c1b6d6] dark:text-[#777779]'}`}>Danh sách học viên</p>
            </button>
            <button className="mt-12 px-4 py-2 rounded-lg cursor-pointer bg-[#f66962] w-full text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]">Gửi đi xét duyệt</button>
          </>        
          ) : (
            <CustomTreeSelect
            treeDataSimpleMode
            style={{ width: '90%', marginTop: 12, height: 44, marginLeft: 18 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder='Vui lòng chọn--'
          >
            <TreeNode value='jav' title='Xác nhận duyệt' />
            <TreeNode value='forn' title='Từ chối' />
          </CustomTreeSelect>
          )}
        </div>
          </>
        )}
        
        <div className="">
          {current === 0 && (<Form_Course />)}
          {current === 1 && (<Targets />)}
          {current === 2 && (<FormLesson />)}
          {current === 3 && (<Voucher />)}
          {extraSelected && (<List_Students />)} {/* Render component khi extra được chọn */}
        </div>
      </div>
    </div>
  );
}

export default Course_Management;
