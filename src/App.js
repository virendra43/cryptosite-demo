import React from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
// import 'antd/dist/antd.css'

// import Navbar from './components/Navbar'
import {
  Navbar,
  Homepage,
  Exchanges,
  CryptoDetails,
  Cryptocurrencies,
  News,
} from './components'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsLoggedIn,
  selectSignUpClicked,
  selectTokenId,
  setLogin,
} from './store/request-slice'
import SignUp from './components/SignUp'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const signInClicked = useSelector(selectSignUpClicked)

  console.log('signInClicked', signInClicked)

  const tokenId = useSelector(selectTokenId)
  console.log('isLogged in? ', isLoggedIn)
  console.log('tokenID ', tokenId)

  if (tokenId !== null) {
    dispatch(setLogin())
  }
  

  return (
    <div className="app">
      <Header/>
        {isLoggedIn ? (
          <>
            <div className="navbar">
              <Navbar />
            </div>
            <div className="main">
              <Layout>
                <div className="routes">
                  <Routes>
                    <Route exact path="/" element={<Homepage />} />

                    <Route exact path="/exchanges" element={<Exchanges />} />

                    <Route
                      exact
                      path="/cryptocurrencies"
                      element={<Cryptocurrencies />}
                    />

                    <Route
                      exact
                      path="/crypto/:coinId"
                      element={<CryptoDetails />}
                    />

                    <Route exact path="/news" element={<News />} />
                  </Routes>
                </div>
              </Layout>

              <div className="footer">
                <Typography.Title
                  level={5}
                  style={{ color: 'white', textAlign: 'center' }}
                >
                  Cryptoverse <br />
                  All rights reserved.
                </Typography.Title>
                <Space>
                  <Link to="/">Home</Link>
                  <Link to="/exchanges">Exchanges</Link>
                  <Link to="/news">News</Link>
                </Space>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              {signInClicked && <Login />}
              {!signInClicked && <SignUp />}
            </div>
          </>
        )}
    </div>
  )
}

export default App
