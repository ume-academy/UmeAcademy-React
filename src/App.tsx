import { Route, Routes } from 'react-router-dom';
import Layout_Client from './layouts/Layout_Client';
import ForgotPassword from './Pages/auth/ForgotPassword/ForgotPassword';
import Login from './Pages/auth/Login/Login';
import Register from './Pages/auth/Register/Register';
import Home_Page from './Pages/client/Home_page/Home_Page';
import Profile from './Pages/client/User/Profile/Profile';
import './sass/App.scss';
import Transaction_History from './Pages/client/Student/Transaction_history/Transaction_History';
import Wallet_History from './Pages/client/Student/Wallet_history/Wallet_History';
import Purchased_Courses from './Pages/client/Student/Purchased_courses/Purchased_Courses';
import Course_Payment_Method from './Pages/client/Student/Course_payment_method/Course_Payment_Method';
import Not_Found from './Pages/client/Not_found/Not_Found';
import CourseDetails from './Pages/client/Courses/CourseDetails/CourseDetails';
import Lesson from './Components/client/student/Lesson/Lesson';


function App() {

  return (
    <>
      <Routes>

        {/* <===== Layout client =====> */}
        <Route path='/' element={<Layout_Client />} >
          <Route index element={<Home_Page />} />

          {/* student */}
          <Route path='/transaction-history' element={<Transaction_History />} />
          <Route path='/wallet-history' element={<Wallet_History />} />
          <Route path='/purchased-courses' element={<Purchased_Courses />} />
          <Route path='/course-payment-method' element={<Course_Payment_Method />} />
          
          {/* User profile */}
          <Route path='/profile' element={<Profile />} />

          {/* Course detail */}
          <Route path='/course/details/:id' element={<CourseDetails />} />
          <Route path='/course/:id/lesson' element={<Lesson />} />
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