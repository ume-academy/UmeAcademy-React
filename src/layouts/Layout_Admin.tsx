import Loader from '@/components/client/commonComponents/Loader/Loader';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/admin/Header';
import Sidebar from '../components/admin/Sidebar';


const Layout_Admin = () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [loading, setLoading] = useState<boolean>(true);
    
        useEffect(() => {
            setTimeout(() => setLoading(false), 100)
        },[])

  return loading ? (<Loader/>) : (
      <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        
          {/* <!-- ===== Bao bọc toàn bộ layout admin ===== --> */}
          <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Start sidebar ===== --> */}
              <Sidebar />
              {/* <!-- ===== End sidebar ===== --> */}

              {/* <!-- ===== Bắt đầu nội dung chính ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

                  {/* <!-- ===== Start header ===== --> */} 
                  <Header  />
                  {/* <!-- ===== End header ===== --> */}


                  {/* <!-- ===== Start Content ===== --> */}
                  <main className='bg-[#F5F5F5]'>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                          <Outlet />
                      </div>
                  </main>
                  {/* <!-- ===== End Content ===== --> */}

              </div>
          </div>
      </div>
      </>
  )}

export default Layout_Admin
