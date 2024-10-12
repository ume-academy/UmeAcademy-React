import { Avatar } from 'antd'
import {
  Boxes,
  FileText,
  HandCoins,
  Rocket,
  Users,
  Wallet
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import styles from './sidebarTeacher.module.scss'

const Sidebar_Teacher = () => {
  return (
    <>
      <aside className='flex flex-col gap-6'>
        <div className={`${styles['introduce']} dark:bg-[#2b2838] dark:border-transparent border border-[#e9ecef]`}>
          <div className={`${styles['top']} bg-[#f84563]`}>
            <div className={`${styles['avt']}`}>
              <Avatar size={100} src='https://i.pravatar.cc/300' className='border-4 border-white' />
            </div>
          </div>

          <div className={`${styles['info']} bg-transparent pt-16`}>
            <div className='name'>
              <h4 className='font-title text-2xl dark:text-[#efeff2]'>Eugene Andre</h4>
            </div>

            <div className='role'>
              <p className='font-desc text-[#685f78] dark:text-[#efeff2]'>Giảng viên</p>
            </div>
          </div>

          <div className={`${styles['act']} p-6`}>
            <button
              className='py-3 
                            text-white 
                            bg-[#f84563] 
                            rounded-md 
                            border 
                            border-transparent 
                            hover:border-[#f84563] 
                            hover:bg-white 
                            hover:text-[#f84563]
                            dark:hover:bg-[#efeff2]
                            dark:hover:text-[#b9b7c0]'
            >
              Thêm khóa học
            </button>
          </div>
        </div>

        <div className={`${styles['menuItems']} p-6 dark:bg-[#2b2838] dark:border-transparent border border-[#e9ecef]`}>
          {/* Management */}
          <div className=''>
            <div className={`${styles['heading']}`}>
              <h3 className='font-title text-xl dark:text-[#B9B7C0]'>Quản lý</h3>
            </div>

            <div className={`${styles['content']} mt-6`}>
              <ul className='space-y-4 text-[#685f78] dark:text-[#B9B7C0]'>
                <li>
                  <NavLink
                    to={'/teacher/my-courses'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Rocket />
                    Danh sách khóa học
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={'/teacher/my-students'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Users />
                    Danh sách học viên
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={'/teacher/withdraw_money'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Wallet />
                    Rút tiền
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={'/quiz'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Boxes />
                    Quiz
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={'/assignments'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <FileText />
                    Bài tập
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={'/teacher/revenue'}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <HandCoins />
                    Doanh thu
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar_Teacher
