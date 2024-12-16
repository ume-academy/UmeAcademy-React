import { router } from '@/configs/routes'
import { useGetProfileQuery } from '@/redux/slices/profile/profileApiSlice'
import { Image } from 'antd'
import { FileClock, HandCoins, Rocket, Wallet, WalletCards } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './SidebarAntd.scss'
import styles from './sidebarTeacher.module.scss'

const Sidebar_Teacher = () => {
  const nav = useNavigate()
  const { data } = useGetProfileQuery({})

  return (
    <>
      <aside className='flex flex-col gap-6'>
        <div
          className={`${styles['introduce']} dark:bg-[#2b2838] bg-[#fff] dark:border-transparent border border-[#e9ecef]`}
        >
          <div className={`${styles['top']} bg-[#f84563]`}>
            <div className='avt absolute top-[50%] right-0 h-full w-full text-center'>
              <Image
                src={data?.avatar}
                className='border-4 border-white rounded-full object-cover'
                width={166}
                height={166}
              />
            </div>
          </div>

          <div className={`${styles['info']} bg-transparent pt-[120px] md:pt-32`}>
            <div className='name'>
              <h4 className='font-title text-2xl dark:text-[#efeff2]'>{data?.fullname}</h4>
            </div>

            <div className='role'>
              <p className='font-desc text-[#685f78] dark:text-[#efeff2]'>Giảng viên</p>
            </div>
          </div>

          <div className={`${styles['act']} p-6`}>
            <Link
              to={`${router.formCourse}`}
              className='   flex
                            justify-center
                            py-3 
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
            </Link>
          </div>
        </div>

        <div
          className={`${styles['menuItems']} h-auto lg:min-h-screen p-6 dark:bg-[#2b2838] bg-[#fff]  dark:border-transparent border border-[#e9ecef]`}
        >
          {/* Management */}
          <div className=''>
            <div className={`${styles['heading']}`}>
              <h3 className='font-title text-xl dark:text-[#B9B7C0]'>Quản lý</h3>
            </div>

            <div className={`${styles['content']} mt-6`}>
              <ul className='space-y-4 text-[#685f78] dark:text-[#B9B7C0]'>
                <li>
                  <NavLink
                    to={router.revenue}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${
                        isActive ? 'text-[#F84563] font-title' : 'text-[#685f78] dark:text-[#B9B7C0]'
                      }`
                    }
                  >
                    <HandCoins />
                    Doanh thu
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={router.myCourses}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Rocket />
                    Danh sách khóa học
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink
                    to={router.listStudents}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Users />
                    Danh sách học viên của tôi
                  </NavLink>
                </li> */}

                <li>
                  <NavLink
                    to={router.walletMoney}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <Wallet />
                    Ví Ume
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={router.withdrawalMethods}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <WalletCards />
                    Phương thức rút tiền
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={router.withdrawHistories}
                    className={({ isActive }) =>
                      `flex items-center gap-4 hover:text-[#F84563] ${isActive ? 'text-[#F84563] font-title' : ''}`
                    }
                  >
                    <FileClock />
                    Lịch sử rút tiền
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
