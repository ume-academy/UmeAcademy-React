import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";
import './sidebarMobile.scss';
import { CloseOutlined } from "@ant-design/icons";

type Sidebar_Props = {
  collapsed: any,
  onCollapse: any,
  items: any
}

const Sidebar_Mobile: React.FC<Sidebar_Props> = ({ collapsed, onCollapse, items }) => {

  return (

    <>
      <Sider
        width={360} // Chiều rộng Sider khi mở ra
        collapsedWidth={collapsed ? 0 : 100} // Đặt collapsedWidth để rộng hơn một chút trên mobile
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(isCollapsed) => onCollapse(isCollapsed)}
        style={{ minWidth: '360px', maxWidth: '360px', width: '360px' }}
        className="sidebarMobile block sm:block lg:hidden min-h-screen fixed z-50 "
        theme="dark"
        trigger={null}
      >
        <div className="flex justify-between p-4 bg-[#001529]" >
          <Link to={'/admin'} className="font-title">ADMINISTRATOR</Link>

          <span onClick={() => onCollapse(true)}>
            <CloseOutlined />
          </span>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['4']} items={items} onClick={() => onCollapse(true)} />
      </Sider>
    </>

  );
}

export default Sidebar_Mobile