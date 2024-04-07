import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import './styles.scss';
import APP_CONFIG from '../../config/appConfig';
import { useSelector, useDispatch } from 'react-redux'
import userService from '../../service/auth';
import { login } from '../../store/slice/auth';
import { Navigate } from "react-router-dom";

const Login = () => {
    const { isLogin } = useSelector(state => state.auth)
    const [isLoginFail, setIsLoginFail] = useState(false);
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            const { email, password } = values

            const { accessToken, refreshToken, userInfo } = await userService.login(email, password)

            //    đoạn code set token vào local storage sẽ handle ở bên view
            if (accessToken && refreshToken) {
                // localStorage.setItem(APP_CONFIG.STORAGE_TOKEN_NAME.ACCESS_TOKEN, accessToken)
                localStorage.setItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN, refreshToken)
                dispatch(login({ accessToken, userInfo }))
            } else {
                setIsLoginFail(true)
            }
        } catch (err) {
            setIsLoginFail(true)
        }
    };

    return (
        <>
            {isLoginFail && <Navigate to="/auth/login" replace={true} />}
            {isLogin ? <Navigate to="/" replace={true} /> : <div className="container-form-login">
                <h1>Social app MindX Fullstack</h1>
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần nhập email và đúng định dạng!',
                                type: 'email'
                            },
                        ]}>
                        <Input placeholder="example@gmail.com" size="small" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn cần nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password size="small" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 14,
                        }}
                    >
                        <div className="btn">
                            <Button size="small" htmlType="submit">
                                Đăng nhập
                            </Button>
                            <Button
                                size="small"
                                className="btn-signup"
                                onClick={() => {
                                    navigate('/auth/register');
                                }}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            }
        </>
    )
}

export default Login