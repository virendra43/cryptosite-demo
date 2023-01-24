import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { selectIsLoggedIn, signUpFunction } from '../store/request-slice'

const SignUp = () => {
  const dispatch = useDispatch()
  const userNameInput = useRef()
  const passwordInput = useRef()
  const loginState = useSelector(selectIsLoggedIn)

  console.log('Username Input', userNameInput)

  console.log('login State value from login component', loginState)
  const handleSignup = () => {
    const userNameInputValue = userNameInput.current.value
    const passwordInputValue = passwordInput.current.value

    const requestBody = {
      email: userNameInputValue,
      password: passwordInputValue,
      retrunSecureToken: true,
    }

    dispatch(signUpFunction(requestBody))
    // console.log("Username and password", userNameInputValue, passwordInputValue)
    // dispatch(setLogin())
  }

  return (
    <>
      <p>Username</p>
      <input type="text" ref={userNameInput}></input>
      <p>Password</p>
      <input type="password" ref={passwordInput}></input>
      <button onClick={handleSignup}>Sign up</button>
    </>
  )
}

export default SignUp
