import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/mindx-logo1.png';
import HomeIcon from '../HomeIcon';
import PersonalIcon from '../PersonalIcon';
import AccountIcon from '../AccountIcon';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slice/auth';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { isLogin } = useSelector(state => state.auth)
    return (
        <div className="page-header">
            <div className="logo">
                <img src={logo} />
            </div>
            <ul className="list-router-page">
                <li>
                    <NavLink to={'/home'}>
                        {/* Trang chủ */}
                        <span className="title">Trang chủ</span>
                        <HomeIcon className="icon-header" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/personal'}>
                        <span className="title">Cá nhân</span>
                        <PersonalIcon className="icon-header" />
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/account'}>
                        <span className="title">Tài khoản</span>
                        <AccountIcon className="icon-header" />
                    </NavLink>
                </li>

                {!isLogin && <li>
                    <NavLink to={'/auth/login'}>
                        <span className="title">Đăng nhập</span>
                        <AccountIcon className="icon-header" />
                    </NavLink>
                </li>}

            </ul>
            {isLogin && <Button onClick={() => {
                dispatch(logout());
                navigate('/auth/login');
            }}>
                Đăng xuất
            </Button>}

        </div>
    )
}

export default Header;