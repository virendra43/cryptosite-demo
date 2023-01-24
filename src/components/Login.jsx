import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
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
  const handleLogin = () => {
    const userNameInputValue = userNameInput.current.value
    const passwordInputValue = passwordInput.current.value

    const requestBody = {
      email: userNameInputValue,
      password: passwordInputValue,
      retrunSecureToken: true,
    }

    dispatch(signInFunction(requestBody))
    // console.log("Username and password", userNameInputValue, passwordInputValue)
    // dispatch(setLogin())
  }
  const handleLogOut = () => {
    dispatch(setLogout())
  }

  return (
    <>
      <p>Username</p>
      <input type="text" ref={userNameInput}></input>
      <p>Password</p>
      <input type="password" ref={passwordInput}></input>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default Login
