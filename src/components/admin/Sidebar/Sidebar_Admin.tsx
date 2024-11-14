import { logo } from '@/constants/client';
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import './sidebarAntd.scss';

type Sidebar_Props = {
  items: any
}

const Sidebar_Admin: React.FC<Sidebar_Props> = ({ items }) => {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className='sidebar bg-[#001529] hidden lg:block '
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