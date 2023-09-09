import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
import Create from './pages/admin/userCreate/Create';
import List from './pages/admin/userList/List';
import HistoryDealing from './pages/client/dealing/historik/HistoryDealing';

const ProtectedRoute = ({children})=> {
  const token = useSelector((state) => state.auth.user?.token);
  console.log(token)
    if(!token) {
        return <Navigate to="/login" replace={true} />
    }

    return children ? children: <Outlet />
}


const ProtectedRouteAdmin = ({children})=> {
  const status = useSelector((state) => state.auth.user?.user.status);
    if(status.toLowerCase() !==  'admin') {
        return <Navigate to="/home" replace={true} />
    }

    return children ? children: <Outlet />
}

const ProtectedRouteClient = ({children})=> {
  const status = useSelector((state) => state.auth.user?.user.status);
    if(status.toLowerCase() !== 'client') {
        return <Navigate to="/home" replace={true} />
    }

    return children ? children: <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>

          <Route element={<ProtectedRouteAdmin />}>
            <Route path='/userCreate' element={<Create/>} />
            <Route path='/userList' element={<List/>} />
          </Route>

          <Route element={<ProtectedRouteClient />}>
            <Route path='/wallet' element={<Wallet/>} />
            <Route path='/historyDealing' element={<HistoryDealing/>} />
          </Route>

        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
