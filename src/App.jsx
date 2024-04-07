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
import userService from './service/auth';
import APP_CONFIG from './config/appConfig';
import { useDispatch } from 'react-redux'
import { login } from './store/slice/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN)) {
        const { accessToken, userInfo } = await userService.renewAccessToken(localStorage.getItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN))
        dispatch(login({ accessToken, userInfo }))
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
