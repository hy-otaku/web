import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './sass/style.scss'

import { Row, Col } from 'antd'

class Main extends Component {
  render () {
    const cols = [

      <Col key='anime'>
        <Link to='/anime'>
          <img
            alt='anime' text='անիմե'
            src='https://raw.githubusercontent.com/high-otaku/assets/master/common/anime-2.png'
          />
        </Link>
      </Col>,

      <Col key='manga'>
        <Link to='/manga'>
          <img
            alt='manga' text='մանգա'
            src='https://raw.githubusercontent.com/high-otaku/assets/master/common/manga-3.png'
          />
        </Link>
      </Col>

    ]

    return (
      <div className='the main-content '>

        <Row
          justify='space-around' align='middle'
          gutter={[0, 20]}
        >
          {cols}
        </Row>

      </div>

    )
  }
}

export default Main
