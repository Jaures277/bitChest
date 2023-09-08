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

const ProtectedRoute = ({children})=> {
  const token = useSelector((state) => state.auth.user?.token);
  console.log(token)
    if(!token) {
        return <Navigate to="/login" replace={true} />
    }

    return children ? children: <Outlet />
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
