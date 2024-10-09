import {
  ArrowRightOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MoonFilled,
  SearchOutlined,
  StarOutlined,
  SunFilled,
  UserOutlined,
  WalletOutlined
} from '@ant-design/icons'
import { Avatar, Dropdown, Input, MenuProps, Space, TreeSelect } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, routerConfig } from '~/contants/client'
import { ThemeContext, ThemeContextType } from '~/contexts/ThemeContext'
import { ModeUserContext, ModeUserType } from '~/contexts/ModeUser'
import  './HeaderAntd.scss'

const Header = () => {
  const { mode, toggleMode } = useContext(ModeUserContext) as ModeUserType
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const navigate = useNavigate()
  const handleToggle = () => {
    toggleMode() // Chuyển đổi chế độ
    // Điều hướng sang trang phù hợp
    if (mode === 'student') {
      navigate('/') // Chuyển sang trang dành cho teacher
    } else {
      navigate('/') // Chuyển sang trang dành cho student (Home Page)
    }
  }

  // set scroll cuộn header đổi màu bgr header
  const [isScroll, setIsScroll] = useState(false)

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

  const treeData = [
    {
      value: 'parent 1',
      title: 'parent 1'
    },
    {
      value: 'parent 2',
      title: 'parent 2'
    },
    {
      value: 'parent 3',
      title: 'parent 3'
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className='flex min-w-[180px] items-center'>
          <Avatar
            size={50}
            className='border-[2px] border-[#b9b7c0]'
            src={`https://cdn.tuoitre.vn/thumb_w/480/2019/4/2/img3288-1554167712373426332952-1554167744717309258379-1554199988684557173348.png`}
          />
          <div className='ml-3'>
            <span className='text-[#002058] font-subtitle block text-[14px] max-w-[120px] truncate'>Khá Bảnh</span>
            <span className='text-[#757575] block font-desc text-[12px]'>Student</span>
          </div>
        </div>
      )
    },
    {
      key: '1',
      label: (
        <Link to='/profile'>
          <UserOutlined className='mr-2' />
          Hồ sơ
        </Link>
      )
    },
    // Chỉ hiển thị key 2-4 nếu mode === 'student'
    // Không thêm mục nào nếu mode không phải là 'student'
  ...(mode === 'student'
    ? [2, 3, 4].map((key) => ({
        key: `${key}`,
        label: (() => {
          switch (key) {
            case 2:
              return (
                <Link to='/wallet-history'>
                  <HistoryOutlined className='mr-2' />
                  Lịch sử giao dịch
                </Link>
              );
            case 3:
              return (
                <Link to='/purchased-courses'>
                  <StarOutlined className='mr-2' />
                  Danh sách đã mua
                </Link>
              );
            case 4:
              return (
                <Link className='flex justify-start items-center' to='/wallet-history'>
                  <WalletOutlined className='mr-2' style={{ width: 16, height: 16 }} />
                  Ví Ume
                </Link>
              );
            default:
              return null;
          }
        })()
      }))
    : []), 
    {
      key: '5',
      label: (
        <button className='border-none w-full flex justify-start p-0 items-center shadow-none dark:text-[#b9b7c0]'>
          <LogoutOutlined className='mr-2' />
          Đăng xuất
        </button>
      )
    }
  ]

  // Bật trạng thái trong suốt khi ở trang home
  const transperent = routerConfig.transparentHeader.includes(location.pathname)



  return (
    <>
      <div
        className={`header fixed top-0 right-0 left-0 z-50 dark:bg-[#2b2838]  ${isScroll && 'shadow-[0px_4px_15px_rgba(0,0,0,0.08)]'} ${isScroll ? 'bg-[#fff]' : transperent ? 'bg-transparent' : 'bg-[#fff]'} transition-all duration-300 ease-in-out`}
      >
        <div className='flex items-center justify-between w-[1296px] h-[80px] mx-auto'>
          <div className='flex justify-start items-center'>
            {/* Logo */}
            <div className='w-[160px] h-[37px] mr-12'>
              <Link to={mode === 'student' ? `/` : '/'}>
                <img src={logo} className='w-full h-full object-cover' alt='' width={100} height={50} />
              </Link>
            </div>
            {/* search input */}
            <div className='flex justify-between bg-white p-2 rounded-full dark:bg-[#3d3a4e]'>
              <SearchOutlined style={{ color: '#f66962', marginRight: 10, paddingLeft: 10 }} />
              <Input
                type='text'
                className='bg-transparent border-none w-[360px] mr-2 placeholder:text-[#b9b7c0] text-[#b9b7c0] hover:bg-transparent focus:bg-transparent'
                placeholder='Tìm kiến khóa học, giảng viên,'
              />
              <TreeSelect
                treeData={treeData}
                className='bg-transparent max-w-[174px] mr-2 custom'
                style={{ height: '32px' }}
                dropdownClassName='custom-dropdown'
                defaultValue={'-- Vui lòng chọn'}
              />
              <button className='bg-[#f66962] rounded-full w-[32px] hover:bg-[#fc7f50]'>
                <ArrowRightOutlined style={{ color: 'white' }} />
              </button>
            </div>
          </div>

          <div className='flex justify-between '>
            {/* teacher */}
            <button className='mr-[20px] flex items-center dark:text-[#b9b7c0]' onClick={() => handleToggle()}>
              {mode === 'student' ? 'Giảng viên' : 'Học viên'}
            </button>

            {/* dark mode */}
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

            {/* icon */}
            <div className='flex items-center w-[120px] justify-between mx-[20px]'>
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

            {/* dropdown */}
            <Dropdown menu={{ items }} trigger={['click']} placement='topRight' overlayStyle={{}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    size={50}
                    className='border-[2px] border-[#b9b7c0]'
                    src={`https://cdn.tuoitre.vn/thumb_w/480/2019/4/2/img3288-1554167712373426332952-1554167744717309258379-1554199988684557173348.png`}
                  />
                </Space>
              </a>
            </Dropdown>
            {/* Khi có data thật đây là nút Đăng ký đăng nhập */}
            {/* <Link to={`/login`} className="mr-[20px] border-transparent border-[2px]  transition-all duration-300 ease-in-out bg-[#b4a7f5] min-w-[140px] flex justify-center items-center text-[#fff] px-[15px] py-[10px] rounded-3xl hover:border-[2px] hover:bg-[#fff] hover:text-[#22100d] hover:border-[#b4a7f5]">Đăng Nhập</Link> */}
            {/* <Link to={`/register`} className="mr-[20px] border-[2px] min-w-[140px] transition-all duration-300 ease-in-out dark:text-[#b9b7c0] flex justify-center items-center rounded-3xl border-[#b4a7f5] text-[#22100d] px-[15px] py-[10px] hover:bg-[#f6697b] hover:border-transparent hover:text-[#fff]">Đăng Ký</Link> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
