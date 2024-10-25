import { itemsStep_CourseManagement } from '@/contants/client';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { MoonFilled, SunFilled, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Steps, Tooltip } from 'antd';
import { ChevronLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Form_Course from '../Form_Course/Form_Course';
import FormLesson from './FormLesson/Form_Lesson';
import Voucher from './Voucher/Voucher';
import List_Students from '../Students/List_Students';
import './Course_Management_Antd.scss'

const Course_Management = () => {
  const [current, setCurrent] = useState(0);
  const [extraSelected, setExtraSelected] = useState(false); // State để kiểm soát mục mới
  const {theme, toggleTheme} = useContext(ThemeContext) as ThemeContextType;

  const handleStepChange = (current: number) => {
    setCurrent(current);
    setExtraSelected(false); // Khi chuyển step, tắt trạng thái extra
  };

  const handleListStudent = () => {
    setExtraSelected(true); // Bật trạng thái extra khi người dùng bấm vào
    setCurrent(-1); // Đặt current thành -1 để không hiển thị các step
  };



  return (
    <div >
      {/* header */}
      <div className='bg-[#3d3a4e] h-[70px] flex items-center justify-between'>
          <div className='flex items-center h-full'>
            <Link to={`/teacher/my-courses`} className='mr-2 px-4 border-r-[1px] border-gray-600 hover:bg-[#3b3657] hover:text-[#fff] h-full flex items-center text-[#fff]'>
             <ChevronLeft strokeWidth={3} size={18} /><p className='text-[14px]'>Quay lại khóa học</p>
            </Link>
            
            <Tooltip title="Tên của khóa học" placement='bottom' color='pink'>
              <span className='font-title text-[#fff] h-full flex items-center text-[16px] max-w-[300px] truncate border-transparent'>Tên của khóa họcTên của khóa họcTên của khóa họcTên của khóa học</span>
            </Tooltip>
            <h2 className='ml-6 text-[#fff] text-[14px] border-[1px] px-2 py-0.5 font-title bg-[#b4a7f5] border-transparent rounded-lg'>Bản nháp</h2>
          </div>
          <div className='flex items-center mr-4'>
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

      {/* content */}
      <div className="w-[1290px] mx-auto grid grid-cols-[2fr_8fr] gap-5 pt-[60px] pb-[60px]">
        <div className="pt-12">
          <Steps
            className='min-h-[400px] font-desc text-[16px] pl-4 '
            
            onChange={handleStepChange}
            direction="vertical" 
            current={current}
            items={itemsStep_CourseManagement} // Các bước step được đặt trong contant client 
          />
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
          <div className="mt-12 px-4 py-2 rounded-lg cursor-pointer bg-[#f66962] text-[#fff] flex justify-center hover:bg-transparent hover:text-[#f66962] border-[2px] border-[#f66962]">Gửi đi xét duyệt</div>
        </div>
        <div className="">
          {current === 0 && (<Form_Course />)}
          {current === 1 && (<FormLesson theme={theme } />)}
          {current === 2 && (<Voucher />)}
          {extraSelected && (<List_Students />)} {/* Render component khi extra được chọn */}
        </div>
      </div>
    </div>
  );
}

export default Course_Management;
