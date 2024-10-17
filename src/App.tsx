import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ModeUserContext, ModeUserType } from './contexts/ModeUser'
import Layout_Client from './layouts/Layout_Client'
import Layout_Teacher from './layouts/Layout_Teacher'

import Lesson from './components/client/student/Lesson/Lesson'
import Layout_Admin from './layouts/Layout_Admin'
import Catalog_Form_Submit from './pages/admin/Catalogues/Form_Submit/Catalog_Form_Submit'
import List_Catalogues from './pages/admin/Catalogues/List_Catalogues/List_Catalogues'
import List_Users from './pages/admin/User/List_Users/List_Users'
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
import FormCourse from './pages/client/Teacher/FormCourse/FormCourse'
import My_Courses from './pages/client/Teacher/My_Courses/My_Courses'
import New_Instructor from './pages/client/Teacher/New_Instructor/New_Instructor'
import Payment_Methods from './pages/client/Teacher/PaymentMethods/Payment_Methods'
import Revenue from './pages/client/Teacher/Revenue/Revenue'
import List_Students from './pages/client/Teacher/Students/List_Students'
import Withdraw_Money from './pages/client/Teacher/Withdraw_Money/Withdraw_Money'
import Not_Found from './pages/Not_found/Not_Found'
import './scss/App.scss'
import List_Courses from './pages/admin/Course/List_Courses/List_Courses'
import Commission_Rate from './pages/admin/Commission_Rate/Commission_Rate'
import List_Transactions from './pages/admin/Transactions/List_Transactions/List_Transactions'

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
            <Route path='/transaction-history' element={<Transaction_History />} />
            <Route path='/wallet-history' element={<Wallet_History />} />
            <Route path='/purchased-courses' element={<Purchased_Courses />} />
            <Route path='/course-payment-method' element={<Course_Payment_Method />} />
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
              <Route path='/teacher/my-courses' element={<My_Courses />} /> {/* my courses */}
              <Route path='/teacher/payment-methods' element={<Payment_Methods />} />
              <Route path='/teacher/withdraw-money' element={<Withdraw_Money />} />
              <Route path='/teacher/create-course' element={<FormCourse />} />
            </Route>
          </>
        )}

        <Route path="/admin" element={<Layout_Admin />}>
          <Route index element={<h1>Dashboard</h1>} />

          {/* Route tài khoản */}
          <Route path='/admin/users' element={<List_Users/>} />

          {/* Route khóa học */}
          <Route path='/admin/courses' element={<List_Courses />} />

          {/* Route giao dịch */}
          <Route path='/admin/transactions' element={<List_Transactions />} />

          {/* Route danh mục */}
          <Route path='/admin/catalogues' element={<List_Catalogues />} />
          <Route path='/admin/catalogues/create' element={<Catalog_Form_Submit />} />
          <Route path='/admin/catalogues/update/:id' element={<Catalog_Form_Submit />} />

          {/* Route % hoa hồng */}
          <Route path='/admin/commission-rate/update' element={<Commission_Rate />} />
        </Route>

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
