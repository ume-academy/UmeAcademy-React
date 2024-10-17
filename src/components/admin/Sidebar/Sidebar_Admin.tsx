import { logo } from '@/contants/client';
import { AppstoreAddOutlined, AppstoreOutlined, BarsOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { LibraryBig, Users, PercentCircle, HandCoins } from 'lucide-react'; import { useState } from "react";
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
    getItem(<NavLink to={'/admin/users'}>Tài khoản</NavLink>, '2', <Users size={15} />),
    getItem('Danh mục khóa học', 'sub1', <AppstoreOutlined />, [
      getItem(<NavLink to={'/admin/catalogues'}>Danh sách danh mục</NavLink>, '3', <BarsOutlined />),
      getItem(<NavLink to={'/admin/catalogues/create'}>Thêm mới danh mục</NavLink>, '4', <AppstoreAddOutlined />),
    ]),
    getItem(<NavLink to={'/admin/courses'}>Khóa học</NavLink>, '5', <LibraryBig size={15} />),
    getItem(<NavLink to={'/admin/commission-rate/update'}>Cập nhật tỷ lệ hoa hồng</NavLink>, '6', <PercentCircle size={15} />),
    getItem(<NavLink to={'/admin/transactions'}>Giao dịch</NavLink>, '7', <HandCoins size={15} />),

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