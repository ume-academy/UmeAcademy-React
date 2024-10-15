import { logo } from '@/contants/client';
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Users } from 'lucide-react';
import { useState } from "react";
import { NavLink } from "react-router-dom";
import './sidebarAntd.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar_Admin = () => {

  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = [
    getItem(<NavLink to={'/admin'} className=''>Dashboard</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink to={'/admin/test'}>Test 1</NavLink>, '2', <DesktopOutlined />),
    getItem(<NavLink to={'/admin/users'}>User</NavLink>, '3', <Users size={15} />),
    // getItem('User', 'sub1', <UserOutlined />, [
    //   getItem('Tom', '3'),
    //   getItem('Bill', '4'),
    //   getItem('Alex', '5'),
    // ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className='bg-[#e5e5e5] dark:bg-[#322f3f]'
    >
      <div className="flex justify-center p-4 dark:bg-[#322f3f]" >
        <img src={logo} alt="logo" width={120} />
      </div>
      <Menu defaultSelectedKeys={['1']} items={items} className='bg-[#f84563] dark:bg-[#2B2838]' />
    </Sider>
  )
}

export default Sidebar_Admin