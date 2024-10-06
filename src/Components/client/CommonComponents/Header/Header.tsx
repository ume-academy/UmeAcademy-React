import { ArrowRightOutlined, HistoryOutlined, LogoutOutlined, MoonFilled, SearchOutlined, StarOutlined, SunFilled, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Input, MenuProps, Space, TreeSelect } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, routerConfig } from "../../../../contants/client";
import {
  ThemeContext,
  ThemeContextType,
} from "../../../../contexts/ThemeContext";
import { ModeUserContext, ModeUserType } from "../../../../contexts/ModeUser";

const Header = () => {
  // set scroll cuộn header đổi màu bgr header
  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { // Sử dụng scrollY thay vì screenY
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup khi component bị unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const treeData = [
    {
      value: "parent 1",
      title: "parent 1",
    },
    {
      value: "parent 2",
      title: "parent 2",
    },
    {
      value: "parent 3",
      title: "parent 3",
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className="flex min-w-[180px] items-center">
            <Avatar size={50} className="border-[2px] border-[#b9b7c0]" src={`https://cdn.tuoitre.vn/thumb_w/480/2019/4/2/img3288-1554167712373426332952-1554167744717309258379-1554199988684557173348.png`} />
            <div className="ml-3">
              <span className="text-[#002058] font-subtitle block text-[14px] max-w-[120px] truncate">Khá Bảnh</span>
              <span className="text-[#757575] block font-desc text-[12px]">Student</span>
            </div>
        </div>
      ),
    },
    {
      key: '1',
      label: (
        <Link to="/profile">
          <UserOutlined className="mr-2" />Hồ sơ
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/wallet-history">
          <HistoryOutlined className="mr-2" />Lịch sử giao dịch
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/purchased-courses">
          <StarOutlined className="mr-2" />Danh sách đã mua
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Link className="flex justify-start items-center" to="/wallet-history">
          <WalletOutlined  className="mr-2" style={{width:16, height:16}} />Ví Ume
        </Link>
      ),
    },
    {
      key: '5',
      label: (
        <button className="border-none w-full flex justify-start p-0 items-center shadow-none dark:text-[#b9b7c0]">
          <LogoutOutlined className="mr-2" />Đăng xuất
        </button>
      ),
    }
  ];

  // Bật trạng thái trong suốt khi ở trang home
  const transperent = routerConfig.transparentHeader.includes(location.pathname)

  const { mode, toggleMode } = useContext(ModeUserContext) as ModeUserType
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
  const navigate = useNavigate();
  const handleToggle = () => {
    toggleMode(); // Chuyển đổi chế độ
    // Điều hướng sang trang phù hợp
    if (mode === 'student') {
      navigate('/teacher'); // Chuyển sang trang dành cho teacher
    } else {
      navigate('/'); // Chuyển sang trang dành cho student (Home Page)
    }
  };
  return (
    <>
      <div className={`fixed top-0 right-0 left-0 z-50 dark:bg-[#2b2838]  ${isScroll && 'shadow-[0px_4px_15px_rgba(0,0,0,0.08)]'} ${isScroll ? 'bg-[#fff]' : (transperent ? "bg-transparent" : "bg-[#fff]")} transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between w-[1296px] h-[80px] mx-auto">
          
          <div className="flex justify-start items-center">
            {/* Logo */}
          <div className="w-[160px] h-[37px] mr-12">
            <Link to={mode === 'student' ? `/` : '/teacher'}>
              <img src={logo} className="w-full h-full object-cover" alt="" width={100} height={50} />
            </Link>
          </div>
          {/* search input */}
          <div className="flex justify-between bg-white p-2 rounded-full dark:bg-[#3d3a4e]">
            <SearchOutlined style={{ color: "#f66962", marginRight: 10, paddingLeft:10 }} />
            <Input type="text" className="bg-transparent border-none w-[360px] mr-2 placeholder:text-[#b9b7c0] text-[#b9b7c0] hover:bg-transparent focus:bg-transparent" placeholder="Tìm kiến khóa học, giảng viên," />
            <TreeSelect treeData={treeData} className="bg-transparent max-w-[174px] mr-2" style={{ height: '32px' }} defaultValue={'-- Vui lòng chọn'} />
            <button className="bg-[#f66962] rounded-full w-[32px] hover:bg-[#fc7f50]"><ArrowRightOutlined style={{color: 'white'}}/></button>
          </div>
          </div>

          <div className="flex justify-end">
            <button
              className="dark:bg-[#fff] flex items-center justify-center bg-black rounded-lg border-none mr-[20px] self-center py-[10px] px-[10px]"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <MoonFilled rotate={10} style={{ color: "#fff", fontSize: 16 }} />
              ) : (
                <SunFilled style={{ color: "#808080", fontSize: 16 }} />
              )}
            </button>
            <button className="mr-[20px] flex items-center" onClick={() => handleToggle()}>{mode === 'student' ? "Giảng viên" : "Học viên"}</button>
            <Dropdown menu={{ items }} trigger={['click']} placement="topRight"
             overlayStyle={{}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size={50} className="border-[2px] border-[#b9b7c0]" src={`https://cdn.tuoitre.vn/thumb_w/480/2019/4/2/img3288-1554167712373426332952-1554167744717309258379-1554199988684557173348.png`} />
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
  );
};

export default Header;
