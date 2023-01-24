import React, { useEffect } from 'react'
import axios from 'axios'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import { getNewsData, selectNewsData } from '../store/request-slice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment/moment'

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const newsDataList = useSelector(selectNewsData)
  console.log('News data list', newsDataList)

  let newsList = newsDataList?.data?.value

  if (simplified) {
    newsList = newsList?.slice(0, 6)
  }

  return (
    <>
      <Row gutter={[24, 24]}>
        {newsList?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {/* {news.name} */}
                    {news.name.length > 40
                      ? `${news.name.substring(0, 40)}...`
                      : news.name}
                  </Title>
                  <img
                    style={{ height: '100px', width: '150px' }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default News
