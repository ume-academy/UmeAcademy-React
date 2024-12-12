import { Button, Menu, message } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './sidebarAntd.scss';
import { CloseOutlined } from "@ant-design/icons";
import { prefixAdmin } from "@/configs/routes";
import { useGetProfileQuery } from "@/redux/slices/profile/profileApiSlice";
import Avatar from "antd/es/avatar/avatar";
import { useDispatch } from "react-redux";
import { logoutLocal } from "@/redux/slices/auth/authSlice";

type Sidebar_Props = {
  collapsed: any,
  onCollapse: any,
  items: any
}

const Sidebar_Mobile: React.FC<Sidebar_Props> = ({ collapsed, onCollapse, items }) => {

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

  return (

    <>
      <Sider
        width={320} // Chiều rộng Sider khi mở ra
        collapsedWidth={collapsed ? 0 : 100} // Đặt collapsedWidth để rộng hơn một chút trên mobile
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(isCollapsed) => onCollapse(isCollapsed)}
        style={{ minWidth: '360px', maxWidth: '360px', width: '360px' }}
        className="sidebar block sm:block lg:hidden min-h-screen fixed z-50 "
        theme="dark"
        trigger={null}
      >
        <div className="flex justify-between p-4 bg-[#001529]" >
          <Link to={`${prefixAdmin}`} className="font-title">ADMINISTRATOR</Link>

          <span onClick={() => onCollapse(true)} className="cursor-pointer">
            <CloseOutlined />
          </span>
        </div>

        <div className="flex justify-between items-center p-4 bg-[#001529]" >
          <div className="flex gap-4">
            <div className="avt">
              <Avatar src={data?.avatar} size={42} />
            </div>

            <div className="info">
              <p className="text-white text-sm font-title">{data?.fullname}</p>
              <p className="text-white text-xs">{data?.email}</p>
            </div>
          </div>

          <div className="">
            <Button
              className="bg-[#142A43]"
              onClick={() => handleLogout()}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['4']} items={items} onClick={() => onCollapse(true)} />
      </Sider>
    </>

  );
}

export default Sidebar_Mobile