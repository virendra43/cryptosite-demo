import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'

import {
  getNewsData,
  getStatsData,
  selectStatsData,
} from '../store/request-slice'
import { useDispatch, useSelector } from 'react-redux'

const { Title } = Typography

const Homepage = () => {
  // const [stats, setStats] = useState(null)
  const dispatch = useDispatch()
  const stats = useSelector(selectStatsData)
  let tempStats

  useEffect(() => {
    dispatch(getStatsData())
    dispatch(getNewsData())
    return () => {}
  }, [])


  // console.log('Temp state', tempStats)
  console.log('state', stats)
  // dispatch(getStatsValue())

  if (stats.status !== 'success') {
    return <div>Loading</div>
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={stats?.data?.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={stats?.data?.totalExchanges}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={stats?.data?.totalMarketCap}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={stats?.data?.total24hVolume}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={stats?.data?.totalMarkets}
          ></Statistic>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage
