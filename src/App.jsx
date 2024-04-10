import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/Root/RootLayout';
import AuthLayout from './layouts/Auth/AuthLayout';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Personal from './pages/personal';
import Account from './pages/account';
import './App.scss';
import { ProtectedRoute } from './protected';
import authService from './service/auth';
import APP_CONFIG from './config/appConfig';
import { useDispatch, useSelector } from 'react-redux'
import { login } from './store/slice/auth';

function App() {
  // tại line code này thì là app mình bắt đầu load components
  // kiểm tra coi user đã login chưa
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state => state.auth));

  // dispatch lại trang thái login trước khi toàn bộ APP components load

  useEffect(() => {
    (async () => {
      if (isLogin === false) {
        if (localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)) {
          const { accessToken, userInfo } = await authService.renewAccessToken(localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN))
          dispatch(login({ accessToken, userInfo }))
        }
      }

    })()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          {['', '/home'].map((item, idx) => <Route key={idx} path={item} element={<Home />} />)}
          <Route path='personal' element={
            <ProtectedRoute>
              <Personal />
            </ProtectedRoute>
          } />
          <Route path='account' element={<Account />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
