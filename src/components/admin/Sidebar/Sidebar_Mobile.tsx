import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";
import './sidebarAntd.scss';

type Sidebar_Props = {
  collapsed: any,
  onCollapse: any,
  items: any
}

const Sidebar_Mobile: React.FC<Sidebar_Props> = ({ collapsed, onCollapse, items }) => {

  return (

    <>
      <Sider
        width={240} // Chiều rộng Sider khi mở ra
        collapsedWidth={collapsed ? 0 : 100} // Đặt collapsedWidth để rộng hơn một chút trên mobile
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(isCollapsed) => onCollapse(isCollapsed)}
        style={{ maxWidth: '90vw' }} // Đảm bảo chiều rộng tối đa trên mobile là 80% màn hình
        className="sidebar block sm:block md:hidden min-h-screen absolute z-50"
        theme="dark"
      >
        <div className="flex justify-center p-4 bg-[#001529]" >
          <Link to={'/admin'} className="font-title">ADMINISTRATOR</Link>
        </div>
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['4']} items={items} onClick={() => onCollapse(true)} />
      </Sider>
    </>

  );
}

export default Sidebar_Mobile