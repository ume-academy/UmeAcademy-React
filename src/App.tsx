import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lesson from './Components/client/student/Lesson/Lesson';
import { ModeUserContext, ModeUserType } from './contexts/ModeUser';
import Layout_Client from './layouts/Layout_Client';
import Layout_Teacher from './layouts/Layout_Teacher';
import ForgotPassword from './Pages/auth/ForgotPassword/ForgotPassword';
import Login from './Pages/auth/Login/Login';
import Register from './Pages/auth/Register/Register';
import CourseDetails from './Pages/client/Courses/CourseDetails/CourseDetails';
import Home_Page from './Pages/client/Home_page/Home_Page';
import Not_Found from './Pages/client/Not_found/Not_Found';
import Course_Payment_Method from './Pages/client/Student/Course_payment_method/Course_Payment_Method';
import Purchased_Courses from './Pages/client/Student/Purchased_courses/Purchased_Courses';
import Transaction_History from './Pages/client/Student/Transaction_history/Transaction_History';
import Wallet_History from './Pages/client/Student/Wallet_history/Wallet_History';
import Profile from './Pages/client/User/Profile/Profile';
import Dashboard_Teacher from './Pages/teacher/Dashboard/Dashboard_Teacher';
import './sass/App.scss';
import New_Instructor from './Pages/client/Teacher/New_Instructor/New_Instructor';


function App() {
  const { mode } = useContext(ModeUserContext)  as ModeUserType

  return (
    <>
      <Routes>

          {/* profile dùng chung */}
          <Route path='/profile' element={mode === 'student' ? (
            <Layout_Client><Profile/></Layout_Client>
          ): (
            <Layout_Client><Profile/></Layout_Client>
          )} />

          {mode === 'student' ? (
           <Route path='/' element={<Layout_Client />} >
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
              <Route path='/' element={<Layout_Teacher />} >
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