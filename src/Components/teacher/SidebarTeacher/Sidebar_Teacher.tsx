import { Avatar } from 'antd';
import { Bell, Boxes, FileText, Gauge, GraduationCap, HandCoins, Heart, MessageSquareText, Rocket, ShoppingBasket, Star, User, Volume2, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from './sidebarTeacher.module.scss';

const Sidebar_Teacher = () => {
    return (
        <>
            <aside className='flex flex-col gap-6'>
                <div className={`${styles['introduce']}`}>
                    <div className={`${styles['top']} bg-[#f84563]`}>
                        <div className={`${styles['avt']}`}>
                            <Avatar size={100} src="https://i.pravatar.cc/300" className='border-4 border-white' />
                        </div>
                    </div>

                    <div className={`${styles['info']} bg-white pt-16`}>
                        <div className="name">
                            <h4 className='font-title text-2xl'>Eugene Andre</h4>
                        </div>

                        <div className="role">
                            <p className='font-desc text-[#685f78]'>Giảng viên</p>
                        </div>
                    </div>

                    <div className={`${styles['act']} p-6`}>
                        <button className='py-3 text-white bg-[#f84563] rounded-md border border-transparent hover:border-[#f84563] hover:bg-white hover:text-[#f84563]'>
                            Thêm khóa học
                        </button>
                    </div>
                </div>

                <div className={`${styles['menuItems']} p-6`}>
                    {/* Dashboard */}
                    <div className="mb-6">
                        <div className={`${styles['heading']}`}>
                            <h3 className='font-title text-xl'>Bảng điều khiển</h3>
                        </div>

                        <div className={`${styles['content']} mt-6`}>
                            <ul className='space-y-4 text-[#685f78]'>
                                <li>
                                    <NavLink
                                        to={'/teacher'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive && location.pathname === '/teacher' ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Gauge />
                                        Bảng điều khiển
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/profile'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <User />
                                        Hồ sơ của tôi
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/courses'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <GraduationCap />
                                        Khóa học đã đăng ký
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/favorites'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Heart />
                                        Danh sách yêu thích
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/reviews'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Star />
                                        Đánh giá
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/order-history'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <ShoppingBasket />
                                        Lịch sử đơn hàng
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/messages'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <MessageSquareText />
                                        Tin nhắn
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/teacher/notifications'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Bell />
                                        Thông báo
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Management */}
                    <div className="">
                        <div className={`${styles['heading']}`}>
                            <h3 className='font-title text-xl'>Quản lý</h3>
                        </div>

                        <div className={`${styles['content']} mt-6`}>
                            <ul className='space-y-4 text-[#685f78]'>
                                <li>
                                    <NavLink
                                        to={'/'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Rocket />
                                        Danh sách khóa học
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/notifications'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <Volume2 />
                                        Thông báo
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/withdraw'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
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
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
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
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
                                        }
                                    >
                                        <FileText />
                                        Bài tập
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={'/revenue'}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 hover:text-[#F84563] ${isActive ? "text-[#F84563] font-title" : ""}`
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