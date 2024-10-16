import Footer_Admin from '@/components/admin/Footer/Footer_Admin';
import Header_Admin from '@/components/admin/Header/Header_Admin';
import Sidebar_Admin from '@/components/admin/Sidebar/Sidebar_Admin';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { Layout } from 'antd';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;




const Layout_Admin: React.FC = () => {

  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType

  return (
    <Layout style={{ minHeight: '100vh' }} >
      {/* Sidebar Admin */}
      <Sidebar_Admin />
      {/* End Sidebar Admin */}
      <Layout>

        {/* Header Admin */}
        <Header_Admin toggleTheme={toggleTheme} theme={theme} />
        {/* End Header Admin */}

        <Content className='dark:bg-[#131022] py-2 dark:text-[#b9b7c0]'>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: '#f84563',
              // borderRadius: borderRadiusLG,
            }}

          >
            <div className="bg-[#EEEEEE] p-4 rounded-lg dark:bg-[#2B2838]">
              <Outlet />
            </div>
          </div>
        </Content>

        {/* Footer Admin */}
        <Footer_Admin />
        {/* End Footer Admin */}

      </Layout>
    </Layout>
  );
};

export default Layout_Admin;
