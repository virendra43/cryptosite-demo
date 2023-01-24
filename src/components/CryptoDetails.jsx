import React, { useState, useEffect } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCoinDetail,
  getCoinHistory,
  selectCoinDetail,
  selectCoinHistory,
} from '../store/request-slice'
import LineChart from './LineChart'

// import {
//   useGetCryptoDetailsQuery,
//   useGetCryptoHistoryQuery,
// } from '../services/cryptoApi'

// import LineChart from './LineChart'

const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timeperiod, setTimeperiod] = useState('7d')
  const dispatch = useDispatch()
  const coinDetail = useSelector(selectCoinDetail)
  const coinHistory = useSelector(selectCoinHistory)
  // const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  // const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod })
  // const cryptoDetails = coinDetail.data?.data?.coin

  console.log('CoinDetails', coinDetail)
  // console.log('CryptoDetails', cryptoDetails)

  // if (isFetching) return <Loader />

  useEffect(() => {
    dispatch(getCoinDetail(coinId))
    dispatch(getCoinHistory(coinId))
    return () => {}
  }, [])

  console.log('Coin Id', coinId)
  console.log('coin detail', coinDetail)

  if (coinDetail.status !== 'success') {
    return <>Loading...</>
  }

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y']

  const cryptoInfo = coinDetail?.data?.data?.coin
  console.log('Crypto info', cryptoInfo)
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoInfo?.price && millify(cryptoInfo?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoInfo?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoInfo?.volume && millify(cryptoInfo?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoInfo?.marketCap && millify(cryptoInfo?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoInfo?.allTimeHigh?.price &&
        millify(cryptoInfo?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ]

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoInfo?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoInfo?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoInfo?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoInfo?.supply?.total && millify(cryptoInfo?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoInfo?.supply?.circulating &&
        millify(cryptoInfo?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ]

  console.log('statss', stats)
  console.log('generic stats', genericStats)
  console.log('coin history', coinHistory)
  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoInfo?.name} ({cryptoInfo?.symbol}) Price
          </Title>
          <p>
            {cryptoInfo?.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(value) => setTimeperiod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        {/* <LineChart
          coinHistory={coinHistory?.data}
          currentPrice={millify(cryptoInfo?.price)}
          coinName={cryptoInfo?.name}
          status ={coinHistory?.status}
        /> */}
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoInfo.name} Value Statistics
              </Title>
              <p>
                An overview showing the statistics of {cryptoInfo.name}, such as
                the base and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Stats Info
              </Title>
              <p>
                An overview showing the statistics of {cryptoInfo.name}, such as
                the base and quote currency, the rank, and trading volume.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoInfo.name}?
            </Title>
            {HTMLReactParser(cryptoInfo.description)}
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoInfo.name} Links
            </Title>
            {cryptoInfo.links?.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  )
}

export default CryptoDetails
