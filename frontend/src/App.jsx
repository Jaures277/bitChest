import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { useSelector } from 'react-redux';
import Profile from './pages/user/Profile';
import Wallet from './pages/client/wallet/Wallet';
import List from './pages/admin/userList/List';
import Dealing from './pages/client/dealing/Dealing';
import NotFound from './pages/notFound/NotFound';
import BuyCurrency from './pages/client/buyCurrency/BuyCurrency';
import AddUser from './pages/admin/userCreate/AddUser';
import EditUser from './pages/admin/userEdit/EditUser';
import Currency from './pages/currency/Currency';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.user?.token);
  console.log(token)
  if (!token) {
    return <Navigate to="/" replace={true} />
  }

  return children ? children : <Outlet />
}


const ProtectedRouteAdmin = ({ children }) => {
  const status = useSelector((state) => state.auth.user?.user.status);
  if (status.toLowerCase() !== 'admin') {
    return <Navigate to="/home" replace={true} />
  }

  return children ? children : <Outlet />
}

const ProtectedRouteClient = ({ children }) => {
  const status = useSelector((state) => state.auth.user?.user.status);
  if (status.toLowerCase() !== 'client') {
    return <Navigate to="/home" replace={true} />
  }

  return children ? children : <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />

        <Route element={<ProtectedRoute />}>

          <Route path='/home' element={<Home />} />
          <Route path='/currency' element={<Currency />} />
          <Route path='/profile' element={<Profile/>} />

          <Route element={<ProtectedRouteAdmin />}> 
            <Route path='/userList' element={<List />} />
            <Route path='/addUser' element={<AddUser />} />
            <Route path='/editUser/:id' element={<EditUser />} />
            <Route path='/deleteUser/:id' />
          </Route>

          <Route element={<ProtectedRouteClient />}>
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/buycurrency/:id' element={<BuyCurrency />} />
            <Route path='/sellCurrency/:id' />
            <Route path='/dealing' element={<Dealing />} />
          </Route>

        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
