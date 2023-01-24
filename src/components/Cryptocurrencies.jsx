import React, { useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { selectCoinsList } from '../store/request-slice'
import { useSelector } from 'react-redux'

const Cryptocurrencies = ({ simplified }) => {
  const cryptoList = useSelector(selectCoinsList)
  console.log('simplified', simplified)
  console.log('Cryptooo', cryptoList)

  let crypto = cryptoList?.data

  // let newCrypto = crypto.splice(0, 9)

  if (simplified) {
    crypto = crypto?.slice(0, 10)
  }

  console.log("crypto", crypto)
  // console.log('Crypto coins list', newCrypto)
  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {crypto.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
