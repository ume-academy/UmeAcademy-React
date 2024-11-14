import { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { adminRoutes, authRoutes, notFoundRoutes, studentRoutes, teacherRoutes } from './constants/routes'
import { ModeUserContext, ModeUserType } from './contexts/ModeUser'
import Layout_Admin from './layouts/Layout_Admin'
import Layout_Client from './layouts/Layout_Client'
import Layout_Teacher from './layouts/Layout_Teacher'
import './scss/App.scss'

function App() {
  const { mode } = useContext(ModeUserContext) as ModeUserType
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
        {mode === 'student' ? (
          <Route path='/' element={<Layout_Client />}>
            {/* <===== student =====> */}
            {studentRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.element />} />
            ))}
          </Route>
        ) : (
          <>
            {/* Teacher */}
            <Route path='/' element={<Layout_Teacher />}>
              {teacherRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Route>
          </>
        )}

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
      </Routes>
    </>
  )
}

export default App
