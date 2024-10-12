import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ModeUserContext, ModeUserType } from './contexts/ModeUser'
import Layout_Client from './layouts/Layout_Client'
import Layout_Teacher from './layouts/Layout_Teacher'

import Lesson from './components/client/student/Lesson/Lesson'
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword'
import Login from './pages/auth/Login/Login'
import Register from './pages/auth/Register/Register'
import Course_Payment_Method from './pages/client/Student/Course_payment_method/Course_Payment_Method'
import CourseDetails from './pages/client/Student/Courses/CourseDetails/CourseDetails'
import Home_Page from './pages/client/Student/Home_page/Home_Page'
import Profile from './pages/client/Student/Profile/Profile'
import Purchased_Courses from './pages/client/Student/Purchased_courses/Purchased_Courses'
import Transaction_History from './pages/client/Student/Transaction_history/Transaction_History'
import Wallet_History from './pages/client/Student/Wallet_history/Wallet_History'
import My_Courses from './pages/client/Teacher/My_Courses/My_Courses'
import New_Instructor from './pages/client/Teacher/New_Instructor/New_Instructor'
import Payment_Methods from './pages/client/Teacher/PaymentMethods/Payment_Methods'
import Revenue from './pages/client/Teacher/Revenue/Revenue'
import List_Students from './pages/client/Teacher/Students/List_Students'
import Withdraw_Money from './pages/client/Teacher/Withdraw_Money/Withdraw_Money'
import Not_Found from './pages/Not_found/Not_Found'
import './scss/App.scss'

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
            <Route path='/course/:id' element={<CourseDetails />} />
            <Route path='/course/:id/lesson' element={<Lesson />} />
          </Route>
        ) : (
          <>
            {/* Teacher */}
            <Route path='/' element={<Layout_Teacher />}>
              <Route index element={<Revenue />} />
              <Route path='/teacher/new-instructor' element={<New_Instructor />} />
              <Route path='/teacher/my-students' element={<List_Students />} />
              <Route path='/teacher/withdraw_money' element={<Withdraw_Money />} />
              <Route path='/teacher/my-courses' element={<My_Courses />} />
              <Route path='/teacher/payment-methods' element={<Payment_Methods />} />
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
