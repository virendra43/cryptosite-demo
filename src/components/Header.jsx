import { Button, Layout } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'

import {
  selectIsLoggedIn,
  selectSignUpClicked,
  setLogout,
  setSignIn,
  setSignUp,
} from '../store/request-slice'

// import { useHistory } from 'react'

const { Header } = Layout

const CustomHeader = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const signUpClicked = useSelector(selectSignUpClicked)
  // const history = useHistory()

  const handleSignIn = () => {
    dispatch(setSignIn())
  }
  const handleSignUp = () => {
    dispatch(setSignUp())
  }
  const handleLogOut = () => {
    dispatch(setLogout())
    // history.push('/')
  }

  return (
    <Header className="header">
      <div className="logo" />
      <div className="buttons">
        {!isLoggedIn ? (
          <>
            {!signUpClicked ? (
              <Button type="primary" onClick={handleSignIn}>
                Sign In
              </Button>
            ) : (
              <Button style={{ margin: '10px' }} onClick={handleSignUp}>
                Sign Up
              </Button>
            )}
          </>
        ) : (
          <>
            <Button onClick={handleLogOut}>Sign Out</Button>
          </>
        )}
      </div>
    </Header>
  )
}

export default CustomHeader
