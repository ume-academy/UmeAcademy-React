import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ModeUserContext, ModeUserType } from './contexts/ModeUser'
import Layout_Client from './layouts/Layout_Client'
import Layout_Teacher from './layouts/Layout_Teacher'

import './scss/App.scss'
import Profile from './pages/client/Student/Profile/Profile'
import Home_Page from './pages/client/Student/Home_page/Home_Page'
import Transaction_History from './pages/client/Student/Transaction_history/Transaction_History'
import Wallet_History from './pages/client/Student/Wallet_history/Wallet_History'
import Purchased_Courses from './pages/client/Student/Purchased_courses/Purchased_Courses'
import Course_Payment_Method from './pages/client/Student/Course_payment_method/Course_Payment_Method'
import CourseDetails from './pages/client/Student/Courses/CourseDetails/CourseDetails'
import Lesson from './components/client/student/Lesson/Lesson'
import Dashboard_Teacher from './pages/client/Teacher/Dashboard/Dashboard_Teacher'
import Register from './pages/auth/Register/Register'
import Login from './pages/auth/Login/Login'
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword'
import New_Instructor from './pages/client/Teacher/New_Instructor/New_Instructor'
import Not_Found from './pages/Not_found/Not_Found'

function App() {
  const { mode } = useContext(ModeUserContext) as ModeUserType

  return (
    <>
      <Routes>
        {/* profile dùng chung student và teacher*/}
        <Route
          path='/profile'
          element={
            mode === 'student' ? (
              <Layout_Client>
                <Profile />
              </Layout_Client>
            ) : (
              <Layout_Client>
                <Profile />
              </Layout_Client>
            )
          }
        />

        {mode === 'student' ? (
          <Route path='/' element={<Layout_Client />}>
            {/* <===== Layout client =====> */}
            <Route index element={<Home_Page />} />

            {/* student */}
            <Route path='/transaction-history' element={<Transaction_History />} />
            <Route path='/wallet-history' element={<Wallet_History />} />
            <Route path='/purchased-courses' element={<Purchased_Courses />} />
            <Route path='/course-payment-method' element={<Course_Payment_Method />} />

            {/* Course detail */}
            <Route path='/course/details/:id' element={<CourseDetails />} />
            <Route path='/course/:id/lesson' element={<Lesson />} />
          </Route>
        ) : (
          <>
            {/* Teacher */}
            <Route path='/' element={<Layout_Teacher />}>
              <Route index element={<Dashboard_Teacher />} />
              <Route path='/teacher/new-instructor' element={<New_Instructor />} />
            </Route>
          </>
        )}

        {/* <===== Auth =====> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='*' element={<Not_Found />} />
      </Routes>
    </>
  )
}

export default App
