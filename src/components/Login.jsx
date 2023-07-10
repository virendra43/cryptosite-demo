import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { Button, Form, Input, Card } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {
  selectIsLoggedIn,
  setLogout,
  signInFunction,
} from '../store/request-slice'
import classes from './Navigation.module.css'

const Login = () => {
  const dispatch = useDispatch()
  const userNameInput = useRef()
  const passwordInput = useRef()
  const loginState = useSelector(selectIsLoggedIn)

  console.log('Username Input', userNameInput)

  console.log('login State value from login component', loginState)

  const onFinish = (values) => {
    const { username, password } = values

    const requestBody = {
      email: username,
      password: password,
      retrunSecureToken: true,
    }

    dispatch(signInFunction(requestBody))
  }

  const handleLogOut = () => {
    dispatch(setLogout())
  }

  return (
    <div className={classes.login}>
      <Card
        title="Log in"
        bordered={false}
        style={{ backgroundColor: '#F0F7FF', width: '300px', margin: 'auto' }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              ref={userNameInput}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              ref={passwordInput}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
