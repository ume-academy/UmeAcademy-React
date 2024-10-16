import { logo } from '@/contants/client';
import { AppstoreAddOutlined, AppstoreOutlined, BarsOutlined, PieChartOutlined } from "@ant-design/icons";
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
    getItem(<NavLink to={'/admin/users'}>User</NavLink>, '2', <Users size={15} />),
    getItem('Danh mục khóa học', 'sub1', <AppstoreOutlined />, [
      getItem(<NavLink to={'/admin/catalogues'}>Danh sách danh mục</NavLink>, '3', <BarsOutlined />),
      getItem(<NavLink to={'/admin/catalogues/create'}>Danh sách danh mục</NavLink>, '4', <AppstoreAddOutlined />),
    ]),
    // getItem(<NavLink to={'/admin/test2'}>Test</NavLink>, 'sub2', <BarsOutlined />, [
    //   getItem('Tom', '5'),
    //   getItem('Bill', '6'),
    //   getItem('Alex', '7'),
    // ]),
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
        className='sidebar bg-[#001529]'
        width={270}
      >
        <div className="flex justify-center p-4 bg-[#001529]" >
          <img src={logo} alt="logo" width={120} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
  )
}

export default Sidebar_Admin