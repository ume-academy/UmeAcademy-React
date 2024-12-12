import { logoutLocal } from "@/redux/slices/auth/authSlice"
import { useGetProfileQuery } from "@/redux/slices/profile/profileApiSlice"
import { MoonFilled, SunFilled } from "@ant-design/icons"
import { Avatar, Button, message } from "antd"
import { Header } from "antd/es/layout/layout"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

type Header_AdminProps = {
  toggleTheme: () => void
  theme: string
  collapsed: any,
  onCollapse: any
}

const Header_Admin: React.FC<Header_AdminProps> = ({ toggleTheme, theme, collapsed, onCollapse }) => {

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const nav = useNavigate();

  const { data } = useGetProfileQuery({})

  console.log(data);

  const handleLogout = async () => {
    // const tokenREF = Cookies.get('refresh_Token')

    try {
      // await logoutApi().unwrap()
      // console.log(1)


      dispatch(logoutLocal());



      message.success('Đăng xuất thành công')
      nav('/')
    } catch (error) {
      console.log(error)
    }
  }


  const handleOpen = () => {
    const newOpenStatus = !open; // Tính toán giá trị mới trước
    setOpen(newOpenStatus);
    localStorage.setItem('statusSidebar', JSON.stringify(newOpenStatus));
  };

  // console.log(open)

  return (
    <Header className='p-4 md:p-6 dark:bg-[#2B2838] bg-[#eeeeee] flex justify-between items-center lg:justify-end' >

      <div className="block lg:hidden">
        <div className="flex justify-center items-center" onClick={() => onCollapse(!collapsed)}>
          <div
            className=""
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#f66962" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-justify">
              <line x1={3} x2={21} y1={6} y2={6} />
              <line x1={3} x2={21} y1={12} y2={12} />
              <line x1={3} x2={21} y1={18} y2={18} />
            </svg>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <Link to="/">
          <img src="/assets/images/client/Logo/logo.png" className="w-[140px] h-[38px] object-cover" alt="" width="100" height="50" />
        </Link>
      </div>

      <div className="hidden lg:block px-0 lg:px-8">
        <div className="flex gap-x-3 justify-between items-center" >
          <div className="flex items-center gap-x-2">
            <div className="avt">
              <Avatar src={data?.avatar} size={42} />
            </div>

            <div className="info">
              <p className=" text-sm font-title">{data?.fullname}</p>
              <p className=" text-xs">{data?.email}</p>
            </div>
          </div>

          <div className="">
            <div
              className="text-[#F84563] font-title cursor-pointer"
              onClick={() => handleLogout()}
            >
              Đăng xuất
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* dark mode */}
        <button
          className='dark:bg-[#fff] flex items-center justify-center bg-black rounded-lg border-none self-center py-[10px] px-[10px]'
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <MoonFilled rotate={10} style={{ color: '#fff', fontSize: 16 }} />
          ) : (
            <SunFilled style={{ color: '#808080', fontSize: 16 }} />
          )}
        </button>
      </div>
    </Header>
  )
}

export default Header_Admin