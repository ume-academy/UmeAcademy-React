import { Route, Routes } from 'react-router-dom';
import Layout_Client from './layouts/Layout_Client';
import ForgotPassword from './Pages/auth/ForgotPassword/ForgotPassword';
import Login from './Pages/auth/Login/Login';
import Register from './Pages/auth/Register/Register';
import Home_Page from './Pages/client/Home_page/Home_Page';
import Profile from './Pages/client/User/Profile/Profile';
import './sass/App.scss';

function App() {

  return (
    <>
      <Routes>

        {/* <===== Layout client =====> */}
        <Route path='/' element={<Layout_Client />} >
          <Route index element={<Home_Page />} />

          <Route path='/abc' element={<h1>ABCaasjhdfash</h1>} />

          {/* User profile */}
          <Route path='/profile' element={<Profile />} />
        </Route>


        {/* <===== Auth =====> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />

      </Routes>
    </>
  )
}

export default App
