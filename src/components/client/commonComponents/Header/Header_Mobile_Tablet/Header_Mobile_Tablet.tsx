import { logo, routerConfig } from '@/contants/client'
import { ModeUserContext, ModeUserType } from '@/contexts/ModeUser'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import { Button, Drawer, DrawerProps, RadioChangeEvent, Space } from 'antd'
import { AlignJustify, X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import './Header_Mobile_Tablet_Antd.scss'
import { MoonFilled, SunFilled } from '@ant-design/icons'

const Header_Mobile_Tablet = () => {
  const nav = useNavigate()
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const { mode, toggleMode } = useContext(ModeUserContext) as ModeUserType
  const [open, setOpen] = useState(false); //Đón nhận trạng thái mở của drawer
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left'); //Đón nhận vị trí của drawer

  // Kiểm tra kích thước màn hình để thay đổi width của drawer 
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const drawerWidth = isMobile ? 280 : 500 // nếu màn hình 

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
            <button>
            </button>
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

          {/* div Darkmode */}
          <div className='flex items-center justify-self-end p-2'>
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
