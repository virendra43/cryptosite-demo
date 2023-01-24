import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsLoggedIn,
  selectSignUpClicked,
  setLogout,
  setSignIn,
  setSignUp,
} from '../store/request-slice'

const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const signInStatus = useSelector(selectSignUpClicked)

  const handleSignIn = () => {
    dispatch(setSignIn())
  }
  const handleSignUp = () => {
    dispatch(setSignUp())
  }
  const handleLogOut = () => {
    dispatch(setLogout())
  }
  return (
    <div className="header">
      {!isLoggedIn ? (
        <>
          <div>
            {!signInStatus && (
              <Button style={{ margin: '10px' }} onClick={handleSignIn}>
                Sign In
              </Button>
            )}
            {signInStatus && (
              <Button style={{ margin: '10px' }} onClick={handleSignUp}>
                Sign Up
              </Button>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <Button onClick={handleLogOut}>Sign Out</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Header
