import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL } from '../constants.js'

import './sass/style.scss'

import { Row, Col } from 'antd'

class Main extends Component {
  render () {
    const self = `${BASE_URL}/assets/master/common`
    const cols = [

      <Col key='anime'>
        <Link to='/anime'>
          <img
            alt='anime' text='անիմե'
            src={`${self}/anime.png`}
          />
        </Link>
      </Col>,

      <Col key='manga'>
        <Link to='/manga'>
          <img
            alt='manga' text='մանգա'
            src={`${self}/manga.png`}
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
