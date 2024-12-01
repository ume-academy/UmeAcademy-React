import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { prefixTeacher } from './configs/routes'
import { adminRoutes, authRoutes, forbiddenRoutes, notFoundRoutes, protectedStudentRoutes, studentRoutes, teacherRoutes } from './constants/routes'
import Layout_Admin from './layouts/Layout_Admin'
import Layout_Client from './layouts/Layout_Client'
import Layout_Teacher from './layouts/Layout_Teacher'
import { PrivateRouteStudent, PriveteRouteAdmin } from './layouts/PriveteRoute'
import './scss/App.scss'

function App() {
  // sử dụng để khi chuyển qua route khác scroll sẽ về đầu trang
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0
    })
  }, [pathname])

  return (
    <>
      <Routes>

          <Route path='/' element={<Layout_Client />}>
            {/* <===== student =====> */}

            {studentRoutes.map((route, index) => {
            const isProtected = protectedStudentRoutes.some(
              (protectedRoute) => protectedRoute.path === route.path
            )

            return (
              <Route key={index} path={route.path} element={isProtected ? (
                  <PrivateRouteStudent>
                    <route.element />
                  </PrivateRouteStudent>
                ) : (
                  <route.element />
                )} />
              )
            })}
          </Route>


            {/* Teacher */}
            <Route path={prefixTeacher} element={
              <PriveteRouteAdmin>
                <Layout_Teacher />
              </PriveteRouteAdmin>
            }>
              {teacherRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>

        {/* <===== Admin =====> */}
        <Route path='/admin' element={<Layout_Admin />}>
          <Route index element={<h1>Dashboard</h1>} />
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Route>

        {/* <===== Auth =====> */}
        {authRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}

        {/* <===== NotFound =====> */}
        <Route path={notFoundRoutes.path} element={<notFoundRoutes.element />} />

        {/* <===== 403 - Forbidden =====> */}
        <Route path={forbiddenRoutes.path} element={<forbiddenRoutes.element />} />
      </Routes>
    </>
  )
}

export default App
