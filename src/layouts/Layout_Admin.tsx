import Footer_Admin from '@/components/admin/Footer/Footer_Admin'
import Header_Admin from '@/components/admin/Header/Header_Admin'
import Sidebar_Admin from '@/components/admin/Sidebar/Sidebar_Admin'
import Sidebar_Mobile_Admin from '@/components/admin/Sidebar/Sidebar_Mobile'
import { router } from '@/configs/routes'
import { routerConfigAdmin } from '@/constants/admin'
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext'
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarsOutlined,
  CreditCardOutlined,
  PieChartOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { Layout, MenuProps } from 'antd'
import {
  ArrowRightLeft,
  FileClock,
  FileOutputIcon,
  GitPullRequestCreate,
  LibraryBig,
  PercentCircle,
  ShieldAlert,
  TicketPercent,
  UserCog,
  Users
} from 'lucide-react'
import React, { useContext, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const { Content } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const Layout_Admin: React.FC = () => {
  // Sử dụng hook để thông tin vị trí của route hiện tại render component cho phù hợp
  const location = useLocation()
  const hideCourseFunction = routerConfigAdmin.hideCourseFunction.some((route) => {
    const regex = new RegExp(`^${route.replace(':id', '[^/]+')}$`)
    return regex.test(location.pathname)
  })

  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType
  const [collapsed, setCollapsed] = useState(false)

  const items: MenuItem[] = [
    getItem(
      <NavLink to={router.dashBoard} className=''>
        Dashboard
      </NavLink>,
      '1',
      <PieChartOutlined />
    ),
    // getItem(<NavLink to={router.users}>Tài khoản</NavLink>, '2', <Users size={15} />),
    getItem('Danh mục tài khoản', 'sub1', <Users size={15} />, [
      getItem(<NavLink to={router.users}>Danh sách học viên</NavLink>, '3', <BarsOutlined />),
      getItem(<NavLink to={router.teachers}>Danh sách giảng viên</NavLink>, '4', <AppstoreAddOutlined />)
    ]),
    getItem('Danh mục khóa học', 'sub2', <AppstoreOutlined />, [
      getItem(<NavLink to={router.listCatalogues}>Danh sách danh mục</NavLink>, '5', <BarsOutlined />),
      getItem(<NavLink to={router.cataloguesCreate}>Thêm mới danh mục</NavLink>, '6', <AppstoreAddOutlined />)
    ]),
    getItem(<NavLink to={router.coursesList}>Khóa học</NavLink>, '7', <LibraryBig size={15} />),
    getItem(
      <NavLink to={router.commissionRateUpdate}>Cập nhật tỷ lệ hoa hồng</NavLink>,
      '8',
      <PercentCircle size={15} />
    ),
    getItem('Danh mục giao dịch', 'sub3', <ArrowRightLeft size={15} />, [
      getItem(<NavLink to={router.listTransactions}>Lịch sử giao dịch</NavLink>, '9', <FileClock size={15} />),
      getItem(
        <NavLink to={router.listOfWithdrawalRequests}>Yêu cầu rút tiền</NavLink>,
        '10',
        <GitPullRequestCreate size={15} />
      ),
      getItem(<NavLink to={router.listRefundCourses}>Danh sách hoàn tiền</NavLink>, '11', <FileOutputIcon size={15} />)
    ]),

    getItem(<NavLink to={router.listRole}>Phân quyền</NavLink>, '12', <ShieldAlert size={15} />),
    getItem(<NavLink to={router.listPaymentMethod}>Phương thức thanh toán</NavLink>, '13', <CreditCardOutlined />),
    getItem('Người dùng hệ thống', 'sub4', <UserCog size={15} />, [
      getItem(
        <NavLink to={router.usersSystem} className='truncate'>
          Danh sách người dùng hệ thống
        </NavLink>,
        '14',
        <BarsOutlined />
      ),
      getItem(<NavLink to={router.userSystemCreate}>Tạo mới người dùng hệ thống</NavLink>, '15', <UserAddOutlined />)
    ]),
    getItem(<NavLink to={router.listVouchers}>Mã giảm giá khóa học</NavLink>, '16', <TicketPercent size={15} />)
  ]

  const handleCollapse = (isCollapsed: any) => {
    setCollapsed(isCollapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar Admin */}
      <Sidebar_Admin items={items} />
      {/* End Sidebar Admin */}

      <Sidebar_Mobile_Admin collapsed={collapsed} onCollapse={handleCollapse} items={items} />
      <Layout>
        {/* Header Admin */}
        <Header_Admin toggleTheme={toggleTheme} theme={theme} collapsed={collapsed} onCollapse={handleCollapse} />
        {/* End Header Admin */}

        <Content className='dark:bg-[#131022] py-2 dark:text-[#b9b7c0]'>
          <div className={`${!hideCourseFunction ? 'p-4 md:p-6' : 'p-0 lg:p-4'}`}>
            <div className=''>
              <Outlet />
            </div>
          </div>
        </Content>

        {/* Footer Admin */}
        <Footer_Admin />
        {/* End Footer Admin */}
      </Layout>
    </Layout>
  )
}

export default Layout_Admin
