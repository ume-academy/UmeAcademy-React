import { Route, Routes } from 'react-router-dom';
import './sass/App.scss';
import Layout_Client from './layouts/Layout_Client';
import Home_Page from './Pages/client/Home_page/Home_Page';
import Register from './Pages/auth/Register/Register';
import Login from './Pages/auth/Login/Login';

function App() {

  return (
    <>
      <Routes>

        {/* <===== Layout client =====> */}
        <Route path='/' element={<Layout_Client />} >
          <Route index element={<Home_Page />} />
        </Route>


        {/* <===== Auth =====> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
