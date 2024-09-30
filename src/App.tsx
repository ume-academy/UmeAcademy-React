import { Route, Routes } from 'react-router-dom';
import './sass/App.scss';
import Layout_Client from './layouts/Layout_Client';
import Home_Page from './Pages/client/Home_page/Home_Page';

function App() {

  return (
    <>
      <Routes>

          {/* <===== Layout client =====> */}
          <Route path='/' element={<Layout_Client />} >
              <Route index element={<Home_Page />} />
          </Route>
          
       </Routes>
    </>
  )
}

export default App
