import { logo, routerConfig } from '@/contants/client'
import { ModeUserContext, ModeUserType } from '@/contexts/ModeUser'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Button, Drawer, DrawerProps, RadioChangeEvent } from 'antd'
import { AlignJustify, X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import './Header_Mobile_Tablet_Antd.scss'

const Header_Mobile_Tablet = () => {
  const nav = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const { mode, toggleMode } = useContext(ModeUserContext) as ModeUserType
  const [open, setOpen] = useState(false); //Đón nhận trạng thái mở của drawer
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left'); //Đón nhận vị trí của drawer

  // Kiểm tra kích thước màn hình để thay đổi width của drawer 
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const drawerWidth = isMobile ? 280 : 500 // kích thước 280 là mobi ngược lại là tablet còn pc dùng 1 cpn khác

  // Bật trạng thái trong suốt khi ở trang home
  const transperent = routerConfig.transparentHeader.includes(location.pathname)

  // set scroll cuộn header đổi màu bgr header
  const [isScroll, setIsScroll] = useState(false)

  // Bắt scroll cuộn header đổi màu bgr header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Sử dụng scrollY thay vì screenY
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup khi component bị unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleToggle = () => {
    toggleMode() // Chuyển đổi chế độ
    // Điều hướng sang trang phù hợp
    if (mode === 'student') {
      nav('/') // Chuyển sang trang dành cho teacher
    } else {
      nav('/') // Chuyển sang trang dành cho student (Home Page)
    }
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    // bg-red-400 md:bg-blue-400
    <div>
      <div
        className={`fixed top-0 right-0 left-0 z-50 dark:bg-[#2b2838]  ${(isScroll || mode === 'teacher') && 'shadow-[0px_4px_15px_rgba(0,0,0,0.08)]'} 
        ${isScroll ? 'bg-[#fff]' : transperent ? 'bg-transparent' : 'bg-[#fff]'} transition-all duration-300 ease-in-out`}
      >
        <div className='max-w-[768px] md:max-w-[1024px] px-2 grid grid-cols-[1fr_auto_1fr] place-items-center h-[80px] lg:hidden  '>
          {/* sidebar */}
          <div className='flex items-center justify-self-start'>
              <Button className='bg-transparent border-none shadow-none p-2' onClick={showDrawer}>
                <AlignJustify  color='#f66962' size={26} />
              </Button>
            <Drawer
              title={
                    <div className='flex items-center justify-between'>
                      <img src={logo} className='w-[140px] h-[38px] object-cover' alt='' width={100} height={50} />
                      <X className='mt-1' size={26} color={theme === 'light' ? '#333' : '#fff'} onClick={onClose} />
                    </div>
              }
              placement={placement}
              width={drawerWidth}
              onClose={onClose}
              closeIcon={null}
              open={open}
            >
              <Link onClick={() => setOpen(false)}  className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/'>Trang chủ</Link>
              {/* teacher */}
              <button className='w-full flex justify-start px-3 py-2 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' 
                onClick={() => handleToggle()}>
                {mode === 'student' ? 'Giảng viên' : 'Học viên'}
              </button>
              {mode === 'student' && (
                <>
                <Link onClick={() => setOpen(false)} className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/profile'>Hồ sơ</Link>
                <Link onClick={() => setOpen(false)} className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/wallet-history'>Lịch sử giao dịch</Link>
                <Link onClick={() => setOpen(false)} className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/purchased-courses'>Danh sách đã mua</Link>
                <Link onClick={() => setOpen(false)} className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/wallet-history'>Ví Ume</Link>
                </>
              )}
              
              
              <button className='w-full flex justify-start px-3 py-2 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]'>Đăng xuất</button>
              {/*<===== KHÔNG ĐƯỢC XÓA Dùng cho đăng kí đăng nhập ====> */}
              {/* <Link className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/login'>Đăng nhập</Link>
              <Link className='block w-full px-3 py-4 text-[#fff] hover:text-[#fff] border-b-[1px] border-[#f38681] font-desc focus:bg-[#131022]' to='/register'>Đăng ký</Link> */}
            </Drawer>
          </div>

          {/* div Logo */}
          <div className='flex items-center justify-center col-span-1'>
            <Link to={mode === 'student' ? `/` : '/'}>
              <img src={logo} className='w-[140px] h-[38px] object-cover' alt='' width={100} height={50} />
            </Link>
          </div>

          {/* div icon */}
          <div className='flex items-center justify-self-end p-2'>
            {/* icon */}
            <div className='flex items-center w-[100px] justify-between mx-[10px]'>
              {/* svg tin nhắn */}
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  opacity='0.4'
                  d='M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z'
                  fill='#1D9CFD'
                />
                <path
                  d='M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z'
                  fill='#1D9CFD'
                />
                <path
                  d='M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z'
                  fill='#1D9CFD'
                />
                <path
                  d='M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z'
                  fill='#1D9CFD'
                />
                <path
                  d='M21.9791 6.79001V10.79C21.9791 13.73 20.6291 15.31 17.9391 15.54C17.9691 15.3 17.9791 15.05 17.9791 14.79V10.79C17.9791 7.60001 16.3791 6 13.1891 6H6.78906C6.52906 6 6.27906 6.01001 6.03906 6.04001C6.26906 3.35001 7.85906 2 10.7891 2H17.1891C20.3791 2 21.9791 3.60001 21.9791 6.79001Z'
                  fill='#1D9CFD'
                />
              </svg>
              {/* svg thông báo */}
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M22 8.6901C22 9.8801 21.81 10.9801 21.48 12.0001H2.52C2.19 10.9801 2 9.8801 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.37 3.1001 10.99 3.9801 12 5.3301C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901Z'
                  fill='#F66962'
                />
                <path
                  opacity='0.4'
                  d='M21.4795 12C19.8995 17 15.0295 19.99 12.6195 20.81C12.2795 20.93 11.7195 20.93 11.3795 20.81C8.96953 19.99 4.09953 17 2.51953 12H21.4795Z'
                  fill='#F66962'
                />
              </svg>
              {/* svg thông báo */}
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  opacity='0.4'
                  d='M20.3992 16.33C20.1192 17.08 19.5292 17.65 18.7592 17.91C17.6792 18.27 16.5692 18.54 15.4492 18.73C15.3392 18.75 15.2292 18.7701 15.1192 18.7801C14.9392 18.8101 14.7592 18.83 14.5792 18.85C14.3592 18.8801 14.1292 18.9 13.8992 18.92C13.2692 18.97 12.6492 19 12.0192 19C11.3792 19 10.7392 18.97 10.1092 18.91C9.83923 18.89 9.57923 18.8601 9.31923 18.82C9.16923 18.8 9.01923 18.7801 8.87923 18.76C8.76923 18.74 8.65923 18.73 8.54923 18.71C7.43923 18.53 6.33923 18.26 5.26923 17.9C4.46923 17.63 3.85923 17.06 3.58923 16.33C3.31923 15.61 3.41923 14.77 3.84923 14.05L4.97923 12.17C5.21923 11.76 5.43923 10.97 5.43923 10.49V8.63005C5.43923 5.00005 8.38923 2.05005 12.0192 2.05005C15.6392 2.05005 18.5892 5.00005 18.5892 8.63005V10.49C18.5892 10.97 18.8092 11.76 19.0592 12.17L20.1892 14.05C20.5992 14.75 20.6792 15.57 20.3992 16.33Z'
                  fill='#FE893E'
                />
                <path
                  d='M12.0002 10.7599C11.5802 10.7599 11.2402 10.4199 11.2402 9.99989V6.89989C11.2402 6.47989 11.5802 6.13989 12.0002 6.13989C12.4202 6.13989 12.7602 6.47989 12.7602 6.89989V9.99989C12.7502 10.4199 12.4102 10.7599 12.0002 10.7599Z'
                  fill='#FE893E'
                />
                <path
                  d='M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z'
                  fill='#FE893E'
                />
              </svg>
            </div>

            {/* div Darkmode */}
            <button
              className='dark:bg-[#fff] flex items-center justify-center bg-black  rounded-lg border-none self-center py-[8px] px-[8px]'
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
      </div>
    </div>
  )
}

export default Header_Mobile_Tablet
